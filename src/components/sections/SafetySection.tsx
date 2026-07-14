"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Shield, ShieldAlert, BadgeCheck, FileCheck, LifeBuoy, HeartHandshake, Eye, Navigation } from "lucide-react";

export function SafetySection() {
  const t = useTranslations('SafetySection');
  const locale = useLocale();
  const isAr = locale === 'ar';

  const features = [
    {
      icon: BadgeCheck,
      title: t("licensedDrivers"),
    },
    {
      icon: Navigation,
      title: t("gpsTracking"),
    },
    {
      icon: Shield,
      title: t("insuranceCoverage"),
    },
    {
      icon: FileCheck,
      title: t("vehicleInspections"),
    },
    {
      icon: LifeBuoy,
      title: t("emergencySupport"),
    },
    {
      icon: HeartHandshake,
      title: t("sanitizedVehicles"),
    }
  ];

  const stats = [
    { value: "10+", label: isAr ? "سنوات خبرة" : "Years Experience" },
    { value: "100+", label: isAr ? "مركبة حديثة" : "Premium Vehicles" },
    { value: "50k+", label: isAr ? "رحلة ناجحة" : "Transfers Completed" },
    { value: "4.9★", label: isAr ? "تقييم العملاء" : "Customer Rating" }
  ];

  return (
    <section className="py-[56px] md:section-padding bg-primary text-white relative overflow-hidden">
      {/* Abstract Background Patterns - Hidden on mobile to reduce noise */}
      <div className="hidden md:block absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="currentColor" strokeWidth="1" fill="none"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)"/>
        </svg>
      </div>

      {/* Subtle Mobile Gradient */}
      <div className="md:hidden absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-[#0b1120] pointer-events-none"></div>

      <div className="container-fluid relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center lg:items-start justify-between">
          
          {/* Left Content: Intro & Stats */}
          <div className="w-full lg:w-[45%] space-y-6 animate-fade-up-luxury">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-[2px] bg-secondary"></div>
                <span className="text-secondary font-bold uppercase tracking-[0.2em] text-[12px]">
                  {t("safetyCompliance")}
                </span>
              </div>
              
              <h2 className="text-[30px] md:text-[34px] lg:text-[40px] font-bold leading-[1.15] text-white">
                {t("yourSafetyIsOurHighestPriority")}
              </h2>
              
              <p className="text-white/70 text-[15px] md:text-[16px] leading-[1.6] font-light max-w-lg">
                {t("atMeharTransportWeImplementStrictCorpora")}
              </p>
            </div>

            {/* Trust Statistics Grid */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 pt-2 md:pt-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col space-y-1">
                  <span className="text-[30px] md:text-[36px] font-bold text-white tracking-tight">{stat.value}</span>
                  <span className="text-[13px] md:text-[14px] text-white/60 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content: Compact Feature Chips */}
          <div className="w-full lg:w-[50%] mt-4 lg:mt-0">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {features.map((feature, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  className="flex items-center gap-3 p-3 md:p-4 rounded-[16px] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group min-h-[56px] md:min-h-[64px]"
                >
                  <div className="shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-secondary/10 flex items-center justify-center border border-secondary/20 group-hover:scale-110 group-hover:bg-secondary/20 transition-all duration-300">
                    <feature.icon className="w-4 h-4 md:w-5 md:h-5 text-secondary" />
                  </div>
                  <h3 className="font-medium text-[13px] md:text-[15px] leading-[1.3] text-white/90 group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                </motion.div>
              ))}
            </div>
            
            {/* Optional Learn More Action */}
            <div className="mt-8 flex justify-start">
              <button className="text-[13px] md:text-[14px] font-semibold text-secondary hover:text-secondary/80 flex items-center gap-2 transition-colors">
                {isAr ? "عرض معايير السلامة كاملة" : "View Full Safety Standards"}
                <span className="text-[16px] leading-none mb-[2px]">{isAr ? "←" : "→"}</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
