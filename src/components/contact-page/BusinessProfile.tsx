"use client";

import { useTranslations } from "next-intl";
import { Building2, Award, Shield, CheckCircle2, TrendingUp, Users } from "lucide-react";

export function BusinessProfile() {
  const t = useTranslations("ContactPage.profile");

  return (
    <div className="bg-card text-card-foreground rounded-[var(--radius-card)] p-8 lg:p-12 border border-border shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-[var(--radius-sm)] bg-secondary/10 flex items-center justify-center">
          <Building2 className="w-8 h-8 text-secondary" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary">
            {t("title")}
          </h2>
          <p className="text-secondary font-semibold mt-1">
            {t("type")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-12">
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[var(--radius-sm)] border border-border">
          <TrendingUp className="w-8 h-8 text-secondary mb-4" />
          <div className="text-2xl md:text-3xl font-bold text-primary mb-1">10K+</div>
          <div className="text-muted-foreground font-medium text-sm md:text-base">{t("stats.transfers")}</div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[var(--radius-sm)] border border-border">
          <Users className="w-8 h-8 text-secondary mb-4" />
          <div className="text-2xl md:text-3xl font-bold text-primary mb-1">99%</div>
          <div className="text-muted-foreground font-medium text-sm md:text-base">{t("stats.satisfaction")}</div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-primary border-b border-border pb-4">
          Company Overview
        </h3>
        <ul className="space-y-4">
          {[
            { icon: Award, text: t("years") },
            { icon: CheckCircle2, text: t("coverage") },
            { icon: Shield, text: t("certifications.license") },
            { icon: Shield, text: t("certifications.insurance") },
          ].map((item, idx) => (
            <li key={idx} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-border">
                <item.icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <span className="text-base md:text-lg text-primary font-medium">
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
