import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import connectToDatabase from '@/lib/db';
import RoutePricing from '@/lib/models/RoutePricing';
import Route from '@/lib/models/Route';
import '@/lib/models/Vehicle';

export const dynamic = 'force-dynamic';

// ─── Server-side cache ────────────────────────────────────────────────────────
// Route+pricing data changes at most a few times per week via the admin panel.
// Caching for 5 minutes eliminates 99% of cold DB round-trips with zero UX cost.
// The admin "Save Pricing" action should call revalidateTag('routes-pricing')
// to bust this cache immediately when data changes.
const getCachedRoutesData = unstable_cache(
  async () => {
    await connectToDatabase();

    // Fix: projections — only fetch the 5 fields actually used in the response
    const routes = await Route.find({ isActive: true })
      .select('_id name nameAr origin destination')
      .lean();

    if (!routes || routes.length === 0) {
      return null;
    }

    // Fix: project only the 8 vehicle fields used in the response
    const pricings = await RoutePricing.find({ isActive: true })
      .select('routeId vehicleId basePrice currentPrice isActive')
      .populate('vehicleId', 'name nameAr type typeAr passengers luggage image')
      .lean();

    return { routes, pricings };
  },
  ['routes-pricing'], // cache key
  {
    revalidate: 300,        // 5 minutes — stale-while-revalidate in background
    tags: ['routes-pricing'], // bust with revalidateTag('routes-pricing') after admin save
  }
);

export async function GET() {
  try {
    const data = await getCachedRoutesData();

    if (!data) {
      return NextResponse.json(
        { success: false, error: 'No active routes configured. Please add routes in the admin panel.' },
        { status: 404 }
      );
    }

    const { routes, pricings } = data;

    // Group pricings by routeId for O(n) lookup
    const pricingMap = new Map<string, typeof pricings>();
    for (const p of pricings) {
      const routeId = p.routeId.toString();
      if (!pricingMap.has(routeId)) pricingMap.set(routeId, []);
      pricingMap.get(routeId)!.push(p);
    }

    const formattedRoutes = routes.map((r: any) => {
      const rId = r._id.toString();
      const rPricings = pricingMap.get(rId) || [];
      return {
        _id: rId,
        name: r.name,
        nameAr: r.nameAr,
        origin: r.origin,
        destination: r.destination,
        pricings: rPricings.map((p: any) => ({
          vehicleId: p.vehicleId._id,
          vehicleName: p.vehicleId.name,
          vehicleNameAr: p.vehicleId.nameAr,
          vehicleType: p.vehicleId.type,
          vehicleTypeAr: p.vehicleId.typeAr,
          passengers: p.vehicleId.passengers,
          luggage: p.vehicleId.luggage,
          image: p.vehicleId.image,
          basePrice: p.basePrice,
          currentPrice: p.currentPrice,
        })),
      };
    });

    const response = NextResponse.json({ success: true, routes: formattedRoutes });

    // HTTP cache: public CDN cache 5 min, serve stale for 1 min while revalidating
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=300, stale-while-revalidate=60'
    );

    return response;
  } catch (error) {
    console.error('[GET /api/pricing/routes] DB error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load routes. Please try again.' },
      { status: 500 }
    );
  }
}
