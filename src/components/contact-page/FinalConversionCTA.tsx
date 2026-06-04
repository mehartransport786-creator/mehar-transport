"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, PhoneCall, MessageCircle } from "lucide-react";

export function FinalConversionCTA() {
  const t = useTranslations("ContactPage.cta");

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-amber-500 z-0" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 z-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-amber-600/50 to-amber-400/50 z-0" />
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-slate-950/5 backdrop-blur-sm p-8 md:p-16 rounded-3xl border border-slate-950/10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-950 mb-6">
            {t("title")}
          </h2>
          <p className="text-xl text-slate-900/80 mb-12 max-w-2xl mx-auto font-medium">
            {t("subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-slate-950 hover:bg-slate-900 text-white font-bold rounded-full transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-xl shadow-slate-950/20">
              Book Transfer
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-950 font-bold rounded-full transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-xl shadow-white/20">
              <MessageCircle className="w-5 h-5 text-emerald-500" />
              WhatsApp
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-950 font-bold rounded-full transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-xl shadow-white/20 border border-slate-200">
              <PhoneCall className="w-5 h-5 text-amber-500" />
              Call Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
