import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { FleetShowcase } from "@/components/sections/FleetShowcase";
import { FeaturedRoutes } from "@/components/sections/FeaturedRoutes";
import { SafetySection } from "@/components/sections/SafetySection";
import { GallerySection } from "@/components/sections/GallerySection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContentHubSection } from "@/components/sections/ContentHubSection";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <Hero />
      <TrustBar />
      <AboutSection />
      <FleetShowcase />
      <FeaturedRoutes />
      <ServicesSection />
      <SafetySection />
      <GallerySection />
      <ReviewsSection />
      <ContentHubSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
