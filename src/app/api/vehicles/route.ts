import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import connectToDatabase from '@/lib/db';
import Vehicle from '@/lib/models/Vehicle';
import { requirePermission } from '@/lib/rbac';

// GET is intentionally public — the booking form needs the vehicle list without auth.
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
  // New finding: Previously unauthenticated — anyone could inject vehicle documents.
  const denied = await requirePermission('fleet', 'edit');
  if (denied) return denied;

  try {
    await connectToDatabase();
    
    const body = await request.json();

    // Whitelist: never spread raw body into Vehicle.create()
    const vehicle = await Vehicle.create({
      slug: body.slug,
      name: body.name,
      nameAr: body.nameAr,
      type: body.type,
      typeAr: body.typeAr,
      passengers: body.passengers,
      luggage: body.luggage,
      luxuryLevel: body.luxuryLevel,
      airportTransfer: body.airportTransfer ?? false,
      umrahTransfer: body.umrahTransfer ?? false,
      intercityTravel: body.intercityTravel ?? false,
      vipService: body.vipService ?? false,
      basePrice: body.basePrice,
      image: body.image,
      gallery: body.gallery ?? [],
      features: body.features ?? [],
      featuresAr: body.featuresAr ?? [],
      description: body.description,
      descriptionAr: body.descriptionAr,
      targetAudience: body.targetAudience ?? [],
      specialLabel: body.specialLabel,
      specialLabelAr: body.specialLabelAr,
      badge: body.badge,
      badgeAr: body.badgeAr,
    });
    
    return NextResponse.json({ success: true, data: vehicle }, { status: 201 });
  } catch (error) {
    console.error('Vehicle POST Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create vehicle' },
      { status: 500 }
    );
  }
}
