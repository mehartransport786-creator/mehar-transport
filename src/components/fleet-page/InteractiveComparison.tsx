"use client";

import { useLocale } from "next-intl";
import { CheckCircle2, Star, X } from "lucide-react";
import { Link } from "@/i18n/routing";

export function InteractiveComparison({ vehicles }: { vehicles: any[] }) {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section className="section-padding bg-muted border-t border-border">
      <div className="container-fluid">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-secondary font-bold uppercase tracking-[0.2em] text-sm block">
            {isAr ? "مقارنة" : "Compare"}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
            {isAr ? "ابحث عن مركبتك المثالية" : "Find Your Perfect Match"}
          </h2>
        </div>

        <div className="bg-background rounded-[var(--radius-card)] shadow-[var(--shadow-luxury)] border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left min-w-[1000px]">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="px-6 py-6 font-bold tracking-widest uppercase text-xs sticky left-0 bg-primary z-10 w-[250px] shadow-[4px_0_10px_rgba(0,0,0,0.1)]">
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
              <tbody className="divide-y divide-border">
                {vehicles.map((vehicle, i) => (
                  <tr 
                    key={vehicle._id || vehicle.slug} 
                    className="hover:bg-muted/50 transition-colors duration-[var(--duration-instant)] ease-[var(--ease-out)] group animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <td className="px-6 py-5 sticky left-0 bg-background group-hover:bg-muted/50 transition-colors duration-[var(--duration-instant)] ease-[var(--ease-out)] z-10 shadow-[4px_0_10px_rgba(0,0,0,0.02)] border-r border-border/50">
                      <div className="flex items-center gap-4">
                        <img src={vehicle.image} alt={vehicle.name} className="w-16 h-10 object-cover rounded shadow-sm" />
                        <div>
                          <div className="font-bold text-primary">{isAr ? vehicle.nameAr : vehicle.name}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{isAr ? vehicle.typeAr : vehicle.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center font-semibold text-primary">{vehicle.passengers}</td>
                    <td className="px-6 py-5 text-center font-semibold text-primary">{vehicle.luggage}</td>
                    <td className="px-6 py-5 text-center">
                      <div className="flex items-center justify-center gap-0.5">
                        {[...Array(5)].map((_, idx) => (
                          <Star 
                            key={idx} 
                            className={`w-3.5 h-3.5 ${idx < (vehicle.luxuryLevel > 5 ? 5 : vehicle.luxuryLevel) ? 'fill-secondary text-secondary' : 'fill-muted text-muted'}`} 
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      {vehicle.airportTransfer ? <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-muted-foreground mx-auto" />}
                    </td>
                    <td className="px-6 py-5 text-center">
                      {vehicle.umrahTransfer ? <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-muted-foreground mx-auto" />}
                    </td>
                    <td className="px-6 py-5 text-center">
                      {vehicle.vipService ? (
                        <span className="bg-primary text-secondary text-[10px] font-bold px-2 py-1 rounded-[var(--radius-sm)] uppercase tracking-widest">VIP</span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-center font-bold text-primary">{vehicle.basePrice} SAR</td>
                    <td className="px-6 py-5 text-center">
                      <Link 
                        href={`/booking?vehicle=${vehicle._id || vehicle.slug}`}
                        className="opacity-0 group-hover:opacity-100 bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground px-4 py-2 rounded-[var(--radius-btn)] font-bold transition-all duration-[var(--duration-instant)] ease-[var(--ease-out)] text-xs uppercase tracking-wider"
                      >
                        {isAr ? "احجز" : "Book"}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
