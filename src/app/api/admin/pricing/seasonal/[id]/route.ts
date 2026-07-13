import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectToDatabase from "@/lib/db";
import SeasonalPricing from "@/lib/models/SeasonalPricing";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectToDatabase();
    const { id } = await params;
    const body = await req.json();

    const season = await SeasonalPricing.findByIdAndUpdate(id, body, { new: true, runValidators: true }).lean();
    if (!season) return NextResponse.json({ success: false, error: "Rule not found" }, { status: 404 });

    return NextResponse.json({ success: true, data: JSON.parse(JSON.stringify(season)) });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectToDatabase();
    const { id } = await params;

    const season = await SeasonalPricing.findByIdAndDelete(id).lean();
    if (!season) return NextResponse.json({ success: false, error: "Rule not found" }, { status: 404 });

    return NextResponse.json({ success: true, data: JSON.parse(JSON.stringify(season)) });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
