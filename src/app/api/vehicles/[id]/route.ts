import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import Vehicle from '@/lib/models/Vehicle';

export const dynamic = 'force-dynamic';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    
    const { id } = await params;
    
    const deletedVehicle = await Vehicle.findByIdAndDelete(id);
    
    if (!deletedVehicle) {
      return NextResponse.json(
        { success: false, error: 'Vehicle not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: deletedVehicle });
  } catch (error) {
    console.error("Failed to delete vehicle:", error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete vehicle' },
      { status: 500 }
    );
  }
}
