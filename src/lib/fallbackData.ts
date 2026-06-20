export const fallbackVehicles = [
  { _id: "v1", name: 'Car (4 Seater)', nameAr: 'سيارة (4 مقاعد)', type: 'Sedan', typeAr: 'سيدان', passengers: 4, luggage: 2, image: '/fleet/camry.png', isActive: true },
  { _id: "v2", name: 'Hiace (11 Seater)', nameAr: 'هايس (11 مقعد)', type: 'Van', typeAr: 'فان', passengers: 11, luggage: 10, image: '/fleet/hiace.png', isActive: true },
  { _id: "v3", name: 'GMC (7 Seater)', nameAr: 'جمس (7 مقاعد)', type: 'SUV', typeAr: 'سيارة دفع رباعي', passengers: 7, luggage: 7, image: '/fleet/gmc.png', isActive: true },
  { _id: "v4", name: 'Starex (7 Seater)', nameAr: 'ستاريكس (7 مقاعد)', type: 'Van', typeAr: 'فان', passengers: 7, luggage: 6, image: '/fleet/starex.png', isActive: true },
  { _id: "v5", name: 'Staria (7 Seater)', nameAr: 'ستاريا (7 مقاعد)', type: 'Luxury Van', typeAr: 'فان فاخر', passengers: 7, luggage: 6, image: '/fleet/staria.png', isActive: true },
  { _id: "v6", name: 'Coaster (17 Seater)', nameAr: 'كوستر (17 مقعد)', type: 'Bus', typeAr: 'حافلة', passengers: 17, luggage: 15, image: '/fleet/coaster.png', isActive: true }
];

export const fallbackRoutesData = [
  { _id: "r1", name: 'Jeddah Airport to Jeddah Hotel', origin: 'Jeddah Airport', destination: 'Jeddah Hotel', prices: [150, 220, 300, 150, 150, 350] },
  { _id: "r2", name: 'Jeddah Airport to Makkah Hotel', origin: 'Jeddah Airport', destination: 'Makkah Hotel', prices: [200, 320, 450, 270, 270, 550] },
  { _id: "r3", name: 'Jeddah Airport to Madinah Hotel', origin: 'Jeddah Airport', destination: 'Madinah Hotel', prices: [400, 525, 900, 450, 450, 900] },
  { _id: "r4", name: 'Madina Hotel to Jeddah Airport', origin: 'Madina Hotel', destination: 'Jeddah Airport', prices: [350, 500, 800, 425, 425, 850] },
  { _id: "r5", name: 'Makkah Ziyarat', origin: 'Makkah', destination: 'Ziyarat Tour', prices: [170, 250, 350, 200, 200, 450] },
  { _id: "r6", name: 'Madinah Ziyarat', origin: 'Madinah', destination: 'Ziyarat Tour', prices: [170, 250, 400, 200, 200, 400] },
  { _id: "r7", name: 'Makkah to Taif and Return', origin: 'Makkah', destination: 'Taif', prices: [400, 550, 800, 450, 450, 900] },
  { _id: "r8", name: 'Jeddah to Taif and Return', origin: 'Jeddah', destination: 'Taif', prices: [500, 700, 1000, 600, 600, 1000] },
  { _id: "r9", name: 'Makkah Hotel to Madinah Hotel', origin: 'Makkah Hotel', destination: 'Madinah Hotel', prices: [350, 550, 900, 450, 450, 900] },
  { _id: "r10", name: 'Madinah Hotel to Makkah Hotel', origin: 'Madinah Hotel', destination: 'Makkah Hotel', prices: [350, 550, 900, 450, 450, 900] },
  { _id: "r11", name: 'Madinah Hotel to Madinah Airport', origin: 'Madinah Hotel', destination: 'Madinah Airport', prices: [120, 200, 300, 150, 150, 400] },
  { _id: "r12", name: 'Madinah Airport to Madinah Hotel', origin: 'Madinah Airport', destination: 'Madinah Hotel', prices: [150, 250, 300, 200, 200, 450] },
  { _id: "r13", name: 'Makkah Hotel to Jeddah Airport', origin: 'Makkah Hotel', destination: 'Jeddah Airport', prices: [150, 250, 400, 220, 220, 450] },
  { _id: "r14", name: 'Makkah Hotel to Train Station', origin: 'Makkah Hotel', destination: 'Train Station', prices: [100, 200, 250, 180, 180, 350] },
  { _id: "r15", name: 'Madinah Hotel to Train Station', origin: 'Madinah Hotel', destination: 'Train Station', prices: [120, 200, 250, 180, 180, 350] }
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
    images: ["/fleet/staria.webp", "/hero-makkah.webp"],
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
    images: ["/fleet/yukon.webp", "/fleet/starex.webp"],
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
