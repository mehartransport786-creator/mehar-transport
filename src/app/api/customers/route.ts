import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Customer from '@/lib/models/Customer';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    
    // Fetch all active customers, sorted by lifetimeValue descending
    const customers = await Customer.find({ active: true }).sort({ lifetimeValue: -1 });
    
    return NextResponse.json({ success: true, data: customers });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const customer = await Customer.create(body);
    
    return NextResponse.json({ success: true, data: customer }, { status: 201 });
  } catch (error) {
    console.error("Failed to create customer:", error);
    return NextResponse.json(
      { success: false, error: 'Failed to create customer' },
      { status: 500 }
    );
  }
}
