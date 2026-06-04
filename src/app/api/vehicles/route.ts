import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import Vehicle from '@/lib/models/Vehicle';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Fetch all active vehicles
    const vehicles = await Vehicle.find({ active: true }).sort({ basePrice: 1 });
    
    return NextResponse.json({ success: true, data: vehicles });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch vehicles' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const vehicle = await Vehicle.create(body);
    
    return NextResponse.json({ success: true, data: vehicle }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create vehicle' },
      { status: 500 }
    );
  }
}
