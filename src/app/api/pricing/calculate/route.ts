import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import RoutePricing from "@/lib/models/RoutePricing";
import SeasonalPricing from "@/lib/models/SeasonalPricing";
import HourlyPricing from "@/lib/models/HourlyPricing";
import mongoose from "mongoose";
import { fallbackRoutesData } from "@/lib/fallbackData";

  let requestBody: any = {};
  try {
    requestBody = await request.json();
  } catch (e) {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }

  const { type, routeId, vehicleId, date, hours } = requestBody;

  if (!type || !vehicleId || !date) {
    return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
  }

  const targetDate = new Date(date);
  let basePrice = 0;
  let finalPrice = 0;
  const adjustments: { name: string, amount: number, isPercentage: boolean }[] = [];

  try {
    await connectToDatabase();

    // 1. Get Base Pricing
    if (type === "transfer" && routeId) {
      const pricing = await RoutePricing.findOne({ 
        routeId: new mongoose.Types.ObjectId(routeId), 
        vehicleId: new mongoose.Types.ObjectId(vehicleId),
        isActive: true
      });
      if (!pricing) {
        throw new Error("Pricing not found for this route and vehicle");
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
        throw new Error("Hourly pricing not found for this vehicle");
      }
      const billedHours = Math.max(hours, pricing.minimumHours);
      basePrice = billedHours * pricing.hourlyRate;
      finalPrice = basePrice;
    } 
    else {
      throw new Error("Invalid calculation request");
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

  } catch (error: any) {
    console.error("Pricing calculation error, falling back to mock:", error);
    
    // FALLBACK LOGIC
    if (type === "transfer" && routeId) {
      const mockRoute = fallbackRoutesData.find(r => r._id === routeId);
      if (mockRoute) {
        // Find vehicle index to get price
        // Let's assume vehicleId like "v1", "v2", etc.
        const vIndex = parseInt(vehicleId.replace('v', '')) - 1;
        if (!isNaN(vIndex) && vIndex >= 0 && vIndex < mockRoute.prices.length) {
          basePrice = mockRoute.prices[vIndex];
          finalPrice = basePrice;
        } else {
          basePrice = mockRoute.prices[0]; // fallback
          finalPrice = basePrice;
        }
      }
    } else if (type === "hourly" && hours) {
      basePrice = hours * 100; // Mock hourly rate 100 SAR/hr
      finalPrice = basePrice;
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
}
