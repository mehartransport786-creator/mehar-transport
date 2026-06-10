import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import Driver from '@/lib/models/Driver';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    
    // Fetch all active drivers
    const drivers = await Driver.find({ active: true }).sort({ rating: -1 });
    
    return NextResponse.json({ success: true, data: drivers });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch drivers' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const driver = await Driver.create(body);
    
    return NextResponse.json({ success: true, data: driver }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create driver' },
      { status: 500 }
    );
  }
}
