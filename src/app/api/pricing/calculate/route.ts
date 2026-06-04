import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import RoutePricing from "@/lib/models/RoutePricing";
import SeasonalPricing from "@/lib/models/SeasonalPricing";
import HourlyPricing from "@/lib/models/HourlyPricing";
import mongoose from "mongoose";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, routeId, vehicleId, date, hours } = body;

    if (!type || !vehicleId || !date) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    await connectToDatabase();
    const targetDate = new Date(date);
    let basePrice = 0;
    let finalPrice = 0;
    const adjustments: { name: string, amount: number, isPercentage: boolean }[] = [];

    // 1. Get Base Pricing
    if (type === "transfer" && routeId) {
      const pricing = await RoutePricing.findOne({ 
        routeId: new mongoose.Types.ObjectId(routeId), 
        vehicleId: new mongoose.Types.ObjectId(vehicleId),
        isActive: true
      });
      if (!pricing) {
        return NextResponse.json({ success: false, error: "Pricing not found for this route and vehicle" }, { status: 404 });
      }
      basePrice = pricing.currentPrice;
      finalPrice = basePrice;
    } 
    else if (type === "hourly" && hours) {
      const pricing = await HourlyPricing.findOne({ 
        vehicleId: new mongoose.Types.ObjectId(vehicleId),
        isActive: true
      });
      if (!pricing) {
        return NextResponse.json({ success: false, error: "Hourly pricing not found for this vehicle" }, { status: 404 });
      }
      const billedHours = Math.max(hours, pricing.minimumHours);
      basePrice = billedHours * pricing.hourlyRate;
      finalPrice = basePrice;
    } 
    else {
      return NextResponse.json({ success: false, error: "Invalid calculation request" }, { status: 400 });
    }

    // 2. Check Seasonal Pricing Rules
    const activeSeasons = await SeasonalPricing.find({
      isActive: true,
      startDate: { $lte: targetDate },
      endDate: { $gte: targetDate }
    });

    for (const season of activeSeasons) {
      let adjustmentAmount = 0;
      
      if (season.adjustmentType === 'percentage_increase') {
        adjustmentAmount = basePrice * (season.adjustmentValue / 100);
        finalPrice += adjustmentAmount;
        adjustments.push({ name: season.seasonName, amount: adjustmentAmount, isPercentage: true });
      } 
      else if (season.adjustmentType === 'percentage_decrease') {
        adjustmentAmount = basePrice * (season.adjustmentValue / 100);
        finalPrice -= adjustmentAmount;
        adjustments.push({ name: season.seasonName, amount: -adjustmentAmount, isPercentage: true });
      }
      else if (season.adjustmentType === 'fixed_increase') {
        adjustmentAmount = season.adjustmentValue;
        finalPrice += adjustmentAmount;
        adjustments.push({ name: season.seasonName, amount: adjustmentAmount, isPercentage: false });
      }
      else if (season.adjustmentType === 'fixed_decrease') {
        adjustmentAmount = season.adjustmentValue;
        finalPrice = Math.max(0, finalPrice - adjustmentAmount);
        adjustments.push({ name: season.seasonName, amount: -adjustmentAmount, isPercentage: false });
      }
    }

    // 3. Tax calculation (15% VAT for KSA)
    const vatRate = 0.15;
    const taxAmount = finalPrice * vatRate;
    const totalIncludingTax = finalPrice + taxAmount;

    return NextResponse.json({ 
      success: true, 
      data: {
        basePrice,
        finalPriceBeforeTax: finalPrice,
        taxAmount,
        totalIncludingTax,
        adjustments
      } 
    });

  } catch (error: any) {
    console.error("Pricing calculation error:", error);
    return NextResponse.json({ success: false, error: "Internal server error calculating price" }, { status: 500 });
  }
}
