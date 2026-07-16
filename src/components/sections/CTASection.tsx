"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { ArrowRight, ArrowLeft } from "lucide-react";

export function CTASection() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="relative py-12 md:py-16 bg-primary overflow-hidden flex items-center justify-center">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/routes/jeddah-makkah.webp')] bg-cover bg-center opacity-10 mix-blend-luminosity"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="inline-block px-4 py-1 border border-secondary/20 rounded-full bg-secondary/5 backdrop-blur-sm text-secondary/90 text-sm font-bold uppercase tracking-[0.2em] mb-4">
            {isAr ? "ميهار للنقل — المملكة العربية السعودية" : "Mehar Transport — Saudi Arabia"}
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight tracking-tight">
            {isAr ? "احجز تنقلك الخاص اليوم" : "Book Your Private Transfer Today."}
          </h2>
          
          <p className="text-xl text-primary-foreground/70 font-light max-w-2xl mx-auto leading-relaxed">
            {isAr 
              ? "احجز توصيل المطار أو رحلة العمرة أو سفرك بين المدن مع شركة نقل مسجلة. تسعيرة ثابتة، سائقون محترفون، وخدمة مضمونة." 
              : "Pre-book your airport transfer, Umrah journey, or intercity trip with a registered Saudi transportation company. Fixed pricing, professional drivers, and reliable service — guaranteed."}
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/booking" 
              className="w-full sm:w-auto bg-secondary text-primary hover:bg-white px-10 py-5 rounded-[var(--radius-btn)] font-bold text-lg transition-all flex items-center justify-center gap-3 group"
            >
              <span>{isAr ? "احجز تنقلك الآن" : "Book Your Transfer"}</span>
              <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </Link>
            
            <a 
              href="https://wa.me/966565638120" 
              target="_blank" 
              rel="noreferrer"
              className="w-full sm:w-auto bg-transparent border-2 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 px-10 py-5 rounded-[var(--radius-btn)] font-bold text-lg transition-all"
            >
              {isAr ? "تواصل عبر واتسآب الآن" : "WhatsApp Us Now"}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
