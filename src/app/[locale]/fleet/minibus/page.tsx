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
    title: isAr ? "حافلات النقل الجماعي - نقل المجموعات الكبيرة | ميهار للنقل" : "Minibus & Coaster - Large Group Transport | Mehar Transport",
    description: isAr 
      ? "استأجر حافلة تويوتا هايس أو كوستر لنقل مجموعات العمرة الكبيرة. الخيار الأمثل لضمان بقاء مجموعتك معاً طوال الرحلة بكل راحة وفخامة." 
      : "Hire a Toyota Hiace or Coaster minibus for large Umrah group transport. Keep your group united without compromising on comfort and luxury.",
  };
}

export default async function MinibusHubPage({ params }: { params: { locale: string } }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const isAr = locale === "ar";

  await connectToDatabase();
  const rawVehicles = await Vehicle.find({ active: true }).lean();
  const vehicles = JSON.parse(JSON.stringify(rawVehicles));

  // Categorize
  const minibuses = vehicles.filter((v: any) => v.slug.includes("hiace") || v.slug.includes("coaster"));

  // JSON-LD
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": isAr ? "الرئيسية" : "Home", "item": "https://mehartransport.com" },
      { "@type": "ListItem", "position": 2, "name": isAr ? "الأسطول" : "Fleet", "item": "https://mehartransport.com/fleet" },
      { "@type": "ListItem", "position": 3, "name": isAr ? "حافلات النقل الجماعي" : "Minibus & Coaster", "item": "https://mehartransport.com/fleet/minibus" }
    ]
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": minibuses.map((v: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://mehartransport.com/fleet/${v.slug}`,
      "name": isAr ? v.nameAr : v.name
    }))
  };

  const otherCategories = [
    { name: isAr ? "سيارات السيدان الخاصة" : "Executive Sedans", slug: "sedan" },
    { name: isAr ? "سيارات الدفع الرباعي الفاخرة" : "Luxury SUVs", slug: "suv" },
    { name: isAr ? "سيارات الفان العائلية" : "Executive Vans", slug: "van" }
  ];

  return (
    <main className="min-h-screen bg-background pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />

      <CategorySection
        title="Minibus & Coaster"
        titleAr="حافلات النقل الجماعي"
        description="The optimal solution for large Umrah groups. Our coaster and minibus hire options keep your group united without compromising on luxury."
        descriptionAr="الحل الأمثل لمجموعات العمرة الكبيرة. تضمن خياراتنا من الحافلات بقاء مجموعتك معاً دون التنازل عن الفخامة."
        vehicles={minibuses}
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
