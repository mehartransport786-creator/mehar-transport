"use client";

import { useTranslations } from "next-intl";
import { motion } from "@/lib/motion";
import { Map, Car, Clock } from "lucide-react";

export function ServiceAreaCoverage() {
  const t = useTranslations("ContactPage.coverage");

  const cities = [
    { name: "Makkah", time: "1h 15m from Jeddah", availability: "High", image: "/cities/makkah.png" },
    { name: "Madinah", time: "4h 30m from Jeddah", availability: "High", image: "/cities/madinah.png" },
    { name: "Jeddah", time: "Local", availability: "Very High", image: "/cities/jeddah.png" },
    { name: "Taif", time: "2h from Jeddah", availability: "Medium", image: "/cities/taif.png" },
    { name: "Riyadh", time: "10h from Jeddah", availability: "Medium", image: "/cities/riyadh.png" },
    { name: "Yanbu", time: "3h 30m from Jeddah", availability: "Low", image: "/cities/yanbu.png" }
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
            {t("title")}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {t("availability")} across all major cities and airports in Saudi Arabia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[var(--duration-base)] group-hover:scale-110"
                style={{ backgroundImage: `url(${city.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
              
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{city.name}</h3>
                    <div className="flex items-center gap-4 text-slate-300 text-sm">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-amber-500" />
                        {city.time}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="flex items-center gap-1.5 text-slate-300 text-sm bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full">
                      <Car className="w-4 h-4 text-emerald-400" />
                      {city.availability}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
