"use client";

import { motion } from "@/lib/motion";
import { Handshake, Building2, Globe2, Briefcase, FileText, CheckCircle2, PlaneTakeoff, Users, MapPin } from "lucide-react";

export function B2BPartnerships({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  
  const partnerships = [
    { icon: PlaneTakeoff, text: "Airport Meet & Greet", textAr: "استقبال وتوديع في المطار" },
    { icon: Users, text: "Group Umrah Transportation", textAr: "نقل مجموعات العمرة" },
    { icon: Building2, text: "Hotel Transfers", textAr: "توصيل الفنادق" },
    { icon: MapPin, text: "Ziyarah Tours", textAr: "جولات الزيارة" },
    { icon: Briefcase, text: "Corporate Transportation", textAr: "نقل الشركات" },
    { icon: FileText, text: "Long-Term Contracts", textAr: "عقود طويلة الأجل" },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-secondary font-bold tracking-widest uppercase mb-3 text-sm">
            {isAr ? 'خدمات النقل للشركات' : 'B2B Transportation Services'}
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-primary leading-tight mb-6">
            {isAr ? 'نقل بري احترافي لشركاء السفر' : 'Professional Ground Transportation for Travel Partners'}
          </h3>
          <p className={`text-muted-foreground text-lg leading-relaxed ${isAr ? 'font-arabic' : ''}`}>
            {isAr 
              ? 'تعمل ميهار للنقل مع وكالات السفر وشركات إدارة الوجهات والفنادق ومشغلي خدمات العمرة والمنظمات المؤسسية لتوفير خدمات نقل بري موثوقة عبر المملكة العربية السعودية.' 
              : 'Mehar Transport works with international travel agencies, destination management companies, hotels, Umrah operators, and corporate organizations to provide dependable ground transportation across Saudi Arabia.'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {partnerships.map((partner, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-muted/50 border border-border rounded-[var(--radius-card)] p-6 flex flex-col items-center text-center group hover:border-secondary/30 hover:bg-background hover:shadow-[var(--shadow-luxury)] transition-all"
            >
              <div className="w-14 h-14 rounded-full bg-background flex items-center justify-center text-secondary shadow-sm mb-4 group-hover:scale-110 transition-transform">
                <partner.icon className="w-6 h-6" />
              </div>
              <div className={`font-semibold text-primary ${isAr ? 'font-arabic' : ''}`}>
                {isAr ? partner.textAr : partner.text}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
