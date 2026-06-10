"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
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
    <section className="py-32 bg-[#1B1E4F] text-white overflow-hidden relative">
      {/* Decorative Gold Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#D9A63A]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 z-0" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 z-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px] relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="w-full lg:w-1/2 space-y-10">
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="w-12 h-0.5 bg-[#D9A63A]"></div>
                <span className="text-[#D9A63A] font-bold uppercase tracking-[0.2em] text-sm">
                  {t("theInteriorExperience")}
                </span>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold leading-tight mb-6"
              >
                {t("comfortWithoutCompromise")}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-gray-300 font-light leading-relaxed max-w-xl"
              >
                {t("weUnderstandThatTheJourneyIsJustAsImport")}
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (idx * 0.1) }}
                    className="space-y-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#D9A63A]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-lg">{feature.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden group">
              <Image 
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop" 
                alt="Luxury Interior" 
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-[2s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B1E4F]/80 via-transparent to-transparent opacity-80" />
              
              {/* Floating Interaction Hint */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full text-sm font-medium">
                <Maximize2 className="w-4 h-4 text-[#D9A63A]" />
                <span>{t("clickToViewGallery")}</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
