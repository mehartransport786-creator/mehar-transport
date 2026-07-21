import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import connectToDatabase from '@/lib/db';
import Customer from '@/lib/models/Customer';
import { requirePermission } from '@/lib/rbac';

// F15: Both GET and POST previously had zero authentication.

export async function GET(request: Request) {
  const denied = await requirePermission('customers', 'view');
  if (denied) return denied;

  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    // F25: cap result set — unbounded query grows with customer base
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
    const skip = (page - 1) * limit;

    const [customers, total] = await Promise.all([
      Customer.find({ active: true })
        .sort({ lifetimeValue: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Customer.countDocuments({ active: true }),
    ]);

    return NextResponse.json({
      success: true,
      data: customers,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('Customer GET Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const denied = await requirePermission('customers', 'edit');
  if (denied) return denied;

  try {
    await connectToDatabase();

    const body = await request.json();

    // F15: whitelist fields — never spread raw body into Customer.create()
    const customer = await Customer.create({
      name: body.name,
      phone: body.phone,
      email: body.email,
      nationality: body.nationality,
      tags: body.tags ?? [],
    });

    return NextResponse.json({ success: true, data: customer }, { status: 201 });
  } catch (error) {
    console.error('Customer POST Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create customer' },
      { status: 500 }
    );
  }
}
