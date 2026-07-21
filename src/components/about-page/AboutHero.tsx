"use client";

import { motion } from "@/lib/motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function AboutHero({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  // Using direct text as requested to ensure exact match with spec, 
  // but keeping structure ready for translation file if needed
  const headline = isAr
    ? "شريككم الموثوق لخدمات النقل في المملكة العربية السعودية منذ عام 2016"
    : "Your Trusted Transportation Partner in Saudi Arabia Since 2016";
  const subheadline = isAr
    ? "نقدم خدمات نقل فاخرة للعمرة، ونقل المطار، والسفر بين المدن، مع التزام تام بالسلامة والموثوقية وتجارب عملاء استثنائية."
    : "Providing premium Umrah transportation, airport transfers, intercity travel, and chauffeur services with a commitment to safety, reliability, and exceptional customer experiences.";

  return (
    <section className="relative min-h-[calc(100svh+4rem)] lg:min-h-[calc(100vh+6rem)] w-full flex flex-col overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 bg-foreground">
        <Image
          src="/hero/aboutus.jpg"
          alt="Mehar Transport About Us"
          quality={100}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_20%]"
        />
        {/* Cinematic vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_35%_40%,transparent_0%,rgba(0,0,0,0.5)_100%)] pointer-events-none"></div>
        
        {/* Dark overlay specifically localized to the right side where the text is */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[65%] bg-gradient-to-l from-black/90 via-black/50 to-transparent pointer-events-none"></div>
        
        {/* Subtle bottom shadow to blend with the next section smoothly */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
      </div>

      <div className="container-fluid relative z-10 mx-auto flex-1 flex flex-col justify-end lg:justify-center w-full pb-36 pt-[120px] lg:pb-24 lg:pt-[120px] xl:pt-[140px]">
        <div className="flex w-full mt-4 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-2xl space-y-6 animate-fade-up-luxury ml-auto text-left rtl:text-right"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-secondary text-sm font-semibold tracking-widest uppercase mb-2 shadow-luxury">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              {isAr ? "نقل فاخر" : "Premium Transport"}
            </div>

            <h1 className={`h1 text-white leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] ${isAr ? 'font-arabic' : ''}`}>
              {isAr ? (
                <>
                  شريككم الموثوق لخدمات النقل في <span className="text-secondary">المملكة</span> منذ 2016
                </>
              ) : (
                <>
                  Your Trusted Transportation Partner in <span className="text-secondary">Saudi Arabia</span> Since 2016
                </>
              )}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className={`body-large text-white/90 ${isAr ? 'font-arabic' : ''}`}
            >
              {subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center justify-start gap-4 pt-4"
            >
              <Link
                href={`/${locale}/booking`}
                className="btn-luxury w-full sm:w-auto px-8 py-4 text-lg gap-2 shadow-luxury hover:shadow-luxury-hover min-h-[56px]"
              >
                {isAr ? 'احجز الآن' : 'Book Transfer'}
                <ArrowRight className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} />
              </Link>
              <Link
                href={`/${locale}/fleet`}
                className="btn-luxury w-full sm:w-auto px-8 py-4 bg-black/40 backdrop-blur-md text-white border border-white/20 hover:bg-black/60 shadow-luxury hover:shadow-luxury-hover min-h-[56px] justify-center"
              >
                {isAr ? 'عرض الأسطول' : 'View Fleet'}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
