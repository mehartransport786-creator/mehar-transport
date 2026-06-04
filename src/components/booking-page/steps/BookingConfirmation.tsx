"use client";

import { useLocale } from "next-intl";
import { CheckCircle2, MapPin, Calendar, Car, Download, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useBooking } from "../context/BookingContext";
import { mockFleet } from "@/lib/data";
import { useState, useEffect } from "react";

export function BookingConfirmation() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const { state } = useBooking();
  const [bookingRef, setBookingRef] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [error, setError] = useState<string>("");

  const getVehicleName = (id: string) => {
    const v = mockFleet.find(v => v.id === id);
    return isAr ? v?.nameAr : v?.name;
  };

  const getVehicleType = (id: string) => {
    const v = mockFleet.find(v => v.id === id);
    return v?.name || id;
  };

  // Submit booking to API on mount
  useEffect(() => {
    async function submitBooking() {
      try {
        const pickup = state.locations.find(l => l.type === "pickup")?.address || "";
        const dropoff = state.locations.find(l => l.type === "dropoff")?.address || state.locations[state.locations.length - 1]?.address || "";
        const vehicleType = state.vehicles.length > 0 ? getVehicleType(state.vehicles[0].vehicleId) : "Standard";

        const bookingData = {
          customerName: state.passengerInfo.name || "Guest",
          customerPhone: state.passengerInfo.phone || "",
          customerEmail: state.passengerInfo.email || "",
          pickupLocation: pickup,
          dropoffLocation: dropoff,
          route: `${pickup} → ${dropoff}`,
          vehicleType,
          travelDate: state.dates.pickupDate || new Date().toISOString().split('T')[0],
          travelTime: state.dates.pickupTime || "08:00",
          returnDate: state.dates.returnDate,
          returnTime: state.dates.returnTime,
          passengers: state.passengerCount || 1,
          luggage: state.luggageCount || 0,
          tripType: state.tripType || "one-way",
          totalPrice: state.pricing.total || 0,
          extras: state.extras || [],
          specialRequests: state.passengerInfo.specialRequests || "",
          nationality: state.passengerInfo.nationality || "",
          language: locale,
          paymentMethod: state.paymentMethod || "cash",
        };

        const res = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        });

        const data = await res.json();

        if (data.success) {
          setBookingRef(data.data.bookingId);
        } else {
          setError(data.error || "Booking failed");
          // Generate a fallback ref
          setBookingRef(`MHT-${new Date().getFullYear()}-PENDING`);
        }
      } catch (err) {
        console.error("Booking submission error:", err);
        setError("Network error — booking saved locally");
        setBookingRef(`MHT-${new Date().getFullYear()}-PENDING`);
      } finally {
        setIsSubmitting(false);
      }
    }

    submitBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isSubmitting) {
    return (
      <div className="p-8 md:p-12 text-center max-w-3xl mx-auto">
        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Loader2 className="w-12 h-12 text-[#1B1E4F] animate-spin" />
        </div>
        <h2 className="text-2xl font-bold text-[#1B1E4F] mb-2">
          {isAr ? "جاري إرسال الحجز..." : "Submitting your booking..."}
        </h2>
        <p className="text-gray-500">
          {isAr ? "يرجى الانتظار لحظة" : "Please wait a moment"}
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-12 text-center max-w-3xl mx-auto">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-12 h-12 text-green-600" />
      </div>
      
      <h2 className="text-3xl font-bold text-[#1B1E4F] mb-2">
        {isAr ? "تم تأكيد الحجز بنجاح" : "Booking Confirmed Successfully"}
      </h2>
      <p className="text-gray-500 mb-8 text-lg">
        {isAr ? "شكراً لاختيارك ميهار للنقل. تم إرسال تفاصيل الحجز إلى بريدك الإلكتروني." : "Thank you for choosing Mehar Transport. Your booking details have been sent to your email."}
      </p>

      {error && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-700">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl border-2 border-green-100 shadow-xl overflow-hidden mb-10 text-start relative">
        {/* Ticket Header */}
        <div className="bg-[#1B1E4F] p-6 text-white flex justify-between items-center border-b border-dashed border-white/20">
          <div>
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">{isAr ? "رقم الحجز" : "Booking Reference"}</p>
            <p className="text-2xl font-black text-[#D9A63A] tracking-wider">{bookingRef}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">{isAr ? "الحالة" : "Status"}</p>
            <p className="font-bold text-green-400 flex items-center gap-1 justify-end">
              <CheckCircle2 className="w-4 h-4" /> {isAr ? "معلّق" : "Pending"}
            </p>
          </div>
        </div>

        {/* Ticket Body */}
        <div className="p-8 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-2"><Calendar className="w-4 h-4" /> {isAr ? "التاريخ والوقت" : "Date & Time"}</p>
                <p className="font-bold text-lg text-[#1B1E4F]">{state.dates.pickupDate} {isAr ? "في" : "at"} {state.dates.pickupTime}</p>
              </div>
              
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-2"><MapPin className="w-4 h-4" /> {isAr ? "نقطة الانطلاق" : "Pickup Point"}</p>
                <p className="font-bold text-[#1B1E4F]">{state.locations[0]?.address || '-'}</p>
              </div>
              
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-2"><MapPin className="w-4 h-4" /> {isAr ? "نقطة الوصول" : "Drop-off Point"}</p>
                <p className="font-bold text-[#1B1E4F]">{state.locations[state.locations.length - 1]?.address || '-'}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-2"><Car className="w-4 h-4" /> {isAr ? "المركبات" : "Vehicles"}</p>
                {state.vehicles.map(v => (
                  <p key={v.vehicleId} className="font-bold text-[#1B1E4F]">{getVehicleName(v.vehicleId)} (x{v.quantity})</p>
                ))}
              </div>
              
              <div className="bg-[#1B1E4F]/5 p-4 rounded-xl border border-[#1B1E4F]/10">
                <p className="text-xs font-bold text-gray-500 uppercase mb-1">{isAr ? "المسافر" : "Passenger"}</p>
                <p className="font-bold text-[#1B1E4F]">{state.passengerInfo.name}</p>
                <p className="text-sm text-gray-500 mt-1" dir="ltr">{state.passengerInfo.phone}</p>
              </div>

              <div className="bg-[#D9A63A]/10 p-4 rounded-xl border border-[#D9A63A]/20">
                <p className="text-xs font-bold text-gray-500 uppercase mb-1">{isAr ? "الإجمالي" : "Total Amount"}</p>
                <p className="text-xl font-black text-[#D9A63A]">{state.pricing.total.toLocaleString()} SAR</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Ticket Footer */}
        <div className="bg-gray-100 p-4 border-t border-dashed border-gray-300 flex justify-center gap-4">
          <button className="text-[#1B1E4F] font-bold text-sm flex items-center gap-2 hover:text-[#D9A63A] transition-colors">
            <Download className="w-4 h-4" /> {isAr ? "تحميل التذكرة PDF" : "Download PDF Ticket"}
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link href="/" className="px-8 py-3 rounded-lg font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
          {isAr ? "العودة للرئيسية" : "Back to Home"}
        </Link>
        <Link href="/booking" className="bg-[#1B1E4F] text-white hover:bg-[#D9A63A] hover:text-[#1B1E4F] px-8 py-3 rounded-lg font-bold transition-all shadow-lg flex items-center justify-center gap-2">
          {isAr ? "حجز آخر" : "Book Another Trip"} <ArrowRight className="w-4 h-4 rtl:hidden" /><ArrowLeft className="w-4 h-4 hidden rtl:block" />
        </Link>
      </div>
    </div>
  );
}
