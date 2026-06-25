"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Link, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { MapPin, Calendar, Clock, ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";

const BookingWorkspace = dynamic(() => import('../booking/BookingWorkspace'), { ssr: false });

export function Hero() {
  const locale = useLocale();
  const router = useRouter();
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const [isBookingMode, setIsBookingMode] = useState(false);

  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden">
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
        {/* Desktop Image */}
        <Image
          src="/hero-luxury.avif"
          alt="Mehar Transport Luxury Chauffeur at Airport"
          quality={100}
          fill
          priority
          sizes="100vw"
          className="hidden md:block object-cover object-center"
        />
        {/* Mobile Cropped Image */}
        <Image
          src="/hero-luxury.avif"
          alt="Mehar Transport Luxury Chauffeur"
          quality={90}
          fill
          priority
          sizes="100vw"
          className="block md:hidden object-cover object-[70%_center]"
        />
        {/* Deep navy/black gradient overlay for readability and premium feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-[#0a0a0a]/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/50 via-transparent to-transparent"></div>
      </div>

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto flex flex-col justify-center lg:justify-end h-full pb-8 lg:pb-32 pt-24 lg:pt-32">
        
        <AnimatePresence mode="wait">
          {!isBookingMode ? (
            <motion.div 
              key="default-hero"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col lg:flex-row justify-between items-end gap-12 w-full"
            >
              {/* Main Headline */}
              <div className="w-full lg:w-2/3 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-px bg-[#D9A63A]"></div>
                  <span className="text-[#D9A63A] font-bold uppercase tracking-[0.2em] text-sm">
                    {isAr ? "نعرّف الفخامة من جديد" : "Redefining Luxury Transport"}
                  </span>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] tracking-tight">
                  {isAr 
                    ? "ارتقِ بتجربة سفرك" 
                    : "Elevate Your Journey"}
                </h1>
                
                <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed font-light">
                  {isAr 
                    ? "تنقل حصري لكبار الشخصيات عبر المملكة العربية السعودية. أسطول من الطراز العالمي، وسائقون محترفون، وخدمة لا تشوبها شائبة." 
                    : "Exclusive VIP transportation across Saudi Arabia. World-class fleet, professional chauffeurs, and impeccable service."}
                </p>
              </div>

              {/* Professional Quick-Book Form (Click to open workspace) */}
              <div className="w-full lg:w-[400px]">
                <div 
                  className="bg-black/30 backdrop-blur-3xl border border-white/20 p-8 rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.3)] relative overflow-hidden group hover:border-white/30 transition-all cursor-pointer"
                  onClick={() => setIsBookingMode(true)}
                >
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#D9A63A]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                  <h3 className="text-white font-bold text-2xl mb-2 relative z-10">
                    {isAr ? "ابدأ رحلتك" : "Book Your Ride"}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 relative z-10">
                    {isAr ? "احجز سيارتك الفاخرة الآن" : "Reserve your luxury vehicle now"}
                  </p>
                  
                  <div className="space-y-4 mb-8 relative z-10">
                    {/* Route Input */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase ml-1">
                        {isAr ? "المسار" : "Route"}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#D9A63A]">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pl-12 text-white/50 text-sm group-hover:bg-white/10 transition-colors">
                          {isAr ? "اختر نقطة الانطلاق والوصول..." : "Select your route..."}
                        </div>
                      </div>
                    </div>

                    {/* Date & Time Inputs */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase ml-1">
                          {isAr ? "التاريخ" : "Date"}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[#D9A63A]">
                            <Calendar className="w-4 h-4" />
                          </div>
                          <div className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pl-10 text-white/50 text-sm group-hover:bg-white/10 transition-colors">
                            {isAr ? "التاريخ" : "Date"}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase ml-1">
                          {isAr ? "الوقت" : "Time"}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[#D9A63A]">
                            <Clock className="w-4 h-4" />
                          </div>
                          <div className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pl-10 text-white/50 text-sm group-hover:bg-white/10 transition-colors">
                            {isAr ? "الوقت" : "Time"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full bg-gradient-to-r from-[#D9A63A] to-[#B8860B] text-black px-6 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn relative z-10 shadow-[0_0_20px_rgba(217,166,58,0.2)]">
                    <span>{isAr ? "المتابعة" : "Continue"}</span>
                    <ArrowIcon className="w-5 h-5 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="workspace"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full lg:h-[75vh]"
            >
              <BookingWorkspace onCancel={() => setIsBookingMode(false)} />
            </motion.div>
          )}
        </AnimatePresence>
        
      </div>
    </section>
  );
}
