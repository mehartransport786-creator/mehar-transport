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
    <section className="py-24 bg-[#1B1E4F] relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[#D9A63A] font-bold tracking-widest uppercase mb-3 text-sm">
            {isAr ? 'قيمنا' : 'Our Values'}
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            {isAr ? 'المبادئ التي تقود تميزنا' : 'The Principles That Drive Our Excellence'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
            >
              <div className="w-14 h-14 rounded-xl bg-[#D9A63A]/20 flex items-center justify-center text-[#D9A63A] mb-6 group-hover:scale-110 transition-transform">
                <value.icon className="w-7 h-7" />
              </div>
              <h4 className={`text-xl font-bold text-white mb-3 ${isAr ? 'font-arabic' : ''}`}>
                {isAr ? value.titleAr : value.title}
              </h4>
              <p className={`text-gray-300 leading-relaxed ${isAr ? 'font-arabic' : ''}`}>
                {isAr ? value.descAr : value.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
