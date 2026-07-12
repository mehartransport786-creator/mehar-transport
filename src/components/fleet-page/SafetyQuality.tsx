"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

export function SafetyQuality() {
  const locale = useLocale();
  const isAr = locale === "ar";

  const trustItems = [
    isAr ? "سائقون محترفون" : "Professional Drivers",
    isAr ? "فحص خلفية السائقين" : "Background Checked Drivers",
    isAr ? "فحوصات دورية للمركبات" : "Vehicle Inspections",
    isAr ? "تتبع عبر نظام GPS" : "GPS Tracking",
    isAr ? "تغطية تأمينية شاملة" : "Insurance Coverage",
    isAr ? "دعم على مدار الساعة 24/7" : "24/7 Support",
    isAr ? "مساعدة في حالات الطوارئ" : "Emergency Assistance",
    isAr ? "مراقبة الرحلات الجوية" : "Flight Monitoring",
    isAr ? "مركبات معقمة بالكامل" : "Sanitized Vehicles",
    isAr ? "صيانة دورية منتظمة" : "Regular Maintenance"
  ];

  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: isAr ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl">
              <img 
                src="/gallery/chauffeur.webp" 
                alt="Mehar Transport Safety" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
              
              {/* Trust Badge */}
              <div className="absolute bottom-8 right-8 rtl:left-8 rtl:right-auto bg-background/95 backdrop-blur-md p-6 rounded-[var(--radius-card)] shadow-[var(--shadow-luxury)] max-w-xs border border-border">
                <ShieldCheck className="w-10 h-10 text-secondary mb-4" />
                <h4 className="font-bold text-primary text-lg mb-2">
                  {isAr ? "ضمان ميهار" : "The Mehar Guarantee"}
                </h4>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  {isAr 
                    ? "سلامتك هي أولويتنا القصوى. نحن نطبق أعلى معايير الجودة في الصناعة."
                    : "Your safety is our absolute priority. We implement the highest quality standards in the industry."}
                </p>
              </div>
            </div>
          </motion.div>

          <div className="w-full lg:w-1/2 space-y-8">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-0.5 bg-secondary"></div>
                <span className="text-secondary font-bold uppercase tracking-[0.2em] text-sm">
                  {isAr ? "السلامة والجودة" : "Safety & Quality"}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight mb-6">
                {isAr ? "معايير لا تقبل المساومة" : "Uncompromising Standards"}
              </h2>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                {isAr 
                  ? "نحن نؤمن بأن الفخامة الحقيقية تبدأ براحة البال المطلقة. تم وضع كل إجراء من إجراءات السلامة لدينا لضمان أن تكون رحلتك ليس فقط مريحة، بل آمنة تمامًا."
                  : "We believe true luxury begins with absolute peace of mind. Every safety protocol we have in place is designed to ensure your journey is not just comfortable, but completely secure."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 pt-4">
              {trustItems.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/5">
                    <CheckCircle2 className="w-4 h-4 text-secondary" />
                  </div>
                  <span className="text-primary font-semibold text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
