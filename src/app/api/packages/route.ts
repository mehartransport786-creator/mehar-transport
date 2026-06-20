import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Package from '@/lib/models/Package';
import RoutePricing from '@/lib/models/RoutePricing';
import Route from '@/lib/models/Route';
import Vehicle from '@/lib/models/Vehicle';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    
    // Fetch active packages sorted by order
    const packages = await Package.find({ isActive: true })
      .populate('includedRoutes')
      .populate('availableVehicles')
      .sort({ order: 1 })
      .lean();

    // To compute the starting price of a package, we need the prices of all its included routes
    // The "starting price" is typically calculated using the lowest-priced vehicle that is common to all routes
    // For simplicity, we fetch all active pricings
    const pricings = await RoutePricing.find({ isActive: true }).lean();
    
    const packagesWithPricing = packages.map((pkg: any) => {
      let startingPrice = 0;

      // Find the vehicle with the lowest total price across all included routes
      // We assume availableVehicles are valid for these routes.
      if (pkg.includedRoutes && pkg.includedRoutes.length > 0 && pkg.availableVehicles && pkg.availableVehicles.length > 0) {
        let lowestTotal = Infinity;

        for (const vehicle of pkg.availableVehicles) {
          let vehicleTotal = 0;
          let canCompleteJourney = true;

          for (const route of pkg.includedRoutes) {
            const priceDoc = pricings.find(
              (p) => p.routeId.toString() === route._id.toString() && p.vehicleId.toString() === vehicle._id.toString()
            );

            if (priceDoc) {
              vehicleTotal += priceDoc.currentPrice || priceDoc.basePrice;
            } else {
              // If this vehicle doesn't have a price for one of the routes, it can't complete the journey
              canCompleteJourney = false;
              break;
            }
          }

          if (canCompleteJourney && vehicleTotal < lowestTotal) {
            lowestTotal = vehicleTotal;
          }
        }

        if (lowestTotal !== Infinity) {
          startingPrice = lowestTotal;
        }
      }

      return {
        ...pkg,
        _id: pkg._id.toString(),
        includedRoutes: pkg.includedRoutes.map((r: any) => ({ ...r, _id: r._id.toString() })),
        availableVehicles: pkg.availableVehicles.map((v: any) => ({ ...v, _id: v._id.toString() })),
        startingPrice
      };
    });

    return NextResponse.json({ packages: packagesWithPricing });
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 });
  }
}
