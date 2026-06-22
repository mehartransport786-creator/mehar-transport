import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectToDatabase from "@/lib/db";
import Vehicle from "@/lib/models/Vehicle";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectToDatabase();
    const { id } = await params;

    const vehicle = await Vehicle.findByIdAndUpdate(id, { active: false }, { new: true }).lean();
    if (!vehicle) return NextResponse.json({ success: false, error: "Vehicle not found" }, { status: 404 });

    return NextResponse.json({ success: true, data: JSON.parse(JSON.stringify(vehicle)) });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
