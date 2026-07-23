"use client";

import { useTranslations } from "next-intl";
import { CarFront, Clock, UserCheck, ShieldCheck, Route, Star } from "lucide-react";

export function FleetOverview() {
  const t = useTranslations('FleetOverview');

  const stats = [
    {
      icon: CarFront,
      value: "8",
      label: t("vehicleCategories"),
    },
    {
      icon: Clock,
      value: "24/7",
      label: t("availability"),
    },
    {
      icon: UserCheck,
      value: "100%",
      label: t("professionalChauffeurs"),
    },
    {
      icon: ShieldCheck,
      value: "Premium",
      label: t("insuranceCoverage"),
    },
    {
      icon: Route,
      value: "10k+",
      label: t("successfulJourneys"),
    },
    {
      icon: Star,
      value: "99%",
      label: t("satisfactionRate"),
    }
  ];

  return (
    <section className="section-padding bg-background border-b border-border">
      <div className="container-fluid">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="flex flex-col items-center text-center space-y-4 group animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-[var(--radius-card)] bg-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-secondary transition-all duration-[var(--duration-instant)] ease-[var(--ease-out)] shadow-sm border border-border group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-luxury)]">
                  <Icon className="w-7 h-7 stroke-[1.5]" />
                </div>
                <div>
                  <div className="text-3xl font-black text-primary mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
