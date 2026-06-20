import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Package from '@/lib/models/Package';
import { auth } from '@/auth';

export async function GET() {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectToDatabase();
    const packages = await Package.find()
      .populate('includedRoutes', 'name nameAr')
      .populate('availableVehicles', 'name nameAr')
      .sort({ order: 1, createdAt: -1 })
      .lean();
      
    return NextResponse.json({ packages });
  } catch (error) {
    console.error('Error fetching admin packages:', error);
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectToDatabase();
    const body = await req.json();

    // Auto-generate slug if not provided
    if (!body.slug) {
      body.slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    const newPackage = await Package.create(body);
    return NextResponse.json({ success: true, package: newPackage }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating package:', error);
    if (error.code === 11000) {
      return NextResponse.json({ error: 'A package with this slug already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create package' }, { status: 500 });
  }
}
