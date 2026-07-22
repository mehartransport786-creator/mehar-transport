import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import ActivityLog from '@/lib/models/ActivityLog';
import { auth } from '@/auth';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/activities — Fetch recent activity logs
 * F16: Previously returned { success: true, data: [] } on error, hiding DB failures from operators.
 */
export async function GET(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100); // F25: cap result set

    const activities = await ActivityLog.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({ success: true, data: activities });
  } catch (error) {
    console.error('Activities GET Error:', error);
    // F16: Return a real error — masking DB failures as empty arrays hides outages from operators
    return NextResponse.json(
      { success: false, error: 'Failed to fetch activity log' },
      { status: 500 }
    );
  }
}
