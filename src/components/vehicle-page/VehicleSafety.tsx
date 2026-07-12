"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ShieldCheck, MapPin, Wrench, ShieldAlert } from "lucide-react";

export function VehicleSafety() {
    const t = useTranslations('VehicleSafety');

  const safetyFeatures = [
    {
      icon: ShieldCheck,
      title: t("certifiedChauffeurs"),
      desc: t("allDriversAreBackgroundCheckedAndTrained")
    },
    {
      icon: MapPin,
      title: t("247GpsTracking"),
      desc: t("activeFleetMonitoringForYourSecurity")
    },
    {
      icon: ShieldAlert,
      title: t("comprehensiveInsurance"),
      desc: t("fullCoverageInsuranceForAllPassengers")
    },
    {
      icon: Wrench,
      title: t("rigorousMaintenance"),
      desc: t("regularSafetyInspectionsAndServicing")
    }
  ];

  return (
    <section className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm mt-12">
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
        <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-3xl font-bold text-primary">
          {t("yourSafetyIsOurPriority")}
        </h3>
        <p className="text-gray-500">
          {t("weImplementTheHighestSafetyAndSecuritySt")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {safetyFeatures.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                <Icon className="w-5 h-5 text-secondary" />
              </div>
              <h4 className="font-bold text-primary mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
