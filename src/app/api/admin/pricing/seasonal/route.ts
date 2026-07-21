import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
import { auth } from "@/auth";
import connectToDatabase from "@/lib/db";
import SeasonalPricing from "@/lib/models/SeasonalPricing";
import PricingAuditLog from "@/lib/models/PricingAuditLog";
import { requirePermission } from "@/lib/rbac";

export async function GET(request: Request) {
  try {
    const permissionError = await requirePermission("pricing", "view");
    if (permissionError) return permissionError;

    await connectToDatabase();
    const seasons = await SeasonalPricing.find().sort({ startDate: 1 }).lean();
    
    return NextResponse.json({ success: true, data: seasons });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    const permissionError = await requirePermission("pricing", "edit");
    if (permissionError) return permissionError;

    const body = await request.json();
    const { seasonName, seasonNameAr, startDate, endDate, adjustmentType, adjustmentValue, description, descriptionAr, priority, appliesTo } = body;

    if (!seasonName || !startDate || !endDate || !adjustmentType || adjustmentValue === undefined) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    await connectToDatabase();

    const newSeason = await SeasonalPricing.create({
      seasonName,
      seasonNameAr,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      adjustmentType,
      adjustmentValue,
      description,
      descriptionAr,
      priority: priority || 0,
      appliesTo: appliesTo || { routeIds: [], vehicleIds: [] },
      isActive: true
    });

    const ip = request.headers.get("x-forwarded-for") || "Unknown IP";
    const browser = request.headers.get("user-agent") || "Unknown Browser";

    await PricingAuditLog.create({
      adminId: session?.user?.id,
      adminEmail: session?.user?.email,
      entityType: "seasonal",
      entityId: newSeason._id,
      newValue: { adjustmentType, adjustmentValue, startDate, endDate },
      reason: "Created new seasonal pricing rule"
    });

    return NextResponse.json({ success: true, data: newSeason }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
