"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type TripType = 
  | "one-way" 
  | "round-trip" 
  | "hourly" 
  | "multi-city" 
  | "airport" 
  | "umrah" 
  | "corporate" 
  | "group" 
  | "vip" 
  | "event";

export interface LocationInfo {
  id: string;
  type: "pickup" | "dropoff" | "stop";
  address: string;
  lat?: number;
  lng?: number;
}

export interface DateInfo {
  pickupDate: string;
  pickupTime: string;
  returnDate?: string;
  returnTime?: string;
  hours?: number; // for hourly chauffeur
}

export interface SelectedVehicle {
  vehicleId: string;
  quantity: number;
}

export interface PassengerInfo {
  name: string;
  phone: string;
  email: string;
  nationality: string;
  language: string;
  specialRequests: string;
}

export interface BookingState {
  currentStep: number;
  tripType: TripType;
  locations: LocationInfo[];
  dates: DateInfo;
  vehicles: SelectedVehicle[];
  passengerInfo: PassengerInfo;
  passengerCount: number;
  luggageCount: number;
  extras: string[];
  pricing: {
    base: number;
    distance: number;
    vehicles: number;
    extras: number;
    tax: number;
    total: number;
  };
  paymentMethod: string;
  selectedRouteId?: string;
  selectedRoute?: any;
}

interface BookingContextType {
  state: BookingState;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateState: (updates: Partial<BookingState>) => void;
  calculatePricing: () => void;
  routes: any[];
}

const initialState: BookingState = {
  currentStep: 1,
  tripType: "one-way",
  locations: [
    { id: "loc-1", type: "pickup", address: "" },
    { id: "loc-2", type: "dropoff", address: "" }
  ],
  dates: {
    pickupDate: "",
    pickupTime: ""
  },
  vehicles: [],
  passengerInfo: {
    name: "",
    phone: "",
    email: "",
    nationality: "",
    language: "en",
    specialRequests: ""
  },
  passengerCount: 1,
  luggageCount: 0,
  extras: [],
  pricing: {
    base: 0,
    distance: 0,
    vehicles: 0,
    extras: 0,
    tax: 0,
    total: 0
  },
  paymentMethod: "credit-card"
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BookingState>(initialState);
  const [routes, setRoutes] = useState<any[]>([]);

  React.useEffect(() => {
    fetch('/api/pricing/routes')
      .then(res => res.json())
      .then(data => {
        if (data.routes) setRoutes(data.routes);
      })
      .catch(err => console.error("Failed to load routes", err));
  }, []);

  const updateState = (updates: Partial<BookingState>) => {
    setState((prev) => {
      const newState = { ...prev, ...updates };
      return newState;
    });
  };

  const setStep = (step: number) => setState(prev => ({ ...prev, currentStep: step }));
  const nextStep = () => setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
  const prevStep = () => setState(prev => ({ ...prev, currentStep: Math.max(1, prev.currentStep - 1) }));

  const calculatePricing = () => {
    // Pricing calculation based on current state and selected route
    let vehiclesCost = 0;
    
    if (state.selectedRoute) {
      vehiclesCost = state.vehicles.reduce((total, v) => {
        const routeVehicle = state.selectedRoute.pricings?.find((p: any) => p.vehicleId === v.vehicleId);
        const price = routeVehicle ? routeVehicle.currentPrice : 500;
        return total + (price * v.quantity);
      }, 0);
    }

    const extrasCost = state.extras.length * 150; // Mock 150 SAR per extra
    const base = 0; // Base platform fee removed since vehicle price includes it
    const distance = 0; // Mock distance fee

    const subtotal = base + distance + vehiclesCost + extrasCost;
    const tax = subtotal * 0.15; // 15% VAT

    updateState({
      pricing: {
        base,
        distance,
        vehicles: vehiclesCost,
        extras: extrasCost,
        tax,
        total: subtotal + tax
      }
    });
  };

  return (
    <BookingContext.Provider
      value={{
        state,
        setStep,
        nextStep,
        prevStep,
        updateState,
        calculatePricing,
        routes
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
