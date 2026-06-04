import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectToDatabase from "@/lib/db";
import RoutePricing from "@/lib/models/RoutePricing";
import Route from "@/lib/models/Route";
import PricingAuditLog from "@/lib/models/PricingAuditLog";
import { requirePermission } from "@/lib/rbac";

export async function GET(request: Request) {
  try {
    const permissionError = await requirePermission("pricing", "view");
    if (permissionError) return permissionError;

    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const routeId = searchParams.get("routeId");
    
    let query = {};
    if (routeId) {
      query = { routeId };
    }

    const pricing = await RoutePricing.find(query)
      .populate("routeId", "name")
      .populate("vehicleId", "name type image")
      .lean();
    
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
    const { routeId, vehicleId, basePrice, currentPrice } = body;

    if (!routeId || !vehicleId || !basePrice || !currentPrice) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    await connectToDatabase();

    const existingPricing = await RoutePricing.findOne({ routeId, vehicleId });
    let result;
    
    if (existingPricing) {
      const oldPrice = existingPricing.currentPrice;
      existingPricing.basePrice = basePrice;
      existingPricing.currentPrice = currentPrice;
      result = await existingPricing.save();

      await PricingAuditLog.create({
        adminId: session?.user?.id,
        adminEmail: session?.user?.email,
        entityType: "route",
        entityId: existingPricing._id,
        oldPrice: oldPrice,
        newPrice: currentPrice,
        reason: "Updated route pricing"
      });
    } else {
      result = await RoutePricing.create({
        routeId,
        vehicleId,
        basePrice,
        currentPrice
      });

      await PricingAuditLog.create({
        adminId: session?.user?.id,
        adminEmail: session?.user?.email,
        entityType: "route",
        entityId: result._id,
        newPrice: currentPrice,
        reason: "Created route pricing"
      });
    }

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
