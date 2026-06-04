import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Booking from '@/lib/models/Booking';
import ActivityLog from '@/lib/models/ActivityLog';
import { emitBookingUpdated, emitActivityCreated } from '@/lib/event-bus';

// =============================================================
// GET /api/bookings/[id] — Single booking detail
// =============================================================
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;

    const booking = await Booking.findOne({ bookingId: id }).lean();

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: booking });
  } catch (error) {
    console.error('Booking GET Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch booking' },
      { status: 500 }
    );
  }
}

// =============================================================
// PATCH /api/bookings/[id] — Update booking status / assign driver
// =============================================================
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const body = await request.json();

    const booking = await Booking.findOne({ bookingId: id });

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    const previousStatus = booking.status;

    // Update fields
    if (body.status) {
      booking.status = body.status;
      booking.statusHistory.push({
        status: body.status,
        timestamp: new Date(),
        note: body.note || `Status changed to ${body.status}`
      });
    }

    if (body.driverAssigned) {
      booking.driverAssigned = body.driverAssigned;
    }

    await booking.save();

    // Create activity log for status change
    const statusLabels: Record<string, { en: string; ar: string; icon: string; type: string }> = {
      confirmed:       { en: 'confirmed',         ar: 'تم تأكيد',         icon: '✅', type: 'booking_confirmed' },
      assigned:        { en: 'assigned to driver', ar: 'تم تعيين السائق', icon: '🚗', type: 'booking_assigned' },
      driver_en_route: { en: 'driver en route',    ar: 'السائق في الطريق', icon: '🚗', type: 'status_changed' },
      arrived:         { en: 'driver arrived',     ar: 'وصل السائق',       icon: '📍', type: 'status_changed' },
      journey_started: { en: 'journey started',    ar: 'بدأت الرحلة',     icon: '🛣️', type: 'status_changed' },
      completed:       { en: 'completed',          ar: 'مكتمل',            icon: '🏁', type: 'booking_completed' },
      cancelled:       { en: 'cancelled',          ar: 'ملغى',             icon: '❌', type: 'booking_cancelled' },
      refunded:        { en: 'refunded',           ar: 'مسترد',            icon: '💰', type: 'status_changed' },
    };

    if (body.status && statusLabels[body.status]) {
      const sl = statusLabels[body.status];
      const activity = await ActivityLog.create({
        type: sl.type,
        bookingId: booking.bookingId,
        message: `Booking ${booking.bookingId} ${sl.en} — ${booking.customerName}`,
        messageAr: `حجز ${booking.bookingId} ${sl.ar} — ${booking.customerName}`,
        icon: sl.icon,
        metadata: {
          previousStatus,
          newStatus: body.status,
          customerName: booking.customerName,
          driverAssigned: booking.driverAssigned
        }
      });

      emitActivityCreated(activity.toObject());
    }

    // Emit real-time update
    emitBookingUpdated(booking.toObject(), previousStatus);

    return NextResponse.json({ success: true, data: booking.toObject() });
  } catch (error) {
    console.error('Booking PATCH Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}
