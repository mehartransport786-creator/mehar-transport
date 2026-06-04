"use client";

import { useLocale } from "next-intl";
import { mockFleet } from "@/lib/data";
import { Check } from "lucide-react";
import { Link } from "@/i18n/routing";

interface VehicleComparisonProps {
  currentSlug: string;
}

export function VehicleComparison({ currentSlug }: VehicleComparisonProps) {
  const locale = useLocale();
  const isAr = locale === "ar";

  // Get current vehicle and 2 others for comparison
  const currentVehicle = mockFleet.find(v => v.slug === currentSlug);
  const otherVehicles = mockFleet.filter(v => v.slug !== currentSlug).slice(0, 2);
  
  if (!currentVehicle) return null;
  
  const comparisonVehicles = [currentVehicle, ...otherVehicles];

  return (
    <section className="mt-16 border-t border-gray-100 pt-16">
      <h3 className="text-3xl font-bold text-[#1B1E4F] mb-8">
        {isAr ? "قارن مع مركبات أخرى" : "Compare with Other Vehicles"}
      </h3>

      <div className="overflow-x-auto pb-4">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="p-4"></div>
            {comparisonVehicles.map(v => (
              <div key={v.id} className={`p-4 rounded-xl text-center ${v.slug === currentSlug ? 'bg-slate-50 border-2 border-[#D9A63A]' : 'bg-white border border-gray-100'}`}>
                {v.slug === currentSlug && (
                  <div className="text-xs font-bold text-[#D9A63A] uppercase mb-2">
                    {isAr ? "المركبة الحالية" : "Current Vehicle"}
                  </div>
                )}
                <img src={v.image} alt={v.name} className="w-full h-24 object-cover rounded-lg mb-4" />
                <h4 className="font-bold text-[#1B1E4F] text-sm md:text-base">
                  {isAr ? v.nameAr : v.name}
                </h4>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-4 py-4 border-b border-gray-100 items-center">
            <div className="font-bold text-gray-500 pl-4">{isAr ? "السعة" : "Capacity"}</div>
            {comparisonVehicles.map(v => (
              <div key={v.id} className="text-center text-sm">
                {v.passengers} {isAr ? "ركاب" : "Passengers"} / {v.luggage} {isAr ? "حقائب" : "Luggage"}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-4 py-4 border-b border-gray-100 items-center">
            <div className="font-bold text-gray-500 pl-4">{isAr ? "مستوى الفخامة" : "Luxury Level"}</div>
            {comparisonVehicles.map(v => (
              <div key={v.id} className="text-center text-sm flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full ${i < v.luxuryLevel ? 'bg-[#1B1E4F]' : 'bg-gray-200'}`} />
                ))}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-4 py-4 border-b border-gray-100 items-center">
            <div className="font-bold text-gray-500 pl-4">{isAr ? "خدمة VIP" : "VIP Service"}</div>
            {comparisonVehicles.map(v => (
              <div key={v.id} className="flex justify-center text-[#D9A63A]">
                {v.vipService ? <Check className="w-5 h-5" /> : <span className="text-gray-300">-</span>}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-4 py-4 mt-4 items-center">
            <div></div>
            {comparisonVehicles.map(v => (
              <div key={v.id} className="text-center">
                {v.slug !== currentSlug ? (
                  <Link 
                    href={`/fleet/${v.slug}`}
                    className="text-sm font-bold text-[#D9A63A] hover:text-[#1B1E4F] transition-colors"
                  >
                    {isAr ? "عرض التفاصيل" : "View Details"}
                  </Link>
                ) : (
                  <div className="text-sm font-bold text-gray-400">
                    {isAr ? "تتصفح حالياً" : "Currently Viewing"}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
