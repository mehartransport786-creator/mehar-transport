"use client";

import { useLocale } from "next-intl";
import { useState, useEffect } from "react";
import { Star, Phone, MapPin, TrendingUp, Eye, Edit3, MoreHorizontal, Loader2 } from "lucide-react";

const availabilityConfig: Record<string, { label: string; labelAr: string; color: string; bg: string }> = {
  available: { label: "Available",  labelAr: "متاح",       color: "#16A34A", bg: "#DCFCE7" },
  on_trip:   { label: "On Trip",    labelAr: "في رحلة",     color: "#2563EB", bg: "#DBEAFE" },
  off_duty:  { label: "Off Duty",   labelAr: "خارج الخدمة", color: "#6B7280", bg: "#F3F4F6" },
};

export default function DriversPage() {
  const locale = useLocale();
  const isAr = locale === "ar";

  const [drivers, setDrivers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDrivers() {
      try {
        const res = await fetch('/api/drivers');
        const data = await res.json();
        if (data.success) {
          setDrivers(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch drivers:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDrivers();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#1B1E4F" }}>
            {isAr ? "إدارة السائقين" : "Driver Management"}
          </h1>
          <p className="text-gray-500 mt-1 text-sm font-medium">
            {isAr ? `${drivers.length} سائقين مسجلين` : `${drivers.length} registered drivers`}
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#1B1E4F] text-white hover:bg-[#2a2f6b] px-5 py-3 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-[#1B1E4F]/20">
          + {isAr ? "إضافة سائق" : "Add Driver"}
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 text-[#D9A63A]">
          <Loader2 className="w-10 h-10 animate-spin" />
          <p className="mt-4 text-[#1B1E4F] font-semibold">{isAr ? "جاري التحميل..." : "Loading drivers..."}</p>
        </div>
      ) : (
        <>
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                <div className="w-3 h-3 bg-emerald-500 rounded-full" />
              </div>
              <div>
                <div className="text-sm text-gray-400 font-medium">{isAr ? "متاح" : "Available"}</div>
                <div className="text-2xl font-black text-[#1B1E4F]">{drivers.filter(d => d.availability === "available").length}</div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <div className="text-sm text-gray-400 font-medium">{isAr ? "في رحلة" : "On Trip"}</div>
                <div className="text-2xl font-black text-[#1B1E4F]">{drivers.filter(d => d.availability === "on_trip").length}</div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              </div>
              <div>
                <div className="text-sm text-gray-400 font-medium">{isAr ? "متوسط التقييم" : "Avg. Rating"}</div>
                <div className="text-2xl font-black text-[#1B1E4F]">
                  {drivers.length > 0 ? (drivers.reduce((a, d) => a + d.rating, 0) / drivers.length).toFixed(1) : "0.0"}
                </div>
              </div>
            </div>
          </div>

          {/* Driver Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {drivers.map((driver) => {
              const avail = availabilityConfig[driver.availability] || availabilityConfig['off_duty'];
              return (
                <div
                  key={driver._id || driver.id}
                  className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:border-[#D9A63A]/20 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <img src={driver.photo} alt={driver.name} className="w-14 h-14 rounded-xl object-cover shadow-sm" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-[#1B1E4F] text-lg truncate">{isAr ? driver.nameAr : driver.name}</h3>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 ml-2"
                          style={{ color: avail.color, background: avail.bg }}
                        >
                          {isAr ? avail.labelAr : avail.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{driver.license}</p>
                      <div className="flex items-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(driver.rating) ? "fill-[#D9A63A] text-[#D9A63A]" : "fill-gray-200 text-gray-200"}`} />
                        ))}
                        <span className="text-xs font-bold text-gray-500 ml-1">{driver.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-5 pb-5 border-b border-gray-100 flex-wrap">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{driver.phone}</span>
                    <span className="mx-1">•</span>
                    <span>{driver.languages?.join(", ")}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-5">
                    <div className="text-center">
                      <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">{isAr ? "رحلات" : "Trips"}</div>
                      <div className="text-xl font-black text-[#1B1E4F] mt-1">{driver.trips}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">{isAr ? "الإيرادات" : "Revenue"}</div>
                      <div className="text-xl font-black text-[#1B1E4F] mt-1">{(driver.revenue / 1000).toFixed(0)}K</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">{isAr ? "التقييم" : "Rating"}</div>
                      <div className="text-xl font-black text-[#D9A63A] mt-1">{driver.rating}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="flex-1 flex items-center justify-center gap-1.5 bg-gray-50 text-gray-600 hover:bg-gray-100 py-2.5 rounded-xl text-xs font-semibold transition-colors">
                      <Eye className="w-3.5 h-3.5" /> {isAr ? "عرض" : "Profile"}
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 bg-[#1B1E4F] text-white hover:bg-[#2a2f6b] py-2.5 rounded-xl text-xs font-semibold transition-colors">
                      <Edit3 className="w-3.5 h-3.5" /> {isAr ? "تعديل" : "Edit"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
