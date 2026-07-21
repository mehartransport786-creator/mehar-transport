"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "@/lib/motion";
import { MapPin, PlaneTakeoff, Building2, Users2 } from "lucide-react";

export function PilgrimExperience() {
    const t = useTranslations('PilgrimExperience');

  const steps = [
    {
      icon: PlaneTakeoff,
      title: t("vipAirportMeetGreet"),
      desc: t("ourChauffeursWaitInTheArrivalsHallWithAN")
    },
    {
      icon: MapPin,
      title: t("seamlessHolyCityTransfers"),
      desc: t("sereneAndComfortableTransfersBetweenJedd")
    },
    {
      icon: Building2,
      title: t("directHotelDropOffs"),
      desc: t("expertKnowledgeOfHotelLocationsEnsuringY")
    },
    {
      icon: Users2,
      title: t("dedicatedPilgrimCare"),
      desc: t("professionalChauffeursSpeciallyTrainedTo")
    }
  ];

  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="w-12 h-0.5 bg-secondary mx-auto"
          />
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold leading-tight"
          >
            {t("theLuxuryUmrahExperience")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-primary-foreground/70 font-light"
          >
            {t("itIsOurHonorToServeTheGuestsOfAllahOurUm")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group bg-primary-foreground/5 border border-primary-foreground/10 rounded-[var(--radius-card)] p-8 hover:bg-primary-foreground/10 transition-colors"
              >
                <div className="w-14 h-14 rounded-[var(--radius-sm)] bg-secondary/10 flex items-center justify-center text-secondary mb-8 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-primary-foreground/70 leading-relaxed font-light">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
