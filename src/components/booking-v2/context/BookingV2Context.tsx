"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";

// PR-6: SelectedVehicle, PricingState, PricingAdjustment types moved here from
// @/components/booking-page/context/BookingContext so that legacy directory can
// be safely deleted.

export interface SelectedVehicle {
  vehicleId: string;   // MongoDB ObjectId — used for server-side pricing
  vehicleName: string;
  vehicleNameAr: string;
  vehicleType: string;
  passengers: number;
  luggage: number;
  image: string;
  quantity: number;
  unitPrice: number;
}

export interface PricingAdjustment {
  name: string;
  amount: number;
  isPercentage: boolean;
}

export interface PricingState {
  basePrice: number;
  adjustments: PricingAdjustment[];
  taxAmount: number;
  subtotalBeforeTax: number;
  totalIncludingTax: number;
  isCalculating: boolean;
  error?: string | null; // PR-3: expose pricing errors to the UI
}

export type ServiceType = "transfer" | "hourly";

export interface ExtrasState {
  meetAndGreet: boolean;
  vipService: boolean;
  childSeat: boolean;
  wheelchair: boolean;
}

export interface BookingV2State {
  serviceType: ServiceType;
  
  // Journey
  routeId: string | null;
  routeName: string;
  pickupLocation: string;
  dropoffLocation: string;
  durationHours: number;
  
  // Dates
  travelDate: string;
  travelTime: string;

  // Vehicle
  selectedVehicle: SelectedVehicle | null;

  // Passenger Info
  passengerInfo: {
    name: string;
    phone: string;
    email: string;
    flightNumber: string;
    specialRequests: string;
  };
  passengerCount: number;

  // Extras
  extras: ExtrasState;

  // Pricing
  pricing: PricingState;

  // Submission
  isSubmitting: boolean;
  bookingId: string | null;
}

interface BookingV2ContextType {
  state: BookingV2State;
  updateState: (updates: Partial<BookingV2State>) => void;
  updatePassengerInfo: (updates: Partial<BookingV2State["passengerInfo"]>) => void;
  updateExtras: (updates: Partial<ExtrasState>) => void;
  calculatePricing: () => Promise<void>;
  routes: any[];
  routesLoading: boolean;
}

function getTodayString() {
  const d = new Date();
  return d.toISOString().split('T')[0];
}

const initialPricing: PricingState = {
  basePrice: 0,
  adjustments: [],
  taxAmount: 0,
  subtotalBeforeTax: 0,
  totalIncludingTax: 0,
  isCalculating: false,
  error: null,
};

const initialState: BookingV2State = {
  serviceType: "transfer",
  
  routeId: null,
  routeName: "",
  pickupLocation: "",
  dropoffLocation: "",
  durationHours: 4,

  travelDate: getTodayString(),
  travelTime: "10:00",

  selectedVehicle: null,

  passengerInfo: {
    name: "",
    phone: "",
    email: "",
    flightNumber: "",
    specialRequests: "",
  },
  passengerCount: 1,

  extras: {
    meetAndGreet: false,
    vipService: false,
    childSeat: false,
    wheelchair: false,
  },

  pricing: initialPricing,

  isSubmitting: false,
  bookingId: null,
};

const EXTRAS_PRICES: Record<keyof ExtrasState, number> = {
  meetAndGreet: 100,
  vipService: 250,
  childSeat: 50,
  wheelchair: 0,
};

const BookingV2Context = createContext<BookingV2ContextType | undefined>(undefined);

export function BookingV2Provider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BookingV2State>(initialState);
  const [routes, setRoutes] = useState<any[]>([]);
  const [routesLoading, setRoutesLoading] = useState(true);
  const pricingAbortRef = useRef<AbortController | null>(null);

  // Load route list from DB (metadata only — not prices)
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    async function fetchRoutes() {
      if (isMounted) setRoutesLoading(true);
      try {
        const res = await fetch('/api/pricing/routes', { 
          cache: 'no-store',
          headers: { 'Accept': 'application/json' },
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error(`Failed to fetch routes: ${res.status}`);
        
        const data = await res.json();
        if (isMounted && data.routes && Array.isArray(data.routes)) {
          const transferRoutes = data.routes.filter((r: any) => r.category !== 'hourly');
          setRoutes(transferRoutes);
        }
      } catch (err) {
        console.error("Failed to load routes", err);
        // Routes metadata fallback — intentionally empty so staff know to populate DB
        if (isMounted) setRoutes([]);
      } finally {
        if (isMounted) setRoutesLoading(false);
      }
    }
    fetchRoutes();
    return () => { 
      isMounted = false; 
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  const updateState = useCallback((updates: Partial<BookingV2State>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const updatePassengerInfo = useCallback((updates: Partial<BookingV2State["passengerInfo"]>) => {
    setState((prev) => ({
      ...prev,
      passengerInfo: { ...prev.passengerInfo, ...updates }
    }));
  }, []);

  const updateExtras = useCallback((updates: Partial<ExtrasState>) => {
    setState((prev) => ({
      ...prev,
      extras: { ...prev.extras, ...updates }
    }));
  }, []);

  /**
   * PR-3 F01/F19: calculatePricing now calls POST /api/pricing/calculate.
   * The summary panel (StickySummary) and confirmation page both read from
   * state.pricing, which is now server-authoritative.
   *
   * Extras (meet & greet, VIP, child seat) are client-computed on top of the
   * server base price — these are flat add-ons not subject to seasonal pricing.
   */
  const calculatePricing = useCallback(async () => {
    if (pricingAbortRef.current) {
      pricingAbortRef.current.abort();
    }

    if (!state.selectedVehicle || (!state.routeId && state.serviceType === "transfer")) {
      updateState({ pricing: { ...initialPricing } });
      return;
    }

    const controller = new AbortController();
    pricingAbortRef.current = controller;

    updateState({ pricing: { ...state.pricing, isCalculating: true, error: null } });

    try {
      const payload =
        state.serviceType === "hourly"
          ? {
              type: "hourly",
              vehicleId: state.selectedVehicle.vehicleId,
              hours: state.durationHours || 4,
              date: state.travelDate,
            }
          : {
              type: "transfer",
              routeId: state.routeId,
              vehicleId: state.selectedVehicle.vehicleId,
              date: state.travelDate,
            };

      const res = await fetch("/api/pricing/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      const data = await res.json();

      if (controller.signal.aborted) return;

      if (!res.ok || !data.success) {
        const errMsg =
          res.status === 422
            ? (data.error || "Pricing not configured for this route/vehicle.")
            : (data.error || "Could not fetch price. Please try again.");
        updateState({
          pricing: { ...initialPricing, isCalculating: false, error: errMsg },
        });
        return;
      }

      const serverBase = data.data.subtotal; // before tax, after seasonal
      const adjustments: PricingAdjustment[] = [];
      let extraTotal = 0;

      (Object.keys(state.extras) as (keyof ExtrasState)[]).forEach((key) => {
        if (state.extras[key] && EXTRAS_PRICES[key] > 0) {
          const label = key === 'meetAndGreet' ? 'Meet & Greet'
            : key === 'vipService' ? 'VIP Service'
            : key === 'childSeat' ? 'Child Seat'
            : key;
          adjustments.push({ name: label, amount: EXTRAS_PRICES[key], isPercentage: false });
          extraTotal += EXTRAS_PRICES[key];
        }
      });

      const subtotalBeforeTax = serverBase + extraTotal;
      const taxAmount = Math.round(subtotalBeforeTax * 0.15 * 100) / 100;
      const totalIncludingTax = Math.round((subtotalBeforeTax + taxAmount) * 100) / 100;

      updateState({
        pricing: {
          basePrice: data.data.basePrice,
          adjustments,
          taxAmount,
          subtotalBeforeTax,
          totalIncludingTax,
          isCalculating: false,
          error: null,
        },
      });
    } catch (err: any) {
      if (err?.name === "AbortError") return;
      console.error("Pricing calculation error:", err);
      updateState({
        pricing: {
          ...initialPricing,
          isCalculating: false,
          error: "Could not calculate price. Please check your connection and try again.",
        },
      });
    }
  }, [state.routeId, state.serviceType, state.selectedVehicle, state.durationHours, state.extras, state.travelDate, updateState]);

  // Auto-recalculate on relevant state changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      calculatePricing();
    }, 300);
    return () => clearTimeout(timeout);
  }, [state.routeId, state.selectedVehicle, state.travelDate, state.serviceType, state.durationHours, state.extras]);

  return (
    <BookingV2Context.Provider
      value={{
        state,
        updateState,
        updatePassengerInfo,
        updateExtras,
        calculatePricing,
        routes,
        routesLoading
      }}
    >
      {children}
    </BookingV2Context.Provider>
  );
}

export function useBookingV2() {
  const context = useContext(BookingV2Context);
  if (context === undefined) {
    throw new Error("useBookingV2 must be used within a BookingV2Provider");
  }
  return context;
}
