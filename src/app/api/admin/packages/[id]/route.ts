import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Package from '@/lib/models/Package';
import { auth } from '@/auth';

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectToDatabase();
    const body = await req.json();

    if (!body.slug) {
      body.slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    const { id } = await context.params;
    const updatedPackage = await Package.findByIdAndUpdate(id, body, { new: true });
    
    if (!updatedPackage) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, package: updatedPackage });
  } catch (error: any) {
    console.error('Error updating package:', error);
    if (error.code === 11000) {
      return NextResponse.json({ error: 'A package with this slug already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update package' }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectToDatabase();
    const { id } = await context.params;
    const deletedPackage = await Package.findByIdAndDelete(id);

    if (!deletedPackage) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting package:', error);
    return NextResponse.json({ error: 'Failed to delete package' }, { status: 500 });
  }
}
