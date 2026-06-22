"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";

export type TripType = "one-way" | "round-trip" | "hourly" | "multi-city" | "airport" | "umrah" | "ziyarat";

export type RouteCategory = "airport" | "umrah" | "ziyarat" | "intercity" | "hourly" | "custom";

export interface SelectedVehicle {
  vehicleId: string;
  vehicleName: string;
  vehicleNameAr: string;
  vehicleType: string;
  passengers: number;
  luggage: number;
  image: string;
  quantity: number;
  unitPrice: number;
}

export interface DateInfo {
  pickupDate: string;
  pickupTime: string;
  returnDate?: string;
  returnTime?: string;
}

export interface PassengerInfo {
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  country: string;
  nationality: string;
  flightNumber: string;
  hotelName: string;
  pickupLocation: string;
  dropoffLocation: string;
  specialRequests: string;
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
}

export interface BookingState {
  currentStep: number;
  completedSteps: number[];
  tripType: TripType;
  routeCategory: RouteCategory | null;
  selectedRoutes: any[];
  dates: DateInfo;
  vehicles: SelectedVehicle[];
  passengerInfo: PassengerInfo;
  passengerCount: number;
  pricing: PricingState;
  paymentMethod: string;
  isSubmitting: boolean;
  bookingId: string | null;
}

interface BookingContextType {
  state: BookingState;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateState: (updates: Partial<BookingState>) => void;
  calculatePricing: () => Promise<void>;
  routes: any[];
  routesLoading: boolean;
}

function getTodayString() {
  const d = new Date();
  return d.toISOString().split('T')[0];
}

const initialState: BookingState = {
  currentStep: 1,
  completedSteps: [],
  tripType: "one-way",
  routeCategory: null,
  selectedRoutes: [],
  dates: {
    pickupDate: getTodayString(),
    pickupTime: "10:00"
  },
  vehicles: [],
  passengerInfo: {
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
    country: "",
    nationality: "",
    flightNumber: "",
    hotelName: "",
    pickupLocation: "",
    dropoffLocation: "",
    specialRequests: ""
  },
  passengerCount: 1,
  pricing: {
    basePrice: 0,
    adjustments: [],
    taxAmount: 0,
    subtotalBeforeTax: 0,
    totalIncludingTax: 0,
    isCalculating: false
  },
  paymentMethod: "pay-later",
  isSubmitting: false,
  bookingId: null
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BookingState>(initialState);
  const [routes, setRoutes] = useState<any[]>([]);
  const [routesLoading, setRoutesLoading] = useState(true);
  const pricingAbortRef = useRef<AbortController | null>(null);

  const searchParams = useSearchParams();
  const pkgSlug = searchParams.get('package');
  const vehicleId = searchParams.get('vehicle');

  // Load routes on mount
  useEffect(() => {
    let isMounted = true;
    
    async function fetchRoutes() {
      if (isMounted) setRoutesLoading(true);
      try {
        // Force no-cache and relative URL
        const res = await fetch('/api/pricing/routes', { 
          cache: 'no-store',
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (!res.ok) throw new Error(`Failed to fetch routes: ${res.status}`);
        
        const data = await res.json();
        if (isMounted && data.routes && Array.isArray(data.routes)) {
          setRoutes(data.routes);

          // If there's a package slug in the URL, fetch the package and prefill
          if (pkgSlug) {
            try {
              const pkgRes = await fetch(`/api/packages/${pkgSlug}`);
              if (pkgRes.ok) {
                const pkgData = await pkgRes.json();
                if (pkgData.package) {
                  const pkg = pkgData.package;
                  
                  // Map includedRoutes to selectedRoutes by matching with fetched routes
                  const prefilledRoutes = pkg.includedRoutes.map((includedRoute: any) => {
                    const matchedRoute = data.routes.find((r: any) => r._id === includedRoute._id);
                    return matchedRoute || null;
                  }).filter(Boolean);

                  let selectedVehicles: SelectedVehicle[] = [];
                  
                  if (vehicleId) {
                    const matchedVehicle = pkg.availableVehicles.find((v: any) => v._id === vehicleId);
                    if (matchedVehicle) {
                      selectedVehicles = [{
                        vehicleId: matchedVehicle._id,
                        vehicleName: matchedVehicle.name,
                        vehicleNameAr: matchedVehicle.nameAr || matchedVehicle.name,
                        vehicleType: matchedVehicle.type,
                        passengers: matchedVehicle.passengers,
                        luggage: matchedVehicle.luggage,
                        image: matchedVehicle.image || '/camry.png',
                        quantity: 1,
                        unitPrice: matchedVehicle.totalPrice || pkg.startingPrice // Not perfectly accurate without backend pricing engine call, but calculatePricing will override it
                      }];
                    }
                  }

                  if (prefilledRoutes.length > 0) {
                    setState(prev => ({
                      ...prev,
                      tripType: pkg.category === 'VIP' ? 'ziyarat' : 'umrah',
                      selectedRoutes: prefilledRoutes,
                      vehicles: selectedVehicles,
                      currentStep: 3,
                      completedSteps: [1, 2]
                    }));
                  }
                }
              }
            } catch (err) {
              console.error("Failed to load package data for booking", err);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load routes", err);
      } finally {
        if (isMounted) {
          setRoutesLoading(false);
        }
      }
    }

    fetchRoutes();

    return () => {
      isMounted = false;
    };
  }, [pkgSlug, vehicleId]);

  const updateState = useCallback((updates: Partial<BookingState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const markStepCompleted = useCallback((step: number) => {
    setState(prev => ({
      ...prev,
      completedSteps: prev.completedSteps.includes(step)
        ? prev.completedSteps
        : [...prev.completedSteps, step]
    }));
  }, []);

  const setStep = useCallback((step: number) => {
    setState(prev => ({ ...prev, currentStep: step }));
    // Smooth scroll on mobile, instant on desktop
    setTimeout(() => {
      const el = document.getElementById(`booking-step-${step}`);
      if (el) {
        const offset = 100;
        const y = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  }, []);

  const nextStep = useCallback(() => {
    setState(prev => {
      const currentStep = prev.currentStep;
      const newCompleted = prev.completedSteps.includes(currentStep)
        ? prev.completedSteps
        : [...prev.completedSteps, currentStep];
      return {
        ...prev,
        completedSteps: newCompleted,
        currentStep: Math.min(4, currentStep + 1)
      };
    });
    setTimeout(() => {
      const el = document.getElementById(`booking-step-${Math.min(4, state.currentStep + 1)}`);
      if (el) {
        const offset = 100;
        const y = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 150);
  }, [state.currentStep]);

  const prevStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(1, prev.currentStep - 1)
    }));
    setTimeout(() => {
      const el = document.getElementById(`booking-step-${Math.max(1, state.currentStep - 1)}`);
      if (el) {
        const offset = 100;
        const y = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 150);
  }, [state.currentStep]);

  // Pricing calculation using /api/pricing/calculate/route
  const calculatePricing = useCallback(async () => {
    // Abort any in-flight request
    if (pricingAbortRef.current) {
      pricingAbortRef.current.abort();
    }

    const validRoutes = state.selectedRoutes.filter(r => r !== null);
    if (validRoutes.length === 0 || state.vehicles.length === 0) {
      updateState({
        pricing: { basePrice: 0, adjustments: [], taxAmount: 0, subtotalBeforeTax: 0, totalIncludingTax: 0, isCalculating: false }
      });
      return;
    }

    const controller = new AbortController();
    pricingAbortRef.current = controller;

    updateState({ pricing: { ...state.pricing, isCalculating: true } });

    try {
      let totalBasePrice = 0;
      let totalSubtotal = 0;
      let totalTaxAmount = 0;
      let totalIncludingTax = 0;
      const combinedAdjustments: PricingAdjustment[] = [];
      const dateToUse = state.dates.pickupDate || getTodayString();

      for (const route of validRoutes) {
        for (const vehicle of state.vehicles) {
          const res = await fetch('/api/pricing/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: state.tripType === 'hourly' ? 'hourly' : 'transfer',
              routeId: route._id,
              vehicleId: vehicle.vehicleId,
              date: dateToUse,
            }),
            signal: controller.signal
          });

          const data = await res.json();
          if (data.success && data.data) {
            const qty = vehicle.quantity;
            totalBasePrice += data.data.basePrice * qty;
            totalSubtotal += data.data.finalPriceBeforeTax * qty;
            totalTaxAmount += data.data.taxAmount * qty;
            totalIncludingTax += data.data.totalIncludingTax * qty;

            if (data.data.adjustments) {
              for (const adj of data.data.adjustments) {
                const existing = combinedAdjustments.find(a => a.name === adj.name);
                if (existing) {
                  existing.amount += adj.amount * qty;
                } else {
                  combinedAdjustments.push({
                    name: adj.name,
                    amount: adj.amount * qty,
                    isPercentage: adj.isPercentage
                  });
                }
              }
            }
          }
        }
      }

      if (!controller.signal.aborted) {
        updateState({
          pricing: {
            basePrice: totalBasePrice,
            adjustments: combinedAdjustments,
            taxAmount: totalTaxAmount,
            subtotalBeforeTax: totalSubtotal,
            totalIncludingTax,
            isCalculating: false
          }
        });
      }
    } catch (error: any) {
      if (error?.name !== 'AbortError') {
        console.error("Pricing calculation failed:", error);
        updateState({ pricing: { ...state.pricing, isCalculating: false } });
      }
    }
  }, [state.selectedRoutes, state.vehicles, state.dates.pickupDate, state.tripType, updateState, state.pricing]);

  // Auto-recalculate on dependencies change (debounced)
  useEffect(() => {
    const timeout = setTimeout(() => {
      calculatePricing();
    }, 300);
    return () => clearTimeout(timeout);
  }, [state.selectedRoutes, state.vehicles, state.dates.pickupDate]);

  return (
    <BookingContext.Provider
      value={{
        state,
        setStep,
        nextStep,
        prevStep,
        updateState,
        calculatePricing,
        routes,
        routesLoading
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
