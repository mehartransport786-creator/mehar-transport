import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Booking from '@/lib/models/Booking';
import ActivityLog from '@/lib/models/ActivityLog';
import { getNextBookingId } from '@/lib/models/Counter';
import { emitBookingCreated, emitActivityCreated } from '@/lib/event-bus';

// =============================================================
// GET /api/bookings — Fetch bookings with filters & pagination
// =============================================================
export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
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
// POST /api/bookings — Create booking + trigger real-time events
// =============================================================
export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = await request.json();

    // 1. Generate sequential booking ID
    const bookingId = await getNextBookingId();

    // 2. Determine priority automatically
    let priority: string = 'standard';
    const vehicleLower = (body.vehicleType || '').toLowerCase();
    const routeLower = (body.route || body.pickupLocation || '').toLowerCase();

    if (vehicleLower.includes('rolls') || vehicleLower.includes('mercedes s') || vehicleLower.includes('bentley')) {
      priority = 'vip';
    } else if (routeLower.includes('airport')) {
      priority = 'airport';
    } else if ((body.passengers || 1) >= 10) {
      priority = 'group';
    } else if (body.tripType === 'corporate') {
      priority = 'corporate';
    }

    // Check if travel date is today
    const today = new Date().toISOString().split('T')[0];
    if (body.travelDate === today) {
      priority = 'urgent';
    }

    // 3. Build route string
    const route = body.route || `${body.pickupLocation || 'Pickup'} → ${body.dropoffLocation || 'Destination'}`;

    // 4. Save booking to MongoDB
    const booking = await Booking.create({
      bookingId,
      customerName: body.customerName || body.name || 'Guest',
      customerPhone: body.customerPhone || body.phone || '',
      customerEmail: body.customerEmail || body.email || '',
      pickupLocation: body.pickupLocation || '',
      dropoffLocation: body.dropoffLocation || '',
      route,
      vehicleType: body.vehicleType || 'Standard',
      vehicleId: body.vehicleId || undefined,
      travelDate: body.travelDate || today,
      travelTime: body.travelTime || body.time || '08:00',
      returnDate: body.returnDate,
      returnTime: body.returnTime,
      passengers: body.passengers || body.passengerCount || 1,
      luggage: body.luggage || body.luggageCount || 0,
      tripType: body.tripType || 'one-way',
      status: 'pending',
      priority,
      totalPrice: body.totalPrice || body.total || 0,
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
    const activity = await ActivityLog.create({
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

    // 6. Trigger real-time events (SSE push to all admin clients)
    const bookingData = booking.toObject();
    emitBookingCreated(bookingData);
    emitActivityCreated(activity.toObject());

    return NextResponse.json(
      { success: true, data: bookingData },
      { status: 201 }
    );
  } catch (error) {
    console.error('Booking Creation Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
