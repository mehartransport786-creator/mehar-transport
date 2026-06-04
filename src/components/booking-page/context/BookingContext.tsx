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
}

interface BookingContextType {
  state: BookingState;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateState: (updates: Partial<BookingState>) => void;
  calculatePricing: () => void;
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

  const updateState = (updates: Partial<BookingState>) => {
    setState((prev) => {
      const newState = { ...prev, ...updates };
      return newState;
    });
  };

  const setStep = (step: number) => updateState({ currentStep: step });
  const nextStep = () => updateState({ currentStep: state.currentStep + 1 });
  const prevStep = () => updateState({ currentStep: Math.max(1, state.currentStep - 1) });

  const calculatePricing = () => {
    // Mock pricing calculation based on current state
    // In a real app, this would be an API call or complex logic
    let vehiclesCost = state.vehicles.reduce((total, v) => {
      // rough mock price: base price * quantity
      const basePrice = v.vehicleId === 'rolls-royce' ? 3000 : 
                        v.vehicleId === 'mercedes-s-class' ? 1500 : 
                        v.vehicleId === 'hyundai-staria' ? 800 : 500;
      return total + (basePrice * v.quantity);
    }, 0);

    const extrasCost = state.extras.length * 150; // Mock 150 SAR per extra
    const base = 200; // Base platform fee
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
        calculatePricing
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
