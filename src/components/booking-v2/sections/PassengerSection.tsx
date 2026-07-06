"use client";

import { useLocale } from "next-intl";
import { User, Phone, Mail, Plane, MessageSquare, Briefcase } from "lucide-react";
import { useBookingV2 } from "../context/BookingV2Context";

export function PassengerSection() {
  const { state, updatePassengerInfo } = useBookingV2();
  const isAr = useLocale() === "ar";
  
  const isAirportRoute = state.serviceType === "transfer" && state.routeName?.toLowerCase().includes("airport");

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-[#1B1E4F] mb-6">
        {isAr ? "بيانات الراكب" : "Passenger Details"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Full Name */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {isAr ? "الاسم الكامل" : "Full Name"}
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              required
              value={state.passengerInfo.name}
              onChange={(e) => updatePassengerInfo({ name: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 text-sm focus:ring-2 focus:ring-[#D9A63A] focus:border-[#D9A63A] outline-none transition-all"
              placeholder={isAr ? "الاسم بالكامل" : "John Doe"}
            />
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {isAr ? "رقم الجوال" : "Mobile Number"}
          </label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="tel"
              required
              value={state.passengerInfo.phone}
              onChange={(e) => updatePassengerInfo({ phone: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 text-sm focus:ring-2 focus:ring-[#D9A63A] focus:border-[#D9A63A] outline-none transition-all"
              placeholder="+966 5X XXX XXXX"
              dir="ltr"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {isAr ? "البريد الإلكتروني" : "Email Address"}
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              required
              value={state.passengerInfo.email}
              onChange={(e) => updatePassengerInfo({ email: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 text-sm focus:ring-2 focus:ring-[#D9A63A] focus:border-[#D9A63A] outline-none transition-all"
              placeholder="email@example.com"
              dir="ltr"
            />
          </div>
        </div>

        {/* Flight Number - Conditionally Rendered */}
        {isAirportRoute && (
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {isAr ? "رقم الرحلة (اختياري)" : "Flight Number (Optional)"}
            </label>
            <div className="relative">
              <Plane className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={state.passengerInfo.flightNumber}
                onChange={(e) => updatePassengerInfo({ flightNumber: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-[#D9A63A]/5 border border-[#D9A63A]/20 rounded-xl text-gray-800 text-sm focus:ring-2 focus:ring-[#D9A63A] outline-none transition-all"
                placeholder={isAr ? "مثال: SV123" : "e.g., SV123"}
              />
            </div>
            <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
              <Plane className="w-3 h-3" />
              {isAr ? "لتتبع رحلتك في حال تأخرت" : "We'll track your flight for delays"}
            </p>
          </div>
        )}

        {/* Special Requests */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {isAr ? "طلبات خاصة (اختياري)" : "Special Requests (Optional)"}
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
            <textarea
              rows={2}
              value={state.passengerInfo.specialRequests}
              onChange={(e) => updatePassengerInfo({ specialRequests: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 text-sm focus:ring-2 focus:ring-[#D9A63A] focus:border-[#D9A63A] outline-none transition-all resize-none"
              placeholder={isAr ? "أي متطلبات إضافية؟" : "Any additional requirements?"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
