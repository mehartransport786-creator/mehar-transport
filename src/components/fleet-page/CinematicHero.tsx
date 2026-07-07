"use client";

import { useLocale } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "@/i18n/routing";
import { ArrowRight, ArrowLeft, Phone, Calendar } from "lucide-react";
import { useRef } from "react";

export function CinematicHero() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen min-h-[800px] w-full overflow-hidden bg-black flex items-center">
      {/* Parallax Background */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-80" />
        <img 
          src="/fleet-hero.png" 
          alt="Luxury Fleet Cinematic" 
          className="w-full h-full object-cover object-center scale-105"
        />
      </motion.div>

      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px] pt-32">
        <div className="max-w-3xl space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-0.5 bg-[#D9A63A]"></div>
            <span className="text-[#D9A63A] font-bold uppercase tracking-[0.3em] text-sm">
              {isAr ? "ميهار للنقل الفاخر" : "Mehar Premium Transport"}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]"
          >
            {isAr ? "أسطول فاخر مصمم لكل رحلة ولكل ضيف" : "Luxury Fleet for Every Journey"}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-2xl"
          >
            {isAr 
              ? "من تنقلات المطار التنفيذية إلى وسائل النقل الفاخرة للعمرة وسفر المجموعات الكبيرة، يقدم أسطولنا المختار بعناية راحة وأمان وموثوقية استثنائية في جميع أنحاء المملكة العربية السعودية."
              : "From executive airport transfers to luxury Umrah transportation and large group travel, our carefully selected fleet delivers exceptional comfort, safety, and reliability across Saudi Arabia."}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-8"
          >
            <button 
              onClick={() => document.getElementById('premium-collection')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-[#D9A63A] text-[#1B1E4F] hover:bg-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 group"
            >
              <span>{isAr ? "استكشف الأسطول" : "Explore Fleet"}</span>
              <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </button>
            <Link 
              href="/booking"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3"
            >
              <Calendar className="w-5 h-5" />
              <span>{isAr ? "احجز مركبة" : "Book Vehicle"}</span>
            </Link>
            <a 
              href="https://wa.me/966565638120"
              className="w-full sm:w-auto hover:bg-[#25D366]/10 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3"
            >
              <Phone className="w-5 h-5 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-white/50 text-xs uppercase tracking-widest">{isAr ? "اكتشف المزيد" : "Discover"}</span>
        <div className="w-[1px] h-12 bg-white/20 overflow-hidden">
          <motion.div 
            animate={{ y: [0, 48] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-full h-1/2 bg-[#D9A63A]"
          />
        </div>
      </motion.div>
    </section>
  );
}
