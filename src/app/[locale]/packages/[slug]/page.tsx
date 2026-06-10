import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { getTranslations, getLocale } from "next-intl/server";
import { Users, Briefcase, MapPin, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";

// Mock data mapping slugs to package details
const packageData: Record<string, any> = {
  "toyota-camry": {
    name: "Toyota Camry Packages",
    nameAr: "باقات تويوتا كامري",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?q=80&w=2070&auto=format&fit=crop",
    desc: "Comfortable and reliable sedan perfect for individuals or couples.",
    descAr: "سيارة سيدان مريحة وموثوقة مثالية للأفراد أو الأزواج.",
    capacity: 4,
    luggage: 2,
    basePrice: 200,
  },
  "gmc-yukon": {
    name: "GMC Yukon Umrah Package | Luxury 6-Seat SUV Transfer",
    nameAr: "باقة جمس يوكن للعمرة | نقل فاخر",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop",
    desc: "Premium 6-seat SUV offering maximum luxury and space for families.",
    descAr: "سيارة دفع رباعي عائلية فاخرة تتسع لـ 6 ركاب تقدم أقصى درجات الفخامة والمساحة.",
    capacity: 6,
    luggage: 5,
    basePrice: 500,
  },
  "hyundai-staria": {
    name: "Hyundai Staria Packages",
    nameAr: "باقات هيونداي ستاريا",
    image: "https://images.unsplash.com/photo-1678125585040-410a56b669fa?q=80&w=2070&auto=format&fit=crop",
    desc: "Modern and spacious minivan, ideal for medium-sized groups.",
    descAr: "حافلة صغيرة حديثة وواسعة، مثالية للمجموعات متوسطة الحجم.",
    capacity: 9,
    luggage: 6,
    basePrice: 400,
  },
  "toyota-hiace": {
    name: "Toyota Hiace Packages",
    nameAr: "باقات تويوتا هايس",
    image: "https://images.unsplash.com/photo-1626263503525-28b9cb0f19c4?q=80&w=2070&auto=format&fit=crop",
    desc: "Spacious van perfect for large families or group travels.",
    descAr: "حافلة واسعة مثالية للعائلات الكبيرة أو السفر الجماعي.",
    capacity: 12,
    luggage: 8,
    basePrice: 450,
  },
  "hyundai-h1": {
    name: "H1 Hyundai Packages",
    nameAr: "باقات هيونداي H1",
    image: "https://images.unsplash.com/photo-1658422472917-ce6a6231c51b?q=80&w=2070&auto=format&fit=crop",
    desc: "Reliable and spacious transport for your Umrah journey.",
    descAr: "نقل موثوق وواسع لرحلة العمرة الخاصة بك.",
    capacity: 7,
    luggage: 5,
    basePrice: 350,
  }
};

export default async function PackagePage({ params }: { params: { slug: string; locale: string } }) {
  const resolvedParams = await params;
  const isAr = resolvedParams.locale === "ar";
  const locale = await getLocale();
  const ChevronIcon = isAr ? ChevronLeft : ChevronRight;

  const pkg = packageData[resolvedParams.slug];

  if (!pkg) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-[1280px]">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-secondary transition-colors">{isAr ? "الرئيسية" : "Home"}</Link>
          <ChevronIcon className="w-4 h-4" />
          <span className="text-primary font-medium">{isAr ? pkg.nameAr : pkg.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[16/9] md:aspect-[4/3] rounded-3xl overflow-hidden relative shadow-2xl">
              <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-video rounded-xl overflow-hidden opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                  <img src={pkg.image} alt={`${pkg.name} thumbnail`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Details & Booking */}
          <div className="space-y-8 lg:py-8">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight">
                {isAr ? pkg.nameAr : pkg.name}
              </h1>
              <p className="text-xl text-muted-foreground mt-4 leading-relaxed">
                {isAr ? pkg.descAr : pkg.desc}
              </p>
            </div>

            <div className="flex items-center gap-6 py-6 border-y border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{isAr ? "الركاب" : "Passengers"}</div>
                  <div className="font-bold text-primary">Up to {pkg.capacity}</div>
                </div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{isAr ? "الحقائب" : "Luggage"}</div>
                  <div className="font-bold text-primary">Up to {pkg.luggage}</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">{isAr ? "تشمل الباقة" : "Package Includes"}</h3>
              <ul className="space-y-3">
                {[
                  isAr ? "سائق محترف يتحدث لغتك" : "Professional bilingual driver",
                  isAr ? "استقبال وترحيب في المطار" : "Airport Meet & Greet",
                  isAr ? "واي فاي مجاني ومياه شرب" : "Free Wi-Fi & Bottled Water",
                  isAr ? "سعر ثابت بدون رسوم خفية" : "Fixed pricing with no hidden fees"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-primary text-primary-foreground p-8 rounded-3xl shadow-xl space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-primary-foreground/70">{isAr ? "السعر المبدئي" : "Starting Price"}</div>
                  <div className="text-4xl font-bold">{pkg.basePrice} <span className="text-xl font-normal">SAR</span></div>
                </div>
                <div className="text-right text-sm text-primary-foreground/70">
                  {isAr ? "قد يختلف السعر حسب المسار" : "Prices vary by route"}
                </div>
              </div>
              <Link 
                href="/booking" 
                className="block w-full bg-secondary text-secondary-foreground text-center py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-secondary/90 transition-all hover:-translate-y-1"
              >
                {isAr ? "احجز هذه الباقة الآن" : "Book This Package Now"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
