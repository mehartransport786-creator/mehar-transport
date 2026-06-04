"use client";

import { useLocale } from "next-intl";
import { mockRoutes } from "@/lib/data";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";

export function PopularRoutes() {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-0.5 bg-[#D9A63A]"></div>
        <span className="font-bold uppercase tracking-[0.2em] text-sm text-[#D9A63A]">
          {isAr ? "مسارات شائعة" : "Popular Routes"}
        </span>
      </div>

      <h3 className="text-3xl font-bold mb-8 text-[#1B1E4F]">
        {isAr ? "احجز رحلتك القادمة" : "Book Your Next Journey"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockRoutes.slice(0, 2).map((route, idx) => (
          <Link href={`/booking?route=${route.id}`} key={route.id}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative rounded-3xl overflow-hidden aspect-[16/9]"
            >
              <img 
                src={route.image} 
                alt={route.origin}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B1E4F] via-[#1B1E4F]/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-bold mb-1 flex items-center gap-2">
                      {isAr ? route.originAr : route.origin}
                      <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
                      {isAr ? route.destinationAr : route.destination}
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {route.distance} • {route.duration}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#D9A63A] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowRight className={`w-5 h-5 text-[#1B1E4F] ${isAr ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
