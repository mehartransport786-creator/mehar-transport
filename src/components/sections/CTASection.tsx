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
    <section className="relative py-32 bg-[#0a0a0a] overflow-hidden flex items-center justify-center min-h-[60vh]">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-luminosity"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-10"
        >
          <div className="inline-block px-4 py-1 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm text-white/80 text-sm font-bold uppercase tracking-[0.2em] mb-4">
            {isAr ? "ميهار للنقل الفاخر" : "Mehar Luxury Transport"}
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
            {isAr ? "رحلتك الاستثنائية تبدأ هنا" : "Your Exceptional Journey Begins Here."}
          </h2>
          
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            {isAr 
              ? "احجز سيارتك الخاصة الآن واستمتع بمعايير غير مسبوقة من الفخامة، الأمان، والموثوقية." 
              : "Reserve your private chauffeur today and experience unprecedented standards of luxury, safety, and reliability."}
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/booking" 
              className="w-full sm:w-auto bg-[#D9A63A] text-[#0a0a0a] hover:bg-white px-10 py-5 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-3 group"
            >
              <span>{isAr ? "احجز رحلتك الآن" : "Book Your Journey"}</span>
              <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </Link>
            
            <a 
              href="https://wa.me/966565638120" 
              target="_blank" 
              rel="noreferrer"
              className="w-full sm:w-auto bg-transparent border-2 border-white/20 text-white hover:bg-white/10 px-10 py-5 rounded-full font-bold text-lg transition-all"
            >
              {isAr ? "تحدث مع مستشار الرحلات" : "Speak to a Concierge"}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
