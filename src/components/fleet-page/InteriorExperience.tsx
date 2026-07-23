"use client";

import { useTranslations } from "next-intl";
import { Maximize2, Wind, Shield, Coffee } from "lucide-react";
import Image from "next/image";

export function InteriorExperience() {
  const t = useTranslations('InteriorExperience');

  const features = [
    {
      icon: Shield,
      title: t("premiumLeatherSeating"),
      desc: t("ergonomicallyDesignedToProvideMaximumCom")
    },
    {
      icon: Wind,
      title: t("advancedClimateControl"),
      desc: t("multiZoneAirConditioningEnsuringThePerfe")
    },
    {
      icon: Maximize2,
      title: t("generousLegroom"),
      desc: t("exceptionalSpaceToStretchOutAndRelaxIdea")
    },
    {
      icon: Coffee,
      title: t("exclusiveAmenities"),
      desc: t("complimentaryWaterWiFiAndPremiumTouchesT")
    }
  ];

  return (
    <section className="section-padding bg-primary text-primary-foreground overflow-hidden relative">
      {/* Decorative Brand Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 z-0" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-foreground/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 z-0" />

      <div className="container-fluid relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="w-full space-y-10">
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-0.5 bg-secondary"></div>
                <span className="text-secondary font-bold uppercase tracking-[0.2em] text-sm">
                  {t("theInteriorExperience")}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 tracking-tight">
                {t("comfortWithoutCompromise")}
              </h2>
              <p className="text-lg text-primary-foreground/70 font-light leading-relaxed max-w-xl">
                {t("weUnderstandThatTheJourneyIsJustAsImport")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={idx}
                    className="space-y-3 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-secondary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-lg">{feature.title}</h4>
                    <p className="text-primary-foreground/60 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
            <div className="relative aspect-square md:aspect-[4/5] rounded-[var(--radius-card)] overflow-hidden group shadow-[var(--shadow-luxury)] border border-border/10">
              <Image 
                src="/about/interior.webp" 
                alt="Luxury Interior" 
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-[var(--duration-slow)] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-80" />
              
              {/* Floating Interaction Hint */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 px-6 py-3 rounded-full text-sm font-medium">
                <Maximize2 className="w-4 h-4 text-secondary" />
                <span>{t("clickToViewGallery")}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
