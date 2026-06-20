"use client";

import { useState, useEffect, useMemo } from "react";
import { useBooking, SelectedVehicle } from "../context/BookingContext";
import { Users, Briefcase, Plus, Minus, Check, ArrowRight, ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function Step2VehicleSelection() {
  const { state, updateState, prevStep, nextStep } = useBooking();
  const [vehiclePrices, setVehiclePrices] = useState<Record<string, any>>({});
  const [loadingPrices, setLoadingPrices] = useState(true);

  // Get vehicles from the first selected route's pricings
  const availableVehicles = useMemo(() => {
    const vehicleMap = new Map();
    const firstRoute = state.selectedRoutes.find((r: any) => r !== null);
    if (firstRoute?.pricings) {
      for (const p of firstRoute.pricings) {
        if (!vehicleMap.has(p.vehicleId)) {
          vehicleMap.set(p.vehicleId, p);
        }
      }
    }
    return Array.from(vehicleMap.values());
  }, [state.selectedRoutes]);

  // Fetch per-vehicle pricing from API
  useEffect(() => {
    let cancelled = false;
    async function fetchPrices() {
      const validRoutes = state.selectedRoutes.filter((r: any) => r !== null);
      if (validRoutes.length === 0 || availableVehicles.length === 0) return;

      setLoadingPrices(true);
      const prices: Record<string, any> = {};
      const dateToUse = state.dates.pickupDate || new Date().toISOString().split('T')[0];

      for (const vehicle of availableVehicles) {
        let totalBase = 0;
        let totalFinal = 0;
        let totalTax = 0;
        let totalWithTax = 0;
        const adjustments: any[] = [];

        for (const route of validRoutes) {
          try {
            const res = await fetch('/api/pricing/calculate/route', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                type: 'transfer',
                routeId: route._id,
                vehicleId: vehicle.vehicleId,
                date: dateToUse,
              })
            });
            const data = await res.json();
            if (data.success && data.data) {
              totalBase += data.data.basePrice;
              totalFinal += data.data.finalPriceBeforeTax;
              totalTax += data.data.taxAmount;
              totalWithTax += data.data.totalIncludingTax;
              if (data.data.adjustments) {
                for (const adj of data.data.adjustments) {
                  const existing = adjustments.find(a => a.name === adj.name);
                  if (existing) existing.amount += adj.amount;
                  else adjustments.push({ ...adj });
                }
              }
            }
          } catch { /* skip */ }
        }

        if (!cancelled) {
          prices[vehicle.vehicleId] = { basePrice: totalBase, finalPriceBeforeTax: totalFinal, taxAmount: totalTax, totalIncludingTax: totalWithTax, adjustments };
        }
      }

      if (!cancelled) {
        setVehiclePrices(prices);
        setLoadingPrices(false);
      }
    }
    fetchPrices();
    return () => { cancelled = true; };
  }, [state.selectedRoutes, state.dates.pickupDate, availableVehicles]);

  const handleQuantityChange = (vehicleData: any, delta: number) => {
    const vehicleId = vehicleData.vehicleId;
    const existing = state.vehicles.find(v => v.vehicleId === vehicleId);
    let newVehicles = [...state.vehicles];

    if (existing) {
      const newQty = Math.max(0, existing.quantity + delta);
      if (newQty === 0) {
        newVehicles = newVehicles.filter(v => v.vehicleId !== vehicleId);
      } else {
        newVehicles = newVehicles.map(v =>
          v.vehicleId === vehicleId ? { ...v, quantity: newQty } : v
        );
      }
    } else if (delta > 0) {
      const pricing = vehiclePrices[vehicleId];
      const sv: SelectedVehicle = {
        vehicleId,
        vehicleName: vehicleData.vehicleName,
        vehicleNameAr: vehicleData.vehicleNameAr,
        vehicleType: vehicleData.vehicleType,
        passengers: vehicleData.passengers,
        luggage: vehicleData.luggage,
        image: vehicleData.image,
        quantity: 1,
        unitPrice: pricing?.totalIncludingTax || vehicleData.currentPrice || 0
      };
      newVehicles.push(sv);
    }

    updateState({ vehicles: newVehicles });
  };

  const getQuantity = (vehicleId: string) => {
    return state.vehicles.find(v => v.vehicleId === vehicleId)?.quantity || 0;
  };

  const hasSelection = state.vehicles.length > 0;
  const totalVehicles = state.vehicles.reduce((sum, v) => sum + v.quantity, 0);
  const totalCapacity = state.vehicles.reduce((sum, v) => sum + (v.passengers * v.quantity), 0);

  return (
    <div className="p-6 sm:p-8 md:p-10 lg:p-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[#D9A63A]/10 text-[#D9A63A] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
          <Sparkles className="w-4 h-4" />
          Step 2 of 4
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1B1E4F] mb-2 tracking-tight">
          Choose Your Vehicle
        </h2>
        <p className="text-lg text-[#1B1E4F]/40 font-medium" dir="rtl">اختر مركبتك</p>
        <p className="text-sm text-gray-500 mt-2 max-w-lg mx-auto">
          Select one or multiple vehicles for your journey. Prices shown include all applicable seasonal adjustments.
        </p>
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {availableVehicles.map((vehicle: any, idx: number) => {
          const qty = getQuantity(vehicle.vehicleId);
          const isSelected = qty > 0;
          const pricing = vehiclePrices[vehicle.vehicleId];
          const isLoading = loadingPrices || !pricing;

          return (
            <motion.div
              key={vehicle.vehicleId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              className={`bg-white rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                isSelected
                  ? 'border-[#D9A63A] shadow-xl shadow-[#D9A63A]/10 ring-1 ring-[#D9A63A]/20'
                  : 'border-gray-100 hover:border-gray-200 hover:shadow-lg'
              }`}
            >
              {/* Vehicle Image */}
              <div className="relative h-44 sm:h-52 w-full bg-gradient-to-br from-[#F8F9FC] to-[#EEF0F4] flex items-center justify-center overflow-hidden">
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 left-3 bg-[#D9A63A] text-white p-1.5 rounded-full z-10 shadow-lg"
                  >
                    <Check className="w-4 h-4" />
                  </motion.div>
                )}
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-3 right-3 bg-[#1B1E4F] text-white px-3 py-1 rounded-full text-xs font-bold z-10"
                  >
                    ×{qty}
                  </motion.div>
                )}
                <Image
                  src={vehicle.image || "/fleet/placeholder.webp"}
                  alt={vehicle.vehicleName}
                  width={320}
                  height={180}
                  className="object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="p-5 sm:p-6">
                {/* Name & Price Row */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#1B1E4F] leading-tight">{vehicle.vehicleName}</h3>
                    <p className="text-xs text-gray-400 mt-0.5" dir="rtl">{vehicle.vehicleNameAr}</p>
                    <span className="inline-block mt-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#1B1E4F]/5 text-[#1B1E4F]/60">
                      {vehicle.vehicleType}
                    </span>
                  </div>
                  <div className="text-right">
                    {isLoading ? (
                      <div className="space-y-1.5">
                        <div className="h-6 w-20 bg-gray-100 animate-pulse rounded" />
                        <div className="h-3 w-14 bg-gray-100 animate-pulse rounded ml-auto" />
                      </div>
                    ) : (
                      <>
                        <div className="text-2xl font-black text-[#1B1E4F] tabular-nums">
                          {pricing.totalIncludingTax.toFixed(0)}
                        </div>
                        <div className="text-xs text-gray-400 font-medium">SAR / trip</div>
                      </>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="flex gap-4 mb-4">
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Users className="w-3.5 h-3.5 text-blue-500" />
                    </div>
                    <span className="font-medium">{vehicle.passengers} pax</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
                      <Briefcase className="w-3.5 h-3.5 text-amber-500" />
                    </div>
                    <span className="font-medium">{vehicle.luggage} bags</span>
                  </div>
                </div>

                {/* Price Breakdown (Expandable) */}
                {!isLoading && pricing && pricing.adjustments.length > 0 && (
                  <div className="bg-amber-50/60 rounded-xl p-3 text-xs mb-4 space-y-1 border border-amber-100/50">
                    <div className="flex justify-between text-gray-500">
                      <span>Base fare</span>
                      <span className="font-medium tabular-nums">{pricing.basePrice.toFixed(0)} SAR</span>
                    </div>
                    {pricing.adjustments.map((adj: any, i: number) => (
                      <div key={i} className="flex justify-between text-amber-700">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          {adj.name}
                        </span>
                        <span className="font-medium tabular-nums">{adj.amount > 0 ? '+' : ''}{adj.amount.toFixed(0)} SAR</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-gray-500 pt-1 border-t border-amber-200/50">
                      <span>VAT (15%)</span>
                      <span className="font-medium tabular-nums">{pricing.taxAmount.toFixed(0)} SAR</span>
                    </div>
                  </div>
                )}

                {/* Quantity Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm font-semibold text-[#1B1E4F]">Vehicles needed</span>
                  <div className="flex items-center gap-1 bg-[#F8F9FC] rounded-xl p-1 border border-gray-200">
                    <button
                      onClick={() => handleQuantityChange(vehicle, -1)}
                      disabled={qty === 0}
                      className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white hover:shadow-sm text-gray-500 disabled:opacity-30 transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-bold text-[#1B1E4F] text-lg tabular-nums">{qty}</span>
                    <button
                      onClick={() => handleQuantityChange(vehicle, 1)}
                      className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white hover:shadow-sm text-[#D9A63A] transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Selection Summary Banner */}
      <AnimatePresence>
        {hasSelection && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-6 bg-[#1B1E4F] rounded-2xl p-5 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <ShieldCheck className="w-5 h-5 text-[#D9A63A] shrink-0" />
              <div>
                <div className="font-bold text-sm">{totalVehicles} vehicle{totalVehicles > 1 ? 's' : ''} selected</div>
                <div className="text-xs text-gray-400">Total capacity: {totalCapacity} passengers</div>
              </div>
            </div>
            <div className="flex gap-3 text-xs">
              {state.vehicles.map(v => (
                <span key={v.vehicleId} className="bg-white/10 px-3 py-1 rounded-full">
                  {v.quantity}× {v.vehicleName}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-10 flex justify-between items-center">
        <button
          onClick={prevStep}
          className="flex items-center gap-2 text-gray-400 hover:text-[#1B1E4F] font-semibold transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <motion.button
          onClick={nextStep}
          disabled={!hasSelection}
          whileHover={hasSelection ? { scale: 1.02 } : {}}
          whileTap={hasSelection ? { scale: 0.98 } : {}}
          className="bg-[#1B1E4F] text-white px-8 sm:px-12 py-4 rounded-xl text-base font-bold hover:bg-[#2A2D5F] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-3 shadow-lg shadow-[#1B1E4F]/20"
        >
          Travel Details
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
