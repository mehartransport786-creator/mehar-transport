import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import RoutePricing from "@/lib/models/RoutePricing";
import PricingAuditLog from "@/lib/models/PricingAuditLog";
import { requirePermission } from "@/lib/rbac";
import { auth } from "@/auth";

// F08: Previously only checked session existence, any admin role could bulk-reprice.
export async function POST(request: Request) {
  const denied = await requirePermission('pricing', 'edit');
  if (denied) return denied;

  try {
    const session = await auth();

    await connectToDatabase();
    const body = await request.json();
    const { action, type, value, filters } = body;

    // action: 'increase' | 'decrease'
    // type: 'percentage' | 'fixed'
    // value: number (e.g., 15 for 15% or 50 for 50 SAR)
    // filters: { routeIds?: string[], vehicleIds?: string[], city?: string }

    if (!action || !type || !value) {
      return NextResponse.json({ success: false, error: "Missing required fields: action, type, value" }, { status: 400 });
    }

    const query: any = { isActive: true };
    if (filters?.routeIds?.length) query.routeId = { $in: filters.routeIds };
    if (filters?.vehicleIds?.length) query.vehicleId = { $in: filters.vehicleIds };

    const pricings = await RoutePricing.find(query);
    let updatedCount = 0;

    for (const pricing of pricings) {
      const oldPrice = pricing.currentPrice;
      let newPrice = oldPrice;

      if (type === 'percentage') {
        const adjustment = oldPrice * (value / 100);
        newPrice = action === 'increase' ? oldPrice + adjustment : Math.max(0, oldPrice - adjustment);
      } else {
        newPrice = action === 'increase' ? oldPrice + value : Math.max(0, oldPrice - value);
      }

      newPrice = Math.round(newPrice);
      pricing.currentPrice = newPrice;
      await pricing.save();

      await PricingAuditLog.create({
        adminId: session?.user?.id,
        adminEmail: session?.user?.email || 'admin',
        entityType: 'route',
        entityId: pricing._id,
        oldPrice,
        newPrice,
        reason: `Bulk ${action} ${value}${type === 'percentage' ? '%' : ' SAR'}`
      });

      updatedCount++;
    }

    return NextResponse.json({
      success: true,
      message: `Updated ${updatedCount} pricing entries`,
      updatedCount
    });
  } catch (error: any) {
    console.error("Bulk pricing error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
