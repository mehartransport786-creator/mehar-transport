"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface VehicleFeaturesProps {
  features: any[];
  theme: any;
}

export function VehicleFeatures({ features, theme }: VehicleFeaturesProps) {
  const locale = useLocale();
  const isAr = locale === "ar";

  if (!features || features.length === 0) return null;

  return (
    <section className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-gray-100">
      <div className="mb-8">
        <h3 className="text-2xl font-bold" style={{ color: theme.primary }}>
          {isAr ? "ميزات ووسائل راحة المركبة" : "Vehicle Features & Amenities"}
        </h3>
        <p className="text-gray-500 mt-2">
          {isAr ? "صُممت لضمان راحة ورفاهية قصوى." : "Designed to ensure maximum comfort and well-being."}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
        {features.map((feature, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: isAr ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${theme.primary}10` }}>
              <CheckCircle2 className="w-5 h-5" style={{ color: theme.primary }} />
            </div>
            <span className="font-semibold text-gray-800 text-lg">
              {isAr ? feature.labelAr : feature.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
