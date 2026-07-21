"use client";

import { useLocale, useTranslations } from "next-intl";
import { ShieldCheck, Clock, Navigation, Star } from "lucide-react";
import { PremiumIcon } from "@/components/ui/PremiumIcon";

export function TrustBar() {
    const t = useTranslations('TrustBar');

  const trustItems = [
    {
      icon: ShieldCheck,
      title: t("eliteChauffeurs"),
      description: t("professionallyTrained"),
    },
    {
      icon: Navigation,
      title: t("reliableJourneys"),
      description: t("precisionTracking"),
    },
    {
      icon: Clock,
      title: t("247Concierge"),
      description: t("roundTheClockSupport"),
    },
    {
      icon: Star,
      title: t("worldClassStandards"),
      description: t("ultraLuxuryFleet"),
    }
  ];

  return (
    <div className="relative z-20 -mt-16 lg:-mt-24 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
      <div className="bg-card shadow-luxury rounded-3xl py-4 sm:py-6 lg:py-10 px-4 sm:px-6 border border-border/50 backdrop-blur-xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 md:gap-12 sm:divide-x sm:divide-border sm:rtl:divide-x-reverse">
          {trustItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center justify-center text-center space-y-2 sm:space-y-4 px-1 sm:px-4 group">
              <PremiumIcon 
                icon={item.icon} 
                size="md" 
                className="transition-transform duration-[var(--duration-base)] group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(201,150,50,0.4)]" 
              />
              <div>
                <h3 className="font-bold text-base md:text-lg text-foreground mb-1 md:mb-2 tracking-tight group-hover:text-secondary transition-colors">{item.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground font-light leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
