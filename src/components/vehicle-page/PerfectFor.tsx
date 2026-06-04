"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface PerfectForProps {
  perfectFor: any[];
  theme: any;
}

export function PerfectFor({ perfectFor, theme }: PerfectForProps) {
  const locale = useLocale();
  const isAr = locale === "ar";

  if (!perfectFor || perfectFor.length === 0) return null;

  return (
    <section>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-0.5" style={{ backgroundColor: theme.secondary }}></div>
        <span 
          className="font-bold uppercase tracking-[0.2em] text-sm"
          style={{ color: theme.secondary }}
        >
          {isAr ? "مثالية لـ" : "Perfect For"}
        </span>
      </div>

      <h3 className="text-3xl font-bold mb-8" style={{ color: theme.primary }}>
        {isAr ? "هل هذه المركبة مناسبة لرحلتك؟" : "Is this the right vehicle for you?"}
      </h3>

      <div className="flex flex-wrap gap-4">
        {perfectFor.map((item, idx) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center gap-3 bg-white border border-gray-200 px-6 py-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            <Star className="w-5 h-5" style={{ color: theme.secondary, fill: theme.secondary }} />
            <span className="font-bold text-gray-800 text-lg">
              {isAr ? item.labelAr : item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
