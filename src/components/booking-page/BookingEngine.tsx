"use client";

import { useBooking, BookingProvider } from "./context/BookingContext";
import { useLocale } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";

// Placeholder components for steps (to be implemented)
import { TripTypeSelector } from "./steps/TripTypeSelector";
import { RouteBuilder } from "./steps/RouteBuilder";
import { FleetSelection } from "./steps/FleetSelection";
import { PassengerInfo } from "./steps/PassengerInfo";
import { ExtraServices } from "./steps/ExtraServices";
import { JourneyReview } from "./steps/JourneyReview";
import { PaymentCenter } from "./steps/PaymentCenter";
import { BookingConfirmation } from "./steps/BookingConfirmation";

// Layout components
import { ProgressBar } from "./layout/ProgressBar";
import { OrderSummary } from "./layout/OrderSummary";
import { BookingHero } from "./layout/BookingHero";
import { BookingFAQ } from "./layout/BookingFAQ";
import { SafetyCenter } from "./layout/SafetyCenter";

const stepComponents = [
  TripTypeSelector,
  RouteBuilder,
  FleetSelection,
  PassengerInfo,
  ExtraServices,
  JourneyReview,
  PaymentCenter,
  BookingConfirmation
];

function BookingEngineContent() {
  const { state } = useBooking();
  const locale = useLocale();
  
  const ActiveStepComponent = stepComponents[state.currentStep - 1];

  // Don't show hero and summary on the final confirmation step
  const isConfirmationStep = state.currentStep === 8;

  return (
    <div className="min-h-screen bg-[#F5F4F1] pb-24">
      {!isConfirmationStep && <BookingHero />}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px] mt-8">
        {!isConfirmationStep && <ProgressBar />}
        
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Main Content Area */}
          <div className={`flex-1 ${isConfirmationStep ? 'lg:w-full' : 'lg:w-2/3'}`}>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {ActiveStepComponent && <ActiveStepComponent />}
            </div>
          </div>

          {/* Sticky Sidebar - Order Summary */}
          {!isConfirmationStep && (
            <div className="lg:w-1/3">
              <div className="sticky top-24">
                <OrderSummary />
              </div>
            </div>
          )}
        </div>

        {/* Phase 5: Supporting Pages */}
        {!isConfirmationStep && (
          <div className="mt-16 space-y-8">
            <BookingFAQ />
            <SafetyCenter />
          </div>
        )}
      </div>
    </div>
  );
}

export function BookingEngine() {
  return (
    <BookingProvider>
      <BookingEngineContent />
    </BookingProvider>
  );
}
