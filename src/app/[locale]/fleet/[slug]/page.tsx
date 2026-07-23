import { notFound } from "next/navigation";
import { fleetData } from "@/data/fleet";
import { VehicleTemplate } from "@/components/vehicle-page/VehicleTemplate";
import Script from "next/script";

// Generate metadata statically
export async function generateMetadata({ params }: { params: { locale: string; slug: string } }) {
  const resolvedParams = await params;
  const isAr = resolvedParams.locale === "ar";
  
  const vehicle = fleetData.find(v => v.slug === resolvedParams.slug);

  if (!vehicle) {
    return { title: "Not Found | Mehar Transport" };
  }

  return {
    title: isAr ? vehicle.seoContent.titleAr : vehicle.seoContent.title,
    description: isAr ? vehicle.seoContent.descriptionAr : vehicle.seoContent.description,
  };
}

export async function generateStaticParams() {
  const locales = ['en', 'ar'];
  const params = [];
  
  for (const locale of locales) {
    for (const vehicle of fleetData) {
      params.push({
        locale,
        slug: vehicle.slug,
      });
    }
  }
  
  return params;
}

export default async function VehicleDetailPage({ params }: { params: { locale: string; slug: string } }) {
  const resolvedParams = await params;
  const isAr = resolvedParams.locale === "ar";
  
  const vehicle = fleetData.find(v => v.slug === resolvedParams.slug);

  if (!vehicle) {
    notFound();
  }

  // Generate structured data for SEO (Product / Service)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": isAr ? vehicle.nameAr : vehicle.name,
    "description": isAr ? vehicle.seoContent.descriptionAr : vehicle.seoContent.description,
    "image": `https://mehartransport.com${vehicle.heroImage}`,
    "brand": {
      "@type": "Brand",
      "name": "Mehar Transport"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "SAR",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <>
      <Script
        id={`json-ld-${vehicle.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VehicleTemplate vehicle={vehicle} />
    </>
  );
}
