"use client";

import { useTranslations } from "next-intl";
import { motion } from "@/lib/motion";
import Image from "next/image";

interface ComfortExperienceProps {
  theme: {
    primary: string;
    secondary: string;
  };
  interiorImage: string;
}

export function ComfortExperience({ theme, interiorImage }: ComfortExperienceProps) {
  const t = useTranslations('ComfortExperience');

  return (
    <section className="relative rounded-[var(--radius-card)] overflow-hidden text-white my-12" style={{ backgroundColor: theme.primary }}>
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
      </div>

      <div className="relative z-10 p-8 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="w-full space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-0.5" style={{ backgroundColor: theme.secondary }}></div>
            <span className="font-bold uppercase tracking-[0.2em] text-sm" style={{ color: theme.secondary }}>
              {t("theComfortExperience")}
            </span>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold leading-tight">
            {t("engineeredForAbsoluteComfort")}
          </h3>

          <p className="text-gray-300 font-light leading-relaxed text-lg">
            {t("weBelieveTheJourneyIsJustAsImportantAsTh")}
          </p>
        </div>

        <motion.div 
          className="w-full h-[300px] md:h-[400px] relative rounded-[var(--radius-card)] overflow-hidden shadow-[var(--shadow-luxury)]"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <Image 
            src={interiorImage} 
            alt="Comfort Interior" 
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}

