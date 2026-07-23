"use client";

import { useTranslations } from "next-intl";
import { Car, Clock } from "lucide-react";

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
    <section className="section-padding bg-slate-50 dark:bg-slate-950">
      <div className="container-fluid">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("availability")} across all major cities and airports in Saudi Arabia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-[var(--radius-card)] aspect-[4/3] cursor-pointer shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-luxury)] transition-all duration-[var(--duration-instant)] ease-[var(--ease-out)]"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:scale-110"
                style={{ backgroundImage: `url(${city.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
              
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{city.name}</h3>
                    <div className="flex items-center gap-4 text-slate-300 text-sm">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-secondary" />
                        {city.time}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="flex items-center gap-1.5 text-slate-300 text-sm bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                      <Car className="w-4 h-4 text-secondary" />
                      {city.availability}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
