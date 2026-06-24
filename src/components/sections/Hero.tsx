"use client";

import { motion } from "framer-motion";
import { Link, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { MapPin, Calendar, ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";

const InlineBookingWizard = dynamic(() => import('../booking/InlineBookingWizard'), { ssr: false });

export function Hero() {
  const locale = useLocale();
  const router = useRouter();
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  return (
    <>
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

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto flex flex-col justify-end h-full pb-32 pt-32">
        
        <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-2/3 space-y-6"
          >
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
          </motion.div>

          {/* Minimalist Quick-Book */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/3"
          >
            <div 
              onClick={() => setIsWizardOpen(true)}
              className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl relative overflow-hidden group hover:bg-white/15 transition-colors cursor-pointer"
            >
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D9A63A]/50 to-transparent"></div>
              
              <h3 className="text-white font-bold text-xl mb-4 flex items-center justify-between">
                <span>{isAr ? "ابدأ رحلتك" : "Begin Your Journey"}</span>
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3 text-white/60">
                  <MapPin className="w-5 h-5 text-[#D9A63A]" />
                  <span className="text-sm">{isAr ? "اختر المسار" : "Select your route"}</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3 text-white/60">
                  <Calendar className="w-5 h-5 text-[#D9A63A]" />
                  <span className="text-sm">{isAr ? "حدد التاريخ والوقت" : "Choose date & time"}</span>
                </div>
              </div>

              <div 
                className="w-full bg-[#D9A63A] text-[#0a0a0a] hover:bg-white px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group/btn"
              >
                <span>{isAr ? "احجز الآن" : "Book Now"}</span>
                <ArrowIcon className="w-5 h-5 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        </div>
        
      </div>

      </section>

      <InlineBookingWizard 
        isOpen={isWizardOpen} 
        onClose={() => setIsWizardOpen(false)} 
      />
    </>
  );
}
