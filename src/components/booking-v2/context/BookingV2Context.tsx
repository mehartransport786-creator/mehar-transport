"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { SelectedVehicle, PricingState, PricingAdjustment } from "@/components/booking-page/context/BookingContext";
import { fallbackVehicles, fallbackRoutesData } from "@/lib/fallbackData";

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
  pickupLocation: string; // Used for hourly or custom if we don't have predefined
  dropoffLocation: string; // Used for hourly or custom
  durationHours: number; // For hourly
  
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

  pricing: {
    basePrice: 0,
    adjustments: [],
    taxAmount: 0,
    subtotalBeforeTax: 0,
    totalIncludingTax: 0,
    isCalculating: false
  },

  isSubmitting: false,
  bookingId: null,
};

const BookingV2Context = createContext<BookingV2ContextType | undefined>(undefined);

export function BookingV2Provider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BookingV2State>(initialState);
  const [routes, setRoutes] = useState<any[]>([]);
  const [routesLoading, setRoutesLoading] = useState(true);
  const pricingAbortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

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
          // Exclude hourly routes from general route selection since hourly is handled differently
          const transferRoutes = data.routes.filter((r: any) => r.category !== 'hourly');
          setRoutes(transferRoutes);
        }
      } catch (err) {
        console.error("Failed to load routes", err);
        // Fallback to minimal mock routes if all else fails so the UI is not stuck
        if (isMounted) {
          setRoutes([
            { _id: 'r1', name: 'Jeddah Airport to Makkah Hotel', nameAr: 'مطار جدة إلى مكة', origin: 'Jeddah Airport', destination: 'Makkah' },
            { _id: 'r2', name: 'Makkah to Madinah', nameAr: 'مكة إلى المدينة', origin: 'Makkah', destination: 'Madinah' }
          ]);
        }
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

  const calculatePricing = useCallback(async () => {
    if (pricingAbortRef.current) {
      pricingAbortRef.current.abort();
    }

    if (!state.selectedVehicle || (!state.routeId && state.serviceType === "transfer")) {
      updateState({
        pricing: { basePrice: 0, adjustments: [], taxAmount: 0, subtotalBeforeTax: 0, totalIncludingTax: 0, isCalculating: false }
      });
      return;
    }

    const controller = new AbortController();
    pricingAbortRef.current = controller;

    updateState({ pricing: { ...state.pricing, isCalculating: true } });

    try {
      let adjustments: PricingAdjustment[] = [];
      let totalBasePrice = 0;
      let subtotalBeforeTax = 0;
      let taxAmount = 0;
      let totalIncludingTax = 0;

      // Local mock calculation to prevent API hang
      if (state.serviceType === "hourly") {
        const vehicleIdx = fallbackVehicles.findIndex(v => v._id === state.selectedVehicle?.vehicleId || v.slug === state.selectedVehicle?.vehicleId);
        const rate = 100 + (Math.max(0, vehicleIdx) * 25);
        totalBasePrice = (state.durationHours || 4) * rate;

        let extraTotal = 0;
        if (state.extras.meetAndGreet) {
          extraTotal += 100;
          adjustments.push({ name: "Meet & Greet", amount: 100, isPercentage: false });
        }
        if (state.extras.vipService) {
          extraTotal += 250;
          adjustments.push({ name: "VIP Service", amount: 250, isPercentage: false });
        }
        if (state.extras.childSeat) {
          extraTotal += 50;
          adjustments.push({ name: "Child Seat", amount: 50, isPercentage: false });
        }
        
        subtotalBeforeTax = totalBasePrice + extraTotal;
        taxAmount = subtotalBeforeTax * 0.15;
        totalIncludingTax = subtotalBeforeTax + taxAmount;
      } else {
        const mockRoute = fallbackRoutesData.find((r: any) => r._id === state.routeId || r.slug === state.routeId);
        const vehicleIdx = fallbackVehicles.findIndex(v => v._id === state.selectedVehicle?.vehicleId || v.slug === state.selectedVehicle?.vehicleId);
        
        let basePrice = 200 + (Math.max(0, vehicleIdx) * 50); // fallback
        if (mockRoute && mockRoute.prices && vehicleIdx >= 0 && vehicleIdx < mockRoute.prices.length) {
          basePrice = mockRoute.prices[vehicleIdx];
        }
        
        totalBasePrice = basePrice;
        subtotalBeforeTax = basePrice;
        
        let extraTotal = 0;
        if (state.extras.meetAndGreet) {
          extraTotal += 100;
          adjustments.push({ name: "Meet & Greet", amount: 100, isPercentage: false });
        }
        if (state.extras.vipService) {
          extraTotal += 250;
          adjustments.push({ name: "VIP Service", amount: 250, isPercentage: false });
        }
        if (state.extras.childSeat) {
          extraTotal += 50;
          adjustments.push({ name: "Child Seat", amount: 50, isPercentage: false });
        }

        subtotalBeforeTax += extraTotal;
        taxAmount = subtotalBeforeTax * 0.15;
        totalIncludingTax = subtotalBeforeTax + taxAmount;
      }

      if (!pricingAbortRef.current.signal.aborted) {
        updateState({
          pricing: {
            basePrice: totalBasePrice,
            adjustments,
            taxAmount,
            subtotalBeforeTax,
            totalIncludingTax,
            isCalculating: false
          }
        });
      }
    } catch (err) {
      console.error("Pricing calculation error:", err);
      if (!pricingAbortRef.current.signal.aborted) {
        updateState({ pricing: { ...state.pricing, isCalculating: false } });
      }
    }
  }, [state.routeId, state.serviceType, state.selectedVehicle, state.durationHours, state.extras, state.travelDate, updateState]);

  // Auto-recalculate on dependencies change
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
