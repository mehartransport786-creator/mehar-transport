import { getTranslations } from "next-intl/server";
import { CinematicHero } from "@/components/fleet-page/CinematicHero";
import { FleetGrid, CategoryContent } from "@/components/fleet-page/FleetGrid";
import { FleetFAQ } from "@/components/fleet-page/FleetFAQ";
import { FleetSEOContent } from "@/components/fleet-page/FleetSEOContent";
import { FinalConversion } from "@/components/fleet-page/FinalConversion";
import { fleetData } from "@/data/fleet";

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

  // Build the SEO category text content
  const categories: CategoryContent[] = [
    {
      id: "all",
      title: isAr ? "الكل" : "All",
      description: isAr
        ? "استكشف أسطولنا الفاخر المصمم لتوفير أقصى درجات الراحة والموثوقية."
        : "Explore our premium fleet designed for ultimate comfort and reliability."
    },
    {
      id: "sedan",
      title: isAr ? "سيارات السيدان الخاصة" : "Executive Sedans",
      description: isAr
        ? "مثالية للأفراد أو الأزواج. استمتع برحلة هادئة وخاصة، مثالية للتنقلات من وإلى المطار أو كسيارة أجرة خاصة للعمرة."
        : "Perfect for individuals or couples. Enjoy a smooth, private ride ideal for executive airport transfers or a quiet Umrah taxi experience.",
      link: "/fleet/sedan",
      linkLabel: isAr ? "عرض فئة السيدان" : "View Sedans"
    },
    {
      id: "suv",
      title: isAr ? "سيارات الدفع الرباعي الفاخرة" : "Premium SUVs",
      description: isAr
        ? "راحة فائقة وحضور متميز. الخيار الأمثل لكبار الشخصيات لتنقلات فاخرة، مع مساحات داخلية واسعة وأمان متفوق."
        : "Premium comfort with elevated presence. The VIP choice for executive SUV transfers, offering spacious interiors and superior safety.",
      link: "/fleet/suv",
      linkLabel: isAr ? "عرض فئة الدفع الرباعي" : "View SUVs"
    },
    {
      id: "van",
      title: isAr ? "حافلات عائلية لكبار الشخصيات" : "Executive Vans",
      description: isAr
        ? "مركبات واسعة للعائلات الممتدة والمجموعات الصغيرة. توفر مساحة واسعة للأمتعة وتكييف هواء قوي لرحلات العمرة المريحة."
        : "Spacious vehicles for extended families and small groups. Offers generous luggage capacity and robust climate control for comfortable Umrah journeys.",
      link: "/fleet/van",
      linkLabel: isAr ? "عرض فئة الفان" : "View Vans"
    },
    {
      id: "minibus",
      title: isAr ? "حافلات المجموعات الصغيرة" : "Minibuses",
      description: isAr
        ? "الخيار الأفضل للمجموعات الكبيرة وحملات العمرة. توفر مقاعد فسيحة، وموثوقية عالية، ومساحة كافية للحجاج وأمتعتهم."
        : "The ultimate choice for large tour groups and Umrah campaigns. Delivers expansive seating, proven reliability, and ample room for pilgrims and their luggage.",
      link: "/fleet/minibus",
      linkLabel: isAr ? "عرض فئة الميني باص" : "View Minibuses"
    }
  ];

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
    "itemListElement": fleetData.map((v: any, index: number) => ({
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

      <FleetGrid vehicles={fleetData} categories={categories} />

      <FleetSEOContent />
      <FleetFAQ />
      <FinalConversion />
    </main>
  );
}
