import { getTranslations } from "next-intl/server";
import { CinematicHero } from "@/components/fleet-page/CinematicHero";
import { CategorySection } from "@/components/fleet-page/CategorySection";
import { FleetFAQ } from "@/components/fleet-page/FleetFAQ";
import { FleetSEOContent } from "@/components/fleet-page/FleetSEOContent";
import { FinalConversion } from "@/components/fleet-page/FinalConversion";
import connectToDatabase from "@/lib/db";
import Vehicle from "@/lib/models/Vehicle";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const resolvedParams = await params;
  const isAr = resolvedParams.locale === "ar";
  return {
    title: isAr ? "أسطول النقل الفاخر | ميهار للنقل" : "Luxury Fleet | Mehar Transport",
    description: isAr 
      ? "اكتشف أسطولنا الفاخر المصمم لتوفير أقصى درجات الراحة. من سيارات السيدان إلى الحافلات الجماعية، اختر الفئة التي تناسب احتياجاتك." 
      : "Discover our premium fleet designed for ultimate comfort. From executive sedans to group buses, choose the category that fits your needs.",
  };
}

export default async function FleetIndexPage({ params }: { params: { locale: string } }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const isAr = locale === "ar";

  await connectToDatabase();
  const rawVehicles = await Vehicle.find({ active: true }).lean();
  const vehicles = JSON.parse(JSON.stringify(rawVehicles));

  // Categorize vehicles (using slug or name matching)
  const sedans = vehicles.filter((v: any) => v.slug.includes("camry") || v.slug.includes("xpander"));
  const suvs = vehicles.filter((v: any) => v.slug.includes("denali") || v.slug.includes("yukon") || v.slug.includes("land-cruiser"));
  const vans = vehicles.filter((v: any) => v.slug.includes("staria") || v.slug.includes("h1"));
  const minibuses = vehicles.filter((v: any) => v.slug.includes("hiace") || v.slug.includes("coaster"));

  // JSON-LD
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": isAr ? "الرئيسية" : "Home", "item": "https://mehartransport.com" },
      { "@type": "ListItem", "position": 2, "name": isAr ? "الأسطول" : "Fleet", "item": "https://mehartransport.com/fleet" }
    ]
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": vehicles.map((v: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://mehartransport.com/fleet/${v.slug}`,
      "name": isAr ? v.nameAr : v.name
    }))
  };

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />

      <CinematicHero />

      {sedans.length > 0 && (
        <CategorySection
          title="Executive Sedans"
          titleAr="سيارات السيدان الخاصة"
          description="Perfect for individuals or couples. Enjoy a smooth, private ride ideal for executive airport transfers or a quiet Umrah taxi experience."
          descriptionAr="مثالية للأفراد أو الأزواج. استمتع برحلة هادئة وخاصة، مثالية للتنقلات من وإلى المطار أو كسيارة أجرة خاصة للعمرة."
          vehicles={sedans}
          slug="sedan"
        />
      )}

      {suvs.length > 0 && (
        <CategorySection
          title="Luxury SUVs"
          titleAr="سيارات الدفع الرباعي الفاخرة"
          description="Premium comfort with elevated presence. The VIP choice for executive SUV transfers, offering spacious interiors and superior safety."
          descriptionAr="راحة فائقة وحضور متميز. الخيار الأمثل لكبار الشخصيات لتنقلات فاخرة، مع مساحات داخلية واسعة وأمان متفوق."
          vehicles={suvs}
          slug="suv"
        />
      )}

      {vans.length > 0 && (
        <CategorySection
          title="Executive Vans"
          titleAr="سيارات الفان العائلية"
          description="Designed for family travel and 7-seat group transfers. An executive MPV experience with ample room for luggage and passengers."
          descriptionAr="مصممة لسفر العائلات ونقل المجموعات حتى 7 أشخاص. تجربة مريحة مع مساحة واسعة للأمتعة والركاب."
          vehicles={vans}
          slug="van"
        />
      )}

      {minibuses.length > 0 && (
        <CategorySection
          title="Minibus & Coaster"
          titleAr="حافلات النقل الجماعي"
          description="The optimal solution for large Umrah groups. Our coaster and minibus hire options keep your group united without compromising on luxury."
          descriptionAr="الحل الأمثل لمجموعات العمرة الكبيرة. تضمن خياراتنا من الحافلات بقاء مجموعتك معاً دون التنازل عن الفخامة."
          vehicles={minibuses}
          slug="minibus"
        />
      )}

      <FleetFAQ />
      <FleetSEOContent />
      <FinalConversion />
    </main>
  );
}
