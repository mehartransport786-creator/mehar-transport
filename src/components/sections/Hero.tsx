"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Link, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { MapPin, Calendar, Clock, ArrowRight, ArrowLeft, Star, ShieldCheck, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import dynamic from 'next/dynamic';

const BookingWorkspace = dynamic(() => import('../booking/BookingWorkspace'), {
  ssr: false,
  loading: () => <div className="w-full h-full min-h-[400px] flex items-center justify-center text-white/50">Loading booking system...</div>
});

export function Hero() {
  const locale = useLocale();
  const router = useRouter();
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const [isBookingMode, setIsBookingMode] = useState(false);

  return (
    <section className="relative min-h-[100svh] lg:min-h-screen w-full flex items-center overflow-hidden">
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 z-0 bg-foreground">
        {/* Unified Responsive Image */}
        <Image
          src="/hero-luxury.avif"
          alt="Mehar Transport Luxury Chauffeur"
          quality={100}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] md:object-center"
        />
        {/* Deep navy/black gradient overlay for readability and premium feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/60 to-foreground/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/40 to-transparent"></div>
      </div>

      <div className="container-fluid relative z-10 mx-auto flex flex-col justify-center w-full min-h-full pb-28 pt-[100px] lg:pb-24 lg:pt-[120px] xl:pt-[140px]">
        
        <AnimatePresence mode="popLayout">
          {!isBookingMode ? (
              <motion.div 
              key="default-hero"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-12 w-full mt-4 lg:mt-0"
            >
              {/* Main Headline */}
              <div className="w-full lg:w-[55%] space-y-5 animate-fade-up-luxury">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-px bg-secondary"></div>
                  <span className="caption-text text-secondary tracking-[0.3em]">
                    {isAr ? "نقل العمرة والمطار الخاص — المملكة العربية السعودية" : "Private Umrah & Airport Transfers — Saudi Arabia"}
                  </span>
                </div>
                
                <h1 className="h1 text-white leading-tight">
                  {isAr 
                    ? "نقل خاص موثوق عبر المملكة العربية السعودية" 
                    : "Private Chauffeur Transportation Across Saudi Arabia"}
                </h1>
                
                <p className="body-large text-white/80 max-w-xl font-light text-[18px]">
                  {isAr 
                    ? "سافر بثقة مع نقل خاص محجوز مسبقاً من شركة مسجلة في المملكة. تنقلات المطار، رحلات العمرة، السفر بين المدن، وجولات الزيارة — كل رحلة خاصة، دقيقة، ومع سائق محترف." 
                    : "Travel with confidence using pre-booked private transportation operated by a registered Saudi Arabian company. Airport transfers, Umrah journeys, intercity travel, and Ziyarah tours — every ride is private, punctual, and professionally driven."}
                </p>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center gap-4 lg:gap-8 pt-6">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-secondary" />
                    <span className="text-white text-[16px] font-medium">
                      {isAr ? "مرخص ومسجل في السعودية" : "Licensed & Registered in KSA"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                    <span className="text-white text-[16px] font-medium">
                      {isAr ? "تنقلات خاصة فقط" : "Private Transfers Only"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-secondary fill-secondary" />
                    <span className="text-white text-[16px] font-medium">
                      {isAr ? "دعم عملاء ٢٤/٧" : "24/7 Customer Support"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Professional Quick-Book Form */}
              <motion.div 
                layoutId="booking-widget"
                className="w-full lg:w-[45%] max-w-[440px] xl:max-w-[480px] shrink-0 bg-black/40 backdrop-blur-3xl border border-white/10 p-6 lg:p-8 xl:p-10 rounded-[var(--radius-form)] shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-white/20 hover:bg-black/50 transition-all duration-500 cursor-pointer animate-fade-up-luxury"
                style={{ animationDelay: '0.1s' }}
                onClick={() => setIsBookingMode(true)}
              >
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                  <h3 className="text-white font-bold text-2xl lg:text-3xl mb-2 relative z-10 tracking-tight">
                    {isAr ? "احجز تنقلك الخاص" : "Book Your Transfer"}
                  </h3>
                  <p className="text-white/60 text-sm mb-6 lg:mb-8 relative z-10 font-medium">
                    {isAr ? "احجز نقلك الخاص في دقائق" : "Reserve your private transfer in minutes"}
                  </p>
                  
                  <div className="space-y-5 mb-8 lg:mb-10 relative z-10">
                    {/* Route Input */}
                    <div className="space-y-2">
                      <label className="caption-text text-[10px] text-gray-400 ml-1">
                        {isAr ? "المسار" : "Pickup & Destination"}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-secondary">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div className="w-full bg-white/5 border border-white/10 rounded-[var(--radius-input)] px-4 pl-12 text-white/50 text-[15px] font-medium group-hover:bg-white/10 group-hover:border-ring transition-colors h-[56px] flex items-center">
                          {isAr ? "اختر نقطة الانطلاق والوصول..." : "Select your route..."}
                        </div>
                      </div>
                    </div>

                    {/* Date & Time Inputs */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="caption-text text-[10px] text-gray-400 ml-1">
                          {isAr ? "التاريخ" : "Date"}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-secondary">
                            <Calendar className="w-5 h-5" />
                          </div>
                          <div className="w-full bg-white/5 border border-white/10 rounded-[var(--radius-input)] px-4 pl-12 text-white/50 text-[15px] font-medium group-hover:bg-white/10 group-hover:border-ring transition-colors h-[56px] flex items-center">
                            {isAr ? "التاريخ" : "Select Date"}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="caption-text text-[10px] text-gray-400 ml-1">
                          {isAr ? "الوقت" : "Time"}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-secondary">
                            <Clock className="w-5 h-5" />
                          </div>
                          <div className="w-full bg-white/5 border border-white/10 rounded-[var(--radius-input)] px-4 pl-12 text-white/50 text-[15px] font-medium group-hover:bg-white/10 group-hover:border-ring transition-colors h-[56px] flex items-center">
                            {isAr ? "الوقت" : "Select Time"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground px-6 rounded-[var(--radius-btn)] font-semibold transition-all duration-300 flex items-center justify-center gap-2 relative z-10 shadow-[0_0_20px_rgba(248,167,49,0.3)] hover:shadow-[0_0_30px_rgba(248,167,49,0.5)] h-[56px]">
                    <span className="text-[17px]">{isAr ? "المتابعة" : "Continue"}</span>
                    <ArrowIcon className="w-5 h-5" />
                  </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="workspace"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full lg:h-[80vh] bg-background rounded-3xl overflow-hidden shadow-2xl"
            >
              <BookingWorkspace onCancel={() => setIsBookingMode(false)} />
            </motion.div>
          )}
        </AnimatePresence>
        
      </div>
    </section>
  );
}
