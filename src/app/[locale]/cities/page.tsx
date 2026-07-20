import { Link } from '@/i18n/routing';
import { getLocale } from 'next-intl/server';
import { MapPin, ArrowRight, Car, Clock, Star } from 'lucide-react';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const isAr = params.locale === 'ar';
  return {
    title: isAr ? 'المدن التي نخدمها | ميهار للنقل' : 'Cities We Serve | Mehar Transport',
    description: isAr
      ? 'خدمات النقل الفاخر في أهم مدن المملكة العربية السعودية: جدة، مكة، المدينة، الرياض، الطائف'
      : 'Premium transportation services across Saudi Arabia\'s major cities: Jeddah, Makkah, Madinah, Riyadh, Taif',
    openGraph: {
      title: isAr ? 'المدن التي نخدمها | ميهار للنقل' : 'Cities We Serve | Mehar Transport',
      description: isAr
        ? 'خدمات النقل الفاخر في أهم مدن المملكة العربية السعودية'
        : 'Premium transportation services across Saudi Arabia\'s major cities',
    }
  };
}

const cities = [
  {
    slug: 'jeddah',
    name: 'Jeddah',
    nameAr: 'جدة',
    tagline: 'Gateway to the Holy Cities',
    taglineAr: 'بوابة المدن المقدسة',
    description: 'As the main arrival point for Hajj and Umrah pilgrims, Jeddah is a bustling metropolis with world-class infrastructure. Our fleet operates 24/7 from King Abdulaziz International Airport.',
    descriptionAr: 'كونها نقطة الوصول الرئيسية لحجاج العمرة والحج، جدة مدينة حيوية بنية تحتية عالمية المستوى.',
    image: '/cities/jeddah-new.jpeg',
    routes: ['Jeddah → Makkah', 'Jeddah → Madinah', 'Jeddah Airport Transfers'],
    stats: { vehicles: 42, routes: 8, rating: 4.9 },
    color: '#1B1E4F',
  },
  {
    slug: 'makkah',
    name: 'Makkah',
    nameAr: 'مكة المكرمة',
    tagline: 'The Holiest City',
    taglineAr: 'أقدس مدينة',
    description: 'Premium transport to and around Makkah for Umrah and Hajj pilgrims. Experienced drivers navigating the sacred city with respect and efficiency.',
    descriptionAr: 'خدمات النقل الفاخرة من وإلى مكة المكرمة للحجاج والمعتمرين.',
    image: '/cities/makkah-n.jpg',
    routes: ['Makkah → Madinah', 'Makkah → Jeddah', 'Makkah Hotels'],
    stats: { vehicles: 38, routes: 6, rating: 4.9 },
    color: '#df9a26',
  },
  {
    slug: 'madinah',
    name: 'Madinah',
    nameAr: 'المدينة المنورة',
    tagline: 'The Radiant City',
    taglineAr: 'المدينة المنورة',
    description: 'Reliable luxury transport in the Prophet\'s city. Airport pickups, hotel transfers, and intercity routes connecting Madinah to Makkah and Jeddah.',
    descriptionAr: 'خدمات نقل موثوقة وفاخرة في مدينة الرسول.',
    image: '/cities/madinah-n.jpg',
    routes: ['Madinah → Makkah', 'Madinah → Jeddah', 'Madinah Airport'],
    stats: { vehicles: 30, routes: 5, rating: 4.8 },
    color: '#16A34A',
  },
  {
    slug: 'riyadh',
    name: 'Riyadh',
    nameAr: 'الرياض',
    tagline: 'The Capital City',
    taglineAr: 'العاصمة',
    description: 'Corporate and executive transportation in Saudi Arabia\'s capital. Airport transfers, business events, and VIP chauffeur services.',
    descriptionAr: 'خدمات النقل التنفيذية والشركات في عاصمة المملكة.',
    image: '/cities/riyadh-n.jpg',
    routes: ['Riyadh Airport Transfers', 'Corporate Events', 'VIP Services'],
    stats: { vehicles: 25, routes: 4, rating: 4.9 },
    color: '#7C3AED',
  },
  {
    slug: 'taif',
    name: 'Taif',
    nameAr: 'الطائف',
    tagline: 'City of Roses',
    taglineAr: 'مدينة الورود',
    description: 'Scenic mountain transfers to Taif, the summer capital. Perfect for day trips from Makkah or Jeddah through beautiful highland roads.',
    descriptionAr: 'رحلات جبلية خلابة إلى الطائف، عاصمة الصيف.',
    image: '/cities/taif.webp',
    routes: ['Jeddah → Taif', 'Makkah → Taif', 'Taif Tours'],
    stats: { vehicles: 15, routes: 3, rating: 4.8 },
    color: '#F59E0B',
  },
];

export default async function CitiesPage() {
  const locale = await getLocale();
  const isAr = locale === 'ar';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A]">
      {/* Hero */}
      <div className="relative bg-primary py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-secondary to-transparent rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/80 text-sm font-medium mb-6 backdrop-blur-sm border border-white/10">
            <MapPin className="w-4 h-4 text-secondary" />
            {isAr ? '5 مدن رئيسية' : '5 Major Cities'}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            {isAr ? 'المدن التي نخدمها' : 'Cities We Serve'}
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            {isAr
              ? 'خدمات النقل الفاخر تغطي أهم مدن المملكة العربية السعودية بأسطول حديث وسائقين محترفين'
              : 'Premium transportation services covering Saudi Arabia\'s most important cities with modern fleet and professional drivers'}
          </p>
        </div>
      </div>

      {/* Cities Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map((city, index) => (
            <Link
              key={city.slug}
              href={`/cities/${city.slug}`}
              className={`group bg-white dark:bg-primary rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/10 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ${index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
            >
              <div className={`relative ${index === 0 ? 'h-72' : 'h-56'} w-full overflow-hidden`}>
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: city.color }} />
                    <span className="text-white/80 text-sm font-medium">
                      {isAr ? city.taglineAr : city.tagline}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-white">
                    {isAr ? city.nameAr : city.name}
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {isAr ? city.descriptionAr : city.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Car className="w-3.5 h-3.5" /> {city.stats.vehicles} {isAr ? 'مركبة' : 'vehicles'}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {city.stats.routes} {isAr ? 'مسار' : 'routes'}</span>
                  <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-500" /> {city.stats.rating}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {city.routes.map(route => (
                    <span key={route} className="px-3 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                      {route}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-primary rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-secondary rounded-full opacity-10 blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">
              {isAr ? 'احجز رحلتك في أي مدينة' : 'Book Your Ride in Any City'}
            </h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              {isAr
                ? 'أسطول حديث ومتوفر على مدار الساعة في جميع المدن الرئيسية بالمملكة'
                : 'Modern fleet available 24/7 across all major Saudi Arabian cities'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/booking"
                className="px-8 py-4 bg-secondary text-primary font-bold rounded-xl hover:bg-white transition-colors text-lg"
              >
                {isAr ? 'احجز الآن' : 'Book Now'}
              </Link>
              <a
                href="https://wa.me/966565638120"
                target="_blank"
                className="px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-lg"
              >
                {isAr ? 'تواصل عبر واتساب' : 'WhatsApp Us'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
