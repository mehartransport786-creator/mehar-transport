"use client";

import { useLocale } from "next-intl";
import { useBookingV2 } from "../context/BookingV2Context";

export function MobileActionBar() {
  const { state } = useBookingV2();
  const isAr = useLocale() === "ar";

  if (state.bookingId) return null; // Don't show if booking confirmed

  const isComplete = Boolean(
    (state.serviceType === "transfer" ? state.routeId : state.pickupLocation) &&
    state.selectedVehicle &&
    state.passengerInfo.name &&
    state.passengerInfo.phone &&
    state.passengerInfo.email
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 pb-safe z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs text-muted-foreground font-medium mb-0.5">{isAr ? "الإجمالي" : "Total"}</div>
          <div className="text-xl font-black text-primary tabular-nums leading-none">
            {state.pricing.totalPrice.toFixed(0)} <span className="text-sm text-muted-foreground/60 font-bold ml-0.5">SAR</span>
          </div>
        </div>
        
        <button
          disabled={!isComplete || state.isSubmitting}
          onClick={() => {
            if (isComplete) {
              document.dispatchEvent(new CustomEvent('submit-booking'));
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className={`flex-1 py-3.5 rounded-[var(--radius-btn)] font-bold text-sm transition-all text-center ${
            isComplete 
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          {state.isSubmitting ? "..." : (isComplete ? (isAr ? "تأكيد الحجز" : "Confirm Booking") : (isAr ? "أكمل التفاصيل" : "Complete Details"))}
        </button>
      </div>
    </div>
  );
}
