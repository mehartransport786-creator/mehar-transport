import { getTranslations, getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { vehicleDetails } from "@/lib/vehicle-details";
import connectToDatabase from "@/lib/db";
import Vehicle from "@/lib/models/Vehicle";

import { VehicleHero } from "@/components/vehicle-page/VehicleHero";
import { VehicleStory } from "@/components/vehicle-page/VehicleStory";
import { PremiumGallery } from "@/components/vehicle-page/PremiumGallery";
import { VehicleFeatures } from "@/components/vehicle-page/VehicleFeatures";
import { PerfectFor } from "@/components/vehicle-page/PerfectFor";
import { PopularRoutes } from "@/components/vehicle-page/PopularRoutes";
import { ComfortExperience } from "@/components/vehicle-page/ComfortExperience";
import { VehicleSafety } from "@/components/vehicle-page/VehicleSafety";
import { VehicleReviews } from "@/components/vehicle-page/VehicleReviews";
import { VehicleComparison } from "@/components/vehicle-page/VehicleComparison";
import { VehicleFAQ } from "@/components/vehicle-page/VehicleFAQ";
import { VehicleSEO } from "@/components/vehicle-page/VehicleSEO";
import { RelatedVehicles } from "@/components/vehicle-page/RelatedVehicles";
import { StickyBookingWidget } from "@/components/vehicle-page/StickyBookingWidget";
import { FinalCTA } from "@/components/vehicle-page/FinalCTA";

// Dynamic metadata generation
export async function generateMetadata({ params }: { params: { locale: string; slug: string } }) {
  const resolvedParams = await params;
  const isAr = resolvedParams.locale === "ar";
  await connectToDatabase();
  const vehicle = await Vehicle.findOne({ slug: resolvedParams.slug }).lean();
  const details = vehicleDetails[resolvedParams.slug];

  if (!vehicle || !details) {
    return { title: "Not Found | Mehar Transport" };
  }

  return {
    title: isAr ? details.seoContent.titleAr : details.seoContent.title,
    description: isAr ? details.seoContent.contentAr.slice(0, 150) + "..." : details.seoContent.content.slice(0, 150) + "...",
  };
}

export default async function VehicleDetailPage({ params }: { params: { locale: string; slug: string } }) {
  const resolvedParams = await params;
  const isAr = resolvedParams.locale === "ar";
  
  await connectToDatabase();
  const rawVehicle = await Vehicle.findOne({ slug: resolvedParams.slug }).lean();
  const vehicle = rawVehicle ? JSON.parse(JSON.stringify(rawVehicle)) : null;
  const details = vehicleDetails[resolvedParams.slug];

  if (!vehicle || !details) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* SECTION 1 — CINEMATIC HERO */}
      <VehicleHero vehicle={vehicle} details={details} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px] py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 relative">
          
          {/* Main Content Area (Left side on LTR, Right on RTL) */}
          <div className="w-full lg:w-2/3 space-y-24">
            
            {/* Phase 2: SECTION 2 — VEHICLE STORY */}
            <VehicleStory details={details} />

            {/* Phase 2: SECTION 3 — PREMIUM GALLERY */}
            <PremiumGallery gallery={vehicle.gallery} />

            {/* Phase 3: SECTION 4 — VEHICLE FEATURES */}
            <VehicleFeatures features={details.comfortFeatures} theme={details.theme} />

            {/* Phase 3: SECTION 5 — PERFECT FOR */}
            <PerfectFor perfectFor={details.perfectFor} theme={details.theme} />

            {/* Phase 3: SECTION 6 — POPULAR ROUTES */}
            <PopularRoutes />

            {/* Phase 3: SECTION 7 — COMFORT EXPERIENCE */}
            <ComfortExperience theme={details.theme} />

            {/* Phase 4: SECTION 8 — VEHICLE SAFETY */}
            <VehicleSafety />

            {/* Phase 4: SECTION 9 — CUSTOMER REVIEWS */}
            <VehicleReviews reviews={details.reviews} theme={details.theme} />

            {/* Phase 4: SECTION 10 — VEHICLE COMPARISON */}
            <VehicleComparison currentSlug={vehicle.slug} />

            {/* Phase 4: SECTION 11 — FAQ */}
            <VehicleFAQ faqs={details.faqs} theme={details.theme} />

            {/* Phase 4: SECTION 12 — SEO CONTENT */}
            <VehicleSEO seo={details.seoContent} />

            {/* Phase 4: SECTION 13 — RELATED VEHICLES */}
            <RelatedVehicles currentSlug={vehicle.slug} />

          </div>

          {/* Sidebar Area (Right side on LTR, Left on RTL) */}
          <div className="w-full lg:w-1/3 relative">
            <div className="sticky top-32">
              {/* SECTION 14 — BOOKING EXPERIENCE */}
              <StickyBookingWidget 
                vehicleName={vehicle.name}
                vehicleNameAr={vehicle.nameAr}
                basePrice={vehicle.basePrice}
                vehicleId={vehicle.id || vehicle.slug}
              />
            </div>
          </div>
          
        </div>
      </div>

      {/* SECTION 15 — FINAL CTA */}
      <FinalCTA vehicle={vehicle} />
      
    </main>
  );
}
