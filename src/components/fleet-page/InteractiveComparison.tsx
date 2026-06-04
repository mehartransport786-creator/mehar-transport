"use client";

import { useLocale } from "next-intl";
import { mockFleet } from "@/lib/data";
import { motion } from "framer-motion";
import { CheckCircle2, Star, X } from "lucide-react";
import { Link } from "@/i18n/routing";

export function InteractiveComparison() {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section className="py-24 bg-slate-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#D9A63A] font-bold uppercase tracking-[0.2em] text-sm block">
            {isAr ? "مقارنة" : "Compare"}
          </span>
          <h2 className="text-4xl font-bold text-[#1B1E4F]">
            {isAr ? "ابحث عن مركبتك المثالية" : "Find Your Perfect Match"}
          </h2>
        </div>

        <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left min-w-[1000px]">
              <thead className="bg-[#1B1E4F] text-white">
                <tr>
                  <th className="px-6 py-6 font-bold tracking-widest uppercase text-xs sticky left-0 bg-[#1B1E4F] z-10 w-[250px] shadow-[4px_0_10px_rgba(0,0,0,0.1)]">
                    {isAr ? "المركبة" : "Vehicle"}
                  </th>
                  <th className="px-6 py-6 font-bold tracking-widest uppercase text-xs text-center">{isAr ? "الركاب" : "Passengers"}</th>
                  <th className="px-6 py-6 font-bold tracking-widest uppercase text-xs text-center">{isAr ? "الحقائب" : "Luggage"}</th>
                  <th className="px-6 py-6 font-bold tracking-widest uppercase text-xs text-center">{isAr ? "الفخامة" : "Luxury Level"}</th>
                  <th className="px-6 py-6 font-bold tracking-widest uppercase text-xs text-center">{isAr ? "مطار" : "Airport"}</th>
                  <th className="px-6 py-6 font-bold tracking-widest uppercase text-xs text-center">{isAr ? "عمرة" : "Umrah"}</th>
                  <th className="px-6 py-6 font-bold tracking-widest uppercase text-xs text-center">{isAr ? "VIP" : "VIP"}</th>
                  <th className="px-6 py-6 font-bold tracking-widest uppercase text-xs text-center">{isAr ? "السعر المبدئي" : "Starting Price"}</th>
                  <th className="px-6 py-6 font-bold tracking-widest uppercase text-xs text-center"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockFleet.map((vehicle, i) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    key={vehicle.id} 
                    className="hover:bg-slate-50 transition-colors group"
                  >
                    <td className="px-6 py-5 sticky left-0 bg-white group-hover:bg-slate-50 transition-colors z-10 shadow-[4px_0_10px_rgba(0,0,0,0.02)] border-r border-gray-50">
                      <div className="flex items-center gap-4">
                        <img src={vehicle.image} alt={vehicle.name} className="w-16 h-10 object-cover rounded shadow-sm" />
                        <div>
                          <div className="font-bold text-[#1B1E4F]">{isAr ? vehicle.nameAr : vehicle.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{isAr ? vehicle.typeAr : vehicle.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center font-semibold text-[#1B1E4F]">{vehicle.passengers}</td>
                    <td className="px-6 py-5 text-center font-semibold text-[#1B1E4F]">{vehicle.luggage}</td>
                    <td className="px-6 py-5 text-center">
                      <div className="flex items-center justify-center gap-0.5">
                        {[...Array(5)].map((_, idx) => (
                          <Star 
                            key={idx} 
                            className={`w-3.5 h-3.5 ${idx < (vehicle.luxuryLevel > 5 ? 5 : vehicle.luxuryLevel) ? 'fill-[#D9A63A] text-[#D9A63A]' : 'fill-gray-200 text-gray-200'}`} 
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      {vehicle.airportTransfer ? <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-gray-300 mx-auto" />}
                    </td>
                    <td className="px-6 py-5 text-center">
                      {vehicle.umrahTransfer ? <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-gray-300 mx-auto" />}
                    </td>
                    <td className="px-6 py-5 text-center">
                      {vehicle.vipService ? (
                        <span className="bg-[#1B1E4F] text-[#D9A63A] text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-widest">VIP</span>
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-center font-bold text-[#1B1E4F]">{vehicle.basePrice} SAR</td>
                    <td className="px-6 py-5 text-center">
                      <Link 
                        href={`/booking?vehicle=${vehicle.id}`}
                        className="opacity-0 group-hover:opacity-100 bg-[#D9A63A] text-[#1B1E4F] hover:bg-[#1B1E4F] hover:text-white px-4 py-2 rounded-lg font-bold transition-all text-xs uppercase tracking-wider"
                      >
                        {isAr ? "احجز" : "Book"}
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
