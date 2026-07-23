import { getTranslations } from "next-intl/server";
import { CategorySection } from "@/components/fleet-page/CategorySection";
import { FleetFAQ } from "@/components/fleet-page/FleetFAQ";
import { FinalConversion } from "@/components/fleet-page/FinalConversion";
import { Link } from "@/i18n/routing";
import connectToDatabase from "@/lib/db";
import Vehicle from "@/lib/models/Vehicle";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const resolvedParams = await params;
  const isAr = resolvedParams.locale === "ar";
  return {
    title: isAr ? "سيارات الدفع الرباعي الفاخرة - نقل كبار الشخصيات | ميهار للنقل" : "Luxury SUVs - VIP Executive Transfers | Mehar Transport",
    description: isAr 
      ? "تأجير سيارات دفع رباعي فاخرة مع سائق خاص. الخيار الأمثل لكبار الشخصيات لتنقلات فاخرة، مع مساحات واسعة وأمان متفوق." 
      : "Hire a luxury SUV with a private chauffeur. The VIP choice for executive transfers, offering spacious interiors, elevated presence, and superior safety.",
  };
}

export default async function SUVHubPage({ params }: { params: { locale: string } }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const isAr = locale === "ar";

  await connectToDatabase();
  const rawVehicles = await Vehicle.find({ active: true }).lean();
  const vehicles = JSON.parse(JSON.stringify(rawVehicles));

  // Categorize
  const suvs = vehicles.filter((v: any) => v.slug.includes("denali") || v.slug.includes("yukon") || v.slug.includes("land-cruiser"));

  // JSON-LD
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": isAr ? "الرئيسية" : "Home", "item": "https://mehartransport.com" },
      { "@type": "ListItem", "position": 2, "name": isAr ? "الأسطول" : "Fleet", "item": "https://mehartransport.com/fleet" },
      { "@type": "ListItem", "position": 3, "name": isAr ? "سيارات الدفع الرباعي" : "Luxury SUVs", "item": "https://mehartransport.com/fleet/suv" }
    ]
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": suvs.map((v: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://mehartransport.com/fleet/${v.slug}`,
      "name": isAr ? v.nameAr : v.name
    }))
  };

  const otherCategories = [
    { name: isAr ? "سيارات السيدان الخاصة" : "Executive Sedans", slug: "sedan" },
    { name: isAr ? "سيارات الفان العائلية" : "Executive Vans", slug: "van" },
    { name: isAr ? "حافلات النقل الجماعي" : "Minibus & Coaster", slug: "minibus" }
  ];

  return (
    <main className="min-h-screen bg-background pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />

      <CategorySection
        title="Luxury SUVs"
        titleAr="سيارات الدفع الرباعي الفاخرة"
        description="Premium comfort with elevated presence. The VIP choice for executive SUV transfers, offering spacious interiors and superior safety."
        descriptionAr="راحة فائقة وحضور متميز. الخيار الأمثل لكبار الشخصيات لتنقلات فاخرة، مع مساحات داخلية واسعة وأمان متفوق."
        vehicles={suvs}
        isHub={true}
      />

      <section className="py-12 bg-muted/30 border-y border-border">
        <div className="container-fluid">
          <h3 className="text-xl font-bold text-primary mb-6">
            {isAr ? "تصفح فئات أخرى" : "Explore Other Categories"}
          </h3>
          <div className="flex flex-wrap gap-4">
            {otherCategories.map((cat, idx) => (
              <Link 
                key={idx} 
                href={`/fleet/${cat.slug}`}
                className="px-6 py-3 rounded-full bg-background border border-border text-primary font-medium hover:border-secondary hover:text-secondary transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FleetFAQ />
      <FinalConversion />
    </main>
  );
}
