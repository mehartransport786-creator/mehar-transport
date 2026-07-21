"use client";

import { useLocale } from "next-intl";
import { ShieldCheck, Clock, Star, Headset } from "lucide-react";
import { BookingV2Provider, useBookingV2 } from "./context/BookingV2Context";
import { JourneySection } from "./sections/JourneySection";
import { VehicleSection } from "./sections/VehicleSection";
import { PassengerSection } from "./sections/PassengerSection";
import { ExtrasSection } from "./sections/ExtrasSection";
import { PaymentSection } from "./sections/PaymentSection";
import { StickySummary } from "./layout/StickySummary";
import { MobileActionBar } from "./layout/MobileActionBar";
import { BookingConfirmation } from "./BookingConfirmation";
import { Loader2, Check } from "lucide-react";

function BookingAppContent() {
  const { state } = useBookingV2();
  const isAr = useLocale() === "ar";

  return (
    <div className="min-h-screen bg-background pb-32 lg:pb-12">
      {/* Hero Header */}
      <div className="bg-primary relative pt-24 pb-16">
        <div className="container mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm text-secondary px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
            <ShieldCheck className="w-4 h-4" />
            {isAr ? "تجربة حجز فاخرة" : "Premium Booking Experience"}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 tracking-tight">
            {isAr ? "احجز رحلتك" : "Book Your Journey"}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-8 text-primary-foreground/60 text-xs sm:text-sm font-medium">
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-secondary" /> {isAr ? "خدمة على مدار الساعة" : "24/7 Service"}</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-secondary" /> {isAr ? "سائقون محترفون" : "Licensed Drivers"}</span>
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-secondary" /> {isAr ? "تقييم 4.9★" : "4.9★ Rating"}</span>
            <span className="flex items-center gap-1.5"><Headset className="w-4 h-4 text-secondary" /> {isAr ? "تأكيد فوري" : "Instant Confirmation"}</span>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="container mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        {state.bookingId ? (
          <BookingConfirmation />
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column (Forms) */}
            <div className="flex-1 lg:w-[65%] space-y-6">
              <JourneySection />
              
              <div className={`transition-all duration-[var(--duration-base)] ${state.routeId || state.serviceType === 'hourly' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
                <VehicleSection />
              </div>

              <div className={`transition-all duration-[var(--duration-base)] ${state.selectedVehicle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none hidden'}`}>
                <ExtrasSection />
                <PassengerSection />
                <PaymentSection />
                
                {/* Mobile-only Submit Button (since StickySummary is hidden on mobile) */}
                <div className="lg:hidden mt-8 mb-4">
                  <button
                    disabled={
                      !((state.serviceType === "transfer" ? state.routeId : state.pickupLocation) &&
                      state.selectedVehicle &&
                      state.passengerInfo.name &&
                      state.passengerInfo.phone &&
                      state.passengerInfo.email) || state.isSubmitting
                    }
                    onClick={async () => {
                      // Trigger submit logic (this will be refactored into context or a hook if needed, but for now we can just dispatch an event or handle it here)
                      // Actually, it's better to just trigger a custom event that StickySummary listens to, or we can move submit logic to Context.
                      document.dispatchEvent(new CustomEvent('submit-booking'));
                    }}
                    className={`w-full py-4 rounded-[var(--radius-btn)] font-bold text-base transition-all flex items-center justify-center gap-2 ${
                      ((state.serviceType === "transfer" ? state.routeId : state.pickupLocation) &&
                      state.selectedVehicle &&
                      state.passengerInfo.name &&
                      state.passengerInfo.phone &&
                      state.passengerInfo.email)
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-[var(--shadow-luxury)] hover:shadow-xl'
                        : 'bg-muted text-muted-foreground cursor-not-allowed'
                    }`}
                  >
                    {state.isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      isAr ? "تأكيد الحجز" : "Confirm Booking"
                    )}
                  </button>
                  {!(
                    (state.serviceType === "transfer" ? state.routeId : state.pickupLocation) &&
                    state.selectedVehicle &&
                    state.passengerInfo.name &&
                    state.passengerInfo.phone &&
                    state.passengerInfo.email
                  ) && (
                    <p className="text-xs text-center text-amber-600 mt-3 font-medium flex items-center justify-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      {isAr ? "أكمل جميع التفاصيل للتأكيد" : "Complete all details to book"}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column (Sticky Summary) */}
            <div className="hidden lg:block lg:w-[35%] xl:w-[380px] shrink-0">
              <StickySummary />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Bottom Bar */}
      {!state.bookingId && (
        <div className="lg:hidden">
          <MobileActionBar />
        </div>
      )}
    </div>
  );
}

export function BookingApp() {
  return (
    <BookingV2Provider>
      <BookingAppContent />
    </BookingV2Provider>
  );
}
