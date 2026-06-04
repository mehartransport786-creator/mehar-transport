import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import Vehicle from '@/lib/models/Vehicle';
import { mockFleet } from '@/lib/data';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Check if we already have vehicles
    const count = await Vehicle.countDocuments();
    if (count > 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'Database is already seeded with vehicles' 
      });
    }

    // Insert mock data
    const result = await Vehicle.insertMany(mockFleet);
    
    return NextResponse.json({ 
      success: true, 
      message: `Successfully seeded ${result.length} vehicles!`,
      data: result
    });
  } catch (error) {
    console.error("Seeding Error:", error);
    return NextResponse.json(
      { success: false, error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}
