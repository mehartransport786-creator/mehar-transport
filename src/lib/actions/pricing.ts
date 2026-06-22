'use server';

import { revalidatePath } from 'next/cache';
import dbConnect from '@/lib/db';
import Route from '@/lib/models/Route';
import RoutePricing from '@/lib/models/RoutePricing';
import { checkServerPermission } from '@/lib/rbac';

// Validate permissions
async function checkPricingEditPermission() {
  const hasPermission = await checkServerPermission('pricing', 'edit');
  if (!hasPermission) {
    throw new Error('Unauthorized: Missing pricing edit permission');
  }
}

// --- ROUTES ---

export async function createRoute(data: {
  name: string;
  nameAr: string;
  origin: string;
  originAr: string;
  destination: string;
  destinationAr: string;
  distanceKm?: number;
  averageDurationMins?: number;
}) {
  await checkPricingEditPermission();
  await dbConnect();
  
  const route = await Route.create({
    ...data,
    distanceKm: data.distanceKm || 0,
    averageDurationMins: data.averageDurationMins || 0,
    isActive: true
  });
  
  revalidatePath('/admin/pricing/routes');
  return JSON.parse(JSON.stringify(route));
}

// --- PRICING RULES ---

export async function createPricingRule(data: {
  routeId: string;
  vehicleId: string;
  basePrice: number;
  currentPrice: number;
  isActive: boolean;
}) {
  await checkPricingEditPermission();
  await dbConnect();
  
  // Ensure no duplicate rule exists for this route + vehicle combo
  const existing = await RoutePricing.findOne({
    routeId: data.routeId,
    vehicleId: data.vehicleId
  });
  
  if (existing) {
    throw new Error('A pricing rule already exists for this Route and Vehicle combination.');
  }

  const rule = await RoutePricing.create(data);
  revalidatePath('/admin/pricing/routes');
  return JSON.parse(JSON.stringify(rule));
}

export async function updatePricingRule(id: string, data: {
  basePrice: number;
  currentPrice: number;
  isActive: boolean;
}) {
  await checkPricingEditPermission();
  await dbConnect();
  
  const rule = await RoutePricing.findByIdAndUpdate(id, data, { new: true });
  if (!rule) throw new Error('Pricing rule not found');
  
  revalidatePath('/admin/pricing/routes');
  return JSON.parse(JSON.stringify(rule));
}

export async function deletePricingRule(id: string) {
  await checkPricingEditPermission();
  await dbConnect();
  
  const rule = await RoutePricing.findByIdAndDelete(id);
  if (!rule) throw new Error('Pricing rule not found');
  
  revalidatePath('/admin/pricing/routes');
  return { success: true };
}
