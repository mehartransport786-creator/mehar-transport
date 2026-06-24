export const fallbackVehicles = [
  { _id: 'v1', name: 'Kia K5', nameAr: 'كيا كيه 5', type: 'Sedan', typeAr: 'سيدان', passengers: 4, luggage: 2, image: '/fleet/kia-k5.png', active: true, slug: 'kia-k5' },
  { _id: 'v2', name: 'Mitsubishi Xpander', nameAr: 'ميتسوبيشي إكسباندر', type: 'SUV', typeAr: 'عائلية', passengers: 7, luggage: 4, image: '/fleet/xpander.png', active: true, slug: 'mitsubishi-xpander' },
  { _id: 'v3', name: 'Hyundai Staria', nameAr: 'هيونداي ستاريا', type: 'Luxury Van', typeAr: 'فان فاخر', passengers: 7, luggage: 6, image: '/fleet/staria.png', active: true, slug: 'hyundai-staria' },
  { _id: 'v4', name: 'Toyota Hiace', nameAr: 'تويوتا هايس', type: 'Van', typeAr: 'فان', passengers: 11, luggage: 10, image: '/fleet/hiace.png', active: true, slug: 'toyota-hiace' },
  { _id: 'v5', name: 'GMC Yukon', nameAr: 'جمس يوكون', type: 'SUV', typeAr: 'سيارة دفع رباعي', passengers: 7, luggage: 7, image: '/fleet/gmc.png', active: true, slug: 'gmc-yukon' },
  { _id: 'v6', name: 'Toyota Coaster', nameAr: 'تويوتا كوستر', type: 'Bus', typeAr: 'حافلة', passengers: 22, luggage: 15, image: '/fleet/coaster.png', active: true, slug: 'toyota-coaster' },
];

export const fallbackRoutesData = [
  { _id: 'r1', name: 'Jeddah Airport to Makkah Hotel', nameAr: 'مطار جدة إلى فندق مكة', origin: 'Jeddah Airport', originAr: 'مطار جدة', destination: 'Makkah Hotel', destinationAr: 'فندق مكة', routeType: 'airport_transfer', city: 'Makkah', distanceKm: 85, averageDurationMins: 75, slug: 'jeddah-airport-to-makkah-hotel', prices: [200, 250, 300, 350, 500, 600] },
  { _id: 'r2', name: 'Makkah Hotel to Jeddah Airport', nameAr: 'فندق مكة إلى مطار جدة', origin: 'Makkah Hotel', originAr: 'فندق مكة', destination: 'Jeddah Airport', destinationAr: 'مطار جدة', routeType: 'airport_transfer', city: 'Makkah', distanceKm: 85, averageDurationMins: 75, slug: 'makkah-hotel-to-jeddah-airport', prices: [150, 200, 250, 300, 450, 500] },
  { _id: 'r3', name: 'Jeddah Airport to Madinah Hotel', nameAr: 'مطار جدة إلى فندق المدينة', origin: 'Jeddah Airport', originAr: 'مطار جدة', destination: 'Madinah Hotel', destinationAr: 'فندق المدينة', routeType: 'airport_transfer', city: 'Madinah', distanceKm: 420, averageDurationMins: 255, slug: 'jeddah-airport-to-madinah-hotel', prices: [500, 600, 700, 800, 1200, 1500] },
  { _id: 'r4', name: 'Madinah Hotel to Jeddah Airport', nameAr: 'فندق المدينة إلى مطار جدة', origin: 'Madinah Hotel', originAr: 'فندق المدينة', destination: 'Jeddah Airport', destinationAr: 'مطار جدة', routeType: 'airport_transfer', city: 'Madinah', distanceKm: 420, averageDurationMins: 255, slug: 'madinah-hotel-to-jeddah-airport', prices: [450, 550, 650, 750, 1100, 1400] },
  { _id: 'r5', name: 'Makkah Hotel to Madinah Hotel', nameAr: 'فندق مكة إلى فندق المدينة', origin: 'Makkah Hotel', originAr: 'فندق مكة', destination: 'Madinah Hotel', destinationAr: 'فندق المدينة', routeType: 'intercity', city: 'Madinah', distanceKm: 450, averageDurationMins: 270, slug: 'makkah-hotel-to-madinah-hotel', prices: [450, 550, 650, 750, 1100, 1400] },
  { _id: 'r6', name: 'Madinah Hotel to Makkah Hotel', nameAr: 'فندق المدينة إلى فندق مكة', origin: 'Madinah Hotel', originAr: 'فندق المدينة', destination: 'Makkah Hotel', destinationAr: 'فندق مكة', routeType: 'intercity', city: 'Makkah', distanceKm: 450, averageDurationMins: 270, slug: 'madinah-hotel-to-makkah-hotel', prices: [450, 550, 650, 750, 1100, 1400] },
  { _id: 'r7', name: 'Madinah Airport to Madinah Hotel', nameAr: 'مطار المدينة إلى فندق المدينة', origin: 'Madinah Airport', originAr: 'مطار المدينة', destination: 'Madinah Hotel', destinationAr: 'فندق المدينة', routeType: 'airport_transfer', city: 'Madinah', distanceKm: 20, averageDurationMins: 25, slug: 'madinah-airport-to-madinah-hotel', prices: [100, 120, 150, 200, 300, 400] },
  { _id: 'r8', name: 'Madinah Hotel to Madinah Airport', nameAr: 'فندق المدينة إلى مطار المدينة', origin: 'Madinah Hotel', originAr: 'فندق المدينة', destination: 'Madinah Airport', destinationAr: 'مطار المدينة', routeType: 'airport_transfer', city: 'Madinah', distanceKm: 20, averageDurationMins: 25, slug: 'madinah-hotel-to-madinah-airport', prices: [100, 120, 150, 200, 300, 400] },
  { _id: 'r9', name: 'Makkah Ziyarat', nameAr: 'مزارات مكة', origin: 'Makkah Hotel', originAr: 'فندق مكة', destination: 'Ziyarat Tour', destinationAr: 'جولة مزارات', routeType: 'ziyarat', city: 'Makkah', distanceKm: 30, averageDurationMins: 180, slug: 'makkah-ziyarat', prices: [200, 250, 300, 350, 500, 600] },
  { _id: 'r10', name: 'Madinah Ziyarat', nameAr: 'مزارات المدينة', origin: 'Madinah Hotel', originAr: 'فندق المدينة', destination: 'Ziyarat Tour', destinationAr: 'جولة مزارات', routeType: 'ziyarat', city: 'Madinah', distanceKm: 30, averageDurationMins: 180, slug: 'madinah-ziyarat', prices: [150, 200, 250, 300, 450, 500] },
  { _id: 'r11', name: 'Makkah to Taif and Return', nameAr: 'مكة إلى الطائف والعودة', origin: 'Makkah', originAr: 'مكة', destination: 'Taif', destinationAr: 'الطائف', routeType: 'intercity', city: 'Taif', distanceKm: 180, averageDurationMins: 360, slug: 'makkah-to-taif-return', prices: [400, 500, 600, 700, 1000, 1200] },
  { _id: 'r12', name: 'Jeddah to Taif and Return', nameAr: 'جدة إلى الطائف والعودة', origin: 'Jeddah', originAr: 'جدة', destination: 'Taif', destinationAr: 'الطائف', routeType: 'intercity', city: 'Taif', distanceKm: 320, averageDurationMins: 480, slug: 'jeddah-to-taif-return', prices: [500, 600, 700, 800, 1200, 1500] },
  { _id: 'r13', name: 'Jeddah Airport to Jeddah Hotel', nameAr: 'مطار جدة إلى فندق جدة', origin: 'Jeddah Airport', originAr: 'مطار جدة', destination: 'Jeddah Hotel', destinationAr: 'فندق جدة', routeType: 'airport_transfer', city: 'Jeddah', distanceKm: 25, averageDurationMins: 30, slug: 'jeddah-airport-to-jeddah-hotel', prices: [100, 120, 150, 200, 300, 400] },
  { _id: 'r14', name: 'Makkah Hotel to Train Station', nameAr: 'فندق مكة إلى محطة القطار', origin: 'Makkah Hotel', originAr: 'فندق مكة', destination: 'Haramain Train Station', destinationAr: 'محطة قطار الحرمين', routeType: 'airport_transfer', city: 'Makkah', distanceKm: 15, averageDurationMins: 20, slug: 'makkah-hotel-to-train-station', prices: [80, 100, 120, 150, 250, 350] },
  { _id: 'r15', name: 'Madinah Hotel to Train Station', nameAr: 'فندق المدينة إلى محطة القطار', origin: 'Madinah Hotel', originAr: 'فندق المدينة', destination: 'Haramain Train Station', destinationAr: 'محطة قطار الحرمين', routeType: 'airport_transfer', city: 'Madinah', distanceKm: 15, averageDurationMins: 20, slug: 'madinah-hotel-to-train-station', prices: [80, 100, 120, 150, 250, 350] }
];

export const fallbackPackages = [
  {
    _id: "p1",
    name: "Essential Umrah Transfer Package",
    nameAr: "باقة نقل العمرة الأساسية",
    slug: "essential-umrah-transfer",
    description: "The most popular package covering your entire journey from the airport to Makkah, Madinah, and back.",
    descriptionAr: "الباقة الأكثر شعبية التي تغطي رحلتك بالكامل من المطار إلى مكة المكرمة والمدينة المنورة والعودة.",
    category: "Umrah",
    idealFor: ["Individuals", "Couples", "Small Families"],
    features: ["Airport Pickup", "Hotel Transfers", "24/7 Support", "Professional Drivers"],
    featuresAr: ["استقبال من المطار", "انتقالات الفنادق", "دعم على مدار الساعة", "سائقون محترفون"],
    images: ["/fleet/staria.png", "/routes/makkah-premium.webp"],
    includedRoutes: [fallbackRoutesData[2], fallbackRoutesData[8], fallbackRoutesData[11]],
    availableVehicles: fallbackVehicles,
    isActive: true,
    isPopular: true,
    order: 1
  },
  {
    _id: "p2",
    name: "Complete Umrah Transportation Package",
    nameAr: "باقة النقل الشاملة للعمرة",
    slug: "complete-umrah-package",
    description: "A complete journey including Ziyarat tours in both Holy Cities.",
    descriptionAr: "رحلة كاملة تشمل جولات الزيارات في كلتا المدينتين المقدستين.",
    category: "VIP",
    idealFor: ["Families", "VIPs"],
    features: ["Ziyarat Tours", "VIP Chauffeur", "Luxury Vehicle"],
    featuresAr: ["جولات الزيارات", "سائق كبار الشخصيات", "مركبة فاخرة"],
    images: ["/fleet/gmc.png", "/fleet/starex.png"],
    includedRoutes: [fallbackRoutesData[2], fallbackRoutesData[4], fallbackRoutesData[8], fallbackRoutesData[5], fallbackRoutesData[11]],
    availableVehicles: [fallbackVehicles[2], fallbackVehicles[3], fallbackVehicles[4]], 
    isActive: true,
    isPopular: false,
    order: 2
  }
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
