import { mockRoutes } from "@/lib/data";
import { Link } from "@/i18n/routing";
import { Clock, MapPin, ArrowRight, ArrowLeft } from "lucide-react";

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
          {mockRoutes.map((route) => (
            <div 
              key={route.id}
              className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-border flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={route.image} 
                  alt={`${route.origin} to ${route.destination}`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-sm font-medium text-white/80">{isAr ? "السعر يبدأ من" : "Starting from"}</span>
                  <div className="text-3xl font-bold">{route.startingPrice} <span className="text-sm font-normal">SAR</span></div>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between text-xl font-bold text-foreground mb-6">
                  <span>{route.origin}</span>
                  <ArrowIcon className="text-secondary w-6 h-6 mx-2 flex-shrink-0" />
                  <span className="text-right">{route.destination}</span>
                </div>
                
                <div className="flex flex-col gap-3 text-muted-foreground bg-muted/50 p-4 rounded-xl mb-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-secondary" />
                    <div>
                      <div className="text-sm font-medium text-foreground">{isAr ? "المسافة التقريبية" : "Approximate Distance"}</div>
                      <div className="text-sm">{route.distance}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-secondary" />
                    <div>
                      <div className="text-sm font-medium text-foreground">{isAr ? "وقت الرحلة المتوقع" : "Estimated Travel Time"}</div>
                      <div className="text-sm">{route.duration}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                  <Link 
                    href={`/booking?route=${route.id}`} 
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-bold transition-colors shadow-md"
                  >
                    {isAr ? "احجز هذه الرحلة" : "Book This Route"}
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
