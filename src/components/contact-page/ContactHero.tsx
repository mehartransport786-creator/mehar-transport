"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { PhoneCall, MessageCircle, FileText, ArrowRight, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export function ContactHero() {
  const t = useTranslations("ContactPage.hero");

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Premium Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 to-slate-950/50 z-10" />
        {/* We would use a real image here, but a placeholder works for the layout */}
        <div className="absolute inset-0 bg-[url('/services/airport.webp')] bg-cover bg-center bg-no-repeat opacity-40" />
      </div>

      <div className="container mx-auto px-4 relative z-20 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            {...fadeIn}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            {t("title")}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed font-light"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            <button className="flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-full transition-all hover:scale-105 active:scale-95">
              <PhoneCall className="w-5 h-5" />
              {t("callNow")}
            </button>
            <button className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full transition-all hover:scale-105 active:scale-95">
              <MessageCircle className="w-5 h-5" />
              {t("whatsapp")}
            </button>
            <button className="flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full backdrop-blur-sm transition-all hover:scale-105 active:scale-95 border border-white/20">
              <FileText className="w-5 h-5" />
              {t("requestQuote")}
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-8 border-t border-white/10"
          >
            {[
              { icon: Clock, text: t("trust.support") },
              { icon: ShieldCheck, text: t("trust.drivers") },
              { icon: MessageCircle, text: t("trust.response") },
              { icon: CheckCircle2, text: t("trust.team") },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-2">
                  <item.icon className="w-6 h-6 text-amber-500" />
                </div>
                <span className="text-sm md:text-base text-slate-300 font-medium">
                  {item.text}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
