"use client";

import { motion } from "framer-motion";
import { Shield, UserCheck, Clock, HeartHandshake, Eye, TrendingUp } from "lucide-react";

export function OurValues({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  
  const values = [
    {
      icon: Shield,
      title: "Safety First",
      titleAr: "السلامة أولاً",
      desc: "Every journey prioritizes passenger safety above all else.",
      descAr: "كل رحلة تعطي الأولوية لسلامة الركاب قبل كل شيء."
    },
    {
      icon: UserCheck,
      title: "Professionalism",
      titleAr: "الاحترافية",
      desc: "Experienced drivers and premium service standards.",
      descAr: "سائقون ذوو خبرة ومعايير خدمة متميزة."
    },
    {
      icon: Clock,
      title: "Reliability",
      titleAr: "الموثوقية",
      desc: "Punctual and dependable transportation every time.",
      descAr: "نقل دقيق وموثوق في كل مرة."
    },
    {
      icon: HeartHandshake,
      title: "Hospitality",
      titleAr: "الضيافة",
      desc: "Exceptional customer care from booking to destination.",
      descAr: "رعاية استثنائية للعملاء من الحجز حتى الوصول."
    },
    {
      icon: Eye,
      title: "Transparency",
      titleAr: "الشفافية",
      desc: "Clear pricing with absolutely no hidden fees.",
      descAr: "أسعار واضحة بدون رسوم خفية على الإطلاق."
    },
    {
      icon: TrendingUp,
      title: "Continuous Improvement",
      titleAr: "التطوير المستمر",
      desc: "Investment in technology, fleet quality, and excellence.",
      descAr: "الاستثمار في التكنولوجيا وجودة الأسطول والتميز."
    }
  ];

  return (
    <section className="py-32 bg-primary relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="caption-text text-secondary mb-4">
            {isAr ? 'قيمنا' : 'Our Values'}
          </h2>
          <h3 className="h2 text-primary-foreground leading-tight">
            {isAr ? 'المبادئ التي تقود تميزنا' : 'The Principles That Drive Our Excellence'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-10 rounded-[2rem] bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary-foreground/10 hover:border-primary-foreground/20 transition-all duration-300 shadow-[var(--shadow-luxury)] group"
            >
              <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary mb-8 group-hover:scale-110 group-hover:bg-secondary/30 transition-all duration-300">
                <value.icon className="w-8 h-8" />
              </div>
              <h4 className={`text-2xl font-bold text-primary-foreground mb-4 tracking-tight ${isAr ? 'font-arabic' : ''}`}>
                {isAr ? value.titleAr : value.title}
              </h4>
              <p className={`text-lg text-primary-foreground/70 leading-relaxed font-light ${isAr ? 'font-arabic' : ''}`}>
                {isAr ? value.descAr : value.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
