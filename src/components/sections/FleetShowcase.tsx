"use client";

import { useLocale } from "next-intl";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockFleet } from "@/lib/data";
import { Link } from "@/i18n/routing";
import { 
  Users, Briefcase, Car, CheckCircle2, ChevronRight, 
  ImageIcon, ArrowRight, ShieldCheck, Star, MapPin, 
  UserCheck, Headset
} from "lucide-react";
import Image from "next/image";

export function FleetShowcase() {
  const locale = useLocale();
  const isAr = locale === "ar";
  
  // Showcase top 6 vehicles
  const showcaseVehicles = mockFleet.slice(0, 6);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeVehicle = showcaseVehicles[activeIndex];

  // Hardcoded premium checklists based on PRD
  const idealFor = isAr ? [
    "توصيل المطار", "رحلات العمرة", "رحلات الأعمال", "السفر بين المدن"
  ] : [
    "Airport Transfers", "Umrah Transfers", "Business Travel", "City to City Travel"
  ];

  const keyFeatures = isAr ? [
    "تكييف هواء", "مياه مجانية", "سائق محترف", "متاح 24/7"
  ] : [
    "Air Conditioned", "Complimentary Water", "Professional Chauffeur", "24/7 Availability"
  ];

  return (
    <section className="bg-slate-50 overflow-hidden relative border-y border-slate-200">
      
      <div className="container-fluid max-w-[1920px] mx-auto p-0">
        
        {/* Main Split Container */}
        <div className="flex flex-col lg:flex-row relative bg-white lg:bg-transparent shadow-sm lg:shadow-none m-4 lg:m-0 rounded-2xl lg:rounded-none overflow-hidden lg:min-h-[500px]">
          
          {/* ==================== LEFT PANEL (65%) ==================== */}
          <div className="w-full lg:w-[65%] relative flex flex-col p-8 sm:p-12 lg:p-16 z-10 bg-white lg:bg-transparent rounded-t-2xl lg:rounded-none overflow-hidden justify-center items-center">
            
            {/* Background Image for Left Panel (Makkah Skyline) */}
            <div className="absolute inset-0 pointer-events-none hidden lg:block">
              <Image 
                src="/makkah-skyline-luxury.webp" 
                alt="Skyline" 
                fill 
                className="object-cover opacity-[0.03] object-bottom mix-blend-multiply"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent"></div>
            </div>

            {/* Vehicle Image & Actions */}
            <div className="relative z-20 w-full max-w-[650px] flex flex-col items-center justify-center">
              {/* Car Image */}
              <div className="relative w-full aspect-[16/9] pointer-events-none mb-8">
                <motion.div
                  key={`img-${activeIndex}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={activeVehicle.image}
                      alt={activeVehicle.name}
                      fill
                      priority
                      className="object-contain drop-shadow-2xl object-center"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </motion.div>
                {/* Floor Shadow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] max-w-[500px] h-[15px] bg-black/25 blur-[15px] rounded-[100%] pointer-events-none"></div>
              </div>

              {/* CTAs */}
              <motion.div 
                key={`cta-${activeIndex}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-30 w-full"
              >
                <Link 
                  href={`/booking?vehicle=${activeVehicle.id}`}
                  className="w-full sm:w-auto h-[56px] flex items-center justify-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-secondary/20"
                >
                  <span>{isAr ? "احجز هذه السيارة" : "Book This Vehicle"}</span>
                  <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                </Link>
                <Link 
                  href={`/fleet/${activeVehicle.slug}`}
                  className="w-full sm:w-auto h-[56px] flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 px-8 rounded-xl font-bold transition-colors"
                >
                  <span>{isAr ? "عرض الصور" : "View Gallery"}</span>
                  <ImageIcon className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>

          </div>

          {/* ==================== RIGHT PANEL (35%) ==================== */}
          <div className="w-full lg:w-[35%] bg-slate-50/50 lg:bg-transparent lg:border-l border-slate-200 flex flex-col z-20 justify-center">
            
            {/* Mobile/Tablet Horizontal Scroll */}
            <div className="lg:hidden flex overflow-x-auto snap-x snap-mandatory hide-scrollbar p-6 gap-4 bg-slate-100 rounded-b-2xl border-t border-slate-200">
              {showcaseVehicles.map((vehicle, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={vehicle.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`snap-center shrink-0 w-[280px] sm:w-[320px] rounded-2xl p-4 text-start transition-all border
                      ${isActive 
                        ? 'bg-white border-secondary shadow-md relative' 
                        : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'}`}
                  >
                    {isActive && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-secondary rounded-b-full"></div>
                    )}
                    <div className="flex gap-4 items-center">
                      <div className="w-24 h-16 rounded-xl bg-slate-50 p-2 flex items-center justify-center border border-slate-100">
                        <Image src={vehicle.image} alt={vehicle.name} width={80} height={40} className="object-contain drop-shadow" />
                      </div>
                      <div>
                        <h4 className={`font-bold text-sm mb-1 ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>
                          {isAr ? vehicle.nameAr : vehicle.name}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                          <span><Users className="w-3 h-3 inline" /> {vehicle.passengers}</span>
                          <span><Briefcase className="w-3 h-3 inline" /> {vehicle.luggage}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Desktop Vertical List */}
            <div className="hidden lg:flex flex-col h-full py-10 px-8 xl:px-12 bg-white/40 justify-center">
              <div className="mb-6 shrink-0">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{isAr ? "أسطولنا" : "Our Fleet"}</h3>
                <p className="text-sm font-medium text-slate-500">{isAr ? "اختر السيارة المثالية لاحتياجاتك" : "Choose the perfect vehicle for your needs"}</p>
              </div>

              {/* Scrollable list of cards */}
              <div className="flex flex-col gap-3 overflow-y-auto pr-3 custom-scrollbar pb-2 max-h-[340px] xl:max-h-[380px]">
                {showcaseVehicles.map((vehicle, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={vehicle.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`group relative flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-start overflow-hidden border shrink-0
                        ${isActive 
                          ? 'bg-white border-secondary shadow-[0_8px_20px_rgba(0,0,0,0.06)]' 
                          : 'bg-white border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md'}`}
                    >
                      {/* Active Indicator & Background Tint */}
                      {isActive && <div className="absolute inset-0 bg-amber-50/30 pointer-events-none"></div>}
                      <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-secondary transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0'}`}></div>

                      {/* Thumbnail */}
                      <div className="w-24 h-16 xl:w-28 xl:h-20 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0 relative flex items-center justify-center">
                        <Image 
                          src={vehicle.image} 
                          alt={vehicle.name} 
                          fill
                          sizes="112px"
                          className={`object-contain p-2 transition-transform duration-500 ${isActive ? 'scale-110 drop-shadow-md' : 'group-hover:scale-110 drop-shadow-sm'}`}
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 z-10 py-1">
                        <h4 className="font-bold truncate text-base xl:text-lg mb-1 text-slate-900">
                          {isAr ? vehicle.nameAr : vehicle.name}
                        </h4>
                        <p className="text-xs xl:text-sm text-slate-500 font-medium mb-1 truncate">
                          {isAr ? vehicle.typeAr : vehicle.type}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-slate-400 font-bold">
                          <span className="flex items-center gap-1 shrink-0"><Users className="w-3.5 h-3.5 text-slate-300" /> {vehicle.passengers}</span>
                          <span className="flex items-center gap-1 shrink-0"><Briefcase className="w-3.5 h-3.5 text-slate-300" /> {vehicle.luggage}</span>
                        </div>
                      </div>

                      {/* Right Icon */}
                      <div className="shrink-0 pl-2">
                        {isActive ? (
                          <div className="w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center shadow-sm">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        ) : (
                          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-400 transition-colors rtl:rotate-180" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
        
        {/* ==================== BOTTOM TRUST BAR ==================== */}
        <div className="border-t border-slate-200 bg-white py-6 lg:py-8 px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 xl:gap-4 divide-y md:divide-y-0 md:divide-x rtl:divide-x-reverse divide-slate-100">
            
            <div className="flex items-center gap-4 pt-4 md:pt-0 md:px-4 xl:px-6">
              <ShieldCheck className="w-8 h-8 text-secondary shrink-0" strokeWidth={1.5} />
              <div>
                <h5 className="font-bold text-slate-900 text-sm leading-tight">{isAr ? "مسجل في السعودية" : "Registered in Saudi Arabia"}</h5>
                <p className="text-xs text-slate-500 font-medium">{isAr ? "مرخص وموثوق" : "Licensed & Trusted"}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 md:pt-0 md:px-4 xl:px-6">
              <Star className="w-8 h-8 text-secondary shrink-0" strokeWidth={1.5} />
              <div>
                <h5 className="font-bold text-slate-900 text-sm leading-tight">{isAr ? "موثوق من آلاف المعتمرين" : "Trusted by Thousands"}</h5>
                <div className="flex items-center gap-1 mt-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="w-3 h-3 bg-[#00b67a] flex items-center justify-center">
                      <Star className="w-2 h-2 text-white fill-white" />
                    </div>
                  ))}
                  <span className="text-[10px] font-bold text-slate-900 ml-1">Trustpilot</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 md:pt-0 md:px-4 xl:px-6">
              <MapPin className="w-8 h-8 text-secondary shrink-0" strokeWidth={1.5} />
              <div>
                <h5 className="font-bold text-slate-900 text-sm leading-tight">{isAr ? "تنقلات خاصة ومريحة" : "Private & Comfortable"}</h5>
                <p className="text-xs text-slate-500 font-medium">{isAr ? "خدمة من الباب للباب" : "Door-to-door service"}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 md:pt-0 md:px-4 xl:px-6">
              <UserCheck className="w-8 h-8 text-secondary shrink-0" strokeWidth={1.5} />
              <div>
                <h5 className="font-bold text-slate-900 text-sm leading-tight">{isAr ? "سائقون محترفون" : "Professional Chauffeurs"}</h5>
                <p className="text-xs text-slate-500 font-medium">{isAr ? "خبرة وأدب" : "Experienced & Courteous"}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 md:pt-0 md:px-4 xl:px-6">
              <Headset className="w-8 h-8 text-secondary shrink-0" strokeWidth={1.5} />
              <div>
                <h5 className="font-bold text-slate-900 text-sm leading-tight">{isAr ? "دعم عملاء 24/7" : "24/7 Customer Support"}</h5>
                <p className="text-xs text-slate-500 font-medium">{isAr ? "دائماً هنا للمساعدة" : "Always here to assist you"}</p>
              </div>
            </div>

          </div>
        </div>

      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc; /* slate-50 */
          border-radius: 8px;
          margin-block: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; /* slate-300 */
          border-radius: 8px;
          border: 1px solid #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; /* slate-400 */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
