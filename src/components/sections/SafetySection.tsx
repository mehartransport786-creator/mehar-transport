"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Shield, ShieldAlert, BadgeCheck, FileCheck, LifeBuoy, HeartHandshake, Eye, Navigation } from "lucide-react";

export function SafetySection() {
    const t = useTranslations('SafetySection');

  const features = [
    {
      icon: BadgeCheck,
      title: t("licensedDrivers"),
      desc: t("allDriversUndergoStrictVettingAndTrainin")
    },
    {
      icon: Navigation,
      title: t("gpsTracking"),
      desc: t("liveMonitoringOfAllVehiclesForSafeRoutin")
    },
    {
      icon: FileCheck,
      title: t("vehicleInspections"),
      desc: t("dailyMaintenanceChecksBeforeEveryDispatc")
    },
    {
      icon: Shield,
      title: t("insuranceCoverage"),
      desc: t("comprehensivePassengerInsuranceDuringAll")
    },
    {
      icon: LifeBuoy,
      title: t("emergencySupport"),
      desc: t("dedicatedEmergencyResponseTeamAvailable2")
    },
    {
      icon: HeartHandshake,
      title: t("sanitizedVehicles"),
      desc: t("thoroughSanitizationAfterEverySingleRide")
    },
    {
      icon: ShieldAlert,
      title: t("roadSafetyStandards"),
      desc: t("strictAdherenceToSaudiTrafficAndSafetyRe")
    },
    {
      icon: Eye,
      title: t("flightMonitoring"),
      desc: t("proactiveFlightTrackingToAvoidAnyDelays")
    }
  ];

  return (
    <section className="section-padding bg-primary text-white relative overflow-hidden">
      {/* Abstract Background Patterns */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="currentColor" strokeWidth="1" fill="none"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)"/>
        </svg>
      </div>

      <div className="container-fluid relative z-10">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-16 items-center">
          
          <div className="w-full md:w-1/3 space-y-4 lg:space-y-6 animate-fade-up-luxury">
            <div className="flex items-center gap-4">
              <div className="w-12 h-0.5 bg-secondary"></div>
              <span className="text-secondary font-bold uppercase tracking-widest text-xs md:text-sm">
                {t("safetyCompliance")}
              </span>
            </div>
            <h2 className="h2 leading-tight">
              {t("yourSafetyIsOurHighestPriority")}
            </h2>
            <p className="text-white/70 text-base md:text-lg leading-relaxed font-light">
              {t("atMeharTransportWeImplementStrictCorpora")}
            </p>
          </div>

          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              {features.map((feature, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  className="flex gap-4 p-5 md:p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                >
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center border border-secondary/30 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg mb-1">{feature.title}</h3>
                    <p className="text-white/60 text-xs md:text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
