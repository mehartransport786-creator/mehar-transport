import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import connectToDatabase from '@/lib/db';
import Booking from '@/lib/models/Booking';
import { requirePermission } from '@/lib/rbac';

// F17: Previously ran 3 full-collection aggregations on every request with no match stage,
// and filled gaps with Math.random() data — useless for real reporting.
// F18: Removed Math.random() revenue placeholders.

// 5-minute cache: stats don't need sub-second freshness
export const revalidate = 300;

export async function GET() {
  const denied = await requirePermission('dashboard', 'view');
  if (denied) return denied;

  try {
    await connectToDatabase();

    // Scope aggregations to the last 12 months — prevents full-collection scans (F17)
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    // 1. Bookings by Route (top 5, last 12 months)
    const routesAggregation = await Booking.aggregate([
      { $match: { createdAt: { $gte: twelveMonthsAgo } } },
      { $group: { _id: '$route', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    
    const colors = ["#1B1E4F", "#df9a26", "#2563EB", "#16A34A", "#F59E0B"];
    const bookingsByRoute = routesAggregation.map((r, i) => ({
      name: r._id || "Other",
      value: r.count,
      fill: colors[i % colors.length]
    }));

    // 2. Bookings by Vehicle (last 12 months)
    const vehiclesAggregation = await Booking.aggregate([
      { $match: { createdAt: { $gte: twelveMonthsAgo } } },
      { $group: { _id: '$vehicleType', bookings: { $sum: 1 } } },
      { $sort: { bookings: -1 } }
    ]);

    const bookingsByVehicle = vehiclesAggregation.map(v => ({
      name: v._id || "Unknown",
      bookings: v.bookings
    }));

    // 3. Revenue over last 12 months — actual data only, no fabrication (F18)
    const revenueAggregation = await Booking.aggregate([
      { $match: { createdAt: { $gte: twelveMonthsAgo }, status: { $nin: ['cancelled', 'refunded'] } } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$totalPrice" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const revenueChartData = monthNames.map((month, index) => {
      const actualData = revenueAggregation.find(r => r._id === index + 1);
      // F18: Use 0 for months with no data — never fabricate revenue figures
      return {
        month,
        revenue: actualData ? actualData.revenue : 0,
      };
    });

    return NextResponse.json({
      success: true,
      data: {
        bookingsByRoute,
        bookingsByVehicle,
        revenueChartData
      }
    });
  } catch (error) {
    console.error('Stats GET Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
