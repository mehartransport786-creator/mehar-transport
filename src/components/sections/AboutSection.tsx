"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";

export function AboutSection() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="section-padding bg-background overflow-hidden">
      <div className="container-fluid">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-24">
          
          {/* Left Content Area */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full space-y-6 lg:space-y-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-secondary"></div>
              <span className="text-secondary font-bold uppercase tracking-[0.2em] text-xs md:text-sm">
                {isAr ? "ميهار للنقل" : "Mehar Transport"}
              </span>
            </div>
            
            <h2 className="h2 text-primary leading-[1.1] tracking-tight">
              {isAr 
                ? "شركة نقل سعودية مسجلة" 
                : "A Registered Saudi Transportation Company"}
            </h2>
            
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-light">
              {isAr 
                ? "ميهار للنقل شركة نقل مسجلة في المملكة العربية السعودية، تخدم الحجاج والعائلات والسياح وعملاء الشركات منذ عام 2016. نتخصص في توصيل المطار، ونقل الفنادق، ونقل العمرة، والسفر بين المدن، وجولات الزيارة — بخدمة احترافية وسائقين محترفين." 
                : "Mehar Transport is a registered transportation company based in Saudi Arabia, serving pilgrims, families, tourists, and corporate clients since 2016. We specialize in airport transfers, hotel transfers, Umrah transportation, intercity travel, and Ziyarah tours — delivering reliable service with professional drivers and a modern, well-maintained fleet."}
            </p>

            <div className="pt-4 lg:pt-6">
              <Link 
                href="/about" 
                className="btn-luxury border border-primary/20 bg-transparent text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3.5 rounded-[var(--radius-btn)] font-semibold transition-all group min-h-[56px] text-[15px] w-full sm:w-auto inline-flex items-center justify-center gap-3"
              >
                <span>{isAr ? "تعرف علينا" : "Learn About Us"}</span>
                <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Right Imagery Grid */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="grid grid-cols-2 gap-3 md:gap-6 relative">
              {/* Decorative Accent */}
              <div className="absolute -top-6 -right-6 rtl:-left-6 rtl:-right-auto w-24 h-24 md:w-32 md:h-32 bg-secondary/10 rounded-full blur-2xl"></div>
              
              <div className="space-y-3 md:space-y-6 pt-8 md:pt-12">
                <div className="rounded-[var(--radius-image)] overflow-hidden aspect-[4/5] shadow-[var(--shadow-luxury)] relative group">
                  <Image 
                    src="/about/interior.webp" 
                    alt="Luxury Interior" 
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                </div>
              </div>
              
              <div className="space-y-3 md:space-y-6">
                <div className="rounded-[var(--radius-image)] overflow-hidden aspect-[4/5] shadow-[var(--shadow-luxury)] relative group">
                  <Image 
                    src="/about/chauffeur.webp" 
                    alt="Chauffeur Service" 
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                </div>
                
                <div className="bg-primary p-4 md:p-8 rounded-[var(--radius-card)] shadow-[var(--shadow-luxury)] flex flex-col justify-center items-center text-center h-[calc(100%-auto)] aspect-[4/3] sm:aspect-auto">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-black text-secondary mb-1 md:mb-2">10+</div>
                  <div className="text-primary-foreground/80 font-medium text-xs sm:text-sm md:text-base">{isAr ? "سنوات من التميز" : "Years of Excellence"}</div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
