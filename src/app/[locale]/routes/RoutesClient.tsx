'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { Clock, MapPin, ArrowRight, ArrowLeft, ChevronRight, Search, Filter } from 'lucide-react';

export default function RoutesClient({ routes, isAr }: { routes: any[]; isAr: boolean }) {
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredRoutes = routes.filter(route => {
    const matchSearch = !searchTerm || [route.name, route.nameAr, route.origin, route.originAr, route.destination, route.destinationAr]
      .join(' ').toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = filterType === 'all' || route.routeType === filterType;
    return matchSearch && matchType;
  });

  const getRouteImage = (route: any) => {
    if (route.routeType === 'airport_transfer') return '/routes/jeddah-airport.png';
    if (route.routeType === 'ziyarat') return '/routes/makkah-premium.png';
    return '/routes/madinah-ziyarat.png'; // fallback intercity
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-[#1B1E4F] text-white py-20 relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[150%] bg-white/5 rotate-12 blur-3xl rounded-full"></div>
          <div className="absolute top-[60%] -left-[10%] w-[40%] h-[100%] bg-[#D9A63A]/10 -rotate-12 blur-3xl rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            {isAr ? "مسارات النقل الشائعة" : "Popular Transfer Routes"}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-medium">
            {isAr 
              ? "نوفر لك رحلات آمنة ومريحة بين المدن الرئيسية والمطارات في المملكة بأسعار تنافسية."
              : "Safe and comfortable journeys between major cities and airports in the Kingdom at competitive prices."}
          </p>

          <div className="max-w-3xl mx-auto mt-10">
            <div className="flex flex-col md:flex-row items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
              <div className="flex-1 flex items-center gap-3 bg-white rounded-xl px-4 py-3 w-full">
                <Search className="w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder={isAr ? "ابحث عن مدينة، مطار أو فندق..." : "Search city, airport or hotel..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent border-none outline-none text-gray-800 w-full font-medium"
                />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar shrink-0">
                <button onClick={() => setFilterType('all')} className={`px-4 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-colors ${filterType === 'all' ? 'bg-[#D9A63A] text-white shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                  {isAr ? "الكل" : "All"}
                </button>
                <button onClick={() => setFilterType('airport_transfer')} className={`px-4 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-colors ${filterType === 'airport_transfer' ? 'bg-[#D9A63A] text-white shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                  {isAr ? "نقل المطار" : "Airport"}
                </button>
                <button onClick={() => setFilterType('intercity')} className={`px-4 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-colors ${filterType === 'intercity' ? 'bg-[#D9A63A] text-white shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                  {isAr ? "بين المدن" : "Intercity"}
                </button>
                <button onClick={() => setFilterType('ziyarat')} className={`px-4 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-colors ${filterType === 'ziyarat' ? 'bg-[#D9A63A] text-white shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                  {isAr ? "المزارات" : "Ziyarat"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[#1B1E4F]">
            {filteredRoutes.length} {isAr ? "مسار متاح" : "Routes Available"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRoutes.map((route) => {
            const minPrice = route.prices && route.prices.length > 0 ? Math.min(...route.prices) : 0; // Using fallback pricing or real prices if populated

            return (
              <div 
                key={route._id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col group relative"
              >
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img 
                    src={getRouteImage(route)} 
                    alt={isAr ? route.nameAr : route.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <span className="bg-white/90 backdrop-blur-md text-[#1B1E4F] text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                      {isAr ? (route.routeType === 'airport_transfer' ? 'مطار' : route.routeType === 'ziyarat' ? 'مزارات' : 'بين المدن') : (route.routeType || 'intercity').replace('_', ' ')}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    {minPrice > 0 && (
                      <>
                        <span className="text-xs font-bold text-white/80 uppercase tracking-wider">{isAr ? "يبدأ من" : "Starting from"}</span>
                        <div className="text-3xl font-black text-[#D9A63A] leading-none mt-1">
                          {minPrice} <span className="text-sm font-bold text-white">SAR</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between text-lg font-black text-[#1B1E4F] mb-6">
                    <span className="truncate">{isAr ? route.originAr || route.origin : route.origin}</span>
                    <ArrowIcon className="text-gray-300 w-5 h-5 mx-2 flex-shrink-0" />
                    <span className="text-right truncate">{isAr ? route.destinationAr || route.destination : route.destination}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-gray-500 mb-6">
                    <div className="flex items-center gap-2.5 bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{isAr ? "المسافة" : "Distance"}</div>
                        <div className="text-sm font-bold text-gray-700">{route.distanceKm ? `${route.distanceKm} km` : '—'}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{isAr ? "الوقت" : "Duration"}</div>
                        <div className="text-sm font-bold text-gray-700">{route.averageDurationMins ? `${route.averageDurationMins} min` : '—'}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto flex gap-3">
                    <Link 
                      href={`/routes/${route.slug || route._id}`} 
                      className="flex-1 inline-flex items-center justify-center border-2 border-gray-100 hover:border-[#1B1E4F] text-gray-600 hover:text-[#1B1E4F] px-4 py-3 rounded-xl font-bold transition-colors text-sm"
                    >
                      {isAr ? "التفاصيل" : "Details"}
                    </Link>
                    <Link 
                      href={`/booking?routeId=${route._id}`} 
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-[#1B1E4F] hover:bg-[#2a2f6b] text-white px-4 py-3 rounded-xl font-bold transition-all shadow-lg shadow-[#1B1E4F]/20 text-sm group/btn"
                    >
                      {isAr ? "احجز" : "Book"} <ChevronRight className="w-4 h-4 rtl:rotate-180 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredRoutes.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{isAr ? "لا توجد مسارات مطابقة" : "No matching routes"}</h3>
            <p className="text-gray-500">{isAr ? "جرب تغيير كلمات البحث أو المرشحات" : "Try adjusting your search or filters."}</p>
          </div>
        )}
      </div>
    </div>
  );
}
