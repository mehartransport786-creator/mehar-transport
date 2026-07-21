/**
 * Mehar Transport — Server-Side Pricing Engine
 *
 * Single source of truth for all price calculations. Called by:
 *   - POST /api/pricing/calculate  (quote endpoint, used by booking form)
 *   - POST /api/bookings            (server-side recompute before persisting)
 *
 * Simplified Universal Pricing Engine:
 * One single table (RoutePricing). No seasonal surges, no hourly multipliers, no VAT logic.
 * Every booking is treated as a flat route x vehicle lookup.
 */

import connectToDatabase from '@/lib/db';
import RoutePricing from '@/lib/models/RoutePricing';
import Vehicle from '@/lib/models/Vehicle';
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

export interface PriceInput {
  serviceType?: string; // 'hourly' or 'transfer'
  routeId?: string;   // MongoDB ObjectId string (optional if hourly)
  vehicleId: string; // MongoDB ObjectId string
  durationHours?: number; // for hourly
}

export interface PriceResult {
  totalPrice: number;
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

  const vehicleObjectId = new mongoose.Types.ObjectId(input.vehicleId);

  if (input.serviceType === 'hourly') {
    const vehicle = await Vehicle.findById(vehicleObjectId).lean();
    if (!vehicle) {
      throw new PricingUnavailableError(`Vehicle not found.`);
    }
    const hourlyRate = vehicle.hourlyRate || 0;
    if (hourlyRate <= 0) {
      throw new PricingUnavailableError(`Hourly rate not configured for this vehicle.`);
    }
    const duration = input.durationHours || 4; // default minimum
    return { totalPrice: round2(hourlyRate * duration) };
  }

  if (!input.routeId) {
    throw new Error('routeId is required for transfer bookings');
  }

  const routeObjectId = new mongoose.Types.ObjectId(input.routeId);

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
  const totalPrice = round2(pricing.currentPrice ?? pricing.basePrice);

  return {
    totalPrice
  };
}
