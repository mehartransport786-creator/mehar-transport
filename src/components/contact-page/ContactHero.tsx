"use client";

import { useTranslations } from "next-intl";
import { PhoneCall, MessageCircle, FileText, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import Image from "next/image";

export function ContactHero() {
  const t = useTranslations("ContactPage.hero");

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
      {/* Premium Image Background */}
      <div className="absolute inset-0 z-0 bg-slate-950">
        <Image
          src="/hero/contact-hero.jpg"
          alt="Contact Mehar Transport"
          fill
          priority
          className="object-cover opacity-80"
        />
        {/* Soft gradient that only darkens at the bottom to blend with the next section */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/40 to-slate-950" />
      </div>
      
      <div className="container-fluid relative z-20 section-padding pt-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-white">
            {t("title")}
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed font-light max-w-2xl mx-auto">
            {t("subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-16">
            <a 
              href="tel:+966565638132"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-secondary hover:bg-secondary/90 text-primary-foreground font-bold rounded-[var(--radius-btn)] transition-all duration-[var(--duration-instant)] ease-[var(--ease-out)] hover:-translate-y-1 shadow-[var(--shadow-luxury)]"
            >
              <PhoneCall className="w-5 h-5" />
              {t("callNow")}
            </a>
            <a 
              href="https://wa.me/966565638132"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-[var(--radius-btn)] transition-all duration-[var(--duration-instant)] ease-[var(--ease-out)] hover:-translate-y-1 shadow-[var(--shadow-luxury)]"
            >
              <MessageCircle className="w-5 h-5" />
              {t("whatsapp")}
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-white/10">
            {[
              { icon: Clock, text: t("trust.support") },
              { icon: ShieldCheck, text: t("trust.drivers") },
              { icon: MessageCircle, text: t("trust.response") },
              { icon: CheckCircle2, text: t("trust.team") },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                  <item.icon className="w-5 h-5 text-secondary" />
                </div>
                <span className="text-sm md:text-base text-slate-300 font-medium">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
