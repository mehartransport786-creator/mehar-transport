"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CarFront, Clock, UserCheck, ShieldCheck, Route, Star } from "lucide-react";

export function FleetOverview() {
    const t = useTranslations('FleetOverview');

  const stats = [
    {
      icon: CarFront,
      value: "8",
      label: t("vehicleCategories"),
    },
    {
      icon: Clock,
      value: "24/7",
      label: t("availability"),
    },
    {
      icon: UserCheck,
      value: "100%",
      label: t("professionalChauffeurs"),
    },
    {
      icon: ShieldCheck,
      value: "Premium",
      label: t("insuranceCoverage"),
    },
    {
      icon: Route,
      value: "10k+",
      label: t("successfulJourneys"),
    },
    {
      icon: Star,
      value: "99%",
      label: t("satisfactionRate"),
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-24 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="flex flex-col items-center text-center space-y-4 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-[#1B1E4F] group-hover:bg-[#1B1E4F] group-hover:text-[#D9A63A] transition-all duration-500 shadow-sm border border-slate-100">
                  <Icon className="w-7 h-7 stroke-[1.5]" />
                </div>
                <div>
                  <div className="text-3xl font-black text-[#1B1E4F] mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
