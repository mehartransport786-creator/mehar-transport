"use client";

import { useState } from "react";
import { useBooking } from "../context/BookingContext";
import { CheckCircle2, AlertCircle, CreditCard, Banknote, Building2, Clock, Wallet, MapPin, Car, Calendar, Users, ArrowLeft, Sparkles, ShieldCheck, Phone, Headset, PlaneTakeoff } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function Step4ReviewAndConfirm() {
  const { state, updateState, prevStep } = useBooking();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const paymentMethods = [
    { id: 'pay-later', icon: Clock, label: 'Pay Later', desc: 'Reserve now, pay on the day' },
    { id: 'cash', icon: Banknote, label: 'Cash', desc: 'Pay cash to driver' },
    { id: 'bank-transfer', icon: Building2, label: 'Bank Transfer', desc: 'Wire transfer before trip' },
    { id: 'online', icon: CreditCard, label: 'Online Payment', desc: 'Credit / debit card' },
    { id: 'corporate', icon: Wallet, label: 'Corporate', desc: 'Company account' }
  ];

  const handleSubmit = async () => {
    if (!agreed) return;
    setIsSubmitting(true);
    setError("");
    try {
      const payload = {
        tripType: state.tripType,
        customerName: state.passengerInfo.name,
        customerEmail: state.passengerInfo.email,
        customerPhone: state.passengerInfo.phone,
        pickupLocation: state.passengerInfo.pickupLocation,
        dropoffLocation: state.passengerInfo.dropoffLocation,
        travelDate: state.dates.pickupDate,
        travelTime: state.dates.pickupTime,
        returnDate: state.dates.returnDate,
        returnTime: state.dates.returnTime,
        routeId: state.selectedRoutes[0]?._id || null,
        route: state.selectedRoutes[0] ? `${state.selectedRoutes[0].origin} → ${state.selectedRoutes[0].destination}` : undefined,
        vehicleType: state.vehicles[0]?.vehicleName || 'Standard',
        vehicleId: state.vehicles[0]?.vehicleId || null,
        passengers: state.passengerCount,
        luggage: state.vehicles[0]?.luggage || 0,
        paymentMethod: state.paymentMethod,
        totalPrice: state.pricing.totalIncludingTax,
        status: "pending",
        specialRequests: state.passengerInfo.specialRequests,
        nationality: state.passengerInfo.nationality,
        language: state.passengerInfo.country,
        extras: [],
        metadata: {
          routes: state.selectedRoutes.filter(Boolean),
          vehicles: state.vehicles,
          pricing: state.pricing,
          flightNumber: state.passengerInfo.flightNumber,
          whatsapp: state.passengerInfo.whatsapp,
          hotelName: state.passengerInfo.hotelName
        }
      };

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.success !== false) {
        const id = data.data?.bookingId || data.data?._id || data.bookingId || data._id || 'success';
        router.push(`/en/book/success?id=${id}`);
      } else {
        setError(data.error || "Failed to submit booking. Please try again.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const { pricing } = state;

  return (
    <div className="p-6 sm:p-8 md:p-10 lg:p-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[#D9A63A]/10 text-[#D9A63A] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
          <CheckCircle2 className="w-4 h-4" />
          Step 4 of 4
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1B1E4F] mb-2 tracking-tight">
          Review & Confirm
        </h2>
        <p className="text-lg text-[#1B1E4F]/40 font-medium" dir="rtl">المراجعة والتأكيد</p>
      </div>

      <div className="space-y-6">
        {/* Journey Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-[#F8F9FC] border-b border-gray-100 flex items-center gap-3">
            <MapPin className="w-5 h-5 text-[#D9A63A]" />
            <h3 className="font-bold text-[#1B1E4F]">Journey Summary</h3>
          </div>
          <div className="p-6 space-y-4">
            {state.selectedRoutes.filter(Boolean).map((route: any, i: number) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-[#D9A63A]" />
                  <div className="w-px h-6 bg-[#D9A63A]/30" />
                  <div className="w-3 h-3 rounded-full border-2 border-[#1B1E4F]" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="text-sm">
                    <span className="text-xs text-gray-400 uppercase tracking-wider block">From</span>
                    <span className="font-semibold text-[#1B1E4F]">{route.origin}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-xs text-gray-400 uppercase tracking-wider block">To</span>
                    <span className="font-semibold text-[#1B1E4F]">{route.destination}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2.5 text-sm">
                <Calendar className="w-4 h-4 text-[#D9A63A]" />
                <div>
                  <div className="text-xs text-gray-400">Date & Time</div>
                  <div className="font-semibold text-[#1B1E4F]">{state.dates.pickupDate} at {state.dates.pickupTime}</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <Users className="w-4 h-4 text-[#D9A63A]" />
                <div>
                  <div className="text-xs text-gray-400">Passengers</div>
                  <div className="font-semibold text-[#1B1E4F]">{state.passengerCount}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-[#F8F9FC] border-b border-gray-100 flex items-center gap-3">
            <Car className="w-5 h-5 text-[#D9A63A]" />
            <h3 className="font-bold text-[#1B1E4F]">Vehicle Summary</h3>
          </div>
          <div className="p-6 space-y-3">
            {state.vehicles.map((v, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1B1E4F]/5 flex items-center justify-center text-xs font-bold text-[#1B1E4F]">
                    ×{v.quantity}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[#1B1E4F]">{v.vehicleName}</div>
                    <div className="text-xs text-gray-400">{v.passengers} pax · {v.luggage} bags</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-[#F8F9FC] border-b border-gray-100 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#D9A63A]" />
            <h3 className="font-bold text-[#1B1E4F]">Pricing Breakdown</h3>
          </div>
          <div className="p-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Base Fare</span>
              <span className="font-semibold text-[#1B1E4F] tabular-nums">{pricing.basePrice.toFixed(0)} SAR</span>
            </div>
            {pricing.adjustments.map((adj, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-amber-600 flex items-center gap-1"><Sparkles className="w-3 h-3" />{adj.name}</span>
                <span className="font-semibold text-amber-600 tabular-nums">{adj.amount > 0 ? '+' : ''}{adj.amount.toFixed(0)} SAR</span>
              </div>
            ))}
            <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
              <span className="text-gray-500">VAT (15%)</span>
              <span className="font-semibold text-[#1B1E4F] tabular-nums">{pricing.taxAmount.toFixed(0)} SAR</span>
            </div>
            <div className="flex justify-between items-end pt-4 border-t-2 border-[#1B1E4F]/10">
              <span className="text-lg font-bold text-[#1B1E4F]">Total</span>
              {pricing.isCalculating ? (
                <div className="h-8 w-24 bg-gray-100 animate-pulse rounded" />
              ) : (
                <span className="text-3xl font-black text-[#D9A63A] tabular-nums">
                  {pricing.totalIncludingTax.toFixed(0)} <span className="text-sm font-semibold text-gray-400">SAR</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-[#F8F9FC] border-b border-gray-100 flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-[#D9A63A]" />
            <h3 className="font-bold text-[#1B1E4F]">Payment Method</h3>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              const isSelected = state.paymentMethod === method.id;
              return (
                <button
                  key={method.id}
                  onClick={() => updateState({ paymentMethod: method.id })}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                    isSelected
                      ? 'border-[#D9A63A] bg-[#D9A63A]/5 shadow-sm'
                      : 'border-gray-100 bg-white hover:border-gray-200'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-[#D9A63A] text-white' : 'bg-gray-50 text-gray-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-sm text-[#1B1E4F]">{method.label}</div>
                    <div className="text-xs text-gray-400 truncate">{method.desc}</div>
                  </div>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-[#D9A63A] ml-auto shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: ShieldCheck, label: "Instant Confirmation" },
            { icon: Headset, label: "24/7 Support" },
            { icon: PlaneTakeoff, label: "Flight Tracking" },
            { icon: Clock, label: "Free Waiting Time" },
          ].map((badge, i) => (
            <div key={i} className="flex flex-col items-center gap-2 p-4 bg-[#F8F9FC] rounded-xl text-center">
              <badge.icon className="w-5 h-5 text-[#D9A63A]" />
              <span className="text-xs font-semibold text-[#1B1E4F]">{badge.label}</span>
            </div>
          ))}
        </div>

        {/* Terms */}
        <div className="bg-amber-50/50 rounded-2xl p-5 border border-amber-100/50">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-gray-300 text-[#D9A63A] focus:ring-[#D9A63A]"
            />
            <div className="text-sm text-amber-800 leading-relaxed">
              <span className="font-semibold">I agree to the terms & cancellation policy.</span>{" "}
              Free cancellation up to 24 hours before pickup. Waiting time included: 60 mins at airports, 15 mins at other locations. By confirming, you agree to our terms of service and privacy policy.
            </div>
          </label>
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-2 text-sm font-medium"
            >
              <AlertCircle className="w-5 h-5 shrink-0" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="mt-10 flex justify-between items-center">
        <button
          onClick={prevStep}
          className="flex items-center gap-2 text-gray-400 hover:text-[#1B1E4F] font-semibold transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <motion.button
          onClick={handleSubmit}
          disabled={isSubmitting || !agreed}
          whileHover={!isSubmitting && agreed ? { scale: 1.02 } : {}}
          whileTap={!isSubmitting && agreed ? { scale: 0.98 } : {}}
          className="bg-[#D9A63A] text-white px-8 sm:px-12 py-4 rounded-xl text-base font-bold hover:bg-[#C4962F] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-3 shadow-lg shadow-[#D9A63A]/30"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Confirm Booking
              <CheckCircle2 className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
