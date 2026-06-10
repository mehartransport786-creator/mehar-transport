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
    <div className="bg-white border-b border-gray-100 py-12 relative z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-x divide-gray-100 rtl:divide-x-reverse">
          {trustItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center justify-center text-center space-y-4 px-4 group">
              <PremiumIcon 
                icon={item.icon} 
                size="md" 
                className="transition-transform duration-500 group-hover:scale-110" 
              />
              <div>
                <h3 className="font-bold text-lg text-[#1B1E4F] mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 font-light">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
