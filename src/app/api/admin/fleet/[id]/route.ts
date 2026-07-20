import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Vehicle from "@/lib/models/Vehicle";
import { requirePermission } from "@/lib/rbac";

// F07: Previously used bare auth() session check on both PUT and DELETE.

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requirePermission('fleet', 'edit');
  if (denied) return denied;

  try {
    await connectToDatabase();
    const { id } = await params;
    const body = await req.json();

    const vehicle = await Vehicle.findByIdAndUpdate(id, body, { new: true, runValidators: true }).lean();
    if (!vehicle) return NextResponse.json({ success: false, error: "Vehicle not found" }, { status: 404 });

    return NextResponse.json({ success: true, data: JSON.parse(JSON.stringify(vehicle)) });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requirePermission('fleet', 'edit');
  if (denied) return denied;

  try {
    await connectToDatabase();
    const { id } = await params;

    const vehicle = await Vehicle.findByIdAndUpdate(id, { active: false }, { new: true }).lean();
    if (!vehicle) return NextResponse.json({ success: false, error: "Vehicle not found" }, { status: 404 });

    return NextResponse.json({ success: true, data: JSON.parse(JSON.stringify(vehicle)) });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
