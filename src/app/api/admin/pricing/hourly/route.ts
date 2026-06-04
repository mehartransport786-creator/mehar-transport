import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectToDatabase from "@/lib/db";
import HourlyPricing from "@/lib/models/HourlyPricing";
import PricingAuditLog from "@/lib/models/PricingAuditLog";
import { requirePermission } from "@/lib/rbac";

export async function GET(request: Request) {
  try {
    const permissionError = await requirePermission("pricing", "view");
    if (permissionError) return permissionError;

    await connectToDatabase();
    const pricing = await HourlyPricing.find().populate("vehicleId", "name type image").lean();
    
    return NextResponse.json({ success: true, data: pricing });
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
    const { vehicleId, hourlyRate, minimumHours, extraHourRate } = body;

    if (!vehicleId || !hourlyRate || !minimumHours || !extraHourRate) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    await connectToDatabase();

    const existingPricing = await HourlyPricing.findOne({ vehicleId });
    let result;
    
    if (existingPricing) {
      const oldRate = existingPricing.hourlyRate;
      existingPricing.hourlyRate = hourlyRate;
      existingPricing.minimumHours = minimumHours;
      existingPricing.extraHourRate = extraHourRate;
      result = await existingPricing.save();

      await PricingAuditLog.create({
        adminId: session?.user?.id,
        adminEmail: session?.user?.email,
        entityType: "hourly",
        entityId: existingPricing._id,
        oldPrice: oldRate,
        newPrice: hourlyRate,
        newValue: { minimumHours, extraHourRate },
        reason: "Updated hourly pricing"
      });
    } else {
      result = await HourlyPricing.create({
        vehicleId,
        hourlyRate,
        minimumHours,
        extraHourRate
      });

      await PricingAuditLog.create({
        adminId: session?.user?.id,
        adminEmail: session?.user?.email,
        entityType: "hourly",
        entityId: result._id,
        newPrice: hourlyRate,
        newValue: { minimumHours, extraHourRate },
        reason: "Created hourly pricing"
      });
    }

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
