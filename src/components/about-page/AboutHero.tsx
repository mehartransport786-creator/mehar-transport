"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";


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
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0F172A]/80 z-10" /> {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F5F4F1] via-transparent to-transparent z-20" />
        <img 
          src="/makkah-skyline-luxury.png" 
          alt="Makkah Skyline" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="container relative z-30 px-4 md:px-6 mt-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#D9A63A] text-sm font-semibold tracking-widest uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-[#D9A63A] animate-pulse" />
              Premium Transport
            </div>
            
            <h1 className={`text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight ${isAr ? 'font-arabic' : ''}`}>
              {isAr ? (
                <>
                  شريككم الموثوق لخدمات النقل في <span className="text-[#D9A63A]">المملكة</span> منذ 2016
                </>
              ) : (
                <>
                  Your Trusted Transportation Partner in <span className="text-[#D9A63A]">Saudi Arabia</span> Since 2016
                </>
              )}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className={`text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed ${isAr ? 'font-arabic' : ''}`}
          >
            {subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            <Link 
              href={`/${locale}/booking`}
              className="w-full sm:w-auto px-8 py-4 bg-[#D9A63A] text-[#1B1E4F] rounded-xl font-bold text-lg hover:bg-[#C4962F] transition-all hover:scale-105 shadow-[0_0_20px_rgba(217,166,58,0.3)] flex items-center justify-center gap-2"
            >
              {isAr ? 'احجز الآن' : 'Book Transfer'}
              <ArrowRight className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} />
            </Link>
            <Link 
              href={`/${locale}/fleet`}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              {isAr ? 'عرض الأسطول' : 'View Fleet'}
            </Link>
            <Link 
              href={`/${locale}/contact`}
              className="w-full sm:w-auto px-8 py-4 text-white hover:text-[#D9A63A] transition-colors font-semibold text-lg flex items-center justify-center"
            >
              {isAr ? 'اتصل بنا' : 'Contact Us'}
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
      >
        <ChevronDown className="w-8 h-8 text-white/50 animate-bounce" />
      </motion.div>
    </section>
  );
}
