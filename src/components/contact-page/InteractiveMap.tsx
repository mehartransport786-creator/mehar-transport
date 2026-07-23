"use client";

import { useTranslations } from "next-intl";

export function InteractiveMap() {
  const t = useTranslations("ContactPage.map");

  return (
    <section className="section-padding bg-background">
      <div className="container-fluid">
        <div className="relative w-full h-[500px] lg:h-[600px] bg-slate-100 dark:bg-slate-900 rounded-[var(--radius-card)] overflow-hidden border border-border shadow-[var(--shadow-luxury)]">
          <iframe 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            loading="lazy" 
            allowFullScreen 
            referrerPolicy="no-referrer-when-downgrade" 
            src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Al%20Nawariyah,%20Makkah,%20Saudi%20Arabia&t=&z=14&ie=UTF8&iwloc=B&output=embed">
          </iframe>

          {/* Floating Panel for Directions */}
          <div className="absolute top-8 left-8 bg-card/95 backdrop-blur-md p-6 rounded-[var(--radius-card)] shadow-[var(--shadow-card)] border border-border hidden md:block w-72 pointer-events-none">
            <h3 className="text-xl font-bold text-primary mb-4">{t("title")}</h3>
            <ul className="space-y-3 pointer-events-auto">
              {["Jeddah Airport", "Makkah", "Madinah"].map((landmark, idx) => (
                <li key={idx} className="flex items-center gap-3 text-muted-foreground font-medium cursor-default transition-colors">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  {landmark}
                </li>
              ))}
            </ul>
            <a 
              href="https://maps.app.goo.gl/Qrz4rQjfFJt89i45A" 
              target="_blank"
              rel="noreferrer"
              className="w-full mt-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-[var(--radius-btn)] transition-all duration-[var(--duration-instant)] ease-[var(--ease-out)] block text-center pointer-events-auto shadow-sm"
            >
              {t("directions")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
