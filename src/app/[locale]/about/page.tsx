
import { AboutHero } from "@/components/about-page/AboutHero";
import { CompanyIntro } from "@/components/about-page/CompanyIntro";
import { AboutTimeline } from "@/components/about-page/AboutTimeline";
import { TrustStats } from "@/components/about-page/TrustStats";
import { RegisteredCompany } from "@/components/about-page/RegisteredCompany";
import { OurFootprint } from "@/components/about-page/OurFootprint";
import { B2BPartnerships } from "@/components/about-page/B2BPartnerships";
import { AboutFleetShowcase } from "@/components/about-page/AboutFleetShowcase";
import { OurValues } from "@/components/about-page/OurValues";
import { WhyChooseUs } from "@/components/about-page/WhyChooseUs";
import { AboutReviews } from "@/components/about-page/AboutReviews";
import { OperationsExcellence } from "@/components/about-page/OperationsExcellence";
import { CSRSection } from "@/components/about-page/CSRSection";
import { AboutCTA } from "@/components/about-page/AboutCTA";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  
  return {
    title: isAr 
      ? "عن ميهار للنقل | شركة نقل موثوقة للعمرة والمطار في السعودية" 
      : "About Mehar Transport | Trusted Umrah & Airport Transfer Company in Saudi Arabia",
    description: isAr
      ? "تعرف على ميهار للنقل، شركة نقل مسجلة في مكة المكرمة تخدم المسافرين منذ عام 2016 بخدمات نقل المطار، العمرة، السيارات الفاخرة، وحلول النقل للشركات."
      : "Learn about Mehar Transport, a registered transportation company in Makkah serving travelers since 2016 with airport transfers, Umrah transportation, luxury vehicles, and corporate transport solutions.",
  };
}

export default async function AboutUsPage({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  
  // JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://mehartransport.com/#organization",
        "name": "Mehar Transport",
        "url": "https://mehartransport.com",
        "logo": "https://mehartransport.com/logo.png",
        "foundingDate": "2016",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Jeddah",
          "addressCountry": "SA"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+966-56-563-8120",
          "contactType": "customer service"
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://mehartransport.com/#localBusiness",
        "name": "Mehar Transport",
        "image": "https://mehartransport.com/makkah-skyline-luxury.png",
        "priceRange": "$$$",
        "telephone": "+966-56-563-8120",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Jeddah",
          "addressCountry": "SA"
        }
      },
      {
        "@type": "TransportService",
        "name": "Umrah & Airport Transfers",
        "provider": { "@id": "https://mehartransport.com/#organization" },
        "areaServed": ["Makkah", "Madinah", "Jeddah", "Riyadh", "Taif", "Yanbu"]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-background min-h-screen">
        <AboutHero locale={locale} />
        <CompanyIntro locale={locale} />
        <TrustStats locale={locale} />
        <AboutTimeline locale={locale} />
        <RegisteredCompany locale={locale} />
        <OurFootprint locale={locale} />
        <B2BPartnerships locale={locale} />
        <AboutFleetShowcase locale={locale} />
        <OurValues locale={locale} />
        <WhyChooseUs locale={locale} />
        <OperationsExcellence locale={locale} />
        <AboutReviews locale={locale} />
        <CSRSection locale={locale} />
        <AboutCTA locale={locale} />
      </main>
    </>
  );
}
