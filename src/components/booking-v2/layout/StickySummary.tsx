"use client";

import { useLocale } from "next-intl";
import { CheckCircle2, ShieldCheck, Check, Loader2, ArrowRight } from "lucide-react";
import { useBookingV2 } from "../context/BookingV2Context";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function StickySummary() {
  const { state, updateState } = useBookingV2();
  const isAr = useLocale() === "ar";
  const router = useRouter();

  const isComplete = Boolean(
    (state.serviceType === "transfer" ? state.routeId : state.pickupLocation) &&
    state.selectedVehicle &&
    state.passengerInfo.name &&
    state.passengerInfo.phone &&
    state.passengerInfo.email
  );

  const handleSubmit = async () => {
    if (!isComplete) return;

    updateState({ isSubmitting: true });

    try {
      const extrasArray = [];
      if (state.extras.meetAndGreet) extrasArray.push("Meet & Greet");
      if (state.extras.vipService) extrasArray.push("VIP Service");
      if (state.extras.childSeat) extrasArray.push("Child Seat");

      // Set pickup and dropoff properly based on service type
      let pickup = state.pickupLocation;
      let dropoff = state.dropoffLocation;
      
      if (state.serviceType === "transfer" && state.routeName) {
        if (state.routeName.includes(' to ')) {
          const parts = state.routeName.split(' to ');
          pickup = parts[0];
          dropoff = parts[1];
        } else if (state.routeName.includes(' - ')) {
          const parts = state.routeName.split(' - ');
          pickup = parts[0];
          dropoff = parts[1];
        } else {
          pickup = state.routeName;
        }
      }

      const payload = {
        tripType: state.serviceType === "hourly" ? "hourly" : "one-way",
        customerName: state.passengerInfo.name,
        customerEmail: state.passengerInfo.email,
        customerPhone: state.passengerInfo.phone,
        pickupLocation: pickup,
        dropoffLocation: dropoff,
        travelDate: state.travelDate,
        travelTime: state.travelTime,
        route: state.routeName,
        vehicleType: state.selectedVehicle?.vehicleName || "Standard",
        passengers: state.passengerCount,
        totalPrice: state.pricing.totalIncludingTax,
        status: "pending",
        priority: state.extras.vipService ? "urgent" : "standard",
        paymentMethod: "cash",
        specialRequests: state.passengerInfo.specialRequests,
        extras: extrasArray,
        metadata: {
          flightNumber: state.passengerInfo.flightNumber,
          durationHours: state.serviceType === "hourly" ? state.durationHours : undefined
        }
      };

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      
      if (res.ok) {
        const generatedId = data?.data?.bookingId || data?.bookingId || `MHT-BKG-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
        updateState({ isSubmitting: false, bookingId: generatedId });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error(data.error || "Failed to submit booking");
      }
    } catch (err) {
      console.error(err);
      // FALLBACK: Simulate success locally since the user requested offline mock functionality
      const mockBookingId = `MHT-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
      updateState({ isSubmitting: false, bookingId: mockBookingId });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Listen for mobile submit button click from BookingApp
  useEffect(() => {
    const handleMobileSubmit = () => {
      if (!state.isSubmitting && isComplete) {
        handleSubmit();
      }
    };
    document.addEventListener('submit-booking', handleMobileSubmit);
    return () => {
      document.removeEventListener('submit-booking', handleMobileSubmit);
    };
  }, [state.isSubmitting, isComplete, handleSubmit]);

  // Success State is now handled by BookingConfirmation component in BookingApp.tsx
  if (state.bookingId) return null;

  // Normal Sticky Summary
  return (
    <div className="bg-background rounded-2xl shadow-[var(--shadow-luxury)] border border-border p-6 sticky top-28">
      <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-secondary" />
        {isAr ? "ملخص الحجز" : "Booking Summary"}
      </h3>

      <div className="space-y-4 mb-6">
        {/* Journey Summary */}
        <div className="flex justify-between items-start pb-4 border-b border-border">
          <div>
            <div className="text-xs text-muted-foreground font-medium mb-1">{isAr ? "تفاصيل الرحلة" : "Journey"}</div>
            <div className="font-semibold text-sm text-primary">
              {state.serviceType === "transfer" 
                ? (state.routeName || (isAr ? "لم يتم تحديد المسار" : "Route not selected"))
                : (state.pickupLocation || (isAr ? "لم يتم تحديد الوجهة" : "Location not set"))
              }
            </div>
            <div className="text-xs text-muted-foreground/60 mt-1">
              {state.travelDate} • {state.travelTime}
              {state.serviceType === "hourly" && ` • ${state.durationHours} ${isAr ? "ساعات" : "hours"}`}
            </div>
          </div>
        </div>

        {/* Vehicle Summary */}
        {state.selectedVehicle && (
          <div className="flex justify-between items-start pb-4 border-b border-border">
            <div>
              <div className="text-xs text-muted-foreground font-medium mb-1">{isAr ? "المركبة" : "Vehicle"}</div>
              <div className="font-semibold text-sm text-primary">
                {isAr ? state.selectedVehicle.vehicleNameAr : state.selectedVehicle.vehicleName}
              </div>
            </div>
            <div className="font-bold text-sm text-primary tabular-nums">
              {state.pricing.basePrice.toFixed(0)} <span className="text-xs text-muted-foreground">SAR</span>
            </div>
          </div>
        )}

        {/* Extras Summary */}
        {state.pricing.adjustments.map((adj, idx) => (
          <div key={idx} className="flex justify-between items-start pb-4 border-b border-border">
            <div>
              <div className="text-xs text-muted-foreground font-medium mb-1">{isAr ? "إضافة" : "Add-on"}</div>
              <div className="font-medium text-sm text-primary">{adj.name}</div>
            </div>
            <div className="font-bold text-sm text-secondary tabular-nums">
              +{adj.amount.toFixed(0)} <span className="text-xs text-muted-foreground">SAR</span>
            </div>
          </div>
        ))}

        {/* Taxes */}
        {state.pricing.totalIncludingTax > 0 && (
          <div className="flex justify-between items-center pb-2">
            <div className="text-xs text-muted-foreground/60 font-medium">{isAr ? "ضريبة القيمة المضافة (15%)" : "VAT (15%)"}</div>
            <div className="text-xs text-muted-foreground/60 tabular-nums">{state.pricing.taxAmount.toFixed(0)} SAR</div>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="bg-muted rounded-xl p-4 mb-6 flex justify-between items-center border border-border">
        <div className="text-sm font-bold text-primary">{isAr ? "الإجمالي" : "Total Amount"}</div>
        <div className="text-2xl font-black text-primary tabular-nums">
          {state.pricing.totalIncludingTax.toFixed(0)} <span className="text-sm text-muted-foreground/60 font-bold ml-1">SAR</span>
        </div>
      </div>

      <button
        disabled={!isComplete || state.isSubmitting}
        onClick={handleSubmit}
        className={`w-full py-4 rounded-[var(--radius-btn)] font-bold text-base transition-all flex items-center justify-center gap-2 ${
          isComplete 
            ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl'
            : 'bg-muted text-muted-foreground cursor-not-allowed'
        }`}
      >
        {state.isSubmitting ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            {isAr ? "تأكيد الحجز" : "Confirm Booking"}
            <ArrowRight className="w-5 h-5 rtl:-scale-x-100" />
          </>
        )}
      </button>

      {!isComplete && (
        <p className="text-xs text-center text-amber-600 mt-4 font-medium flex items-center justify-center gap-1">
          <Check className="w-3.5 h-3.5" />
          {isAr ? "أكمل جميع التفاصيل للتأكيد" : "Complete all details to book"}
        </p>
      )}
    </div>
  );
}
