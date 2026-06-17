"use client";

import { useLocale } from "next-intl";
import { useBooking, LocationInfo } from "../context/BookingContext";
import { ArrowRight, ArrowLeft, MapPin, Navigation, Plus, Trash2, Clock, Car } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function RouteBuilder() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const { state, updateState, nextStep, prevStep, routes } = useBooking();
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const locations = state.locations;

  const updateLocation = (id: string, address: string) => {
    const newLocations = locations.map(loc => 
      loc.id === id ? { ...loc, address } : loc
    );
    updateState({ locations: newLocations });
  };

  const addStop = () => {
    const newLocations = [...locations];
    const newStop: LocationInfo = {
      id: `loc-${Date.now()}`,
      type: "stop",
      address: ""
    };
    // Insert before the last location (which is dropoff)
    newLocations.splice(newLocations.length - 1, 0, newStop);
    updateState({ locations: newLocations });
  };

  const removeStop = (id: string) => {
    const newLocations = locations.filter(loc => loc.id !== id);
    updateState({ locations: newLocations });
  };

  const updateDate = (field: 'pickupDate' | 'pickupTime', value: string) => {
    updateState({ dates: { ...state.dates, [field]: value } });
  };

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Left side: Form */}
      <div className="w-full lg:w-1/2 p-6 md:p-8 border-r border-gray-100 flex flex-col h-[600px] overflow-y-auto custom-scrollbar">
        <h2 className="text-2xl font-bold text-[#1B1E4F] mb-2">
          {isAr ? "مسار الرحلة" : "Build Your Route"}
        </h2>
        <p className="text-gray-500 mb-8">
          {isAr 
            ? "حدد أماكن الانطلاق والوصول وأي توقفات إضافية في الطريق." 
            : "Enter your pickup, drop-off, and any extra stops along the way."}
        </p>

        <div className="space-y-6 flex-1">
          {/* Route Selection */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 focus-within:border-[#D9A63A] focus-within:ring-1 focus-within:ring-[#D9A63A] transition-all">
            <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2 block">
              {isAr ? "اختر المسار" : "Select Route"}
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rtl:right-3 rtl:left-auto" />
              <select
                className="w-full bg-white border border-gray-200 rounded-lg pl-10 rtl:pr-10 rtl:pl-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#D9A63A] focus:border-transparent text-[#1B1E4F] appearance-none"
                value={state.selectedRouteId || ""}
                onChange={(e) => {
                  const route = routes.find(r => r._id === e.target.value);
                  updateState({ 
                    selectedRouteId: e.target.value,
                    selectedRoute: route
                  });
                }}
              >
                <option value="" disabled>{isAr ? "اختر المسار..." : "Select a route..."}</option>
                {routes.map((route: any) => (
                  <option key={route._id} value={route._id}>
                    {isAr ? route.nameAr : route.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none rtl:left-3 rtl:right-auto">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
            {state.selectedRoute && (
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="text-xs text-gray-500 font-medium">
                  {state.selectedRoute.origin} <ArrowRight className="inline w-3 h-3 mx-1" /> {state.selectedRoute.destination}
                </div>
                <div className="text-xs font-bold text-[#D9A63A] bg-[#D9A63A]/10 px-2 py-1 rounded">
                  {isAr ? "أسعار ثابتة" : "Fixed Pricing"}
                </div>
              </div>
            )}
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">{isAr ? "تاريخ الرحلة" : "Pickup Date"}</label>
              <div className="relative">
                <input
                  type="date"
                  value={state.dates.pickupDate}
                  onChange={(e) => updateDate('pickupDate', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-[#D9A63A] focus:ring-1 focus:ring-[#D9A63A]"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">{isAr ? "وقت الرحلة" : "Pickup Time"}</label>
              <div className="relative">
                <input
                  type="time"
                  value={state.dates.pickupTime}
                  onChange={(e) => updateDate('pickupTime', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-[#D9A63A] focus:ring-1 focus:ring-[#D9A63A]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between pt-6 border-t border-gray-100">
          <button onClick={prevStep} className="px-6 py-3 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-colors">
            {isAr ? "رجوع" : "Back"}
          </button>
          <button 
            onClick={nextStep} 
            disabled={!state.selectedRouteId}
            className="bg-[#1B1E4F] text-white hover:bg-[#D9A63A] hover:text-[#1B1E4F] px-8 py-3 rounded-lg font-bold transition-all flex items-center gap-2 group shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#1B1E4F] disabled:hover:text-white"
          >
            <span>{isAr ? "اختيار المركبة" : "Select Vehicle"}</span>
            <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Right side: Mock Map */}
      <div className="hidden lg:block w-1/2 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" 
            alt="Map view" 
            className="w-full h-full object-cover grayscale"
          />
        </div>
        
        {/* Mock Map UI Overlay */}
        <div className="absolute inset-0 z-10 p-8 flex flex-col justify-between">
          <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-4 text-white self-end flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#D9A63A]/20 flex items-center justify-center">
              <Navigation className="w-5 h-5 text-[#D9A63A]" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold tracking-wider uppercase">{isAr ? "التنقل الحي" : "Live Navigation"}</p>
              <p className="font-bold">Google Maps API Ready</p>
            </div>
          </div>

          <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-white w-full max-w-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Car className="w-5 h-5 text-[#D9A63A]" />
              {isAr ? "ملخص المسار" : "Route Overview"}
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300 text-sm">{isAr ? "المسافة المقدرة" : "Est. Distance"}</span>
                </div>
                <span className="font-bold text-lg">45 km</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300 text-sm">{isAr ? "وقت الرحلة المقدر" : "Est. Travel Time"}</span>
                </div>
                <span className="font-bold text-lg">35 min</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Animated Route Line Mock */}
        <svg className="absolute inset-0 w-full h-full z-0 drop-shadow-[0_0_15px_rgba(217,166,58,0.5)]">
          <motion.path 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d="M100,150 Q250,50 400,200 T700,300" 
            fill="none" 
            stroke="#D9A63A" 
            strokeWidth="4"
            strokeDasharray="8 8"
          />
          <circle cx="100" cy="150" r="8" fill="#22c55e" />
          <circle cx="700" cy="300" r="8" fill="#ef4444" />
        </svg>
      </div>
    </div>
  );
}
