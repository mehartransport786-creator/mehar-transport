"use client";

import { useLocale } from "next-intl";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockFleet } from "@/lib/data";
import { Link } from "@/i18n/routing";
import { ArrowRight, ArrowLeft, Users, Briefcase } from "lucide-react";

export function FleetShowcase() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  
  // We'll showcase the top 4 premium vehicles on the homepage
  const showcaseVehicles = mockFleet.slice(0, 4);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 lg:py-32 bg-[#0a0a0a] text-white overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 relative z-10">
          <div className="space-y-6 max-w-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-[#D9A63A]"></div>
              <span className="text-[#D9A63A] font-bold uppercase tracking-[0.2em] text-sm">
                {isAr ? "أسطولنا الفاخر" : "Our Premium Fleet"}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              {isAr ? "مركبات مصممة للتميز" : "Vehicles Engineered for Excellence"}
            </h2>
          </div>
          <Link 
            href="/fleet" 
            className="hidden md:inline-flex items-center gap-2 text-white font-bold hover:text-[#D9A63A] transition-colors group"
          >
            <span>{isAr ? "اكتشف الأسطول كاملاً" : "Explore Full Fleet"}</span>
            <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Interactive Showcase */}
        <div className="flex flex-col lg:flex-row gap-8 h-auto lg:h-[600px] relative z-10">
          
          {/* Main Display Image */}
          <div className="w-full lg:w-2/3 h-[400px] lg:h-full rounded-2xl overflow-hidden relative group border border-white/10 bg-gradient-to-b from-[#1B1E4F] to-[#0d0f28]">
            {/* Studio Lighting Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
            
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.05, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                src={showcaseVehicles[activeIndex].image}
                alt={showcaseVehicles[activeIndex].name}
                className="absolute inset-0 w-full h-full object-contain p-8 md:p-16 drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
              />
            </AnimatePresence>
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f28]/90 via-[#0d0f28]/40 to-transparent pointer-events-none"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="inline-block px-3 py-1 bg-[#D9A63A]/20 backdrop-blur-md border border-[#D9A63A]/30 text-[#D9A63A] rounded-sm text-xs font-bold uppercase tracking-wider mb-4">
                    {isAr ? showcaseVehicles[activeIndex].typeAr : showcaseVehicles[activeIndex].type}
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold mb-6">
                    {isAr ? showcaseVehicles[activeIndex].nameAr : showcaseVehicles[activeIndex].name}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-300">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#D9A63A]" />
                      <span>{showcaseVehicles[activeIndex].passengers} {isAr ? "ركاب" : "Passengers"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-[#D9A63A]" />
                      <span>{showcaseVehicles[activeIndex].luggage} {isAr ? "حقائب" : "Luggage"}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Link 
                      href={`/fleet/${showcaseVehicles[activeIndex].slug}`}
                      className="bg-white text-black hover:bg-[#D9A63A] hover:text-white px-8 py-3.5 rounded-xl font-bold transition-colors"
                    >
                      {isAr ? "التفاصيل والصور" : "Details & Gallery"}
                    </Link>
                    <Link 
                      href={`/booking?vehicle=${showcaseVehicles[activeIndex].id}`}
                      className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 px-8 py-3.5 rounded-xl font-bold transition-colors"
                    >
                      {isAr ? "احجز الآن" : "Book Now"}
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Selector List */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            {showcaseVehicles.map((vehicle, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={vehicle.id}
                  onClick={() => setActiveIndex(index)}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-start group border-2
                    ${isActive 
                      ? 'bg-white/10 border-[#D9A63A] shadow-[0_0_20px_rgba(217,166,58,0.15)]' 
                      : 'bg-transparent border-white/5 hover:border-white/20 hover:bg-white/5'}`}
                >
                  <div className="w-24 h-16 rounded-lg overflow-hidden shrink-0 relative">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.name} 
                      className={`w-full h-full object-contain p-2 transition-transform duration-500 drop-shadow-md ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}
                    />
                    <div className={`absolute inset-0 transition-colors duration-300 ${isActive ? 'bg-gradient-to-r from-white/10 to-transparent' : 'bg-black/60 group-hover:bg-black/40'}`}></div>
                  </div>
                  <div>
                    <h4 className={`font-bold mb-1 transition-colors ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                      {isAr ? vehicle.nameAr : vehicle.name}
                    </h4>
                    <p className="text-xs text-[#D9A63A] uppercase tracking-wider font-bold">
                      {isAr ? vehicle.typeAr : vehicle.type}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

        </div>
        
        <div className="mt-12 md:hidden flex justify-center">
          <Link 
            href="/fleet" 
            className="inline-flex items-center gap-2 text-white font-bold hover:text-[#D9A63A] transition-colors group"
          >
            <span>{isAr ? "اكتشف الأسطول كاملاً" : "Explore Full Fleet"}</span>
            <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
