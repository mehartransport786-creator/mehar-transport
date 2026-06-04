import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

// We will import components as we build them.
import { ContactHero } from "@/components/contact-page/ContactHero";
import { ContactMethodsHub } from "@/components/contact-page/ContactMethodsHub";
import { BusinessProfile } from "@/components/contact-page/BusinessProfile";
import { GoogleBusinessProfile } from "@/components/contact-page/GoogleBusinessProfile";
import { GoogleReviewsShowcase } from "@/components/contact-page/GoogleReviewsShowcase";
import { InteractiveMap } from "@/components/contact-page/InteractiveMap";
import { ServiceAreaCoverage } from "@/components/contact-page/ServiceAreaCoverage";
import { AdvancedContactForm } from "@/components/contact-page/AdvancedContactForm";
import { WhatsAppExperience } from "@/components/contact-page/WhatsAppExperience";
import { FAQCenter } from "@/components/contact-page/FAQCenter";
import { TrustAndSafetyCenter } from "@/components/contact-page/TrustAndSafetyCenter";
import { SocialMediaCommunity } from "@/components/contact-page/SocialMediaCommunity";
import { FinalConversionCTA } from "@/components/contact-page/FinalConversionCTA";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage.seo" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        en: "/en/contact",
        ar: "/ar/contact",
      },
    },
  };
}

export default function ContactPage() {
  const t = useTranslations("ContactPage");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "TransportationService"],
    name: "Mehar Transport",
    url: "https://mehartransport.com",
    logo: "https://mehartransport.com/logo.png",
    image: "https://mehartransport.com/hero-image.jpg",
    description: t("seo.description"),
    telephone: "+966 56 563 8120",
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Main Office",
      addressLocality: "Jeddah",
      addressRegion: "Makkah Province",
      addressCountry: "SA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 22.8273029,
      longitude: 39.9450464,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1245",
    },
  };

  return (
    <main className="flex min-h-screen flex-col w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <ContactHero />
      <ContactMethodsHub />
      
      <div className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <BusinessProfile />
        <div className="space-y-12">
          <GoogleBusinessProfile />
          <GoogleReviewsShowcase />
        </div>
      </div>

      <InteractiveMap />
      <ServiceAreaCoverage />
      
      <section className="bg-white dark:bg-slate-900 py-20">
        <div className="container mx-auto px-4">
          <AdvancedContactForm />
        </div>
      </section>

      <WhatsAppExperience />
      <FAQCenter />
      <TrustAndSafetyCenter />
      <SocialMediaCommunity />
      <FinalConversionCTA />
    </main>
  );
}
