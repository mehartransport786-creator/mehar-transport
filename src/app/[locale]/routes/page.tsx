import { seoRoutesList } from "@/lib/seo-routes";
import { Link } from "@/i18n/routing";
import { Clock, MapPin, ArrowRight, ArrowLeft, ChevronRight } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "مسارات النقل | ميهار للنقل" : "Our Routes | Mehar Transport",
    description: isAr ? "استكشف مسارات النقل الشائعة لدينا وتعرف على الأسعار وأوقات الرحلات" : "Explore our popular transport routes, pricing, and travel times.",
  };
}

export default async function RoutesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isAr ? "مسارات النقل الشائعة" : "Popular Transfer Routes"}
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            {isAr 
              ? "نوفر لك رحلات آمنة ومريحة بين المدن الرئيسية والمطارات في المملكة بأسعار تنافسية."
              : "We provide safe and comfortable journeys between major cities and airports in the Kingdom at competitive prices."}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {seoRoutesList.map((route) => (
            <div 
              key={route.slug}
              className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-border flex flex-col group"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={route.image} 
                  alt={isAr ? route.nameAr : route.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {isAr ? 'المسارات المميزة' : 'Popular'}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-sm font-medium text-white/80">{isAr ? "السعر يبدأ من" : "Starting from"}</span>
                  <div className="text-3xl font-bold text-[#D9A63A]">{route.startingPrice} <span className="text-sm font-normal text-white">SAR</span></div>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between text-xl font-bold text-foreground mb-4">
                  <span>{isAr ? route.originAr : route.origin}</span>
                  <ArrowIcon className="text-secondary w-6 h-6 mx-2 flex-shrink-0" />
                  <span className="text-right">{isAr ? route.destinationAr : route.destination}</span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                  {isAr ? route.descriptionAr : route.description}
                </p>

                <div className="flex flex-col gap-3 text-muted-foreground bg-muted/30 border border-border/50 p-4 rounded-xl mb-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-secondary" />
                    <div>
                      <div className="text-xs font-medium text-foreground uppercase">{isAr ? "المسافة" : "Distance"}</div>
                      <div className="text-sm font-bold text-foreground">{isAr ? route.distanceAr : route.distance}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-secondary" />
                    <div>
                      <div className="text-xs font-medium text-foreground uppercase">{isAr ? "وقت الرحلة" : "Duration"}</div>
                      <div className="text-sm font-bold text-foreground">{isAr ? route.durationAr : route.duration}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto flex flex-col sm:flex-row gap-3">
                  <Link 
                    href={`/routes/${route.slug}`} 
                    className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-primary hover:bg-primary/5 text-primary px-4 py-2.5 rounded-lg font-bold transition-colors"
                  >
                    {isAr ? "تفاصيل المسار" : "Route Details"}
                  </Link>
                  <Link 
                    href={`/booking`} 
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2.5 rounded-lg font-bold transition-colors shadow-md"
                  >
                    {isAr ? "احجز الآن" : "Book Now"} <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
