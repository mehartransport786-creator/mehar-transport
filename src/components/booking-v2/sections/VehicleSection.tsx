"use client";

import { useLocale } from "next-intl";
import { Users, Briefcase, Check, Loader2 } from "lucide-react";
import Image from "next/image";
import { useBookingV2 } from "../context/BookingV2Context";
import { mockFleet } from "@/lib/data";
import { useState, useEffect } from "react";
import { SelectedVehicle } from "@/components/booking-page/context/BookingContext";

export function VehicleSection() {
  const { state, updateState, routes } = useBookingV2();
  const isAr = useLocale() === "ar";
  
  const [vehiclePrices, setVehiclePrices] = useState<Record<string, number | null>>({});
  const [loadingPrices, setLoadingPrices] = useState(false);

  // Fetch base prices for all vehicles based on the selected route/service type
  useEffect(() => {
    async function fetchPrices() {
      if (state.serviceType === "transfer" && !state.routeId) return;
      
      setLoadingPrices(true);
      const newPrices: Record<string, number | null> = {};
      
      // Use local mock calculation to prevent UI hanging when API fails
      if (state.serviceType === "hourly") {
        mockFleet.forEach((vehicle, idx) => {
          const rate = 100 + (idx * 25); 
          const basePrice = (state.durationHours || 4) * rate;
          newPrices[vehicle.id] = basePrice + (basePrice * 0.15); // Add 15% VAT
        });
      } else {
        const fallbackRoutesData = require("@/lib/fallbackData").fallbackRoutesData;
        const mockRoute = fallbackRoutesData.find((r: any) => r._id === state.routeId || r.slug === state.routeId);
        
        mockFleet.forEach((vehicle, idx) => {
          let basePrice = 200 + (idx * 50); // generic fallback
          if (mockRoute && mockRoute.prices && idx < mockRoute.prices.length) {
            basePrice = mockRoute.prices[idx];
          }
          newPrices[vehicle.id] = basePrice + (basePrice * 0.15); // Add 15% VAT
        });
      }
      
      // Slight delay to simulate loading for UX
      setTimeout(() => {
        setVehiclePrices(newPrices);
        setLoadingPrices(false);
      }, 300);
    }

    fetchPrices();
  }, [state.routeId, state.serviceType, state.durationHours, state.travelDate]);

  const handleSelectVehicle = (vehicle: any) => {
    const pricing = vehiclePrices[vehicle.id];
    
    const sv: SelectedVehicle = {
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      vehicleNameAr: vehicle.nameAr,
      vehicleType: vehicle.type,
      passengers: vehicle.passengers,
      luggage: vehicle.luggage,
      image: vehicle.image,
      quantity: 1,
      unitPrice: pricing || 0
    };
    
    updateState({ selectedVehicle: sv });
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-[#1B1E4F] mb-2">
        {isAr ? "اختر مركبتك" : "Select Vehicle"}
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        {isAr ? "جميع المركبات موديلات حديثة ومعقمة" : "All vehicles are latest models and sanitized."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {mockFleet.map((vehicle) => {
          const isSelected = state.selectedVehicle?.vehicleId === vehicle.id;
          const price = vehiclePrices[vehicle.id];
          const isLoading = loadingPrices && price === undefined;

          // Don't show vehicles that aren't available for this route/duration
          if (!isLoading && price === null) return null;

          return (
            <div
              key={vehicle.id}
              onClick={() => !isLoading && handleSelectVehicle(vehicle)}
              className={`relative bg-white rounded-2xl border-2 overflow-hidden transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'border-[#D9A63A] shadow-xl shadow-[#D9A63A]/10 ring-1 ring-[#D9A63A]/20'
                  : 'border-gray-100 hover:border-gray-200 hover:shadow-lg'
              } ${isLoading ? 'opacity-70 pointer-events-none' : ''}`}
            >
              {isSelected && (
                <div className="absolute top-3 left-3 bg-[#D9A63A] text-white p-1.5 rounded-full z-10 shadow-lg animate-in fade-in zoom-in duration-300">
                  <Check className="w-4 h-4" />
                </div>
              )}

              <div className="relative h-44 w-full bg-gradient-to-br from-[#F8F9FC] to-[#EEF0F4] flex items-center justify-center overflow-hidden">
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  width={280}
                  height={160}
                  className={`object-contain drop-shadow-xl transition-transform duration-500 ${isSelected ? 'scale-105' : 'hover:scale-105'}`}
                />
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#1B1E4F] leading-tight">
                      {isAr ? vehicle.nameAr : vehicle.name}
                    </h3>
                    <span className="inline-block mt-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#1B1E4F]/5 text-[#1B1E4F]/60 uppercase tracking-wider">
                      {vehicle.type}
                    </span>
                  </div>
                  <div className="text-right">
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin text-gray-300" />
                    ) : (
                      <>
                        <div className="text-xl font-black text-[#1B1E4F] tabular-nums">
                          {price?.toFixed(0)} <span className="text-xs text-gray-500 font-medium ml-0.5">SAR</span>
                        </div>
                        <div className="text-[10px] text-gray-400 font-medium">
                          {state.serviceType === "hourly" ? (isAr ? `لـ ${state.durationHours} ساعات` : `for ${state.durationHours}h`) : (isAr ? "للرحلة" : "per trip")}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Users className="w-4 h-4 text-blue-500/70" />
                    <span className="font-medium">{vehicle.passengers} {isAr ? "ركاب" : "pax"}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Briefcase className="w-4 h-4 text-amber-500/70" />
                    <span className="font-medium">{vehicle.luggage} {isAr ? "حقائب" : "bags"}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
