import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import ContactMessage from '@/lib/models/ContactMessage';

export const dynamic = 'force-dynamic';

// POST /api/contact — Public form submission
export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    // Basic validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    const message = await ContactMessage.create({
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      subject: body.subject || '',
      message: body.message,
      status: 'unread'
    });

    return NextResponse.json(
      { success: true, data: { id: message._id } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact Form Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit message.' },
      { status: 500 }
    );
  }
}
