import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Vehicle from "@/lib/models/Vehicle";
import { requirePermission } from "@/lib/rbac";

// F07: Previously used bare auth() session check — any admin role could create/list fleet.

export async function GET() {
  const denied = await requirePermission('fleet', 'view');
  if (denied) return denied;

  try {
    await connectToDatabase();
    const vehicles = await Vehicle.find().sort({ name: 1 }).lean();

    return NextResponse.json({
      success: true,
      data: JSON.parse(JSON.stringify(vehicles))
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const denied = await requirePermission('fleet', 'edit');
  if (denied) return denied;

  try {
    await connectToDatabase();
    const body = await request.json();

    if (!body.slug) {
      body.slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    const vehicle = await Vehicle.create(body);
    return NextResponse.json({ success: true, data: JSON.parse(JSON.stringify(vehicle)) }, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ success: false, error: "Vehicle slug already exists" }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
