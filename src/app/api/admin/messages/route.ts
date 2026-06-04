import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import ContactMessage from '@/lib/models/ContactMessage';
import { requirePermission } from '@/lib/rbac';

// GET /api/admin/messages — List messages (admin only)
export async function GET(request: Request) {
  const forbidden = await requirePermission('messages', 'view');
  if (forbidden) return forbidden;

  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    const query: any = {};
    if (status && status !== 'all') {
      query.status = status;
    }

    const [messages, total, unreadCount] = await Promise.all([
      ContactMessage.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      ContactMessage.countDocuments(query),
      ContactMessage.countDocuments({ status: 'unread' })
    ]);

    return NextResponse.json({
      success: true,
      data: messages,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      unreadCount
    });
  } catch (error) {
    console.error('Messages GET Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}
