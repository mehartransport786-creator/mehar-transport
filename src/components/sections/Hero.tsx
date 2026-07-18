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
    <section className="relative min-h-[calc(100svh+4rem)] lg:min-h-[calc(100vh+6rem)] w-full flex flex-col overflow-hidden">
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 z-0 bg-foreground">
        <Image
          src="/hero/homepage-hero-new.jpg"
          alt="Mehar Transport Luxury Chauffeur"
          quality={100}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_20%]"
        />
        {/* Cinematic vignette that keeps the model's face (left side) perfectly lit */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_35%_40%,transparent_0%,rgba(0,0,0,0.5)_100%)] pointer-events-none"></div>
        
        {/* Dark overlay specifically localized to the right side where the text is */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[65%] bg-gradient-to-l from-black/90 via-black/50 to-transparent pointer-events-none"></div>
        
        {/* Subtle bottom shadow to blend with the next section smoothly */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
      </div>

      <div className="container-fluid relative z-10 mx-auto flex-1 flex flex-col justify-end lg:justify-center w-full pb-36 pt-[120px] lg:pb-24 lg:pt-[120px] xl:pt-[140px]">
        
        <AnimatePresence mode="popLayout">
          {!isBookingMode ? (
              <motion.div 
              key="default-hero"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex w-full mt-4 lg:mt-0"
            >
              {/* Main Headline */}
              <div className="w-full max-w-2xl space-y-6 animate-fade-up-luxury ml-auto text-left rtl:text-right">
                <h1 className="h1 text-white leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                  {isAr 
                    ? "نقل خاص موثوق عبر المملكة العربية السعودية" 
                    : "Private Chauffeur Transportation Across Saudi Arabia"}
                </h1>

                {/* Trust Badges */}
                <div className="hidden lg:flex flex-wrap items-center justify-start gap-4 lg:gap-8 pt-4">
                  <div className="flex items-center gap-2 drop-shadow-md">
                    <ShieldCheck className="w-5 h-5 text-secondary" />
                    <span className="text-white text-[16px] font-medium">
                      {isAr ? "مرخص ومسجل في السعودية" : "Licensed & Registered in KSA"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 drop-shadow-md">
                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                    <span className="text-white text-[16px] font-medium">
                      {isAr ? "تنقلات خاصة فقط" : "Private Transfers Only"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 drop-shadow-md">
                    <Star className="w-5 h-5 text-secondary fill-secondary" />
                    <span className="text-white text-[16px] font-medium">
                      {isAr ? "دعم عملاء ٢٤/٧" : "24/7 Customer Support"}
                    </span>
                  </div>
                </div>

                {/* Primary CTA */}
                <div className="flex justify-start pt-4">
                  <Link 
                    href="/booking"
                    className="btn-luxury w-full md:w-auto px-8 py-4 text-lg gap-2 shadow-luxury hover:shadow-luxury-hover min-h-[56px]"
                  >
                    {isAr ? "احجز رحلتك الآن" : "Book Your Transfer"}
                    <svg className="w-5 h-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
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
