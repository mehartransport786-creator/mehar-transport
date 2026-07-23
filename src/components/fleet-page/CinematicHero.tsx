"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight, ArrowLeft, Phone, Calendar } from "lucide-react";
import Image from "next/image";

export function CinematicHero() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-slate-950 flex items-center">
      {/* Premium Image Background */}
      <div className="absolute inset-0 z-0 bg-slate-950">
        <Image
          src="/fleet-hero.png"
          alt="Luxury Fleet Cinematic"
          fill
          priority
          className="object-cover opacity-80"
        />
        {/* Soft black overlay from the top for text legibility, blending into dark slate at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-slate-950" />
      </div>

      <div className="container-fluid relative z-20 section-padding pt-32">
        <div className="max-w-3xl space-y-8">
          <div className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
            <div className="w-12 h-0.5 bg-secondary"></div>
            <span className="text-secondary font-bold uppercase tracking-[0.3em] text-sm">
              {isAr ? "ميهار للنقل الفاخر" : "Mehar Premium Transport"}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150 fill-mode-both">
            {isAr ? "أسطول فاخر مصمم لكل رحلة ولكل ضيف" : "Luxury Fleet for Every Journey"}
          </h1>

          <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
            {isAr 
              ? "من تنقلات المطار التنفيذية إلى وسائل النقل الفاخرة للعمرة وسفر المجموعات الكبيرة، يقدم أسطولنا المختار بعناية راحة وأمان وموثوقية استثنائية في جميع أنحاء المملكة العربية السعودية."
              : "From executive airport transfers to luxury Umrah transportation and large group travel, our carefully selected fleet delivers exceptional comfort, safety, and reliability across Saudi Arabia."}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both">
            <button 
              onClick={() => document.getElementById('premium-collection')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground px-8 py-4 rounded-[var(--radius-btn)] font-bold transition-all duration-[var(--duration-instant)] ease-[var(--ease-out)] flex items-center justify-center gap-3 group shadow-[var(--shadow-luxury)] hover:-translate-y-1"
            >
              <span>{isAr ? "استكشف الأسطول" : "Explore Fleet"}</span>
              <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </button>
            <Link 
              href="/booking"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-[var(--radius-btn)] font-bold transition-all duration-[var(--duration-instant)] ease-[var(--ease-out)] flex items-center justify-center gap-3 hover:-translate-y-1"
            >
              <Calendar className="w-5 h-5" />
              <span>{isAr ? "احجز مركبة" : "Book Vehicle"}</span>
            </Link>
            <a 
              href="https://wa.me/966565638120"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto hover:bg-[#25D366]/20 bg-[#25D366]/10 text-white px-8 py-4 rounded-[var(--radius-btn)] font-bold transition-all duration-[var(--duration-instant)] ease-[var(--ease-out)] flex items-center justify-center gap-3 hover:-translate-y-1 border border-[#25D366]/30"
            >
              <Phone className="w-5 h-5 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
