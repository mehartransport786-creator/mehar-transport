/**
 * POST /api/pricing/calculate — Server-side price quote
 *
 * Delegates to the shared pricing engine (lib/pricing/engine.ts).
 * F19/F20: The fallback to fallbackRoutesData mock tables has been removed.
 *          If the DB has no pricing row, we return 422 — a data gap in the
 *          admin panel, not a crash. Operators must configure pricing first.
 */
import { NextResponse } from "next/server";
import { calculatePrice, PricingUnavailableError } from "@/lib/pricing/engine";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const { type, routeId, vehicleId, date, hours } = body;

  // Input validation
  if (!type || !vehicleId || !date) {
    return NextResponse.json(
      { success: false, error: "Missing required fields: type, vehicleId, date" },
      { status: 400 }
    );
  }
  if (type === "transfer" && !routeId) {
    return NextResponse.json(
      { success: false, error: "routeId is required for transfer pricing" },
      { status: 400 }
    );
  }
  if (type === "hourly" && (!hours || hours <= 0)) {
    return NextResponse.json(
      { success: false, error: "hours must be a positive number for hourly pricing" },
      { status: 400 }
    );
  }
  if (type !== "transfer" && type !== "hourly") {
    return NextResponse.json(
      { success: false, error: "type must be 'transfer' or 'hourly'" },
      { status: 400 }
    );
  }

  const targetDate = new Date(date);
  if (isNaN(targetDate.getTime())) {
    return NextResponse.json(
      { success: false, error: "date is not a valid ISO date string" },
      { status: 400 }
    );
  }

  try {
    const result = await calculatePrice(
      type === "transfer"
        ? { type: "transfer", routeId, vehicleId, date: targetDate }
        : { type: "hourly", vehicleId, hours: Number(hours), date: targetDate }
    );

    return NextResponse.json({
      success: true,
      data: {
        basePrice: result.basePrice,
        seasonalAdjustment: result.seasonalAdjustment,
        seasonalRuleName: result.seasonalRuleName,
        subtotal: result.subtotal,
        taxRate: result.taxRate,
        taxAmount: result.taxAmount,
        totalIncludingTax: result.totalIncludingTax,
      },
    });
  } catch (error) {
    if (error instanceof PricingUnavailableError) {
      // 422 = data gap in admin panel, not a server fault
      return NextResponse.json(
        { success: false, error: error.message, code: "PRICING_UNAVAILABLE" },
        { status: 422 }
      );
    }
    console.error("Pricing calculation error:", error);
    return NextResponse.json(
      { success: false, error: "Pricing service temporarily unavailable. Please try again." },
      { status: 503 }
    );
  }
}
