import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import RoutePricing from '@/lib/models/RoutePricing';
import Route from '@/lib/models/Route';

const mockVehicles = [
  { _id: 'v1', name: 'Toyota Camry', nameAr: 'تويوتا كامري', type: 'Executive Sedan', typeAr: 'سيدان تنفيذية', passengers: 4, luggage: 3, image: '/fleet/camry.png' },
  { _id: 'v2', name: 'Kia K5', nameAr: 'كيا K5', type: 'Executive Sedan', typeAr: 'سيدان تنفيذية', passengers: 4, luggage: 3, image: '/fleet/kia-k5.png' },
  { _id: 'v3', name: 'Mitsubishi Xpander', nameAr: 'ميتسوبيشي إكسباندر', type: 'Family MPV', typeAr: 'سيارة عائلية MPV', passengers: 7, luggage: 4, image: '/fleet/mitsubishi-xpander.png' },
  { _id: 'v4', name: 'Hyundai Staria', nameAr: 'هيونداي ستاريا', type: 'Executive Van', typeAr: 'فان تنفيذي', passengers: 7, luggage: 6, image: '/fleet/staria.png' },
  { _id: 'v5', name: 'Hyundai Starex', nameAr: 'هيونداي ستاريكس', type: 'Executive Van', typeAr: 'فان تنفيذي', passengers: 9, luggage: 7, image: '/fleet/hyundai-starex.png' },
  { _id: 'v6', name: 'Toyota Hiace', nameAr: 'تويوتا هايس', type: 'Executive Van', typeAr: 'فان تنفيذي', passengers: 13, luggage: 10, image: '/fleet/toyota-hiace.png' },
  { _id: 'v7', name: 'GMC Yukon', nameAr: 'جمس يوكن', type: 'Premium SUV', typeAr: 'سيارة دفع رباعي فاخرة', passengers: 7, luggage: 6, image: '/fleet/gmc.png' }
];

const mockRoutesData = [
  { _id: 'r1', name: 'Jeddah Airport to Jeddah Hotel', nameAr: 'مطار جدة إلى فندق جدة', origin: 'Jeddah Airport', destination: 'Jeddah Hotel', prices: [150, 160, 250, 300, 200, 200, 400] },
  { _id: 'r2', name: 'Jeddah Airport to Makkah Hotel', nameAr: 'مطار جدة إلى فندق مكة', origin: 'Jeddah Airport', destination: 'Makkah Hotel', prices: [200, 220, 350, 500, 300, 300, 550] },
  { _id: 'r3', name: 'Jeddah Airport to Madinah Hotel', nameAr: 'مطار جدة إلى فندق المدينة', origin: 'Jeddah Airport', destination: 'Madinah Hotel', prices: [400, 450, 550, 1000, 500, 500, 1100] },
  { _id: 'r4', name: 'Madina Hotel to Jeddah Airport', nameAr: 'فندق المدينة إلى مطار جدة', origin: 'Madina Hotel', destination: 'Jeddah Airport', prices: [400, 450, 550, 800, 450, 450, 900] },
  { _id: 'r5', name: 'Makkah Ziyarat', nameAr: 'مزارات مكة', origin: 'Makkah', destination: 'Ziyarat Tour', prices: [200, 220, 300, 400, 250, 250, 500] },
  { _id: 'r6', name: 'Madinah Ziyarat', nameAr: 'مزارات المدينة', origin: 'Madinah', destination: 'Ziyarat Tour', prices: [200, 220, 250, 400, 200, 200, 500] },
  { _id: 'r7', name: 'Makkah to Taif and Return', nameAr: 'مكة إلى الطائف والعودة', origin: 'Makkah', destination: 'Taif', prices: [400, 450, 550, 800, 450, 450, 900] },
  { _id: 'r8', name: 'Jeddah to Taif and Return', nameAr: 'جدة إلى الطائف والعودة', origin: 'Jeddah', destination: 'Taif', prices: [500, 550, 700, 1000, 600, 600, 1000] },
  { _id: 'r9', name: 'Makkah Hotel to Madinah Hotel', nameAr: 'فندق مكة إلى فندق المدينة', origin: 'Makkah Hotel', destination: 'Madinah Hotel', prices: [400, 450, 550, 900, 450, 500, 900] },
  { _id: 'r10', name: 'Madinah Hotel to Makkah Hotel', nameAr: 'فندق المدينة إلى فندق مكة', origin: 'Madinah Hotel', destination: 'Makkah Hotel', prices: [400, 450, 550, 900, 450, 450, 900] },
  { _id: 'r11', name: 'Madinah Hotel to Madinah Airport', nameAr: 'فندق المدينة إلى مطار المدينة', origin: 'Madinah Hotel', destination: 'Madinah Airport', prices: [150, 160, 250, 300, 200, 200, 400] },
  { _id: 'r12', name: 'Madinah Airport to Madinah Hotel', nameAr: 'مطار المدينة إلى فندق المدينة', origin: 'Madinah Airport', destination: 'Madinah Hotel', prices: [150, 160, 250, 300, 200, 250, 400] },
  { _id: 'r13', name: 'Makkah Hotel to Jeddah Airport', nameAr: 'فندق مكة إلى مطار جدة', origin: 'Makkah Hotel', destination: 'Jeddah Airport', prices: [150, 160, 300, 450, 250, 250, 600] },
  { _id: 'r14', name: 'Makkah Hotel to Train Station', nameAr: 'فندق مكة إلى محطة القطار', origin: 'Makkah Hotel', destination: 'Train Station', prices: [100, 110, 200, 250, 180, 180, 350] },
  { _id: 'r15', name: 'Madinah Hotel to Train Station', nameAr: 'فندق المدينة إلى محطة القطار', origin: 'Madinah Hotel', destination: 'Train Station', prices: [120, 130, 200, 250, 180, 180, 350] }
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
