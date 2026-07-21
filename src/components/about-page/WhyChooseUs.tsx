"use client";

import { motion } from "@/lib/motion";
import { CheckCircle2 } from "lucide-react";

export function WhyChooseUs({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  
  const advantages = [
    { text: "Licensed & Registered in Saudi Arabia", textAr: "مرخصة ومسجلة في المملكة العربية السعودية" },
    { text: "Private Transfers — No Shared Rides", textAr: "تنقلات خاصة فقط — لا مشاركة" },
    { text: "Fixed, Transparent Pricing", textAr: "تسعيرة ثابتة وشفافة" },
    { text: "Airport, Hotel & Intercity Transfers", textAr: "توصيل المطار والفندق وبين المدن" },
    { text: "Umrah & Ziyarah Specialists", textAr: "متخصصون في نقل العمرة والزيارة" },
    { text: "Professional, Licensed Chauffeurs", textAr: "سائقون محترفون ومرخصون" },
    { text: "Modern, Well-Maintained Fleet", textAr: "أسطول حديث ومصان جيداً" },
    { text: "B2B Ground Transportation Partner", textAr: "شريك نقل بري لوكالات السفر" },
    { text: "Multilingual Customer Support", textAr: "دعم عملاء متعدد اللغات" },
    { text: "24/7 Customer Support", textAr: "دعم عملاء على مدار الساعة" },
  ];

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container-fluid mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-secondary font-bold tracking-widest uppercase mb-3 text-sm flex items-center gap-4">
              <span className="w-12 h-px bg-secondary"></span>
              {isAr ? 'لماذا ميهار للنقل؟' : 'Why Choose Mehar Transport'}
            </h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight mb-6">
              {isAr ? 'لماذا يختار المسافرون ميهار للنقل' : 'Why Travelers Choose Mehar Transport'}
            </h3>
            <p className={`text-muted-foreground text-base md:text-lg leading-relaxed mb-8 ${isAr ? 'font-arabic' : ''}`}>
              {isAr 
                ? 'نحن شركة نقل سعودية مسجلة بخبرة تتجاوز عقداً من الزمن. خدماتنا مبنية على ما يحتاجه المسافرون فعلاً: استقبال موثوق، أسعار واضحة، سيارات مصانة جيداً، وسائقون يعرفون الطرق.' 
                : 'We are a registered Saudi Arabian transportation company with over a decade of operational experience. Our services are built around what travelers actually need: reliable pickups, honest pricing, well-maintained vehicles, and professional drivers who know the routes.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
              {advantages.map((adv, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <span className={`font-semibold text-primary text-sm md:text-base leading-tight ${isAr ? 'font-arabic' : ''}`}>
                    {isAr ? adv.textAr : adv.text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-square md:aspect-[4/3] rounded-[var(--radius-card)] overflow-hidden shadow-[var(--shadow-luxury)]">
              <div className="absolute inset-0 bg-primary/10 z-10" />
              <img 
                src="/about/chauffeur.webp" 
                alt="Premium Chauffeur" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative background shape */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border-2 border-secondary/20 rounded-full -z-10" />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
