import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import HourlyPricing from '@/lib/models/HourlyPricing';
import { requirePermission } from '@/lib/rbac';

export const dynamic = 'force-dynamic';

// F05: Previously neither PUT nor DELETE had any authentication.

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requirePermission('pricing', 'edit');
  if (denied) return denied;

  try {
    const { id } = await params;
    const data = await req.json();
    await connectToDatabase();

    const updated = await HourlyPricing.findByIdAndUpdate(
      id,
      {
        hourlyRate: data.hourlyRate,
        minimumHours: data.minimumHours,
        extraHourRate: data.extraHourRate,
        isActive: data.isActive
      },
      { new: true }
    ).populate('vehicleId', 'name nameAr type typeAr image');

    if (!updated) {
      return NextResponse.json({ error: 'Pricing rule not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('Hourly pricing update error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update hourly pricing' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requirePermission('pricing', 'edit');
  if (denied) return denied;

  try {
    const { id } = await params;
    await connectToDatabase();
    
    const deleted = await HourlyPricing.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Pricing rule not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Hourly pricing delete error:', error);
    return NextResponse.json({ error: 'Failed to delete hourly pricing' }, { status: 500 });
  }
}
