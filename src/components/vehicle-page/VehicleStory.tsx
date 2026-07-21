"use client";

import { useLocale } from "next-intl";
import { motion } from "@/lib/motion";

interface VehicleStoryProps {
  details: any;
}

export function VehicleStory({ details }: VehicleStoryProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const { story, theme } = details;

  return (
    <section className="relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-0.5" style={{ backgroundColor: theme.secondary }}></div>
          <span 
            className="font-bold uppercase tracking-[0.2em] text-sm"
            style={{ color: theme.secondary }}
          >
            {isAr ? "القصة" : "The Story"}
          </span>
        </div>

        <h2 
          className="text-3xl md:text-5xl font-bold leading-tight"
          style={{ color: theme.primary }}
        >
          {isAr ? story.titleAr : story.title}
        </h2>

        <div className="prose prose-lg text-gray-500 font-light leading-relaxed max-w-none pt-4">
          <p>{isAr ? story.contentAr : story.content}</p>
        </div>
      </motion.div>
    </section>
  );
}
