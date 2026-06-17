import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import HourlyPricing from '@/lib/models/HourlyPricing';
import Vehicle from '@/lib/models/Vehicle';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Fetch all active hourly pricings, populate vehicle
    const pricings = await HourlyPricing.find({ isActive: true })
      .populate('vehicleId')
      .lean();
      
    return NextResponse.json({ hourlyPricings: pricings });
  } catch (error) {
    console.error('Error fetching hourly pricing API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
