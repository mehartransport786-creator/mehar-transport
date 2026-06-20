import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Package from '@/lib/models/Package';
import RoutePricing from '@/lib/models/RoutePricing';
import Route from '@/lib/models/Route';
import Vehicle from '@/lib/models/Vehicle';

export async function GET(req: Request, context: { params: Promise<{ slug: string }> }) {
  try {
    await connectToDatabase();
    
    const { slug } = await context.params;
    const pkg = await Package.findOne({ slug, isActive: true })
      .populate('includedRoutes')
      .populate('availableVehicles')
      .lean() as any;

    if (!pkg) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }

    // We need to fetch all pricing combinations for the included routes and available vehicles
    const routeIds = pkg.includedRoutes.map((r: any) => r._id);
    const vehicleIds = pkg.availableVehicles.map((v: any) => v._id);

    const pricings = await RoutePricing.find({
      routeId: { $in: routeIds },
      vehicleId: { $in: vehicleIds },
      isActive: true
    }).lean();

    // Map pricing back to the vehicles so the frontend can easily compute live total costs
    const availableVehiclesWithPricing = pkg.availableVehicles.map((vehicle: any) => {
      let vehicleTotal = 0;
      let canCompleteJourney = true;
      const routeBreakdown: any[] = [];

      for (const route of pkg.includedRoutes) {
        const priceDoc = pricings.find(
          (p) => p.routeId.toString() === route._id.toString() && p.vehicleId.toString() === vehicle._id.toString()
        );

        if (priceDoc) {
          const price = priceDoc.currentPrice || priceDoc.basePrice;
          vehicleTotal += price;
          routeBreakdown.push({
            routeId: route._id.toString(),
            price
          });
        } else {
          canCompleteJourney = false;
        }
      }

      return {
        ...vehicle,
        _id: vehicle._id.toString(),
        totalPrice: canCompleteJourney ? vehicleTotal : null,
        routeBreakdown: canCompleteJourney ? routeBreakdown : null
      };
    });

    // Filter out vehicles that cannot complete the journey
    const validVehicles = availableVehiclesWithPricing.filter((v: any) => v.totalPrice !== null);
    
    // Determine absolute starting price
    const startingPrice = validVehicles.length > 0 
      ? Math.min(...validVehicles.map((v: any) => v.totalPrice))
      : 0;

    return NextResponse.json({
      package: {
        ...pkg,
        _id: pkg._id.toString(),
        includedRoutes: pkg.includedRoutes.map((r: any) => ({ ...r, _id: r._id.toString() })),
        availableVehicles: validVehicles,
        startingPrice
      }
    });

  } catch (error) {
    console.error('Error fetching package:', error);
    return NextResponse.json({ error: 'Failed to fetch package' }, { status: 500 });
  }
}
