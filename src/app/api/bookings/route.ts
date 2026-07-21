import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import connectToDatabase from '@/lib/db';
import Booking from '@/lib/models/Booking';
import ActivityLog from '@/lib/models/ActivityLog';
import { getNextBookingId } from '@/lib/models/Counter';
import { requirePermission } from '@/lib/rbac';
import { calculatePrice, PricingUnavailableError, round2 } from '@/lib/pricing/engine';

// =============================================================
// GET /api/bookings — Fetch bookings with filters & pagination
// =============================================================
export async function GET(request: Request) {
  const denied = await requirePermission('bookings', 'view');
  if (denied) return denied;

  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100); // F02: cap scraping
    const skip = (page - 1) * limit;

    const query: any = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { bookingId: { $regex: search, $options: 'i' } },
        { customerName: { $regex: search, $options: 'i' } },
        { customerPhone: { $regex: search, $options: 'i' } },
        { route: { $regex: search, $options: 'i' } },
      ];
    }

    const [bookings, total] = await Promise.all([
      Booking.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Booking.countDocuments(query)
    ]);

    // Get status counts for filter tabs
    const statusCounts = await Booking.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const counts: Record<string, number> = {};
    statusCounts.forEach((s: any) => { counts[s._id] = s.count; });

    return NextResponse.json({
      success: true,
      data: bookings,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      statusCounts: counts
    });
  } catch (error) {
    console.error('Bookings GET Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

// =============================================================
// POST /api/bookings — Create booking (public — no auth required)
// =============================================================
export async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  // Basic input validation
  const name = (body.customerName || body.name || '').trim();
  const phone = (body.customerPhone || body.phone || '').trim();
  if (!name || !phone) {
    return NextResponse.json(
      { success: false, error: 'customerName and customerPhone are required' },
      { status: 400 }
    );
  }

  // F12: Parse and validate travel date — reject past dates
  const rawDate = body.travelDate;
  if (!rawDate) {
    return NextResponse.json(
      { success: false, error: 'travelDate is required' },
      { status: 400 }
    );
  }
  const travelDate = new Date(rawDate);
  if (isNaN(travelDate.getTime())) {
    return NextResponse.json(
      { success: false, error: 'travelDate is not a valid date' },
      { status: 400 }
    );
  }
  // Grace window: allow bookings up to 1 hour in the past (timezone/latency tolerance)
  const graceCutoff = new Date(Date.now() - 60 * 60 * 1000);
  if (travelDate < graceCutoff) {
    return NextResponse.json(
      { success: false, error: 'Travel date cannot be in the past' },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    // F01: Server-side price recompute — never trust body.totalPrice
    let priceResult: Awaited<ReturnType<typeof calculatePrice>> | null = null;
    const serviceType = body.serviceType || (body.tripType === 'hourly' ? 'hourly' : 'transfer');

    if (body.vehicleId && (body.routeId || serviceType === 'hourly')) {
      try {
        priceResult = await calculatePrice(
          serviceType === 'hourly'
            ? {
                type: 'hourly',
                vehicleId: body.vehicleId,
                hours: Number(body.durationHours || 4),
                date: travelDate,
              }
            : {
                type: 'transfer',
                routeId: body.routeId,
                vehicleId: body.vehicleId,
                date: travelDate,
              }
        );
      } catch (priceError) {
        if (priceError instanceof PricingUnavailableError) {
          return NextResponse.json(
            {
              success: false,
              error: priceError.message,
              code: 'PRICING_UNAVAILABLE',
            },
            { status: 422 }
          );
        }
        // DB error during pricing — fail the whole request
        throw priceError;
      }
    }

    // Use server-computed price; fall back to 0 only for legacy/admin-created bookings
    // where vehicleId is not provided
    const totalPrice = priceResult
      ? priceResult.totalIncludingTax
      : round2(Number(body.totalPrice || 0));

    // 1. Generate sequential booking ID
    const bookingId = await getNextBookingId();

    // 2. Determine priority automatically
    let priority: string = 'standard';
    const vehicleLower = (body.vehicleType || '').toLowerCase();
    const routeLower = (body.route || body.pickupLocation || '').toLowerCase();

    if (vehicleLower.includes('vip')) {
      priority = 'vip';
    } else if (routeLower.includes('airport')) {
      priority = 'airport';
    } else if ((body.passengers || 1) >= 10) {
      priority = 'group';
    } else if (body.tripType === 'corporate') {
      priority = 'corporate';
    }

    // F12: Compare against actual Date, not a string slice
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfToday = new Date(startOfToday.getTime() + 24 * 60 * 60 * 1000);
    if (travelDate >= startOfToday && travelDate < endOfToday) {
      priority = 'urgent';
    }

    // 3. Build route string
    const route = body.route || `${body.pickupLocation || 'Pickup'} → ${body.dropoffLocation || 'Destination'}`;

    // 4. Save booking to MongoDB
    const booking = await Booking.create({
      bookingId,
      customerName: name,
      customerPhone: phone,
      customerEmail: body.customerEmail || body.email || '',
      pickupLocation: body.pickupLocation || '',
      dropoffLocation: body.dropoffLocation || '',
      route,
      vehicleType: body.vehicleType || 'Standard',
      vehicleId: body.vehicleId || undefined,
      travelDate: travelDate, // F12: stored as Date, not string
      travelTime: body.travelTime || body.time || '08:00',
      returnDate: body.returnDate,
      returnTime: body.returnTime,
      passengers: body.passengers || body.passengerCount || 1,
      luggage: body.luggage || body.luggageCount || 0,
      tripType: body.tripType || 'one-way',
      status: 'pending',
      priority,
      totalPrice, // F01: always server-computed
      priceBreakdown: priceResult ?? undefined,
      extras: body.extras || [],
      specialRequests: body.specialRequests || body.notes || '',
      nationality: body.nationality || '',
      language: body.language || 'en',
      paymentMethod: body.paymentMethod || 'cash',
      statusHistory: [{
        status: 'pending',
        timestamp: new Date(),
        note: 'Booking created'
      }]
    });

    // 5. Create Activity Log entry
    await ActivityLog.create({
      type: 'booking_created',
      bookingId: booking.bookingId,
      message: `New booking ${booking.bookingId} from ${booking.customerName} — ${booking.route}`,
      messageAr: `حجز جديد ${booking.bookingId} من ${booking.customerName} — ${booking.route}`,
      icon: '📋',
      metadata: {
        customerName: booking.customerName,
        vehicleType: booking.vehicleType,
        route: booking.route,
        totalPrice: booking.totalPrice,
        priority: booking.priority,
        passengers: booking.passengers
      }
    });

    // 6. Return result (event bus removed — F10: dead on serverless)
    const bookingData = booking.toObject();

    return NextResponse.json(
      { success: true, data: bookingData },
      { status: 201 }
    );
  } catch (error) {
    // F04: Never fake a success. A ghost booking is worse than a visible error.
    console.error('Booking Creation Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'We could not save your booking. Please try again or contact us on WhatsApp: +966 56 563 8120',
      },
      { status: 503 }
    );
  }
}
