"use client";

import { useTranslations } from "next-intl";
import { MessageCircle, Zap, Globe2, ArrowRight } from "lucide-react";

export function WhatsAppExperience() {
  const t = useTranslations("ContactPage.whatsappSection");

  const actions = [
    "Airport Transfer",
    "Umrah Booking",
    "VIP Service",
    "Family Transport",
    "Group Transport",
    "Request Quote"
  ];

  return (
    <section className="section-padding bg-slate-950 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-fluid relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary font-medium mb-6">
              <Zap className="w-4 h-4" />
              {t("response")}
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {t("title")}
            </h2>
            
            <div className="flex items-center justify-center md:justify-start gap-2 text-slate-300 font-medium mb-10">
              <Globe2 className="w-5 h-5" />
              {t("languages")}
            </div>

            <a 
              href="https://wa.me/966565638120"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg px-8 py-4 rounded-[var(--radius-btn)] transition-all duration-[var(--duration-instant)] ease-[var(--ease-out)] hover:-translate-y-1 shadow-[var(--shadow-btn)] flex items-center justify-center gap-3 w-full md:w-auto mx-auto md:mx-0"
            >
              <MessageCircle className="w-6 h-6" />
              Message on WhatsApp
            </a>
          </div>

          <div className="flex-1 w-full">
            <div className="bg-white/10 backdrop-blur-md rounded-[var(--radius-card)] p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {actions.map((action, idx) => (
                  <a 
                    key={idx}
                    href={`https://wa.me/966565638120?text=${encodeURIComponent(`Hello, I'm interested in: ${action}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 rounded-[var(--radius-sm)] border border-white/5 hover:border-secondary/30 transition-all duration-[var(--duration-instant)] ease-[var(--ease-out)] text-slate-200 group text-left"
                  >
                    <span className="font-medium">{action}</span>
                    <ArrowRight className="w-4 h-4 text-secondary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-[var(--duration-instant)] ease-[var(--ease-out)]" />
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
