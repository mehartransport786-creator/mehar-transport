"use client";

import { useTranslations } from "next-intl";
import { motion } from "@/lib/motion";
import { Shield, ShieldCheck, MapPin, BadgeCheck, Clock, Navigation, HeartHandshake, Plane, Info } from "lucide-react";

export function TrustAndSafetyCenter() {
  const t = useTranslations("ContactPage.trustCenter");

  const icons = [
    BadgeCheck,
    Navigation,
    Shield,
    ShieldCheck,
    HeartHandshake,
    Clock,
    Info,
    Plane,
    Shield
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            We adhere to the highest international safety standards to ensure your journey is secure and comfortable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {icons.map((Icon, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 hover:border-amber-500/50 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 text-slate-700 dark:text-slate-300" />
              </div>
              <span className="font-semibold text-slate-900 dark:text-white">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {t(`items.${idx}` as any)} 
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
