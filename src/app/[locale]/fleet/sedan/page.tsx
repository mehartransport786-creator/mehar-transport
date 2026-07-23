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
    title: isAr ? "سيارات السيدان الخاصة - نقل المطار والعمرة | ميهار للنقل" : "Executive Sedans - Private Umrah Taxi & Airport Transfer | Mehar Transport",
    description: isAr 
      ? "احجز سيارة سيدان خاصة مع سائق محترف. مثالية لتنقلات المطار وكبار الشخصيات ورحلات العمرة للأفراد والأزواج." 
      : "Book a private executive sedan with a professional chauffeur. Perfect for airport transfers, VIPs, and Umrah journeys for individuals and couples.",
  };
}

export default async function SedanHubPage({ params }: { params: { locale: string } }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const isAr = locale === "ar";

  await connectToDatabase();
  const rawVehicles = await Vehicle.find({ active: true }).lean();
  const vehicles = JSON.parse(JSON.stringify(rawVehicles));

  // Categorize
  const sedans = vehicles.filter((v: any) => v.slug.includes("camry") || v.slug.includes("xpander"));

  // JSON-LD
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": isAr ? "الرئيسية" : "Home", "item": "https://mehartransport.com" },
      { "@type": "ListItem", "position": 2, "name": isAr ? "الأسطول" : "Fleet", "item": "https://mehartransport.com/fleet" },
      { "@type": "ListItem", "position": 3, "name": isAr ? "سيارات السيدان" : "Sedans", "item": "https://mehartransport.com/fleet/sedan" }
    ]
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": sedans.map((v: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://mehartransport.com/fleet/${v.slug}`,
      "name": isAr ? v.nameAr : v.name
    }))
  };

  const otherCategories = [
    { name: isAr ? "سيارات الدفع الرباعي الفاخرة" : "Luxury SUVs", slug: "suv" },
    { name: isAr ? "سيارات الفان العائلية" : "Executive Vans", slug: "van" },
    { name: isAr ? "حافلات النقل الجماعي" : "Minibus & Coaster", slug: "minibus" }
  ];

  return (
    <main className="min-h-screen bg-background pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />

      <CategorySection
        title="Executive Sedans"
        titleAr="سيارات السيدان الخاصة"
        description="Perfect for individuals or couples. Enjoy a smooth, private ride ideal for executive airport transfers or a quiet Umrah taxi experience."
        descriptionAr="مثالية للأفراد أو الأزواج. استمتع برحلة هادئة وخاصة، مثالية للتنقلات من وإلى المطار أو كسيارة أجرة خاصة للعمرة."
        vehicles={sedans}
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
