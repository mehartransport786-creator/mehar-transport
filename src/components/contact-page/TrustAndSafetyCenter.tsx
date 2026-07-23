"use client";

import { useTranslations } from "next-intl";
import { Shield, ShieldCheck, MapPin, BadgeCheck, Clock, Navigation, HeartHandshake, Plane, Info } from "lucide-react";

export function TrustAndSafetyCenter() {
  const t = useTranslations("ContactPage.trustCenter");

  const icons = [
    BadgeCheck,
    Navigation,
    Shield,
    ShieldCheck,
    HeartHandshake,
    Clock,
    Info,
    Plane,
    Shield
  ];

  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      <div className="container-fluid relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            We adhere to the highest international safety standards to ensure your journey is secure and comfortable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {icons.map((Icon, idx) => (
            <div
              key={idx}
              className="bg-card p-6 rounded-[var(--radius-card)] border border-border flex items-center gap-4 hover:border-secondary/50 hover:shadow-[var(--shadow-luxury)] shadow-[var(--shadow-card)] transition-all duration-[var(--duration-instant)] ease-[var(--ease-out)] hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 border border-border flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <span className="font-semibold text-card-foreground">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {t(`items.${idx}` as any)} 
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
