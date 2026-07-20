/**
 * Mehar Transport — Server-Side Pricing Engine
 *
 * Single source of truth for all price calculations. Called by:
 *   - POST /api/pricing/calculate  (quote endpoint, used by booking form)
 *   - POST /api/bookings            (server-side recompute before persisting)
 *
 * This replaces the client-side arithmetic in BookingV2Context and the
 * static fallbackData.ts mock tables. F01, F09, F19, F20, F22.
 */

import connectToDatabase from '@/lib/db';
import RoutePricing from '@/lib/models/RoutePricing';
import HourlyPricing from '@/lib/models/HourlyPricing';
import SeasonalPricing from '@/lib/models/SeasonalPricing';
import mongoose from 'mongoose';

export class PricingUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PricingUnavailableError';
  }
}

/** Round to 2 decimal places — F22: no floating-point drift stored in DB */
export function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export interface TransferPriceInput {
  type: 'transfer';
  routeId: string;   // MongoDB ObjectId string
  vehicleId: string; // MongoDB ObjectId string
  date: Date;        // travel date (for seasonal lookup)
}

export interface HourlyPriceInput {
  type: 'hourly';
  vehicleId: string; // MongoDB ObjectId string
  hours: number;     // requested duration
  date: Date;        // travel date (for seasonal lookup)
}

export type PriceInput = TransferPriceInput | HourlyPriceInput;

export interface PriceResult {
  basePrice: number;
  seasonalAdjustment: number;
  seasonalRuleName?: string;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  totalIncludingTax: number;
}

const TAX_RATE = 0.15; // Saudi VAT

/**
 * Look up the single highest-priority seasonal rule that covers this date
 * for the given route+vehicle combination.
 *
 * F09: Uses $match + sort + limit 1 — never loads the full collection.
 * Seasonal precedence: if two rules have the same priority and overlapping
 * dates the determinism is undefined — reconcile priorities in the DB first
 * (see PR-0 pre-condition note in the implementation plan).
 */
async function getSeasonalAdjustment(
  vehicleId: mongoose.Types.ObjectId,
  routeId: mongoose.Types.ObjectId | null,
  date: Date
): Promise<{ amount: number; name?: string }> {
  const matchCriteria: any[] = [
    { isActive: true },
    { startDate: { $lte: date } },
    { endDate: { $gte: date } },
    {
      $or: [
        { 'appliesTo.vehicleIds': { $size: 0 } },
        { 'appliesTo.vehicleIds': vehicleId },
      ],
    },
  ];

  if (routeId) {
    matchCriteria.push({
      $or: [
        { 'appliesTo.routeIds': { $size: 0 } },
        { 'appliesTo.routeIds': routeId },
      ],
    });
  }

  const rule = await SeasonalPricing.findOne({ $and: matchCriteria })
    .sort({ priority: -1 })
    .lean();

  if (!rule) return { amount: 0 };

  return { amount: rule.adjustmentValue, name: rule.seasonName };
}

/**
 * Apply a seasonal adjustment to a base price.
 * Returns the delta (positive = surcharge, negative = discount).
 */
function applySeasonalRule(
  basePrice: number,
  rule: { adjustmentType: string; adjustmentValue: number }
): number {
  switch (rule.adjustmentType) {
    case 'percentage_increase':
      return round2(basePrice * (rule.adjustmentValue / 100));
    case 'percentage_decrease':
      return round2(-basePrice * (rule.adjustmentValue / 100));
    case 'fixed_increase':
      return round2(rule.adjustmentValue);
    case 'fixed_decrease':
      return round2(-rule.adjustmentValue);
    default:
      return 0;
  }
}

/**
 * Main entry point. Call this before persisting any booking.
 *
 * @throws PricingUnavailableError when no pricing row covers the route×vehicle.
 *         Callers should return HTTP 422 — this is a data gap, not a crash.
 * @throws Other errors for genuine DB failures — callers should return HTTP 503.
 */
export async function calculatePrice(input: PriceInput): Promise<PriceResult> {
  await connectToDatabase();

  let basePrice: number;
  let seasonalDelta: number;
  let seasonalRuleName: string | undefined;

  if (input.type === 'transfer') {
    const routeObjectId = new mongoose.Types.ObjectId(input.routeId);
    const vehicleObjectId = new mongoose.Types.ObjectId(input.vehicleId);

    const pricing = await RoutePricing.findOne({
      routeId: routeObjectId,
      vehicleId: vehicleObjectId,
      isActive: true,
    }).lean();

    if (!pricing) {
      throw new PricingUnavailableError(
        `No active pricing found for route "${input.routeId}" and vehicle "${input.vehicleId}". ` +
        `Please configure it in the admin pricing panel.`
      );
    }

    // Use currentPrice if it exists and differs from basePrice (manual override support)
    basePrice = round2(pricing.currentPrice ?? pricing.basePrice);

    const seasonal = await getSeasonalAdjustment(vehicleObjectId, routeObjectId, input.date);
    // Re-fetch full rule to get adjustmentType (getSeasonalAdjustment returns delta directly from findOne)
    const seasonalRule = seasonal.name
      ? await SeasonalPricing.findOne({ seasonName: seasonal.name, isActive: true }).lean()
      : null;

    seasonalDelta = seasonalRule
      ? applySeasonalRule(basePrice, seasonalRule)
      : 0;
    seasonalRuleName = seasonal.name;

  } else {
    // hourly
    const vehicleObjectId = new mongoose.Types.ObjectId(input.vehicleId);

    const pricing = await HourlyPricing.findOne({
      vehicleId: vehicleObjectId,
      isActive: true,
    }).lean();

    if (!pricing) {
      throw new PricingUnavailableError(
        `No active hourly pricing found for vehicle "${input.vehicleId}". ` +
        `Please configure it in the admin pricing panel.`
      );
    }

    const billableHours = Math.max(input.hours, pricing.minimumHours);
    basePrice = round2(pricing.hourlyRate * billableHours);

    const seasonal = await getSeasonalAdjustment(vehicleObjectId, null, input.date);
    const seasonalRule = seasonal.name
      ? await SeasonalPricing.findOne({ seasonName: seasonal.name, isActive: true }).lean()
      : null;

    seasonalDelta = seasonalRule
      ? applySeasonalRule(basePrice, seasonalRule)
      : 0;
    seasonalRuleName = seasonal.name;
  }

  const subtotal = round2(basePrice + seasonalDelta);
  const taxAmount = round2(subtotal * TAX_RATE);
  const totalIncludingTax = round2(subtotal + taxAmount);

  return {
    basePrice,
    seasonalAdjustment: seasonalDelta,
    seasonalRuleName,
    subtotal,
    taxRate: TAX_RATE,
    taxAmount,
    totalIncludingTax,
  };
}
