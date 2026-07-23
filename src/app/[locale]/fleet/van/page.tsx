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
    title: isAr ? "سيارات الفان العائلية - نقل العائلات والمجموعات | ميهار للنقل" : "Executive Vans - Family & 7-Seat Group Transfers | Mehar Transport",
    description: isAr 
      ? "تأجير سيارات فان عائلية واسعة ومريحة لنقل المجموعات حتى 7 أشخاص. توفر مساحة واسعة للأمتعة وتجربة سفر مريحة للعائلات." 
      : "Hire spacious and comfortable executive vans for up to 7 passengers. Ample luggage room and a premium travel experience perfect for families and small groups.",
  };
}

export default async function VanHubPage({ params }: { params: { locale: string } }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const isAr = locale === "ar";

  await connectToDatabase();
  const rawVehicles = await Vehicle.find({ active: true }).lean();
  const vehicles = JSON.parse(JSON.stringify(rawVehicles));

  // Categorize
  const vans = vehicles.filter((v: any) => v.slug.includes("staria") || v.slug.includes("h1"));

  // JSON-LD
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": isAr ? "الرئيسية" : "Home", "item": "https://mehartransport.com" },
      { "@type": "ListItem", "position": 2, "name": isAr ? "الأسطول" : "Fleet", "item": "https://mehartransport.com/fleet" },
      { "@type": "ListItem", "position": 3, "name": isAr ? "سيارات الفان" : "Executive Vans", "item": "https://mehartransport.com/fleet/van" }
    ]
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": vans.map((v: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://mehartransport.com/fleet/${v.slug}`,
      "name": isAr ? v.nameAr : v.name
    }))
  };

  const otherCategories = [
    { name: isAr ? "سيارات السيدان الخاصة" : "Executive Sedans", slug: "sedan" },
    { name: isAr ? "سيارات الدفع الرباعي الفاخرة" : "Luxury SUVs", slug: "suv" },
    { name: isAr ? "حافلات النقل الجماعي" : "Minibus & Coaster", slug: "minibus" }
  ];

  return (
    <main className="min-h-screen bg-background pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />

      <CategorySection
        title="Executive Vans"
        titleAr="سيارات الفان العائلية"
        description="Designed for family travel and 7-seat group transfers. An executive MPV experience with ample room for luggage and passengers."
        descriptionAr="مصممة لسفر العائلات ونقل المجموعات حتى 7 أشخاص. تجربة مريحة مع مساحة واسعة للأمتعة والركاب."
        vehicles={vans}
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
