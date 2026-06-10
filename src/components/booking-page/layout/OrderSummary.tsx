"use client";

import { useLocale, useTranslations } from "next-intl";
import { useBooking } from "../context/BookingContext";
import { ShieldCheck, Clock, MapPin, CheckCircle2 } from "lucide-react";

export function OrderSummary() {
    const t = useTranslations('OrderSummary');
  const locale = useLocale();
  const { state } = useBooking();
  const { pricing } = state;

  return (
    <div className="bg-[#1B1E4F] text-white rounded-2xl shadow-xl overflow-hidden border border-[#D9A63A]/20">
      <div className="p-6 border-b border-white/10 bg-black/20">
        <h3 className="text-xl font-bold text-[#D9A63A] uppercase tracking-wider">
          {t("bookingSummary")}
        </h3>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Dynamic content based on state will go here */}
        
        {state.tripType && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">{t("tripType")}</span>
            <span className="font-bold capitalize">{state.tripType.replace('-', ' ')}</span>
          </div>
        )}

        <div className="border-t border-white/10 pt-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">{t("baseFare")}</span>
            <span>{pricing.base} SAR</span>
          </div>
          {pricing.vehicles > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">{t("vehicles")}</span>
              <span>{pricing.vehicles} SAR</span>
            </div>
          )}
          {pricing.extras > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">{t("extras")}</span>
              <span>{pricing.extras} SAR</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">{t("vat15")}</span>
            <span>{pricing.tax.toFixed(2)} SAR</span>
          </div>
        </div>

        <div className="border-t border-[#D9A63A]/30 pt-4 flex justify-between items-center">
          <span className="text-lg font-bold">{t("total")}</span>
          <span className="text-2xl font-black text-[#D9A63A]">{pricing.total.toFixed(2)} SAR</span>
        </div>
      </div>
      
      {/* Trust Badges */}
      <div className="bg-black/30 p-4 grid grid-cols-2 gap-4 text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#D9A63A]" />
          <span>{t("securePayment")}</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#D9A63A]" />
          <span>{t("instantConfirm")}</span>
        </div>
      </div>
    </div>
  );
}
