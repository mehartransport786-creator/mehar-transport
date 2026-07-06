export const fallbackVehicles = [
  { _id: 'v1', name: 'Toyota Camry', nameAr: 'تويوتا كامري', type: 'Executive Sedan', typeAr: 'سيدان تنفيذية', passengers: 4, luggage: 3, image: '/fleet/camry.png', active: true, slug: 'toyota-camry' },
  { _id: 'v2', name: 'Kia K5', nameAr: 'كيا K5', type: 'Executive Sedan', typeAr: 'سيدان تنفيذية', passengers: 4, luggage: 3, image: '/fleet/kia-k5.png', active: true, slug: 'kia-k5' },
  { _id: 'v3', name: 'Mitsubishi Xpander', nameAr: 'ميتسوبيشي إكسباندر', type: 'Family MPV', typeAr: 'سيارة عائلية MPV', passengers: 7, luggage: 4, image: '/fleet/mitsubishi-xpander.png', active: true, slug: 'mitsubishi-xpander' },
  { _id: 'v4', name: 'Hyundai Staria', nameAr: 'هيونداي ستاريا', type: 'Executive Van', typeAr: 'فان تنفيذي', passengers: 7, luggage: 6, image: '/fleet/staria.png', active: true, slug: 'hyundai-staria' },
  { _id: 'v5', name: 'Hyundai Starex', nameAr: 'هيونداي ستاريكس', type: 'Executive Van', typeAr: 'فان تنفيذي', passengers: 9, luggage: 7, image: '/fleet/hyundai-starex.png', active: true, slug: 'hyundai-starex' },
  { _id: 'v6', name: 'Toyota Hiace', nameAr: 'تويوتا هايس', type: 'Executive Van', typeAr: 'فان تنفيذي', passengers: 13, luggage: 10, image: '/fleet/toyota-hiace.png', active: true, slug: 'toyota-hiace' },
  { _id: 'v7', name: 'GMC Yukon', nameAr: 'جمس يوكن', type: 'Premium SUV', typeAr: 'سيارة دفع رباعي فاخرة', passengers: 7, luggage: 6, image: '/fleet/gmc.png', active: true, slug: 'gmc-yukon' },
];

export const fallbackRoutesData = [
  { _id: 'r1', name: 'Jeddah Airport to Makkah Hotel', nameAr: 'مطار جدة إلى فندق مكة', origin: 'Jeddah Airport', originAr: 'مطار جدة', destination: 'Makkah Hotel', destinationAr: 'فندق مكة', routeType: 'airport_transfer', city: 'Makkah', distanceKm: 85, averageDurationMins: 75, slug: 'jeddah-airport-to-makkah-hotel', prices: [200, 220, 250, 300, 350, 500, 600] },
  { _id: 'r2', name: 'Makkah Hotel to Jeddah Airport', nameAr: 'فندق مكة إلى مطار جدة', origin: 'Makkah Hotel', originAr: 'فندق مكة', destination: 'Jeddah Airport', destinationAr: 'مطار جدة', routeType: 'airport_transfer', city: 'Makkah', distanceKm: 85, averageDurationMins: 75, slug: 'makkah-hotel-to-jeddah-airport', prices: [150, 180, 200, 250, 300, 450, 500] },
  { _id: 'r3', name: 'Jeddah Airport to Madinah Hotel', nameAr: 'مطار جدة إلى فندق المدينة', origin: 'Jeddah Airport', originAr: 'مطار جدة', destination: 'Madinah Hotel', destinationAr: 'فندق المدينة', routeType: 'airport_transfer', city: 'Madinah', distanceKm: 420, averageDurationMins: 255, slug: 'jeddah-airport-to-madinah-hotel', prices: [500, 550, 600, 700, 800, 1200, 1500] },
  { _id: 'r4', name: 'Madinah Hotel to Jeddah Airport', nameAr: 'فندق المدينة إلى مطار جدة', origin: 'Madinah Hotel', originAr: 'فندق المدينة', destination: 'Jeddah Airport', destinationAr: 'مطار جدة', routeType: 'airport_transfer', city: 'Madinah', distanceKm: 420, averageDurationMins: 255, slug: 'madinah-hotel-to-jeddah-airport', prices: [450, 500, 550, 650, 750, 1100, 1400] },
  { _id: 'r5', name: 'Makkah Hotel to Madinah Hotel', nameAr: 'فندق مكة إلى فندق المدينة', origin: 'Makkah Hotel', originAr: 'فندق مكة', destination: 'Madinah Hotel', destinationAr: 'فندق المدينة', routeType: 'intercity', city: 'Madinah', distanceKm: 450, averageDurationMins: 270, slug: 'makkah-hotel-to-madinah-hotel', prices: [450, 500, 550, 650, 750, 1100, 1400] },
  { _id: 'r6', name: 'Madinah Hotel to Makkah Hotel', nameAr: 'فندق المدينة إلى فندق مكة', origin: 'Madinah Hotel', originAr: 'فندق المدينة', destination: 'Makkah Hotel', destinationAr: 'فندق مكة', routeType: 'intercity', city: 'Makkah', distanceKm: 450, averageDurationMins: 270, slug: 'madinah-hotel-to-makkah-hotel', prices: [450, 500, 550, 650, 750, 1100, 1400] },
  { _id: 'r7', name: 'Madinah Airport to Madinah Hotel', nameAr: 'مطار المدينة إلى فندق المدينة', origin: 'Madinah Airport', originAr: 'مطار المدينة', destination: 'Madinah Hotel', destinationAr: 'فندق المدينة', routeType: 'airport_transfer', city: 'Madinah', distanceKm: 20, averageDurationMins: 25, slug: 'madinah-airport-to-madinah-hotel', prices: [100, 110, 120, 150, 200, 300, 400] },
  { _id: 'r8', name: 'Madinah Hotel to Madinah Airport', nameAr: 'فندق المدينة إلى مطار المدينة', origin: 'Madinah Hotel', originAr: 'فندق المدينة', destination: 'Madinah Airport', destinationAr: 'مطار المدينة', routeType: 'airport_transfer', city: 'Madinah', distanceKm: 20, averageDurationMins: 25, slug: 'madinah-hotel-to-madinah-airport', prices: [100, 110, 120, 150, 200, 300, 400] },
  { _id: 'r9', name: 'Makkah Ziyarat', nameAr: 'مزارات مكة', origin: 'Makkah Hotel', originAr: 'فندق مكة', destination: 'Ziyarat Tour', destinationAr: 'جولة مزارات', routeType: 'ziyarat', city: 'Makkah', distanceKm: 30, averageDurationMins: 180, slug: 'makkah-ziyarat', prices: [200, 220, 250, 300, 350, 500, 600] },
  { _id: 'r10', name: 'Madinah Ziyarat', nameAr: 'مزارات المدينة', origin: 'Madinah Hotel', originAr: 'فندق المدينة', destination: 'Ziyarat Tour', destinationAr: 'جولة مزارات', routeType: 'ziyarat', city: 'Madinah', distanceKm: 30, averageDurationMins: 180, slug: 'madinah-ziyarat', prices: [150, 180, 200, 250, 300, 450, 500] },
  { _id: 'r11', name: 'Makkah to Taif and Return', nameAr: 'مكة إلى الطائف والعودة', origin: 'Makkah', originAr: 'مكة', destination: 'Taif', destinationAr: 'الطائف', routeType: 'intercity', city: 'Taif', distanceKm: 180, averageDurationMins: 360, slug: 'makkah-to-taif-return', prices: [400, 450, 500, 600, 700, 1000, 1200] },
  { _id: 'r12', name: 'Jeddah to Taif and Return', nameAr: 'جدة إلى الطائف والعودة', origin: 'Jeddah', originAr: 'جدة', destination: 'Taif', destinationAr: 'الطائف', routeType: 'intercity', city: 'Taif', distanceKm: 320, averageDurationMins: 480, slug: 'jeddah-to-taif-return', prices: [500, 550, 600, 700, 800, 1200, 1500] },
  { _id: 'r13', name: 'Jeddah Airport to Jeddah Hotel', nameAr: 'مطار جدة إلى فندق جدة', origin: 'Jeddah Airport', originAr: 'مطار جدة', destination: 'Jeddah Hotel', destinationAr: 'فندق جدة', routeType: 'airport_transfer', city: 'Jeddah', distanceKm: 25, averageDurationMins: 30, slug: 'jeddah-airport-to-jeddah-hotel', prices: [100, 110, 120, 150, 200, 300, 400] },
  { _id: 'r14', name: 'Makkah Hotel to Train Station', nameAr: 'فندق مكة إلى محطة القطار', origin: 'Makkah Hotel', originAr: 'فندق مكة', destination: 'Haramain Train Station', destinationAr: 'محطة قطار الحرمين', routeType: 'airport_transfer', city: 'Makkah', distanceKm: 15, averageDurationMins: 20, slug: 'makkah-hotel-to-train-station', prices: [80, 90, 100, 120, 150, 250, 350] },
  { _id: 'r15', name: 'Madinah Hotel to Train Station', nameAr: 'فندق المدينة إلى محطة القطار', origin: 'Madinah Hotel', originAr: 'فندق المدينة', destination: 'Haramain Train Station', destinationAr: 'محطة قطار الحرمين', routeType: 'airport_transfer', city: 'Madinah', distanceKm: 15, averageDurationMins: 20, slug: 'madinah-hotel-to-train-station', prices: [80, 90, 100, 120, 150, 250, 350] }
];



export const getFallbackPricings = () => {
  let pricings: any[] = [];
  fallbackRoutesData.forEach((route) => {
    route.prices.forEach((price, idx) => {
      pricings.push({
        _id: `pr_${route._id}_${fallbackVehicles[idx]._id}`,
        routeId: route._id,
        vehicleId: fallbackVehicles[idx]._id,
        basePrice: price,
        currentPrice: price,
        isActive: true,
        route: route,
        vehicle: fallbackVehicles[idx]
      });
    });
  });
  return pricings;
};
