import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import HourlyPricing from '@/lib/models/HourlyPricing';
import { requirePermission } from '@/lib/rbac';

// F05: Previously neither GET nor POST had any authentication.

export async function GET() {
  const denied = await requirePermission('pricing', 'view');
  if (denied) return denied;

  try {
    await connectToDatabase();
    const pricings = await HourlyPricing.find()
      .populate('vehicleId', 'name nameAr type typeAr image')
      .sort({ createdAt: -1 });
    return NextResponse.json(pricings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch hourly pricing' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const denied = await requirePermission('pricing', 'edit');
  if (denied) return denied;

  try {
    const data = await req.json();
    await connectToDatabase();

    // Check if vehicle already has an hourly rate
    const existing = await HourlyPricing.findOne({ vehicleId: data.vehicleId });
    if (existing) {
      return NextResponse.json({ error: 'Hourly rate already exists for this vehicle. Please edit the existing one.' }, { status: 400 });
    }

    const newPricing = await HourlyPricing.create(data);
    const populated = await HourlyPricing.findById(newPricing._id).populate('vehicleId', 'name nameAr type typeAr image');
    
    return NextResponse.json(populated);
  } catch (error: any) {
    console.error('Hourly pricing creation error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create hourly pricing' }, { status: 500 });
  }
}
