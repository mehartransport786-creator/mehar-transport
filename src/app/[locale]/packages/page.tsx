import { getTranslations } from "next-intl/server";
import { PackageOpen, MapPin, Users, Car, ArrowRight, ShieldCheck, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import connectToDatabase from "@/lib/db";
import Package from "@/lib/models/Package";
import RoutePricing from "@/lib/models/RoutePricing";
import { fallbackPackages, getFallbackPricings } from "@/lib/fallbackData";

// Fetch packages on server side directly from DB
async function getPackages() {
  try {
    await connectToDatabase();
    
    // Fetch active packages sorted by order
    const packages = await Package.find({ isActive: true })
      .populate('includedRoutes')
      .populate('availableVehicles')
      .sort({ order: 1 })
      .lean();

    const pricings = await RoutePricing.find({ isActive: true }).lean();
    
    const packagesWithPricing = packages.map((pkg: any) => {
      let startingPrice = 0;

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

    return packagesWithPricing;
  } catch (error) {
    console.warn("MongoDB unreachable, falling back to local memory data.");
    const packages = fallbackPackages;
    const pricings = getFallbackPricings();
    
    const packagesWithPricing = packages.map((pkg: any) => {
      let startingPrice = 0;

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

      return { ...pkg, startingPrice };
    });

    return packagesWithPricing;
  }
}

export default async function PackagesPage({ params: { locale } }: { params: { locale: string } }) {
  const isAr = locale === "ar";
  const packages = await getPackages();

  // Group by category if needed, or just list them. We'll list them all for now.
  
  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      {/* Hero Section */}
      <div className="relative bg-[#1B1E4F] overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/hero-makkah.webp" // Assuming this exists or falls back to CSS
            alt="Makkah"
            fill
            className="object-cover opacity-20 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1B1E4F]/90 to-[#1B1E4F]" />
        </div>

        <div className="relative container mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-[#D9A63A] px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <Star className="w-4 h-4" />
            {isAr ? "خدمات نقل فاخرة" : "Premium Transportation"}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {isAr ? "باقات النقل والعمرة المميزة" : "Umrah & Airport Transfer Packages"}
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed mb-8">
            {isAr 
              ? "اختر من بين باقاتنا المصممة بعناية لتغطية تنقلات المطار، العمرة، والزيارات بأسعار ثابتة ومستوى خدمة يليق بك." 
              : "Choose from our professionally designed transportation packages covering airport transfers, Umrah travel, and VIP transportation across Saudi Arabia."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-white/40 text-xs sm:text-sm">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#D9A63A]" /> {isAr ? "سائقون محترفون" : "Professional Drivers"}</span>
            <span className="flex items-center gap-1.5"><Car className="w-4 h-4 text-[#D9A63A]" /> {isAr ? "أسطول حديث" : "Modern Fleet"}</span>
            <span className="flex items-center gap-1.5"><PackageOpen className="w-4 h-4 text-[#D9A63A]" /> {isAr ? "أسعار ثابتة" : "Fixed Pricing"}</span>
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px] py-16">
        {packages.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <PackageOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg">{isAr ? "لا توجد باقات متاحة حالياً." : "No packages available right now."}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {packages.map((pkg: any) => (
              <div key={pkg._id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all flex flex-col md:flex-row">
                {/* Image Side */}
                <div className="w-full md:w-2/5 h-64 md:h-auto relative bg-gray-100 shrink-0">
                  <Image 
                    src={pkg.images?.[0] || "/fleet/yukon.webp"} 
                    alt={pkg.name} 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#1B1E4F] px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg">
                    {pkg.category}
                  </div>
                </div>

                {/* Content Side */}
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-[#1B1E4F] mb-2">
                    {isAr ? pkg.nameAr : pkg.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-6 line-clamp-2">
                    {isAr ? pkg.descriptionAr : pkg.description}
                  </p>

                  <div className="space-y-4 flex-1 mb-8">
                    {/* Routes Summary */}
                    <div className="flex gap-3 text-sm">
                      <div className="w-8 h-8 rounded-full bg-[#1B1E4F]/5 flex items-center justify-center text-[#1B1E4F] shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="pt-1">
                        <span className="font-semibold text-gray-800 block mb-1">{isAr ? "مسار الرحلة" : "Journey"}</span>
                        <p className="text-gray-500 text-xs leading-relaxed">
                          {pkg.includedRoutes?.map((r: any) => (isAr ? r.nameAr : r.name)).join(" → ")}
                        </p>
                      </div>
                    </div>

                    {/* Vehicles & Capacity */}
                    <div className="flex gap-3 text-sm">
                      <div className="w-8 h-8 rounded-full bg-[#1B1E4F]/5 flex items-center justify-center text-[#1B1E4F] shrink-0">
                        <Car className="w-4 h-4" />
                      </div>
                      <div className="pt-1">
                        <span className="font-semibold text-gray-800 block mb-1">{isAr ? "المركبات المتاحة" : "Available Vehicles"}</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {pkg.availableVehicles?.slice(0, 3).map((v: any, idx: number) => (
                            <span key={idx} className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full font-semibold">
                              {v.name}
                            </span>
                          ))}
                          {pkg.availableVehicles?.length > 3 && (
                            <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full font-semibold">+{pkg.availableVehicles.length - 3}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400 font-medium mb-0.5">{isAr ? "تبدأ من" : "Starting from"}</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-[#D9A63A]">{pkg.startingPrice}</span>
                        <span className="text-sm font-semibold text-gray-400">SAR</span>
                      </div>
                    </div>
                    <Link 
                      href={`/${locale}/packages/${pkg.slug}`}
                      className="inline-flex items-center gap-2 bg-[#1B1E4F] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#2a2f6b] transition-all shadow-lg shadow-[#1B1E4F]/20"
                    >
                      {isAr ? "التفاصيل والحجز" : "View & Book"}
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
