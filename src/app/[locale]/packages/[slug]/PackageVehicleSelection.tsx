"use client";

import { useState } from "react";
import { Check, Car, Users, Briefcase, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function PackageVehicleSelection({ pkg, locale }: { pkg: any, locale: string }) {
  const isAr = locale === "ar";
  
  // Start with the cheapest vehicle
  const sortedVehicles = [...(pkg.availableVehicles || [])].sort((a, b) => a.totalPrice - b.totalPrice);
  const [selectedVehicleId, setSelectedVehicleId] = useState(sortedVehicles[0]?._id);

  const selectedVehicle = sortedVehicles.find(v => v._id === selectedVehicleId);

  return (
    <div className="sticky top-8 space-y-6">
      
      {/* Total Price Sticky Header */}
      <div className="bg-[#1B1E4F] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#D9A63A]/10 rounded-full blur-2xl" />
        
        <h3 className="text-xl font-bold mb-6">{isAr ? "تكلفة الباقة" : "Package Total"}</h3>
        
        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-5xl font-bold text-[#D9A63A]">
            {selectedVehicle?.totalPrice || pkg.startingPrice}
          </span>
          <span className="text-lg font-semibold text-white/60">SAR</span>
        </div>

        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-3 text-sm text-white/80">
            <CheckCircle2 className="w-4 h-4 text-[#D9A63A]" />
            <span>{pkg.includedRoutes?.length} {isAr ? "مسارات مضمنة" : "Included Routes"}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/80">
            <CheckCircle2 className="w-4 h-4 text-[#D9A63A]" />
            <span>{isAr ? "لا توجد رسوم خفية" : "No hidden fees"}</span>
          </div>
        </div>

        <button 
          onClick={() => {
            window.location.href = `/${locale}/booking?package=${pkg.slug}&vehicle=${selectedVehicleId}`;
          }}
          className="w-full bg-[#D9A63A] text-[#1B1E4F] py-4 rounded-xl font-bold text-lg hover:bg-white transition-colors shadow-lg shadow-[#D9A63A]/20 flex items-center justify-center gap-2"
        >
          {isAr ? "احجز الباقة الآن" : "Book Package Now"}
          <ArrowRight className="w-5 h-5 rtl:rotate-180" />
        </button>
      </div>

      {/* Vehicle Selection */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-[#1B1E4F] mb-4 flex items-center gap-2">
          <Car className="w-5 h-5" />
          {isAr ? "اختر المركبة" : "Select Vehicle"}
        </h3>

        <div className="space-y-3">
          {sortedVehicles.map((vehicle: any) => {
            const isSelected = selectedVehicleId === vehicle._id;
            
            return (
              <button
                key={vehicle._id}
                onClick={() => setSelectedVehicleId(vehicle._id)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all relative overflow-hidden ${
                  isSelected
                    ? "border-[#D9A63A] bg-[#D9A63A]/5"
                    : "border-gray-100 bg-white hover:border-gray-200"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 bg-[#D9A63A] text-white px-2 py-1 rounded-bl-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Selected
                  </div>
                )}
                
                <div className="flex items-center gap-4">
                  <div className="w-16 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0 relative">
                    {vehicle.image ? (
                      <Image src={vehicle.image} alt={vehicle.name} fill className="object-cover" />
                    ) : (
                      <Car className="w-6 h-6 m-auto text-gray-400 mt-3" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 text-sm">{vehicle.name}</h4>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {vehicle.passengers}</span>
                      <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {vehicle.luggage}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-bold text-[#1B1E4F]">{vehicle.totalPrice} SAR</div>
                  </div>
                </div>

                {isSelected && vehicle.routeBreakdown && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="mt-4 pt-4 border-t border-gray-200/60"
                  >
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                      {isAr ? "تفصيل السعر" : "Price Breakdown"}
                    </p>
                    <div className="space-y-2">
                      {vehicle.routeBreakdown.map((rb: any, idx: number) => {
                        const route = pkg.includedRoutes.find((r: any) => r._id === rb.routeId);
                        return (
                          <div key={idx} className="flex justify-between text-xs">
                            <span className="text-gray-500 truncate pr-4">{route ? (isAr ? route.nameAr : route.name) : "Route"}</span>
                            <span className="font-semibold text-gray-700">{rb.price} SAR</span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </button>
            );
          })}
        </div>
      </div>
      
    </div>
  );
}
