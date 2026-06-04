"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { ArrowRight, ArrowLeft } from "lucide-react";

export function AboutSection() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Content Area */}
          <motion.div 
            initial={{ opacity: 0, x: isAr ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-[#D9A63A]"></div>
              <span className="text-[#D9A63A] font-bold uppercase tracking-[0.2em] text-sm">
                {isAr ? "ميهار للنقل" : "Mehar Transport"}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1B1E4F] leading-[1.1] tracking-tight">
              {isAr 
                ? "تراث من الفخامة والموثوقية" 
                : "A Legacy of Luxury and Reliability"}
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed font-light">
              {isAr 
                ? "على مدى سنوات، أرسينا معايير جديدة في خدمات النقل الراقي عبر المملكة العربية السعودية. نحن لا نقدم مجرد وسيلة نقل، بل نصنع تجربة متكاملة تبدأ من لحظة الحجز وحتى وصولك المريح." 
                : "For years, we have set the standard for premium transportation across Saudi Arabia. We do not just provide a ride; we craft an end-to-end experience from the moment of booking to your luxurious arrival."}
            </p>

            <div className="pt-6">
              <Link 
                href="/about" 
                className="inline-flex items-center justify-center gap-3 border border-[#1B1E4F]/20 text-[#1B1E4F] hover:bg-[#1B1E4F] hover:text-white px-8 py-4 rounded-xl font-bold transition-all group"
              >
                <span>{isAr ? "اكتشف قصتنا" : "Discover Our Story"}</span>
                <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Right Imagery Grid */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-1/2"
          >
            <div className="grid grid-cols-2 gap-4 md:gap-6 relative">
              {/* Decorative Accent */}
              <div className="absolute -top-6 -right-6 rtl:-left-6 rtl:-right-auto w-32 h-32 bg-[#D9A63A]/10 rounded-full blur-2xl"></div>
              
              <div className="space-y-4 md:space-y-6 pt-12">
                <div className="rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1541443131876-44b03de101c5?q=80&w=2070&auto=format&fit=crop" 
                    alt="Luxury Interior" 
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                </div>
              </div>
              
              <div className="space-y-4 md:space-y-6">
                <div className="rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1621285499292-965ceb6f25cd?q=80&w=2070&auto=format&fit=crop" 
                    alt="Chauffeur Service" 
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                </div>
                
                <div className="bg-[#1B1E4F] p-8 rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
                  <div className="text-4xl md:text-5xl font-black text-[#D9A63A] mb-2">10+</div>
                  <div className="text-white/80 font-medium">{isAr ? "سنوات من التميز" : "Years of Excellence"}</div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
