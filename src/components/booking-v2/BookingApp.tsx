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

function BookingAppContent() {
  const { state } = useBookingV2();
  const isAr = useLocale() === "ar";

  return (
    <div className="min-h-screen bg-[#F5F4F1] pb-32 lg:pb-12">
      {/* Hero Header */}
      <div className="bg-[#1B1E4F] relative pt-24 pb-16">
        <div className="container mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-[#D9A63A] px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
            <ShieldCheck className="w-4 h-4" />
            {isAr ? "تجربة حجز فاخرة" : "Premium Booking Experience"}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            {isAr ? "احجز رحلتك" : "Book Your Journey"}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-8 text-white/60 text-xs sm:text-sm font-medium">
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#D9A63A]" /> {isAr ? "خدمة على مدار الساعة" : "24/7 Service"}</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#D9A63A]" /> {isAr ? "سائقون محترفون" : "Licensed Drivers"}</span>
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-[#D9A63A]" /> {isAr ? "تقييم 4.9★" : "4.9★ Rating"}</span>
            <span className="flex items-center gap-1.5"><Headset className="w-4 h-4 text-[#D9A63A]" /> {isAr ? "تأكيد فوري" : "Instant Confirmation"}</span>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="container mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column (Forms) */}
          <div className="flex-1 lg:w-[65%] space-y-6">
            <JourneySection />
            
            <div className={`transition-all duration-700 ${state.routeId || state.serviceType === 'hourly' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
              <VehicleSection />
            </div>

            <div className={`transition-all duration-700 ${state.selectedVehicle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none hidden'}`}>
              <ExtrasSection />
              <PassengerSection />
              <PaymentSection />
            </div>
          </div>

          {/* Right Column (Sticky Summary) */}
          <div className="hidden lg:block lg:w-[35%] xl:w-[380px] shrink-0">
            <StickySummary />
          </div>

        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden">
        <MobileActionBar />
      </div>
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
