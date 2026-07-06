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
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 pb-safe z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs text-gray-500 font-medium mb-0.5">{isAr ? "الإجمالي" : "Total"}</div>
          <div className="text-xl font-black text-[#1B1E4F] tabular-nums leading-none">
            {state.pricing.totalIncludingTax.toFixed(0)} <span className="text-sm text-gray-400 font-bold ml-0.5">SAR</span>
          </div>
        </div>
        
        <button
          disabled={!isComplete || state.isSubmitting}
          onClick={() => {
            if (isComplete) {
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all text-center ${
            isComplete 
              ? 'bg-[#1B1E4F] text-white hover:bg-[#2A2D5F]'
              : 'bg-gray-100 text-gray-400'
          }`}
        >
          {state.isSubmitting ? "..." : (isComplete ? (isAr ? "راجع للأسفل للتأكيد" : "Scroll Down to Confirm") : (isAr ? "أكمل التفاصيل" : "Complete Details"))}
        </button>
      </div>
    </div>
  );
}
