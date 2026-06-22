import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import RoutePricing from '@/lib/models/RoutePricing';
import Route from '@/lib/models/Route';

const mockVehicles = [
  { _id: 'v1', name: 'Car (4 Seater)', nameAr: 'سيارة (4 مقاعد)', type: 'Sedan', typeAr: 'سيدان', passengers: 4, luggage: 2, image: '/fleet/camry.png' },
  { _id: 'v2', name: 'Hiace (11 Seater)', nameAr: 'هايس (11 مقعد)', type: 'Van', typeAr: 'فان', passengers: 11, luggage: 10, image: '/fleet/hiace.png' },
  { _id: 'v3', name: 'GMC (7 Seater)', nameAr: 'جمس (7 مقاعد)', type: 'SUV', typeAr: 'سيارة دفع رباعي', passengers: 7, luggage: 7, image: '/fleet/gmc.png' },
  { _id: 'v4', name: 'Starex (7 Seater)', nameAr: 'ستاريكس (7 مقاعد)', type: 'Van', typeAr: 'فان', passengers: 7, luggage: 6, image: '/fleet/starex.png' },
  { _id: 'v5', name: 'Staria (7 Seater)', nameAr: 'ستاريا (7 مقاعد)', type: 'Luxury Van', typeAr: 'فان فاخر', passengers: 7, luggage: 6, image: '/fleet/staria.png' },
  { _id: 'v6', name: 'Coaster (17 Seater)', nameAr: 'كوستر (17 مقعد)', type: 'Bus', typeAr: 'حافلة', passengers: 17, luggage: 15, image: '/fleet/coaster.png' }
];

const mockRoutesData = [
  { _id: 'r1', name: 'Jeddah Airport to Jeddah Hotel', nameAr: 'مطار جدة إلى فندق جدة', origin: 'Jeddah Airport', destination: 'Jeddah Hotel', prices: [150, 250, 300, 200, 200, 400] },
  { _id: 'r2', name: 'Jeddah Airport to Makkah Hotel', nameAr: 'مطار جدة إلى فندق مكة', origin: 'Jeddah Airport', destination: 'Makkah Hotel', prices: [200, 350, 500, 300, 300, 550] },
  { _id: 'r3', name: 'Jeddah Airport to Madinah Hotel', nameAr: 'مطار جدة إلى فندق المدينة', origin: 'Jeddah Airport', destination: 'Madinah Hotel', prices: [400, 550, 1000, 500, 500, 1100] },
  { _id: 'r4', name: 'Madina Hotel to Jeddah Airport', nameAr: 'فندق المدينة إلى مطار جدة', origin: 'Madina Hotel', destination: 'Jeddah Airport', prices: [400, 550, 800, 450, 450, 900] },
  { _id: 'r5', name: 'Makkah Ziyarat', nameAr: 'مزارات مكة', origin: 'Makkah', destination: 'Ziyarat Tour', prices: [200, 300, 400, 250, 250, 500] },
  { _id: 'r6', name: 'Madinah Ziyarat', nameAr: 'مزارات المدينة', origin: 'Madinah', destination: 'Ziyarat Tour', prices: [200, 250, 400, 200, 200, 500] },
  { _id: 'r7', name: 'Makkah to Taif and Return', nameAr: 'مكة إلى الطائف والعودة', origin: 'Makkah', destination: 'Taif', prices: [400, 550, 800, 450, 450, 900] },
  { _id: 'r8', name: 'Jeddah to Taif and Return', nameAr: 'جدة إلى الطائف والعودة', origin: 'Jeddah', destination: 'Taif', prices: [500, 700, 1000, 600, 600, 1000] },
  { _id: 'r9', name: 'Makkah Hotel to Madinah Hotel', nameAr: 'فندق مكة إلى فندق المدينة', origin: 'Makkah Hotel', destination: 'Madinah Hotel', prices: [400, 550, 900, 450, 500, 900] },
  { _id: 'r10', name: 'Madinah Hotel to Makkah Hotel', nameAr: 'فندق المدينة إلى فندق مكة', origin: 'Madinah Hotel', destination: 'Makkah Hotel', prices: [400, 550, 900, 450, 450, 900] },
  { _id: 'r11', name: 'Madinah Hotel to Madinah Airport', nameAr: 'فندق المدينة إلى مطار المدينة', origin: 'Madinah Hotel', destination: 'Madinah Airport', prices: [150, 250, 300, 200, 200, 400] },
  { _id: 'r12', name: 'Madinah Airport to Madinah Hotel', nameAr: 'مطار المدينة إلى فندق المدينة', origin: 'Madinah Airport', destination: 'Madinah Hotel', prices: [150, 250, 300, 200, 250, 400] },
  { _id: 'r13', name: 'Makkah Hotel to Jeddah Airport', nameAr: 'فندق مكة إلى مطار جدة', origin: 'Makkah Hotel', destination: 'Jeddah Airport', prices: [150, 300, 450, 250, 250, 600] },
  { _id: 'r14', name: 'Makkah Hotel to Train Station', nameAr: 'فندق مكة إلى محطة القطار', origin: 'Makkah Hotel', destination: 'Train Station', prices: [100, 200, 250, 180, 180, 350] },
  { _id: 'r15', name: 'Madinah Hotel to Train Station', nameAr: 'فندق المدينة إلى محطة القطار', origin: 'Madinah Hotel', destination: 'Train Station', prices: [120, 200, 250, 180, 180, 350] }
];

export async function GET() {
  try {
    await connectToDatabase();
    
    // We fetch all active routes
    const routes = await Route.find({ isActive: true }).lean();
    
    if (!routes || routes.length === 0) {
      throw new Error('No active routes found in database');
    }
    
    // Fetch all active route pricings, populate vehicle
    const pricings = await RoutePricing.find({ isActive: true })
      .populate('vehicleId')
      .lean();
      
    // Group pricings by routeId
    const pricingMap = new Map();
    for (const p of pricings) {
      const routeId = p.routeId.toString();
      if (!pricingMap.has(routeId)) {
        pricingMap.set(routeId, []);
      }
      pricingMap.get(routeId).push(p);
    }
    
    // Format response
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
          currentPrice: p.currentPrice
        }))
      };
    });

    return NextResponse.json({ success: true, routes: formattedRoutes, rawRoutes: routes });
  } catch (error) {
    console.error('Error fetching routes API, falling back to mock:', error);
  }

  // Fallback to mock data if DB fails or is empty
  const routesWithPricing = mockRoutesData.map(r => ({
    _id: r._id,
    name: r.name,
    nameAr: r.nameAr,
    origin: r.origin,
    originAr: r.origin,
    destination: r.destination,
    destinationAr: r.destination,
    distanceKm: 0,
    averageDurationMins: 0,
    isActive: true,
    pricings: mockVehicles.map((v, i) => ({
      vehicleId: v._id,
      vehicleName: v.name,
      vehicleNameAr: v.nameAr,
      vehicleType: v.type,
      vehicleTypeAr: v.typeAr,
      passengers: v.passengers,
      luggage: v.luggage,
      image: v.image,
      basePrice: r.prices[i],
      currentPrice: r.prices[i]
    }))
  }));

  return NextResponse.json({ routes: routesWithPricing });
}
