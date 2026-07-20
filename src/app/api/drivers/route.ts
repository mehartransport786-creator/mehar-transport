import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Driver from '@/lib/models/Driver';
import { requirePermission } from '@/lib/rbac';

// New finding: Both GET and POST had zero authentication, exposing driver PII and
// allowing unauthenticated document injection.

export async function GET(request: Request) {
  const denied = await requirePermission('drivers', 'view');
  if (denied) return denied;

  try {
    await connectToDatabase();
    
    // Fetch all active drivers
    const drivers = await Driver.find({ active: true }).sort({ rating: -1 });
    
    return NextResponse.json({ success: true, data: drivers });
  } catch (error) {
    console.error("Drivers GET error:", error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch drivers' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const denied = await requirePermission('drivers', 'edit');
  if (denied) return denied;

  try {
    await connectToDatabase();
    
    const body = await request.json();

    // Whitelist: never spread raw body into Driver.create()
    const driver = await Driver.create({
      name: body.name,
      nameAr: body.nameAr,
      phone: body.phone,
      email: body.email,
      licenseNumber: body.licenseNumber,
      vehicleType: body.vehicleType,
      rating: body.rating,
      active: body.active ?? true,
    });
    
    return NextResponse.json({ success: true, data: driver }, { status: 201 });
  } catch (error) {
    console.error('Driver POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create driver' },
      { status: 500 }
    );
  }
}
