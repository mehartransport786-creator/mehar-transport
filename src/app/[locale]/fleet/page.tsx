import { getTranslations, getLocale } from "next-intl/server";
import { CinematicHero } from "@/components/fleet-page/CinematicHero";
import { FleetOverview } from "@/components/fleet-page/FleetOverview";
import { VehicleCategoryExperience } from "@/components/fleet-page/VehicleCategoryExperience";
import { PremiumVehicleCollection } from "@/components/fleet-page/PremiumVehicleCollection";
import { InteractiveComparison } from "@/components/fleet-page/InteractiveComparison";
import { InteriorExperience } from "@/components/fleet-page/InteriorExperience";
import { SafetyQuality } from "@/components/fleet-page/SafetyQuality";
import { PilgrimExperience } from "@/components/fleet-page/PilgrimExperience";
import { CustomerStories } from "@/components/fleet-page/CustomerStories";
import { FleetFAQ } from "@/components/fleet-page/FleetFAQ";
import { FleetSEOContent } from "@/components/fleet-page/FleetSEOContent";
import { FinalConversion } from "@/components/fleet-page/FinalConversion";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const resolvedParams = await params;
  const isAr = resolvedParams.locale === "ar";
  return {
    title: isAr ? "أسطول فاخر | ميهار للنقل" : "Luxury Fleet | Mehar Transport",
    description: isAr 
      ? "استكشف أسطولنا الفاخر من المركبات المصممة لراحتك. من سيارات كبار الشخصيات إلى حافلات النقل الجماعي." 
      : "Explore our luxury fleet of vehicles designed for your comfort. From VIP sedans to group transport buses.",
  };
}

export default async function FleetPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* SECTION 1 — CINEMATIC HERO */}
      <CinematicHero />

      {/* SECTION 2 — FLEET OVERVIEW */}
      <FleetOverview />

      {/* SECTION 3 — VEHICLE CATEGORY EXPERIENCE */}
      <VehicleCategoryExperience />

      {/* SECTION 4 — PREMIUM VEHICLE COLLECTION */}
      <PremiumVehicleCollection />
      
      {/* SECTION 5 — INTERACTIVE VEHICLE COMPARISON */}
      <InteractiveComparison />

      {/* SECTION 6 — INTERIOR EXPERIENCE */}
      <InteriorExperience />

      {/* SECTION 7 — SAFETY & QUALITY */}
      <SafetyQuality />

      {/* SECTION 8 — PILGRIM EXPERIENCE */}
      <PilgrimExperience />

      {/* SECTION 9 — CUSTOMER STORIES */}
      <CustomerStories />

      {/* SECTION 10 — FAQ */}
      <FleetFAQ />

      {/* SECTION 11 — SEO CONTENT */}
      <FleetSEOContent />

      {/* SECTION 12 — FINAL CONVERSION */}
      <FinalConversion />
    </main>
  );
}
