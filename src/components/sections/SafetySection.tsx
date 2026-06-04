"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Shield, ShieldAlert, BadgeCheck, FileCheck, LifeBuoy, HeartHandshake, Eye, Navigation } from "lucide-react";

export function SafetySection() {
  const locale = useLocale();
  const isAr = locale === "ar";

  const features = [
    {
      icon: BadgeCheck,
      title: isAr ? "سائقون مرخصون" : "Licensed Drivers",
      desc: isAr ? "نخضع جميع السائقين لفحوصات وتدريبات صارمة" : "All drivers undergo strict vetting and training"
    },
    {
      icon: Navigation,
      title: isAr ? "تتبع المواقع" : "GPS Tracking",
      desc: isAr ? "مراقبة حية لجميع المركبات لضمان مسار آمن" : "Live monitoring of all vehicles for safe routing"
    },
    {
      icon: FileCheck,
      title: isAr ? "فحص المركبات" : "Vehicle Inspections",
      desc: isAr ? "صيانة دورية يومية قبل كل انطلاق" : "Daily maintenance checks before every dispatch"
    },
    {
      icon: Shield,
      title: isAr ? "تغطية تأمينية" : "Insurance Coverage",
      desc: isAr ? "تأمين شامل للركاب خلال جميع الرحلات" : "Comprehensive passenger insurance during all trips"
    },
    {
      icon: LifeBuoy,
      title: isAr ? "دعم الطوارئ" : "Emergency Support",
      desc: isAr ? "فريق طوارئ متخصص متاح على مدار الساعة" : "Dedicated emergency response team available 24/7"
    },
    {
      icon: HeartHandshake,
      title: isAr ? "مركبات معقمة" : "Sanitized Vehicles",
      desc: isAr ? "تعقيم شامل للسيارة بعد كل رحلة" : "Thorough sanitization after every single ride"
    },
    {
      icon: ShieldAlert,
      title: isAr ? "معايير السلامة" : "Road Safety Standards",
      desc: isAr ? "تطبيق صارم لأنظمة المرور والسلامة السعودية" : "Strict adherence to Saudi traffic and safety regulations"
    },
    {
      icon: Eye,
      title: isAr ? "مراقبة الرحلات" : "Flight Monitoring",
      desc: isAr ? "تتبع الرحلات الجوية لتجنب التأخيرات" : "Proactive flight tracking to avoid any delays"
    }
  ];

  return (
    <section className="py-24 bg-primary text-white relative overflow-hidden">
      {/* Abstract Background Patterns */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="currentColor" strokeWidth="1" fill="none"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px] relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          
          <div className="w-full md:w-1/3 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-0.5 bg-secondary"></div>
              <span className="text-secondary font-bold uppercase tracking-widest text-sm">
                {isAr ? "الامتثال والسلامة" : "Safety & Compliance"}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              {isAr ? "سلامتك هي أولويتنا القصوى" : "Your Safety is Our Highest Priority"}
            </h2>
            <p className="text-white/70 text-lg leading-relaxed font-light">
              {isAr 
                ? "في مِهار للنقل، نطبق معايير سلامة مؤسسية صارمة لضمان راحة بالك. رحلتك معنا محمية ومراقبة بأحدث التقنيات."
                : "At Mehar Transport, we implement strict corporate safety standards to ensure your peace of mind. Your journey is protected and monitored."}
            </p>
          </div>

          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {features.map((feature, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center border border-secondary/30">
                    <feature.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
