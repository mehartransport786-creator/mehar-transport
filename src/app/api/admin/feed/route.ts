import { type NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import connectToDatabase from '@/lib/db';
import ActivityLog from '@/lib/models/ActivityLog';
import Booking from '@/lib/models/Booking';

/**
 * Polling Feed Endpoint: GET /api/admin/feed?since=<ISO-timestamp>
 *
 * Returns activities and bookings created/updated since the given timestamp.
 * Replaces the previous SSE endpoint (/api/admin/events) which held function
 * instances open for the entire browser-tab lifetime, causing 93+ GB-Hr of
 * provisioned memory on Vercel Fluid.
 *
 * Client polls this endpoint every 30 s; polling is paused while the tab is
 * hidden (visibilitychange). Each invocation completes in < 200 ms.
 */
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const sinceParam = searchParams.get('since');
  // Default: last 65 s (one poll interval + buffer) so we don't miss events
  const since = sinceParam
    ? new Date(sinceParam)
    : new Date(Date.now() - 65_000);

  try {
    await connectToDatabase();

    const [activities, bookings] = await Promise.all([
      ActivityLog.find({ createdAt: { $gt: since } })
        .sort({ createdAt: -1 })
        .limit(20)
        .lean(),
      Booking.find({ updatedAt: { $gt: since } })
        .select('bookingId customerName status totalPrice updatedAt createdAt')
        .sort({ updatedAt: -1 })
        .limit(10)
        .lean(),
    ]);

    return NextResponse.json({
      activities: JSON.parse(JSON.stringify(activities)),
      bookings: JSON.parse(JSON.stringify(bookings)),
      serverTime: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('[/api/admin/feed]', msg);
    return NextResponse.json({ error: 'Failed to fetch feed' }, { status: 500 });
  }
}
