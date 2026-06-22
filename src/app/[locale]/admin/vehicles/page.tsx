"use client";

import { useLocale } from "next-intl";
import { useState, useEffect } from "react";
import { Users, Briefcase, Star, BarChart3, DollarSign, TrendingUp, Edit3, Eye, MoreHorizontal, Loader2, Trash2 } from "lucide-react";
import { Link } from "@/i18n/routing";

const vehicleStats: Record<string, { bookings: number; revenue: number; utilization: number; rating: number }> = {
  "kia-k5":               { bookings: 410, revenue: 61500,   utilization: 78, rating: 4.7 },
  "mitsubishi-xpander":   { bookings: 380, revenue: 95000,   utilization: 82, rating: 4.6 },
  "hyundai-staria":       { bookings: 520, revenue: 208000,  utilization: 91, rating: 4.9 },
  "toyota-hiace":         { bookings: 480, revenue: 216000,  utilization: 88, rating: 4.7 },
  "toyota-coaster":       { bookings: 310, revenue: 217000,  utilization: 72, rating: 4.8 },
  "luxury-bus":           { bookings: 250, revenue: 375000,  utilization: 65, rating: 4.6 },
  "mercedes-s-class":     { bookings: 340, revenue: 408000,  utilization: 85, rating: 5.0 },
  "rolls-royce":          { bookings: 157, revenue: 549500,  utilization: 60, rating: 5.0 },
};

export default function VehiclesPage() {
  const locale = useLocale();
  const isAr = locale === "ar";
  
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDeleteVehicle = async (id: string) => {
    if (!window.confirm(isAr ? "هل أنت متأكد من حذف هذه المركبة؟" : "Are you sure you want to delete this vehicle?")) return;
    
    setIsDeleting(id);
    try {
      const res = await fetch(`/api/vehicles/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setVehicles(prev => prev.filter(v => (v._id || v.id) !== id));
      } else {
        alert(data.error || "Failed to delete vehicle");
      }
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      alert("An error occurred while deleting the vehicle");
    } finally {
      setIsDeleting(null);
    }
  };

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const res = await fetch('/api/vehicles');
        const data = await res.json();
        if (data.success) {
          setVehicles(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch vehicles:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchVehicles();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#1B1E4F" }}>
            {isAr ? "إدارة المركبات" : "Fleet Management"}
          </h1>
          <p className="text-gray-500 mt-1 text-sm font-medium">
            {isAr ? `${vehicles.length} مركبات في الأسطول` : `${vehicles.length} vehicles in fleet`}
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#1B1E4F] text-white hover:bg-[#2a2f6b] px-5 py-3 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-[#1B1E4F]/20">
          + {isAr ? "إضافة مركبة" : "Add Vehicle"}
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 text-[#D9A63A]">
          <Loader2 className="w-10 h-10 animate-spin" />
          <p className="mt-4 text-[#1B1E4F] font-semibold">{isAr ? "جاري التحميل..." : "Loading vehicles..."}</p>
        </div>
      ) : (
        /* Fleet Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {vehicles.map((vehicle) => {
            const stats = vehicleStats[vehicle.slug] || { bookings: 0, revenue: 0, utilization: 0, rating: 0 };
            return (
              <div
                key={vehicle._id || vehicle.id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-[#D9A63A]/20 transition-all duration-300 group flex flex-col"
              >
                {/* Image */}
                <div className="aspect-[16/10] relative overflow-hidden bg-gray-100 shrink-0">
                  <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  {vehicle.specialLabel && (
                    <div className="absolute top-3 left-3 bg-[#1B1E4F]/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {isAr ? vehicle.specialLabelAr : vehicle.specialLabel}
                    </div>
                  )}
                  {/* Utilization badge */}
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1.5 shadow-sm">
                    <div className={`w-2 h-2 rounded-full ${stats.utilization >= 80 ? "bg-emerald-500" : stats.utilization >= 60 ? "bg-amber-500" : "bg-red-500"}`} />
                    <span className="text-xs font-bold text-gray-700">{stats.utilization}%</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-[#1B1E4F] text-lg">{isAr ? vehicle.nameAr : vehicle.name}</h3>
                      <p className="text-xs text-[#D9A63A] font-semibold mt-0.5">{isAr ? vehicle.typeAr : vehicle.type}</p>
                    </div>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Specs */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" /> {vehicle.passengers}
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5" /> {vehicle.luggage}
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(Math.min(vehicle.luxuryLevel || 5, 5))].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#D9A63A] text-[#D9A63A]" />
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">{isAr ? "الحجوزات" : "Bookings"}</div>
                      <div className="text-lg font-black text-[#1B1E4F]">{stats.bookings}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">{isAr ? "الإيرادات" : "Revenue"}</div>
                      <div className="text-lg font-black text-[#1B1E4F]">{(stats.revenue / 1000).toFixed(0)}K</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-auto">
                    <button className="flex-1 flex items-center justify-center gap-1.5 bg-gray-50 text-gray-600 hover:bg-gray-100 py-2.5 rounded-xl text-xs font-semibold transition-colors">
                      <Eye className="w-3.5 h-3.5" /> {isAr ? "عرض" : "View"}
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 bg-[#1B1E4F] text-white hover:bg-[#2a2f6b] py-2.5 rounded-xl text-xs font-semibold transition-colors">
                      <Edit3 className="w-3.5 h-3.5" /> {isAr ? "تعديل" : "Edit"}
                    </button>
                    <button 
                      onClick={() => handleDeleteVehicle(vehicle._id || vehicle.id)}
                      disabled={isDeleting === (vehicle._id || vehicle.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-red-50 text-red-600 hover:bg-red-100 py-2.5 rounded-xl text-xs font-semibold transition-colors disabled:opacity-50"
                    >
                      {isDeleting === (vehicle._id || vehicle.id) ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                      {isAr ? "حذف" : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
