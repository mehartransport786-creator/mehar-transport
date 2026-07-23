import { useLocale } from "next-intl";
import { VehicleData } from "@/data/fleet";
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

interface VehicleTemplateProps {
  vehicle: VehicleData;
}

export function VehicleTemplate({ vehicle }: VehicleTemplateProps) {
  const locale = useLocale();

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* SECTION 1 — CINEMATIC HERO */}
      <VehicleHero vehicle={vehicle} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px] py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 relative">
          
          {/* Main Content Area */}
          <div className="w-full lg:w-2/3 space-y-12 lg:space-y-24">
            
            {/* SECTION 2 — VEHICLE STORY */}
            <VehicleStory story={vehicle.story} />

            {/* SECTION 3 — PREMIUM GALLERY */}
            <PremiumGallery gallery={vehicle.gallery} />

            {/* SECTION 4 — VEHICLE FEATURES */}
            <VehicleFeatures features={vehicle.comfortFeatures} theme={vehicle.theme} />

            {/* SECTION 5 — PERFECT FOR */}
            <PerfectFor perfectFor={vehicle.perfectFor} theme={vehicle.theme} />

            {/* SECTION 6 — POPULAR ROUTES */}
            <PopularRoutes />

            {/* SECTION 7 — COMFORT EXPERIENCE */}
            <ComfortExperience theme={vehicle.theme} interiorImage={vehicle.interiorImage} />

            {/* SECTION 8 — VEHICLE SAFETY */}
            <VehicleSafety />

            {/* SECTION 9 — CUSTOMER REVIEWS */}
            <VehicleReviews reviews={vehicle.reviews} theme={vehicle.theme} />

            {/* SECTION 10 — VEHICLE COMPARISON */}
            <VehicleComparison currentSlug={vehicle.slug} category={vehicle.category} />

            {/* SECTION 11 — FAQ */}
            {vehicle.faqs.length > 0 && (
              <VehicleFAQ faqs={vehicle.faqs} theme={vehicle.theme} />
            )}

            {/* SECTION 12 — SEO CONTENT */}
            <VehicleSEO seo={vehicle.seoContent} />

            {/* SECTION 13 — RELATED VEHICLES */}
            <RelatedVehicles currentSlug={vehicle.slug} category={vehicle.category} />

          </div>

          {/* Sidebar Area */}
          <div className="w-full lg:w-1/3 relative">
            <div className="sticky top-32">
              {/* SECTION 14 — BOOKING EXPERIENCE */}
              <StickyBookingWidget 
                vehicleName={vehicle.name}
                vehicleNameAr={vehicle.nameAr}
                vehicleId={vehicle.slug}
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
