"use client";

import { useLocale } from "next-intl";
import { motion } from "@/lib/motion";
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
              className="relative overflow-hidden inline-flex items-center justify-center font-bold rounded-[var(--radius-btn)] transition-all duration-300 bg-secondary text-white hover:text-primary w-full sm:w-auto px-10 py-5 text-lg gap-3 group shadow-luxury hover:shadow-luxury-hover active:scale-[0.98]"
            >
              <span className="absolute inset-0 w-full h-full bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 rounded-[inherit]"></span>
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span>{isAr ? "احجز تنقلك الآن" : "Book Your Transfer"}</span>
                <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <a 
              href="https://wa.me/966565638120" 
              target="_blank" 
              rel="noreferrer"
              className="relative overflow-hidden inline-flex items-center justify-center font-bold rounded-[var(--radius-btn)] transition-all duration-300 bg-transparent text-white border-2 border-white/30 hover:border-white w-full sm:w-auto px-10 py-5 text-lg gap-3 group shadow-sm hover:text-primary active:scale-[0.98]"
            >
              <span className="absolute inset-0 w-full h-full bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 rounded-[inherit]"></span>
              <span className="relative z-10">{isAr ? "تواصل عبر واتسآب الآن" : "WhatsApp Us Now"}</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
