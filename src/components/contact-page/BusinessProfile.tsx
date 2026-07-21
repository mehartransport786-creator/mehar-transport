"use client";

import { useTranslations } from "next-intl";
import { motion } from "@/lib/motion";
import { Building2, Award, Shield, CheckCircle2, TrendingUp, Users } from "lucide-react";

export function BusinessProfile() {
  const t = useTranslations("ContactPage.profile");

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-slate-900 rounded-3xl p-8 lg:p-12 border border-slate-200 dark:border-slate-800 shadow-sm"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center">
          <Building2 className="w-8 h-8 text-amber-500" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            {t("title")}
          </h2>
          <p className="text-amber-600 dark:text-amber-500 font-medium mt-1">
            {t("type")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-12">
        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl">
          <TrendingUp className="w-8 h-8 text-emerald-500 mb-4" />
          <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">10K+</div>
          <div className="text-slate-600 dark:text-slate-400 font-medium">{t("stats.transfers")}</div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl">
          <Users className="w-8 h-8 text-blue-500 mb-4" />
          <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">99%</div>
          <div className="text-slate-600 dark:text-slate-400 font-medium">{t("stats.satisfaction")}</div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">
          Company Overview
        </h3>
        <ul className="space-y-4">
          {[
            { icon: Award, text: t("years") },
            { icon: CheckCircle2, text: t("coverage") },
            { icon: Shield, text: t("certifications.license") },
            { icon: Shield, text: t("certifications.insurance") },
          ].map((item, idx) => (
            <li key={idx} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
              <span className="text-lg text-slate-700 dark:text-slate-300 font-medium">
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
