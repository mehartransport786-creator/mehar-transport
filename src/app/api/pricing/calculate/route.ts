/**
 * POST /api/pricing/calculate — Server-side price quote
 *
 * Delegates to the shared pricing engine (lib/pricing/engine.ts).
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

  const { serviceType, routeId, vehicleId, durationHours } = body;

  // Input validation
  if (!vehicleId || (serviceType !== 'hourly' && !routeId)) {
    return NextResponse.json(
      { success: false, error: "Missing required fields: routeId (if transfer), vehicleId" },
      { status: 400 }
    );
  }

  try {
    const result = await calculatePrice({
      serviceType,
      routeId,
      vehicleId,
      durationHours,
    });

    return NextResponse.json({
      success: true,
      data: {
        totalPrice: result.totalPrice,
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
