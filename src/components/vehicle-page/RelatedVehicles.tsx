"use client";

import { useLocale } from "next-intl";
import { mockFleet } from "@/lib/data";
import { motion } from "framer-motion";
import { Users, Briefcase, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";

interface RelatedVehiclesProps {
  currentSlug: string;
}

export function RelatedVehicles({ currentSlug }: RelatedVehiclesProps) {
  const locale = useLocale();
  const isAr = locale === "ar";

  // Filter out the current vehicle and randomly pick 3
  const related = mockFleet.filter(v => v.slug !== currentSlug).slice(0, 3);

  if (!related || related.length === 0) return null;

  return (
    <section className="mt-16 pt-16 border-t border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-3xl font-bold text-[#1B1E4F]">
          {isAr ? "قد يعجبك أيضاً" : "You May Also Like"}
        </h3>
        <Link href="/fleet" className="text-[#D9A63A] font-bold text-sm uppercase tracking-widest hover:text-[#1B1E4F] transition-colors flex items-center gap-2">
          {isAr ? "عرض كل الأسطول" : "View Full Fleet"}
          <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((vehicle, idx) => (
          <Link href={`/fleet/${vehicle.slug}`} key={vehicle.id}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="p-6">
                <div className="text-xs font-bold text-[#D9A63A] uppercase tracking-wider mb-2">
                  {isAr ? vehicle.typeAr : vehicle.type}
                </div>
                <h4 className="font-bold text-xl text-[#1B1E4F] mb-4 group-hover:text-[#D9A63A] transition-colors">
                  {isAr ? vehicle.nameAr : vehicle.name}
                </h4>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{vehicle.passengers}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <span>{vehicle.luggage}</span>
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
