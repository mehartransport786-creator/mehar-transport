"use client";

import { useBooking } from "../context/BookingContext";
import { useState, useMemo } from "react";
import { Plus, Trash2, MapPin, ArrowRight, Search, Plane, Moon, Star, Navigation, Clock, Route as RouteIcon, Check, ChevronDown, Users, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ROUTE_CATEGORIES = [
  { id: "all", icon: MapPin, label: "All Routes", labelAr: "جميع المسارات", color: "#1B1E4F" },
  { id: "airport", icon: Plane, label: "Airport", labelAr: "المطار", color: "#3B82F6" },
  { id: "umrah", icon: Moon, label: "Umrah", labelAr: "العمرة", color: "#8B5CF6" },
  { id: "ziyarat", icon: Star, label: "Ziyarat", labelAr: "الزيارات", color: "#10B981" },
  { id: "intercity", icon: Navigation, label: "Intercity", labelAr: "بين المدن", color: "#F59E0B" },
] as const;

function categorizeRoute(route: any): string {
  const name = (route.name || "").toLowerCase();
  const origin = (route.origin || "").toLowerCase();
  const dest = (route.destination || "").toLowerCase();
  if (name.includes("airport") || origin.includes("airport") || dest.includes("airport")) return "airport";
  if (name.includes("ziyarat") || name.includes("ziyyarat") || dest.includes("ziyarat") || dest.includes("ziyyarat")) return "ziyarat";
  if (name.includes("umrah") || name.includes("makkah") || name.includes("madinah") || name.includes("madina") || origin.includes("makkah") || dest.includes("makkah") || origin.includes("madinah") || dest.includes("madinah") || origin.includes("madina") || dest.includes("madina")) return "umrah";
  return "intercity";
}

function getLowestPrice(route: any): number {
  if (!route.pricings || route.pricings.length === 0) return 0;
  return Math.min(...route.pricings.map((p: any) => p.currentPrice || p.basePrice || 0));
}

export function Step1RouteSelection() {
  const { state, updateState, nextStep, routes, routesLoading } = useBooking();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedRouteId, setExpandedRouteId] = useState<string | null>(null);

  // Track selected routes
  const selectedRoutes = state.selectedRoutes.length === 0 ? [null] : state.selectedRoutes;

  // Filter routes
  const filteredRoutes = useMemo(() => {
    let result = routes;
    if (selectedCategory && selectedCategory !== "all") {
      result = result.filter((r: any) => categorizeRoute(r) === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((r: any) =>
        r.name?.toLowerCase().includes(q) ||
        r.nameAr?.includes(searchQuery) ||
        r.origin?.toLowerCase().includes(q) ||
        r.destination?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [routes, selectedCategory, searchQuery]);

  const handleRouteSelect = (route: any, slotIndex: number) => {
    const newRoutes = [...selectedRoutes];
    // If already selected, deselect
    if (newRoutes[slotIndex]?._id === route._id) {
      newRoutes[slotIndex] = null;
    } else {
      newRoutes[slotIndex] = route;
    }
    updateState({ selectedRoutes: newRoutes });
  };

  const addStop = () => {
    updateState({ selectedRoutes: [...selectedRoutes, null] });
  };

  const removeStop = (index: number) => {
    const newRoutes = [...selectedRoutes];
    newRoutes.splice(index, 1);
    updateState({ selectedRoutes: newRoutes });
  };

  // Currently active slot index for selection
  const activeSlotIndex = selectedRoutes.findIndex((r: any) => r === null);
  const currentSlot = activeSlotIndex >= 0 ? activeSlotIndex : 0;

  const isComplete = selectedRoutes.length > 0 && selectedRoutes.every((r: any) => r !== null);

  const isRouteSelected = (routeId: string) => {
    return selectedRoutes.some((r: any) => r?._id === routeId);
  };

  return (
    <div className="p-6 sm:p-8 md:p-10 lg:p-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-[#D9A63A]/10 text-[#D9A63A] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
          <MapPin className="w-4 h-4" />
          Step 1 of 4
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1B1E4F] mb-2 tracking-tight">
          Select Your Route
        </h2>
        <p className="text-lg text-[#1B1E4F]/40 font-medium" dir="rtl">اختر مسارك</p>
        <p className="text-sm text-gray-500 mt-2 max-w-xl mx-auto">
          Choose from our fixed-price routes. All prices shown are per vehicle, per trip.
        </p>
      </div>

      {/* Active Route Slots */}
      <div className="mb-6 space-y-3">
        {selectedRoutes.map((route: any, index: number) => (
          <div
            key={`slot-${index}`}
            className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
              route
                ? 'border-[#D9A63A]/40 bg-[#D9A63A]/5'
                : index === currentSlot
                  ? 'border-[#1B1E4F]/30 bg-[#1B1E4F]/5 border-dashed'
                  : 'border-gray-100 bg-gray-50 border-dashed'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
              route ? 'bg-[#D9A63A] text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {route ? <Check className="w-4 h-4" /> : index + 1}
            </div>
            <div className="flex-1 min-w-0">
              {route ? (
                <div>
                  <div className="font-semibold text-sm text-[#1B1E4F]">{route.name}</div>
                  <div className="text-xs text-gray-400">{route.origin} → {route.destination}</div>
                </div>
              ) : (
                <div className="text-sm text-gray-400 font-medium">
                  {index === 0 ? "Select your route below..." : `Select stop ${index + 1}...`}
                </div>
              )}
            </div>
            {route && (
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-sm font-bold text-[#D9A63A]">From {getLowestPrice(route)} SAR</span>
                <button
                  onClick={() => {
                    const newRoutes = [...selectedRoutes];
                    newRoutes[index] = null;
                    updateState({ selectedRoutes: newRoutes });
                  }}
                  className="text-gray-400 hover:text-red-500 p-1 rounded-lg hover:bg-red-50 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
            {index > 0 && !route && (
              <button
                onClick={() => removeStop(index)}
                className="text-gray-300 hover:text-red-400 p-1 rounded-lg transition-all shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}

        {/* Add Stop */}
        {isComplete && (
          <button
            onClick={addStop}
            className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:text-[#D9A63A] hover:border-[#D9A63A] hover:bg-[#D9A63A]/5 transition-all flex items-center justify-center gap-2 font-semibold text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Another Stop
          </button>
        )}
      </div>

      {/* Category Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {ROUTE_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#1B1E4F] text-white shadow-md'
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-[#D9A63A]/50 hover:text-[#D9A63A]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search routes... (e.g. Jeddah Airport, Makkah)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#F8F9FC] border-2 border-transparent rounded-xl py-3 pl-12 pr-4 text-sm text-[#1B1E4F] placeholder:text-gray-400 focus:ring-0 focus:border-[#D9A63A] transition-colors"
        />
      </div>

      {/* Route Count */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          {filteredRoutes.length} Route{filteredRoutes.length !== 1 ? 's' : ''} Available
        </span>
      </div>

      {/* Routes Loading */}
      {routesLoading && (
        <div className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
              <div className="h-5 w-48 bg-gray-100 rounded mb-3" />
              <div className="flex gap-3">
                {[1,2,3,4].map(j => <div key={j} className="h-8 w-20 bg-gray-100 rounded-lg" />)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Routes Grid — ALL routes with ALL prices */}
      {!routesLoading && (
        <div className="space-y-3">
          {filteredRoutes.map((route: any, idx: number) => {
            const isSelected = isRouteSelected(route._id);
            const isExpanded = expandedRouteId === route._id;
            const lowestPrice = getLowestPrice(route);
            const pricings = route.pricings || [];

            return (
              <motion.div
                key={route._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03, duration: 0.3 }}
                className={`bg-white rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                  isSelected
                    ? 'border-[#D9A63A] shadow-lg shadow-[#D9A63A]/10 ring-1 ring-[#D9A63A]/20'
                    : 'border-gray-100 hover:border-gray-200 hover:shadow-md'
                }`}
              >
                {/* Route Header — Click to select */}
                <button
                  onClick={() => {
                    if (!isSelected) {
                      handleRouteSelect(route, currentSlot >= 0 ? currentSlot : 0);
                    } else {
                      // Deselect
                      const idx = selectedRoutes.findIndex((r: any) => r?._id === route._id);
                      if (idx >= 0) {
                        const newRoutes = [...selectedRoutes];
                        newRoutes[idx] = null;
                        updateState({ selectedRoutes: newRoutes });
                      }
                    }
                  }}
                  className="w-full px-5 py-4 flex items-center gap-4 text-left group"
                >
                  {/* Selection indicator */}
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                    isSelected ? 'bg-[#D9A63A] border-[#D9A63A]' : 'border-gray-300 group-hover:border-[#D9A63A]'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>

                  {/* Route dots */}
                  <div className="flex flex-col items-center gap-0.5 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#D9A63A]" />
                    <div className="w-px h-4 bg-gray-300" />
                    <div className="w-2.5 h-2.5 rounded-full border-2 border-[#1B1E4F]" />
                  </div>

                  {/* Route Info */}
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[#1B1E4F] text-sm sm:text-base truncate">{route.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{route.origin} → {route.destination}</div>
                  </div>

                  {/* Starting Price */}
                  <div className="text-right shrink-0">
                    <div className="text-xs text-gray-400">From</div>
                    <div className="font-black text-[#1B1E4F] text-lg tabular-nums">{lowestPrice} <span className="text-xs font-semibold text-gray-400">SAR</span></div>
                  </div>

                  {/* Expand toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedRouteId(isExpanded ? null : route._id);
                    }}
                    className="p-1 rounded-lg hover:bg-gray-100 transition-colors shrink-0"
                  >
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                </button>

                {/* Vehicle Prices — Compact row (always visible) */}
                <div className="px-5 pb-3 flex flex-wrap gap-2">
                  {pricings.map((p: any) => (
                    <div
                      key={p.vehicleId}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F8F9FC] rounded-lg text-xs"
                    >
                      <span className="text-gray-500 font-medium">{p.vehicleName}</span>
                      <span className="font-bold text-[#1B1E4F] tabular-nums">{p.currentPrice || p.basePrice}</span>
                    </div>
                  ))}
                </div>

                {/* Expanded Detail — Full pricing grid */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {pricings.map((p: any) => (
                            <div
                              key={p.vehicleId}
                              className="bg-[#F8F9FC] rounded-xl p-3.5 border border-gray-100 hover:border-[#D9A63A]/30 transition-colors"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-sm text-[#1B1E4F]">{p.vehicleName}</span>
                              </div>
                              <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                                <span className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  {p.passengers}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Briefcase className="w-3 h-3" />
                                  {p.luggage}
                                </span>
                              </div>
                              <div className="font-black text-xl text-[#D9A63A] tabular-nums">
                                {p.currentPrice || p.basePrice}
                                <span className="text-xs font-semibold text-gray-400 ml-1">SAR</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* No results */}
      {!routesLoading && filteredRoutes.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <MapPin className="w-8 h-8 mx-auto mb-3 text-gray-300" />
          <p className="font-semibold text-[#1B1E4F]">No routes found</p>
          <p className="text-sm mt-1">Try adjusting your search or category filter.</p>
        </div>
      )}

      {/* Multi-stop Journey Visual */}
      {selectedRoutes.filter(Boolean).length > 1 && isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-[#1B1E4F] rounded-2xl p-5 text-white"
        >
          <div className="text-xs font-bold uppercase tracking-wider text-[#D9A63A] mb-3">Your Multi-Stop Journey</div>
          <div className="flex items-center flex-wrap gap-2">
            {selectedRoutes.filter(Boolean).map((r: any, i: number) => (
              <div key={i} className="flex items-center gap-2">
                {i === 0 && <span className="text-sm font-medium">{r?.origin}</span>}
                <ArrowRight className="w-4 h-4 text-[#D9A63A]" />
                <span className="text-sm font-medium">{r?.destination}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* CTA */}
      <div className="mt-8 flex justify-end">
        <motion.button
          onClick={nextStep}
          disabled={!isComplete}
          whileHover={isComplete ? { scale: 1.02 } : {}}
          whileTap={isComplete ? { scale: 0.98 } : {}}
          className="bg-[#1B1E4F] text-white px-8 sm:px-12 py-4 rounded-xl text-base font-bold hover:bg-[#2A2D5F] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-3 shadow-lg shadow-[#1B1E4F]/20"
        >
          Choose Your Vehicle
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
