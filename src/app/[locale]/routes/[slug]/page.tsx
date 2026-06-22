import { Link } from '@/i18n/routing';
import { getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { MapPin, Clock, Star, ChevronRight, Shield, Phone, CheckCircle2 } from 'lucide-react';
import { seoRoutesData } from '@/lib/seo-routes';
import { RouteFAQ } from '@/components/routes-page/RouteFAQ';

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }) {
  const route = seoRoutesData[params.slug];
  if (!route) return { title: 'Not Found' };
  const isAr = params.locale === 'ar';

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

export default async function RouteDetailPage({ params }: { params: { locale: string; slug: string } }) {
  const locale = await getLocale();
  const isAr = locale === 'ar';
  const route = seoRoutesData[params.slug];
  
  if (!route) notFound();

  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: isAr ? route.nameAr : route.name,
    description: isAr ? route.longDescriptionAr : route.longDescription,
    image: route.image,
    offers: {
      '@type': 'Offer',
      price: route.startingPrice,
      priceCurrency: 'SAR',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A]">
        {/* Hero */}
        <div className="relative bg-[#1B1E4F] pt-24 lg:pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img src={route.image} alt={route.name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#1B1E4F]/90 via-[#1B1E4F]/80 to-[#1B1E4F]" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            {/* Breadcrumbs */}
            <div className="flex items-center justify-center gap-2 text-sm text-white/60 mb-8 font-medium">
              <Link href="/" className="hover:text-[#D9A63A] transition-colors">{isAr ? 'الرئيسية' : 'Home'}</Link>
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              <Link href="/routes" className="hover:text-[#D9A63A] transition-colors">{isAr ? 'المسارات' : 'Routes'}</Link>
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              <span className="text-white">{isAr ? route.nameAr : route.name}</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-[#D9A63A] text-sm font-bold mb-6 backdrop-blur-sm border border-white/10">
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
                <MapPin className="w-6 h-6 text-[#D9A63A] mx-auto mb-2" />
                <div className="text-white font-bold text-xl">{isAr ? route.distanceAr : route.distance}</div>
                <div className="text-white/60 text-xs uppercase">{isAr ? 'المسافة' : 'Distance'}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <Clock className="w-6 h-6 text-[#D9A63A] mx-auto mb-2" />
                <div className="text-white font-bold text-xl">{isAr ? route.durationAr : route.duration}</div>
                <div className="text-white/60 text-xs uppercase">{isAr ? 'المدة المتوقعة' : 'Est. Duration'}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 col-span-2 md:col-span-2">
                <div className="text-white/60 text-xs uppercase mb-1">{isAr ? 'السعر يبدأ من' : 'Starting Price'}</div>
                <div className="text-[#D9A63A] font-bold text-3xl">{route.startingPrice} <span className="text-sm font-normal text-white">SAR</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Why Choose Us */}
            <div>
              <h2 className="text-2xl font-bold text-[#1B1E4F] dark:text-white mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-[#D9A63A]" />
                {isAr ? 'لماذا تختارنا لهذا المسار؟' : 'Why Choose Us for this Route?'}
              </h2>
              <div className="space-y-4">
                {route.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white dark:bg-[#1B1E4F] p-4 rounded-xl border border-gray-100 dark:border-white/10 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-800 dark:text-gray-200 font-medium">
                      {isAr ? highlight.ar : highlight.en}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Box */}
            <div className="bg-white dark:bg-[#1B1E4F] p-8 rounded-3xl border border-gray-100 dark:border-white/10 shadow-xl flex flex-col justify-center text-center">
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
                className="w-full bg-[#1B1E4F] dark:bg-[#D9A63A] text-white dark:text-[#1B1E4F] py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 transition-all mb-4"
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

          {/* FAQs */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-[#1B1E4F] dark:text-white mb-10">
              {isAr ? 'الأسئلة الشائعة حول المسار' : 'Frequently Asked Questions'}
            </h2>
            <RouteFAQ faqs={route.faqs} />
          </div>

        </div>
      </div>
    </>
  );
}
