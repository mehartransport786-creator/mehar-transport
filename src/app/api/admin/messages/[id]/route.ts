import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import ContactMessage from '@/lib/models/ContactMessage';
import { requirePermission } from '@/lib/rbac';

// PATCH /api/admin/messages/[id] — Update message status
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const forbidden = await requirePermission('messages', 'edit');
  if (forbidden) return forbidden;

  try {
    await connectToDatabase();
    const { id } = await params;
    const body = await request.json();

    const update: any = {};
    if (body.status) update.status = body.status;
    if (body.notes) update.notes = body.notes;
    if (body.status === 'replied') update.repliedAt = new Date();

    const message = await ContactMessage.findByIdAndUpdate(id, update, { new: true }).lean();

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: message });
  } catch (error) {
    console.error('Message PATCH Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update message' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/messages/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const forbidden = await requirePermission('messages', 'delete');
  if (forbidden) return forbidden;

  try {
    await connectToDatabase();
    const { id } = await params;
    await ContactMessage.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete message' },
      { status: 500 }
    );
  }
}
