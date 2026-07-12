"use client";

import { motion } from "framer-motion";
import { Clock, Car, MapPin, Users, Globe2, Star, ShieldCheck, Map } from "lucide-react";

export function TrustStats({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  
  const stats = [
    { icon: Clock, value: "2016", label: "Since", labelAr: "منذ", title: "Years in Business", titleAr: "سنوات من الخبرة" },
    { icon: Car, value: "100+", label: "Vehicles", labelAr: "مركبة", title: "Fleet Size", titleAr: "حجم الأسطول" },
    { icon: MapPin, value: "6+", label: "Cities", labelAr: "مدن", title: "Major Saudi Cities", titleAr: "المدن السعودية الكبرى" },
    { icon: Users, value: "10k+", label: "Transfers", labelAr: "رحلة", title: "Annual Journeys", titleAr: "رحلات سنوية" },
    { icon: Globe2, value: "50+", label: "Partners", labelAr: "شريك", title: "International B2B", titleAr: "شراكات دولية" },
    { icon: Star, value: "4.9", label: "Rating", labelAr: "تقييم", title: "Customer Satisfaction", titleAr: "رضا العملاء" },
    { icon: ShieldCheck, value: "100%", label: "Verified", labelAr: "موثق", title: "Google Presence", titleAr: "حضور موثق" },
    { icon: Map, value: "24/7", label: "Operations", labelAr: "عمليات", title: "Always Available", titleAr: "متاح دائماً" },
  ];

  return (
    <section className="py-20 bg-background border-y border-border">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-secondary font-bold tracking-widest uppercase mb-3 text-sm">
            {isAr ? 'تاريخ موثوق' : 'Proven Track Record'}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-primary">
            {isAr ? 'شركة نقل سعودية معتمدة' : 'A Trusted Saudi Transportation Partner'}
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-muted/50 p-6 rounded-2xl flex flex-col items-center text-center group hover:shadow-[var(--shadow-luxury)] hover:bg-background border border-transparent hover:border-secondary/20 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-secondary mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-black text-primary mb-1 font-mono">
                  {stat.value}
                </div>
                <div className="text-secondary font-bold text-sm uppercase tracking-wider mb-2">
                  {isAr ? stat.labelAr : stat.label}
                </div>
                <div className={`text-muted-foreground text-sm ${isAr ? 'font-arabic' : ''}`}>
                  {isAr ? stat.titleAr : stat.title}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
