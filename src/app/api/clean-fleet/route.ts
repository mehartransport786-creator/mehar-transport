import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Vehicle from '@/lib/models/Vehicle';
import connectToDatabase from '@/lib/db';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Find all vehicles to debug
    const allVehicles = await Vehicle.find({});
    
    // Delete vehicles containing specific names
    const deleteResult = await Vehicle.deleteMany({
      name: { $regex: /Mercedes|Rolls Royce|Bus/i }
    });

    return NextResponse.json({
      success: true,
      message: `Deleted ${deleteResult.deletedCount} vehicles.`,
      allNames: allVehicles.map(v => v.name)
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
