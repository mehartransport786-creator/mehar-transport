import { Link } from '@/i18n/routing';
import { getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { MapPin, Car, Clock, Star, ChevronRight, Users, Shield, Phone } from 'lucide-react';

const citiesData: Record<string, {
  name: string; nameAr: string;
  tagline: string; taglineAr: string;
  description: string; descriptionAr: string;
  longDescription: string; longDescriptionAr: string;
  image: string;
  routes: { name: string; nameAr: string; distance: string; duration: string; price: string }[];
  stats: { vehicles: number; routes: number; rating: number; trips: string };
  color: string;
  highlights: { en: string; ar: string }[];
}> = {
  jeddah: {
    name: 'Jeddah', nameAr: 'جدة',
    tagline: 'Gateway to the Holy Cities', taglineAr: 'بوابة المدن المقدسة',
    description: 'Premium transport hub at King Abdulaziz International Airport.',
    descriptionAr: 'مركز النقل الفاخر في مطار الملك عبدالعزيز الدولي.',
    longDescription: 'As the main arrival point for Hajj and Umrah pilgrims, Jeddah is where your sacred journey begins. Our fleet operates 24/7 from King Abdulaziz International Airport, offering seamless transfers to Makkah, Madinah, and all hotels in the Jeddah metropolitan area. Whether you need an airport pickup, a hotel transfer, or an intercity ride, our professional drivers ensure a comfortable and safe journey.',
    longDescriptionAr: 'كونها نقطة الوصول الرئيسية لحجاج العمرة والحج، جدة هي المكان الذي تبدأ فيه رحلتك المقدسة. يعمل أسطولنا على مدار الساعة من مطار الملك عبدالعزيز الدولي، ويقدم تنقلات سلسة إلى مكة والمدينة وجميع الفنادق في منطقة جدة.',
    image: '/images/hero/vip-fleet.jpg',
    routes: [
      { name: 'Jeddah → Makkah', nameAr: 'جدة → مكة', distance: '85 km', duration: '1h 15min', price: 'From 200 SAR' },
      { name: 'Jeddah → Madinah', nameAr: 'جدة → المدينة', distance: '420 km', duration: '4h 30min', price: 'From 800 SAR' },
      { name: 'Jeddah → Taif', nameAr: 'جدة → الطائف', distance: '170 km', duration: '2h', price: 'From 400 SAR' },
      { name: 'Airport Transfers', nameAr: 'تنقلات المطار', distance: 'Varies', duration: '30-60min', price: 'From 150 SAR' },
    ],
    stats: { vehicles: 42, routes: 8, rating: 4.9, trips: '15,000+' },
    color: '#1B1E4F',
    highlights: [
      { en: '24/7 Airport pickup & drop-off', ar: 'خدمة توصيل المطار 24/7' },
      { en: 'Meet & Greet at arrivals terminal', ar: 'استقبال في صالة الوصول' },
      { en: 'Free waiting time for flight delays', ar: 'وقت انتظار مجاني لتأخر الرحلات' },
      { en: 'Child seats available on request', ar: 'مقاعد أطفال متاحة عند الطلب' },
    ],
  },
  makkah: {
    name: 'Makkah', nameAr: 'مكة المكرمة',
    tagline: 'The Holiest City', taglineAr: 'أقدس مدينة',
    description: 'Sacred city transport for Umrah and Hajj pilgrims.',
    descriptionAr: 'خدمات نقل المدينة المقدسة لحجاج العمرة والحج.',
    longDescription: 'We provide premium transportation services in and around the holiest city in Islam. Our experienced drivers are well-versed in navigating Makkah\'s roads during peak seasons, ensuring you reach Al-Masjid al-Haram and your hotel safely and comfortably. We offer transfers from Jeddah Airport, inter-hotel shuttles, and trips to nearby holy sites.',
    longDescriptionAr: 'نقدم خدمات نقل فاخرة في أقدس مدينة في الإسلام وحولها. سائقونا ذوو خبرة في التنقل في طرق مكة خلال مواسم الذروة.',
    image: '/images/hero/economy-fleet.jpg',
    routes: [
      { name: 'Makkah → Madinah', nameAr: 'مكة → المدينة', distance: '450 km', duration: '5h', price: 'From 900 SAR' },
      { name: 'Makkah → Jeddah', nameAr: 'مكة → جدة', distance: '85 km', duration: '1h 15min', price: 'From 200 SAR' },
      { name: 'Makkah Hotels', nameAr: 'فنادق مكة', distance: 'City', duration: '15-30min', price: 'From 80 SAR' },
    ],
    stats: { vehicles: 38, routes: 6, rating: 4.9, trips: '12,000+' },
    color: '#D9A63A',
    highlights: [
      { en: 'Drivers experienced in Haram area navigation', ar: 'سائقون ذوو خبرة في منطقة الحرم' },
      { en: 'Hajj and Umrah seasonal availability', ar: 'توفر موسمي للحج والعمرة' },
      { en: 'Group transport for families', ar: 'نقل جماعي للعائلات' },
      { en: 'VIP vehicles for premium experience', ar: 'مركبات VIP لتجربة فاخرة' },
    ],
  },
  madinah: {
    name: 'Madinah', nameAr: 'المدينة المنورة',
    tagline: 'The Radiant City', taglineAr: 'المدينة المنورة',
    description: 'Reliable luxury transport in the Prophet\'s city.',
    descriptionAr: 'خدمات نقل موثوقة وفاخرة في مدينة الرسول.',
    longDescription: 'Madinah holds a special place in every Muslim\'s heart. Our transportation services in the Radiant City include airport transfers from Prince Mohammad bin Abdulaziz International Airport, hotel shuttles, and intercity routes connecting Madinah to Makkah and Jeddah. Our drivers understand the spiritual significance of your journey.',
    longDescriptionAr: 'تحتل المدينة المنورة مكانة خاصة في قلب كل مسلم. تشمل خدمات النقل لدينا تنقلات المطار ونقل الفنادق والطرق بين المدن.',
    image: '/images/hero/vip-fleet.jpg',
    routes: [
      { name: 'Madinah → Makkah', nameAr: 'المدينة → مكة', distance: '450 km', duration: '5h', price: 'From 900 SAR' },
      { name: 'Madinah → Jeddah', nameAr: 'المدينة → جدة', distance: '420 km', duration: '4h 30min', price: 'From 800 SAR' },
      { name: 'Madinah Airport', nameAr: 'مطار المدينة', distance: 'Varies', duration: '20-40min', price: 'From 100 SAR' },
    ],
    stats: { vehicles: 30, routes: 5, rating: 4.8, trips: '8,000+' },
    color: '#16A34A',
    highlights: [
      { en: 'Airport transfers to/from MED Airport', ar: 'تنقلات من وإلى مطار المدينة' },
      { en: 'Ziyarat tours to historical sites', ar: 'جولات زيارة للمواقع التاريخية' },
      { en: 'Comfortable long-distance intercity rides', ar: 'رحلات مريحة بين المدن' },
      { en: 'Multilingual drivers', ar: 'سائقون متعددو اللغات' },
    ],
  },
  riyadh: {
    name: 'Riyadh', nameAr: 'الرياض',
    tagline: 'The Capital City', taglineAr: 'العاصمة',
    description: 'Corporate and executive transportation in the capital.',
    descriptionAr: 'خدمات النقل التنفيذية والشركات في العاصمة.',
    longDescription: 'Saudi Arabia\'s capital city demands premium executive transportation. Whether you need airport transfers from King Khalid International Airport, corporate event transport, or VIP chauffeur services for business meetings, our Riyadh fleet delivers unmatched professionalism and luxury.',
    longDescriptionAr: 'تتطلب عاصمة المملكة العربية السعودية خدمات نقل تنفيذية فاخرة. سواء كنت تحتاج تنقلات المطار أو نقل فعاليات الشركات أو خدمات السائق الخاص.',
    image: '/images/hero/economy-fleet.jpg',
    routes: [
      { name: 'Riyadh Airport Transfers', nameAr: 'تنقلات مطار الرياض', distance: 'Varies', duration: '30-60min', price: 'From 150 SAR' },
      { name: 'Corporate Events', nameAr: 'فعاليات الشركات', distance: 'City', duration: 'Varies', price: 'Custom' },
      { name: 'VIP Chauffeur', nameAr: 'سائق خاص VIP', distance: 'City', duration: 'Hourly', price: 'From 200 SAR/hr' },
    ],
    stats: { vehicles: 25, routes: 4, rating: 4.9, trips: '5,000+' },
    color: '#7C3AED',
    highlights: [
      { en: 'Executive sedans and SUVs', ar: 'سيارات سيدان و SUV تنفيذية' },
      { en: 'Corporate billing & invoicing', ar: 'فواتير الشركات' },
      { en: 'Multilingual professional chauffeurs', ar: 'سائقون محترفون متعددو اللغات' },
      { en: 'Event transportation coordination', ar: 'تنسيق نقل الفعاليات' },
    ],
  },
  taif: {
    name: 'Taif', nameAr: 'الطائف',
    tagline: 'City of Roses', taglineAr: 'مدينة الورود',
    description: 'Scenic mountain transfers to the summer capital.',
    descriptionAr: 'رحلات جبلية خلابة إلى عاصمة الصيف.',
    longDescription: 'Known as the City of Roses, Taif sits high in the Hejaz Mountains offering cool mountain air and stunning scenery. We provide comfortable transfers from Jeddah and Makkah through beautiful highland roads. Perfect for day trips, family outings, or extended stays in this charming mountain retreat.',
    longDescriptionAr: 'تُعرف الطائف بمدينة الورود، وتقع في أعالي جبال الحجاز وتوفر هواءً جبلياً منعشاً ومناظر خلابة. نوفر تنقلات مريحة من جدة ومكة.',
    image: '/images/hero/vip-fleet.jpg',
    routes: [
      { name: 'Jeddah → Taif', nameAr: 'جدة → الطائف', distance: '170 km', duration: '2h', price: 'From 400 SAR' },
      { name: 'Makkah → Taif', nameAr: 'مكة → الطائف', distance: '90 km', duration: '1h 30min', price: 'From 250 SAR' },
      { name: 'Taif City Tours', nameAr: 'جولات الطائف', distance: 'City', duration: '4-8h', price: 'From 500 SAR' },
    ],
    stats: { vehicles: 15, routes: 3, rating: 4.8, trips: '3,000+' },
    color: '#F59E0B',
    highlights: [
      { en: 'Scenic mountain route experience', ar: 'تجربة الطريق الجبلي الخلاب' },
      { en: 'Day trip packages available', ar: 'باقات رحلات يومية متاحة' },
      { en: 'Comfortable SUVs for mountain roads', ar: 'سيارات SUV مريحة للطرق الجبلية' },
      { en: 'Rose garden and heritage site tours', ar: 'جولات حدائق الورود والمواقع التراثية' },
    ],
  },
};

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }) {
  const city = citiesData[params.slug];
  if (!city) return { title: 'Not Found' };
  const isAr = params.locale === 'ar';

  return {
    title: isAr
      ? `خدمات النقل في ${city.nameAr} | ميهار للنقل`
      : `Transportation in ${city.name} | Mehar Transport`,
    description: isAr ? city.descriptionAr : city.description,
    openGraph: {
      title: isAr ? `النقل في ${city.nameAr}` : `Transport in ${city.name}`,
      description: isAr ? city.longDescriptionAr : city.longDescription,
    },
  };
}

export function generateStaticParams() {
  return Object.keys(citiesData).map(slug => ({ slug }));
}

export default async function CityDetailPage({ params }: { params: { locale: string; slug: string } }) {
  const locale = await getLocale();
  const isAr = locale === 'ar';
  const city = citiesData[params.slug];
  if (!city) notFound();

  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Mehar Transport - ${city.name}`,
    description: city.description,
    geo: { '@type': 'GeoCoordinates', latitude: 22.8273029, longitude: 39.9450464 },
    areaServed: { '@type': 'City', name: city.name },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: city.stats.rating.toString(), reviewCount: '500' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A]">
        {/* Hero */}
        <div className="relative bg-primary pt-24 lg:pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img src={city.image} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-white/60 mb-8 font-medium">
              <Link href="/" className="hover:text-secondary transition-colors">{isAr ? 'الرئيسية' : 'Home'}</Link>
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              <Link href="/cities" className="hover:text-secondary transition-colors">{isAr ? 'المدن' : 'Cities'}</Link>
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              <span className="text-white">{isAr ? city.nameAr : city.name}</span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-4 h-4 rounded-full" style={{ background: city.color }} />
              <span className="text-white/70 font-medium">{isAr ? city.taglineAr : city.tagline}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              {isAr ? `النقل في ${city.nameAr}` : `Transport in ${city.name}`}
            </h1>
            <p className="text-lg text-white/70 max-w-3xl mb-10">
              {isAr ? city.longDescriptionAr : city.longDescription}
            </p>

            {/* Stats Bar */}
            <div className="flex flex-wrap gap-6">
              {[
                { icon: Car, label: isAr ? 'مركبة' : 'Vehicles', value: city.stats.vehicles },
                { icon: MapPin, label: isAr ? 'مسار' : 'Routes', value: city.stats.routes },
                { icon: Star, label: isAr ? 'تقييم' : 'Rating', value: city.stats.rating },
                { icon: Users, label: isAr ? 'رحلة' : 'Trips', value: city.stats.trips },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/10">
                  <stat.icon className="w-5 h-5 text-secondary" />
                  <div>
                    <div className="text-white font-bold text-lg">{stat.value}</div>
                    <div className="text-white/50 text-xs uppercase tracking-wider">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

          {/* Available Routes */}
          <section>
            <h2 className="text-3xl font-bold text-primary dark:text-white mb-8">
              {isAr ? `المسارات المتاحة من ${city.nameAr}` : `Available Routes from ${city.name}`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {city.routes.map((route, i) => (
                <div key={i} className="bg-white dark:bg-primary rounded-2xl p-6 border border-gray-100 dark:border-white/10 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {isAr ? route.nameAr : route.name}
                  </h3>
                  <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                    <div>
                      <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">{isAr ? 'المسافة' : 'Distance'}</div>
                      <div className="font-bold text-gray-800 dark:text-gray-200">{route.distance}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">{isAr ? 'المدة' : 'Duration'}</div>
                      <div className="font-bold text-gray-800 dark:text-gray-200">{route.duration}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">{isAr ? 'السعر' : 'Price'}</div>
                      <div className="font-bold text-secondary">{route.price}</div>
                    </div>
                  </div>
                  <Link
                    href="/booking"
                    className="inline-flex items-center gap-2 text-sm font-bold text-primary dark:text-secondary hover:underline"
                  >
                    {isAr ? 'احجز هذا المسار' : 'Book This Route'} <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Why Choose Us */}
          <section>
            <h2 className="text-3xl font-bold text-primary dark:text-white mb-8">
              {isAr ? `لماذا تختار ميهار في ${city.nameAr}` : `Why Choose Mehar in ${city.name}`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {city.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-4 bg-white dark:bg-primary p-5 rounded-xl border border-gray-100 dark:border-white/10">
                  <Shield className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
                  <span className="text-gray-800 dark:text-gray-200 font-medium">{isAr ? h.ar : h.en}</span>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="bg-primary rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-secondary rounded-full opacity-10 blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {isAr ? `احجز رحلتك في ${city.nameAr} الآن` : `Book Your ${city.name} Transfer Now`}
              </h2>
              <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                {isAr ? 'أسطول حديث وسائقون محترفون ومتوفرون على مدار الساعة' : 'Modern fleet, professional drivers, available 24/7'}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/booking" className="px-8 py-4 bg-secondary text-primary font-bold rounded-xl hover:bg-white transition-colors text-lg">
                  {isAr ? 'احجز الآن' : 'Book Now'}
                </Link>
                <a href="https://wa.me/966565638120" target="_blank" className="px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-lg flex items-center gap-2">
                  <Phone className="w-5 h-5" /> {isAr ? 'واتساب' : 'WhatsApp'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
