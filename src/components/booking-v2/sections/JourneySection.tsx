"use client";

import { useLocale } from "next-intl";
import { Plane, Building, Clock, MapPin, CalendarDays, Loader2 } from "lucide-react";
import { useBookingV2 } from "../context/BookingV2Context";

export function JourneySection() {
  const { state, updateState, routes, routesLoading } = useBookingV2();
  const isAr = useLocale() === "ar";

  // When changing service type
  const handleServiceTypeChange = (type: "transfer" | "hourly") => {
    updateState({ serviceType: type, routeId: null, routeName: "" });
  };

  return (
    <div className="bg-background rounded-[var(--radius-card)] shadow-[var(--shadow-luxury)] border border-border p-6 sm:p-8">
      <h2 className="text-xl font-bold text-primary mb-6">
        {isAr ? "تفاصيل الرحلة" : "Journey Details"}
      </h2>

      {/* Service Type Toggle */}
      <div className="flex bg-muted/50 p-1.5 rounded-[var(--radius-input)] mb-8">
        <button
          onClick={() => handleServiceTypeChange("transfer")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm transition-all ${
            state.serviceType === "transfer" 
              ? "bg-background text-primary shadow-[var(--shadow-luxury)]" 
              : "text-muted-foreground hover:text-primary"
          }`}
        >
          <Building className="w-4 h-4" />
          {isAr ? "توصيل" : "Transfer"}
        </button>
        <button
          onClick={() => handleServiceTypeChange("hourly")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm transition-all ${
            state.serviceType === "hourly" 
              ? "bg-background text-primary shadow-[var(--shadow-luxury)]" 
              : "text-muted-foreground hover:text-primary"
          }`}
        >
          <Clock className="w-4 h-4" />
          {isAr ? "حجز بالساعات" : "Hourly"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Route Selection for Transfer */}
        {state.serviceType === "transfer" && (
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-semibold text-foreground">
              {isAr ? "اختر المسار" : "Select Route"}
            </label>
            {routesLoading ? (
              <div className="flex items-center gap-2 text-muted-foreground/60 p-3 border border-border rounded-[var(--radius-input)] bg-muted">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm">{isAr ? "جاري التحميل..." : "Loading routes..."}</span>
              </div>
            ) : (
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/60" />
                <select
                  value={state.routeId || ""}
                  onChange={(e) => {
                    const r = routes.find(x => x._id === e.target.value);
                    if (r) updateState({ routeId: r._id, routeName: isAr ? r.nameAr || r.name : r.name });
                  }}
                  className="w-full pl-11 pr-4 py-3.5 bg-muted border border-border rounded-[var(--radius-input)] text-foreground font-medium focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all appearance-none"
                >
                  <option value="" disabled>{isAr ? "اختر مسار الرحلة" : "Select your journey route"}</option>
                  {routes.map((route: any) => (
                    <option key={route._id} value={route._id}>
                      {isAr ? route.nameAr || route.name : route.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {/* Pickup Location for Hourly */}
        {state.serviceType === "hourly" && (
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-semibold text-foreground">
              {isAr ? "نقطة الانطلاق (مدينة أو فندق)" : "Pickup City / Location"}
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/60" />
              <input
                type="text"
                placeholder={isAr ? "مثال: مكة، فندق الساعة" : "e.g., Makkah, Clock Tower"}
                value={state.pickupLocation}
                onChange={(e) => updateState({ pickupLocation: e.target.value })}
                className="w-full pl-11 pr-4 py-3.5 bg-muted border border-border rounded-[var(--radius-input)] text-foreground font-medium focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all"
              />
            </div>
          </div>
        )}

        {/* Date */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            {isAr ? "تاريخ الرحلة" : "Date"}
          </label>
          <div className="relative">
            <CalendarDays className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/60" />
            <input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={state.travelDate}
              onChange={(e) => updateState({ travelDate: e.target.value })}
              className="w-full pl-11 pr-4 py-3.5 bg-muted border border-border rounded-[var(--radius-input)] text-foreground font-medium focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all"
            />
          </div>
        </div>

        {/* Time */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            {isAr ? "وقت الرحلة" : "Time"}
          </label>
          <div className="relative">
            <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/60" />
            <input
              type="time"
              value={state.travelTime}
              onChange={(e) => updateState({ travelTime: e.target.value })}
              className="w-full pl-11 pr-4 py-3.5 bg-muted border border-border rounded-[var(--radius-input)] text-foreground font-medium focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all"
            />
          </div>
        </div>

        {/* Duration for Hourly */}
        {state.serviceType === "hourly" && (
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-foreground">
              {isAr ? "المدة (بالساعات)" : "Duration (Hours)"}
            </label>
            <div className="relative">
              <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/60" />
              <select
                value={state.durationHours}
                onChange={(e) => updateState({ durationHours: parseInt(e.target.value) })}
                className="w-full pl-11 pr-4 py-3.5 bg-muted border border-border rounded-[var(--radius-input)] text-foreground font-medium focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all appearance-none"
              >
                {[4, 5, 6, 8, 10, 12, 24].map((hours) => (
                  <option key={hours} value={hours}>
                    {hours} {isAr ? "ساعات" : "Hours"}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
