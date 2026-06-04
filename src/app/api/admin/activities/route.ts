import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import ActivityLog from '@/lib/models/ActivityLog';

/**
 * GET /api/admin/activities — Fetch recent activity logs
 */
export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');

    const activities = await ActivityLog.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({ success: true, data: activities });
  } catch (error) {
    console.error('Activities GET Error:', error);
    return NextResponse.json(
      { success: true, data: [] }, // Return empty array on error
      { status: 200 }
    );
  }
}
