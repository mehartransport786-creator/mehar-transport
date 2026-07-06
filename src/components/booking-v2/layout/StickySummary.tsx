"use client";

import { useLocale } from "next-intl";
import { CheckCircle2, ShieldCheck, Check, Loader2, ArrowRight } from "lucide-react";
import { useBookingV2 } from "../context/BookingV2Context";
import { useState } from "react";
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
        updateState({ isSubmitting: false, bookingId: data.bookingId });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error(data.error || "Failed to submit booking");
      }
    } catch (err) {
      console.error(err);
      updateState({ isSubmitting: false });
      alert(isAr ? "حدث خطأ أثناء إرسال الحجز. يرجى المحاولة مرة أخرى." : "An error occurred while submitting. Please try again.");
    }
  };

  // Success State View
  if (state.bookingId) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 text-center sticky top-28">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold text-[#1B1E4F] mb-2">
          {isAr ? "تم تأكيد الحجز" : "Booking Confirmed"}
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          {isAr 
            ? "شكراً لك! سيتم التواصل معك قريباً لتأكيد تفاصيل السائق." 
            : "Thank you! We'll contact you shortly to confirm your driver details."}
        </p>
        <div className="bg-gray-50 rounded-xl p-4 mb-8">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
            {isAr ? "رقم الحجز" : "Booking Reference"}
          </div>
          <div className="font-mono text-xl font-bold text-[#D9A63A]">
            {state.bookingId}
          </div>
        </div>
        
        <button 
          onClick={() => window.location.reload()}
          className="w-full bg-[#1B1E4F] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#2A2D5F] transition-all mb-3"
        >
          {isAr ? "حجز جديد" : "Make Another Booking"}
        </button>
        <button 
          onClick={() => router.push('/')}
          className="w-full bg-white text-[#1B1E4F] py-3.5 rounded-xl font-bold text-sm hover:bg-gray-50 border border-gray-200 transition-all"
        >
          {isAr ? "العودة للرئيسية" : "Return to Home"}
        </button>
      </div>
    );
  }

  // Normal Sticky Summary
  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-6 sticky top-28">
      <h3 className="text-lg font-bold text-[#1B1E4F] mb-6 flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-[#D9A63A]" />
        {isAr ? "ملخص الحجز" : "Booking Summary"}
      </h3>

      <div className="space-y-4 mb-6">
        {/* Journey Summary */}
        <div className="flex justify-between items-start pb-4 border-b border-gray-100">
          <div>
            <div className="text-xs text-gray-400 font-medium mb-1">{isAr ? "تفاصيل الرحلة" : "Journey"}</div>
            <div className="font-semibold text-sm text-[#1B1E4F]">
              {state.serviceType === "transfer" 
                ? (state.routeName || (isAr ? "لم يتم تحديد المسار" : "Route not selected"))
                : (state.pickupLocation || (isAr ? "لم يتم تحديد الوجهة" : "Location not set"))
              }
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {state.travelDate} • {state.travelTime}
              {state.serviceType === "hourly" && ` • ${state.durationHours} ${isAr ? "ساعات" : "hours"}`}
            </div>
          </div>
        </div>

        {/* Vehicle Summary */}
        {state.selectedVehicle && (
          <div className="flex justify-between items-start pb-4 border-b border-gray-100">
            <div>
              <div className="text-xs text-gray-400 font-medium mb-1">{isAr ? "المركبة" : "Vehicle"}</div>
              <div className="font-semibold text-sm text-[#1B1E4F]">
                {isAr ? state.selectedVehicle.vehicleNameAr : state.selectedVehicle.vehicleName}
              </div>
            </div>
            <div className="font-bold text-sm text-[#1B1E4F] tabular-nums">
              {state.pricing.basePrice.toFixed(0)} <span className="text-xs text-gray-400">SAR</span>
            </div>
          </div>
        )}

        {/* Extras Summary */}
        {state.pricing.adjustments.map((adj, idx) => (
          <div key={idx} className="flex justify-between items-start pb-4 border-b border-gray-100">
            <div>
              <div className="text-xs text-gray-400 font-medium mb-1">{isAr ? "إضافة" : "Add-on"}</div>
              <div className="font-medium text-sm text-[#1B1E4F]">{adj.name}</div>
            </div>
            <div className="font-bold text-sm text-[#D9A63A] tabular-nums">
              +{adj.amount.toFixed(0)} <span className="text-xs text-gray-400">SAR</span>
            </div>
          </div>
        ))}

        {/* Taxes */}
        {state.pricing.totalIncludingTax > 0 && (
          <div className="flex justify-between items-center pb-2">
            <div className="text-xs text-gray-500 font-medium">{isAr ? "ضريبة القيمة المضافة (15%)" : "VAT (15%)"}</div>
            <div className="text-xs text-gray-500 tabular-nums">{state.pricing.taxAmount.toFixed(0)} SAR</div>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="bg-[#F8F9FC] rounded-xl p-4 mb-6 flex justify-between items-center border border-gray-100">
        <div className="text-sm font-bold text-[#1B1E4F]">{isAr ? "الإجمالي" : "Total Amount"}</div>
        <div className="text-2xl font-black text-[#1B1E4F] tabular-nums">
          {state.pricing.totalIncludingTax.toFixed(0)} <span className="text-sm text-gray-500 font-bold ml-1">SAR</span>
        </div>
      </div>

      <button
        disabled={!isComplete || state.isSubmitting}
        onClick={handleSubmit}
        className={`w-full py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 ${
          isComplete 
            ? 'bg-[#1B1E4F] text-white hover:bg-[#2A2D5F] shadow-lg hover:shadow-xl'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
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
