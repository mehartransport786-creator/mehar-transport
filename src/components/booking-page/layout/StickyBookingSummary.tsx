"use client";

import { useBooking } from "../context/BookingContext";
import { MapPin, Calendar, Car, Users, Sparkles, Phone, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function StickyBookingSummary() {
  const { state } = useBooking();
  const { pricing } = state;
  const hasRoutes = state.selectedRoutes.some((r: any) => r !== null);
  const hasVehicles = state.vehicles.length > 0;
  const hasPrice = pricing.totalIncludingTax > 0;

  return (
    <div className="sticky top-24 space-y-4">
      {/* Main Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1B1E4F] rounded-2xl overflow-hidden text-white shadow-2xl shadow-[#1B1E4F]/30"
      >
        {/* Gold Header Bar */}
        <div className="bg-gradient-to-r from-[#D9A63A] to-[#C4962F] px-6 py-3 flex items-center justify-between">
          <span className="text-sm font-bold text-white">Booking Summary</span>
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-medium">Step {state.currentStep}/4</span>
        </div>

        <div className="p-6 space-y-5">
          {/* Route Section */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#D9A63A] mb-3">Route</div>
            {hasRoutes ? (
              <div className="space-y-2">
                {state.selectedRoutes.filter(Boolean).map((route: any, index: number) => (
                  <div key={`summary-route-${index}`} className="flex gap-3">
                    <div className="flex flex-col items-center gap-0.5 mt-1">
                      <div className="w-2 h-2 rounded-full bg-[#D9A63A]" />
                      <div className="w-px h-4 bg-gray-600" />
                      <div className="w-2 h-2 rounded-full border border-gray-500" />
                    </div>
                    <div className="flex-1 text-sm">
                      <div className="text-white/90 font-medium">{route.origin}</div>
                      <div className="text-gray-400 text-xs mt-1">{route.destination}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No route selected yet</p>
            )}
          </div>

          {/* Date */}
          {state.dates.pickupDate && (
            <div className="pt-4 border-t border-gray-700/50">
              <div className="flex gap-3">
                <Calendar className="w-4 h-4 text-[#D9A63A] shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div className="text-white/60 text-xs">Date & Time</div>
                  <div className="text-white font-medium">{state.dates.pickupDate}</div>
                  {state.dates.pickupTime && <div className="text-gray-400 text-xs">{state.dates.pickupTime}</div>}
                </div>
              </div>
            </div>
          )}

          {/* Vehicles */}
          <AnimatePresence>
            {hasVehicles && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-4 border-t border-gray-700/50"
              >
                <div className="flex gap-3">
                  <Car className="w-4 h-4 text-[#D9A63A] shrink-0 mt-0.5" />
                  <div className="flex-1 text-sm space-y-1.5">
                    <div className="text-white/60 text-xs">Vehicles</div>
                    {state.vehicles.map((v, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span className="text-white/90">{v.quantity}× {v.vehicleName}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Passengers */}
          <div className="pt-4 border-t border-gray-700/50">
            <div className="flex gap-3">
              <Users className="w-4 h-4 text-[#D9A63A] shrink-0 mt-0.5" />
              <div className="text-sm">
                <div className="text-white/60 text-xs">Passengers</div>
                <div className="text-white font-medium">{state.passengerCount}</div>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="pt-5 border-t border-gray-700/50 space-y-2.5">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Base Fare</span>
              <span className="text-white/80 tabular-nums">{pricing.basePrice.toFixed(0)} SAR</span>
            </div>

            {pricing.adjustments.map((adj, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span className="text-[#D9A63A] flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {adj.name}
                </span>
                <span className="text-[#D9A63A] tabular-nums font-medium">
                  {adj.amount > 0 ? '+' : ''}{adj.amount.toFixed(0)} SAR
                </span>
              </div>
            ))}

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">VAT (15%)</span>
              <span className="text-white/80 tabular-nums">{pricing.taxAmount.toFixed(0)} SAR</span>
            </div>

            {/* Total */}
            <div className="flex justify-between items-end pt-4 border-t border-gray-600/50">
              <span className="text-base font-bold text-white">Total</span>
              {pricing.isCalculating ? (
                <div className="h-8 w-24 bg-gray-700 animate-pulse rounded-lg" />
              ) : (
                <motion.span
                  key={pricing.totalIncludingTax}
                  initial={{ scale: 1.1, color: "#D9A63A" }}
                  animate={{ scale: 1, color: "#D9A63A" }}
                  className="text-3xl font-black tabular-nums"
                >
                  {pricing.totalIncludingTax.toFixed(0)} <span className="text-xs font-semibold text-gray-400">SAR</span>
                </motion.span>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contact Card */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <div className="text-sm font-bold text-[#1B1E4F] mb-3">Need help booking?</div>
        <div className="space-y-2">
          <div className="flex gap-2">
            <a
              href="tel:+966565638120"
              className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-[#F8F9FC] hover:bg-[#D9A63A]/10 transition-colors group"
            >
              <Phone className="w-4 h-4 text-[#D9A63A]" />
              <span className="text-xs font-bold text-[#1B1E4F] group-hover:text-[#D9A63A]">Call 1</span>
            </a>
            <a
              href="tel:+966548707332"
              className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-[#F8F9FC] hover:bg-[#D9A63A]/10 transition-colors group"
            >
              <Phone className="w-4 h-4 text-[#D9A63A]" />
              <span className="text-xs font-bold text-[#1B1E4F] group-hover:text-[#D9A63A]">Call 2</span>
            </a>
          </div>
          <div className="flex gap-2">
            <a
              href="https://wa.me/966565638120"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-[#F8F9FC] hover:bg-green-50 transition-colors group"
            >
              <MessageCircle className="w-4 h-4 text-green-600" />
              <span className="text-xs font-bold text-[#1B1E4F] group-hover:text-green-600">WhatsApp 1</span>
            </a>
            <a
              href="https://wa.me/966548707332"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-[#F8F9FC] hover:bg-green-50 transition-colors group"
            >
              <MessageCircle className="w-4 h-4 text-green-600" />
              <span className="text-xs font-bold text-[#1B1E4F] group-hover:text-green-600">WhatsApp 2</span>
            </a>
          </div>
        </div>
      </div>

      {/* Trust Signals */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
        <div className="flex justify-center gap-4 text-xs text-gray-400">
          <span>✓ Licensed Drivers</span>
          <span>✓ Insured Fleet</span>
        </div>
      </div>
    </div>
  );
}
