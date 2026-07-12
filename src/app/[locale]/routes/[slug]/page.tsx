import { Link } from '@/i18n/routing';
import { getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { MapPin, Clock, Star, ChevronRight, Shield, Phone, CheckCircle2, Car } from 'lucide-react';
import { seoRoutesData } from '@/lib/seo-routes';
import { RouteFAQ } from '@/components/routes-page/RouteFAQ';
import connectToDatabase from '@/lib/db';
import Route from '@/lib/models/Route';
import RoutePricing from '@/lib/models/RoutePricing';
import { getFallbackPricings } from '@/lib/fallbackData';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug, locale } = await params;
  const route = seoRoutesData[slug];
  if (!route) return { title: 'Not Found' };
  const isAr = locale === 'ar';

  return {
    title: isAr
      ? `${route.nameAr} | ميهار للنقل الفاخر`
      : `${route.name} | Mehar Premium Transport`,
    description: isAr ? route.descriptionAr : route.description,
    openGraph: {
      title: isAr ? route.nameAr : route.name,
      description: isAr ? route.longDescriptionAr : route.longDescription,
      images: [route.image],
    },
  };
}

export function generateStaticParams() {
  return Object.keys(seoRoutesData).map(slug => ({ slug }));
}

export default async function RouteDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const isAr = locale === 'ar';
  const route = seoRoutesData[slug];
  
  if (!route) notFound();

  let livePricings: any[] = [];
  try {
    await connectToDatabase();
    const dbRoute = await Route.findOne({ slug }).lean();
    if (dbRoute) {
      const pricings = await RoutePricing.find({ routeId: dbRoute._id, isActive: true })
        .populate('vehicleId')
        .lean();
      livePricings = JSON.parse(JSON.stringify(pricings)).filter((p: any) => p.vehicleId?.active !== false);
    }
  } catch (e) {
    console.error("Failed to fetch live pricing:", e);
  }

  // Use fallback if no DB data
  if (livePricings.length === 0) {
    const fallbackPricings = getFallbackPricings();
    livePricings = fallbackPricings.filter(p => p.route.slug === slug);
  }

  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: isAr ? route.nameAr : route.name,
    description: isAr ? route.longDescriptionAr : route.longDescription,
    image: route.image,
    offers: {
      '@type': 'Offer',
      price: livePricings.length > 0 ? Math.min(...livePricings.map(p => p.currentPrice)) : route.startingPrice,
      priceCurrency: 'SAR',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A]">
        {/* Hero */}
        <div className="relative bg-primary pt-24 lg:pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img src={route.image} alt={route.name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            {/* Breadcrumbs */}
            <div className="flex items-center justify-center gap-2 text-sm text-white/60 mb-8 font-medium">
              <Link href="/" className="hover:text-secondary transition-colors">{isAr ? 'الرئيسية' : 'Home'}</Link>
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              <Link href="/routes" className="hover:text-secondary transition-colors">{isAr ? 'المسارات' : 'Routes'}</Link>
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              <span className="text-white">{isAr ? route.nameAr : route.name}</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-secondary text-sm font-bold mb-6 backdrop-blur-sm border border-white/10">
              <Star className="w-4 h-4 fill-current" />
              {isAr ? 'مسار مميز' : 'Featured Route'}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              {isAr ? route.nameAr : route.name}
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-3xl mx-auto">
              {isAr ? route.longDescriptionAr : route.longDescription}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <MapPin className="w-6 h-6 text-secondary mx-auto mb-2" />
                <div className="text-white font-bold text-xl">{isAr ? route.distanceAr : route.distance}</div>
                <div className="text-white/60 text-xs uppercase">{isAr ? 'المسافة' : 'Distance'}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <Clock className="w-6 h-6 text-secondary mx-auto mb-2" />
                <div className="text-white font-bold text-xl">{isAr ? route.durationAr : route.duration}</div>
                <div className="text-white/60 text-xs uppercase">{isAr ? 'المدة المتوقعة' : 'Est. Duration'}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 col-span-2 md:col-span-2">
                <div className="text-white/60 text-xs uppercase mb-1">{isAr ? 'السعر يبدأ من' : 'Starting Price'}</div>
                <div className="text-secondary font-bold text-3xl">{route.startingPrice} <span className="text-sm font-normal text-white">SAR</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Why Choose Us */}
            <div>
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-secondary" />
                {isAr ? 'لماذا تختارنا لهذا المسار؟' : 'Why Choose Us for this Route?'}
              </h2>
              <div className="space-y-4">
                {route.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white dark:bg-primary p-4 rounded-xl border border-gray-100 dark:border-white/10 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-800 dark:text-gray-200 font-medium">
                      {isAr ? highlight.ar : highlight.en}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Box */}
            <div className="bg-white dark:bg-primary p-8 rounded-3xl border border-gray-100 dark:border-white/10 shadow-xl flex flex-col justify-center text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {isAr ? 'جاهز للحجز؟' : 'Ready to Book?'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                {isAr 
                  ? 'احجز سيارتك الفاخرة الآن بأسعار تنافسية وموثوقية عالية.' 
                  : 'Book your premium vehicle now with competitive rates and high reliability.'}
              </p>
              <Link 
                href="/booking" 
                className="w-full bg-primary dark:bg-secondary text-white dark:text-primary py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 transition-all mb-4"
              >
                {isAr ? 'احجز هذه الرحلة الآن' : 'Book This Route Now'}
              </Link>
              <a 
                href="https://wa.me/966565638120" 
                target="_blank" 
                className="w-full flex items-center justify-center gap-2 border-2 border-[#25D366] text-[#25D366] py-3.5 rounded-xl font-bold hover:bg-[#25D366] hover:text-white transition-all"
              >
                <Phone className="w-5 h-5" />
                {isAr ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
              </a>
            </div>
          </div>

          {/* Live Pricing Table */}
          {livePricings.length > 0 && (
            <div className="mt-16 mb-16">
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-6 flex items-center gap-2">
                <Car className="w-6 h-6 text-secondary" />
                {isAr ? 'أسعار المركبات المتاحة' : 'Available Vehicle Prices'}
              </h2>
              <div className="bg-white dark:bg-primary rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-sm text-left rtl:text-right">
                    <thead className="bg-gray-50/80 dark:bg-black/20 text-gray-500 dark:text-gray-400 font-medium border-b border-gray-100 dark:border-white/10">
                      <tr>
                        <th className="px-6 py-4">{isAr ? 'المركبة' : 'Vehicle'}</th>
                        <th className="px-6 py-4">{isAr ? 'السعة' : 'Capacity'}</th>
                        <th className="px-6 py-4">{isAr ? 'السعر (SAR)' : 'Price (SAR)'}</th>
                        <th className="px-6 py-4 text-center">{isAr ? 'إجراء' : 'Action'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/10">
                      {livePricings.map((pricing: any) => {
                        const vehicle = pricing.vehicleId || pricing.vehicle;
                        return (
                          <tr key={pricing._id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                {vehicle.image ? (
                                  <div className="w-12 h-8 bg-gray-100 dark:bg-white/10 rounded overflow-hidden flex items-center justify-center shrink-0">
                                    <img src={vehicle.image} alt={vehicle.name} className="h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                                  </div>
                                ) : (
                                  <Car className="w-6 h-6 text-gray-400" />
                                )}
                                <div>
                                  <div className="font-bold text-gray-900 dark:text-white">
                                    {isAr ? vehicle.nameAr : vehicle.name}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {isAr ? vehicle.typeAr : vehicle.type}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-gray-600 dark:text-gray-300 font-medium">
                                {isAr ? `${vehicle.passengers} ركاب` : `Up to ${vehicle.passengers} pax`}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-xl font-bold text-secondary">
                                {pricing.currentPrice}
                              </div>
                              {pricing.currentPrice > pricing.basePrice && (
                                <div className="text-[10px] text-red-500 font-bold uppercase">
                                  {isAr ? 'سعر موسم الذروة' : 'Peak Season Rate'}
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 text-center">
                              <Link
                                href={`/booking?routeId=${route._id || route.slug}&vehicleId=${vehicle._id}`}
                                className="inline-flex items-center justify-center bg-primary dark:bg-white text-white dark:text-primary px-4 py-2 rounded-lg text-xs font-bold hover:bg-opacity-90 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                              >
                                {isAr ? 'اختيار' : 'Select'}
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* FAQs */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-primary dark:text-white mb-10">
              {isAr ? 'الأسئلة الشائعة حول المسار' : 'Frequently Asked Questions'}
            </h2>
            <RouteFAQ faqs={route.faqs} />
          </div>

        </div>
      </div>
    </>
  );
}
