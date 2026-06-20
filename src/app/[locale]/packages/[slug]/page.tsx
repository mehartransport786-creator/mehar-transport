import { getTranslations } from "next-intl/server";
import { PackageOpen, MapPin, Users, Car, ArrowRight, ShieldCheck, Star, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import connectToDatabase from "@/lib/db";
import Package from "@/lib/models/Package";
import RoutePricing from "@/lib/models/RoutePricing";
import { fallbackPackages, getFallbackPricings } from "@/lib/fallbackData";
import PackageVehicleSelection from "./PackageVehicleSelection";
import PackageGallery from "@/components/packages/PackageGallery";
import PackageFAQ from "@/components/packages/PackageFAQ";
import PackageTestimonials from "@/components/packages/PackageTestimonials";
import MobileStickyActionBar from "@/components/packages/MobileStickyActionBar";
import PackageJsonLd from "@/components/packages/PackageJsonLd";

async function getPackage(slug: string) {
  try {
    await connectToDatabase();
    
    const pkg = await Package.findOne({ slug, isActive: true })
      .populate('includedRoutes')
      .populate('availableVehicles')
      .lean() as any;

    if (!pkg) {
      return null;
    }

    const routeIds = pkg.includedRoutes.map((r: any) => r._id);
    const vehicleIds = pkg.availableVehicles.map((v: any) => v._id);

    const pricings = await RoutePricing.find({
      routeId: { $in: routeIds },
      vehicleId: { $in: vehicleIds },
      isActive: true
    }).lean();

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

    const validVehicles = availableVehiclesWithPricing.filter((v: any) => v.totalPrice !== null);
    
    const startingPrice = validVehicles.length > 0 
      ? Math.min(...validVehicles.map((v: any) => v.totalPrice))
      : 0;

    return {
      ...pkg,
      _id: pkg._id.toString(),
      includedRoutes: pkg.includedRoutes.map((r: any) => ({ ...r, _id: r._id.toString() })),
      availableVehicles: validVehicles,
      startingPrice
    };

  } catch (error) {
    console.warn("MongoDB unreachable, falling back to local memory data.");
    const pkg = fallbackPackages.find((p) => p.slug === slug);
    if (!pkg) return null;
    const allPricings = getFallbackPricings();
    
    const pricings = allPricings.filter((p) => {
      const isIncludedRoute = pkg.includedRoutes.some((route: any) => route._id.toString() === p.routeId.toString());
      const isAvailableVehicle = pkg.availableVehicles.some((vehicle: any) => vehicle._id.toString() === p.vehicleId.toString());
      return isIncludedRoute && isAvailableVehicle;
    });

    return { ...pkg, pricings };
  }
}

export default async function PackageDetailsPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await params;
  const isAr = locale === "ar";
  const pkg = await getPackage(slug);

  if (!pkg) {
    return (
      <div className="min-h-screen bg-[#F8F9FC] flex flex-col items-center justify-center p-8">
        <PackageOpen className="w-16 h-16 text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-[#1B1E4F] mb-2">{isAr ? "الباقة غير موجودة" : "Package Not Found"}</h1>
        <p className="text-gray-500 mb-8">{isAr ? "عذراً، الباقة التي تبحث عنها غير متوفرة." : "Sorry, the package you are looking for is not available."}</p>
        <Link href={`/${locale}/packages`} className="bg-[#1B1E4F] text-white px-6 py-3 rounded-xl font-bold">
          {isAr ? "العودة للباقات" : "Back to Packages"}
        </Link>
      </div>
    );
  }

  return (
    <>
      <PackageJsonLd pkg={pkg} />
      <div className="min-h-screen bg-[#F8F9FC] pb-24">
      {/* Hero Section */}
      <div className="relative bg-[#1B1E4F] h-[60vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src={pkg.images?.[0] || "/fleet/yukon.webp"}
            alt={pkg.name}
            fill
            className="object-cover opacity-30 mix-blend-luminosity"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B1E4F] via-[#1B1E4F]/80 to-transparent" />
        </div>

        <div className="relative h-full container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px] flex flex-col justify-end pb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#D9A63A] text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider mb-6">
              {pkg.category} Package
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {isAr ? pkg.nameAr : pkg.name}
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">
              {isAr ? pkg.descriptionAr : pkg.description}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px] -mt-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content */}
          <div className="flex-1 space-y-8">
            
            {/* Features */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-[#1B1E4F] mb-6">{isAr ? "ماذا تشمل الباقة؟" : "What's Included"}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(isAr ? pkg.featuresAr : pkg.features)?.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="font-medium text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Route Timeline */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-[#1B1E4F] mb-8">{isAr ? "مسار الرحلة" : "Journey Itinerary"}</h2>
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute top-4 bottom-4 left-6 rtl:left-auto rtl:right-6 w-0.5 bg-gray-100" />
                
                <div className="space-y-6">
                  {pkg.includedRoutes?.map((route: any, idx: number) => {
                    const isFirst = idx === 0;
                    const isLast = idx === pkg.includedRoutes.length - 1;
                    
                    return (
                      <div key={idx} className="relative flex gap-6">
                        <div className="relative z-10 w-12 h-12 rounded-full bg-white border-4 border-[#F8F9FC] flex items-center justify-center shrink-0">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${isFirst ? 'bg-[#D9A63A]' : isLast ? 'bg-[#1B1E4F]' : 'bg-gray-300'}`}>
                            <MapPin className="w-4 h-4" />
                          </div>
                        </div>
                        <div className="pt-2 pb-6">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Stop {idx + 1}</span>
                          </div>
                          <h4 className="text-lg font-bold text-gray-800">{isAr ? route.originAr : route.origin}</h4>
                          {isLast && (
                            <div className="mt-8">
                              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Final Destination</span>
                              <h4 className="text-lg font-bold text-gray-800">{isAr ? route.destinationAr : route.destination}</h4>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Trust Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
                <Star className="w-8 h-8 text-[#D9A63A] mx-auto mb-3" />
                <h4 className="font-bold text-[#1B1E4F] mb-1">4.9/5 Rating</h4>
                <p className="text-xs text-gray-500">Google Reviews</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
                <ShieldCheck className="w-8 h-8 text-[#D9A63A] mx-auto mb-3" />
                <h4 className="font-bold text-[#1B1E4F] mb-1">Licensed</h4>
                <p className="text-xs text-gray-500">Professional Drivers</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
                <Clock className="w-8 h-8 text-[#D9A63A] mx-auto mb-3" />
                <h4 className="font-bold text-[#1B1E4F] mb-1">24/7 Support</h4>
                <p className="text-xs text-gray-500">Always Available</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
                <PackageOpen className="w-8 h-8 text-[#D9A63A] mx-auto mb-3" />
                <h4 className="font-bold text-[#1B1E4F] mb-1">10,000+</h4>
                <p className="text-xs text-gray-500">Transfers Completed</p>
              </div>
            </div>

            <PackageGallery images={pkg.images} locale={locale} />
            <PackageFAQ locale={locale} />
            <PackageTestimonials locale={locale} />

          </div>

          {/* Sticky Sidebar: Live Pricing & Vehicle Selection */}
          <div className="lg:w-[400px] shrink-0">
            <PackageVehicleSelection pkg={pkg} locale={locale} />
          </div>

        </div>
      </div>

      <MobileStickyActionBar pkg={pkg} locale={locale} selectedVehicleId={pkg.availableVehicles?.[0]?._id} />
    </div>
    </>
  );
}
