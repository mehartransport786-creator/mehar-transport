"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, PhoneCall, MessageCircle } from "lucide-react";
import Link from "next/link";

export function FinalConversionCTA() {
  const t = useTranslations("ContactPage.cta");

  return (
    <section className="section-padding relative overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/20 blur-[120px] rounded-full pointer-events-none z-0" />
      
      <div className="container-fluid relative z-10 text-center">
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md p-8 md:p-16 rounded-[var(--radius-card)] border border-white/10 shadow-[var(--shadow-luxury)]">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {t("title")}
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto font-medium">
            {t("subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/booking"
              className="w-full sm:w-auto px-8 py-4 bg-secondary hover:bg-secondary/90 text-primary-foreground font-bold rounded-[var(--radius-btn)] transition-all duration-[var(--duration-instant)] ease-[var(--ease-out)] hover:-translate-y-1 flex items-center justify-center gap-2 shadow-[var(--shadow-btn)]"
            >
              Book Transfer
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a 
              href="https://wa.me/966565638132"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-[var(--radius-btn)] transition-all duration-[var(--duration-instant)] ease-[var(--ease-out)] hover:-translate-y-1 flex items-center justify-center gap-2 shadow-[var(--shadow-btn)]"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
            <a 
              href="tel:+966565638132"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-[var(--radius-btn)] border border-white/20 transition-all duration-[var(--duration-instant)] ease-[var(--ease-out)] hover:-translate-y-1 flex items-center justify-center gap-2 shadow-[var(--shadow-btn)]"
            >
              <PhoneCall className="w-5 h-5 text-secondary" />
              Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
