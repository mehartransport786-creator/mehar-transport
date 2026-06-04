"use client";

import { useLocale } from "next-intl";
import { useBooking } from "../context/BookingContext";
import { ArrowRight, ArrowLeft, User, Phone, Mail, Globe, MessageSquare } from "lucide-react";

export function PassengerInfo() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const { state, updateState, nextStep, prevStep } = useBooking();
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const updateField = (field: keyof typeof state.passengerInfo, value: string) => {
    updateState({ 
      passengerInfo: { 
        ...state.passengerInfo, 
        [field]: value 
      } 
    });
  };

  const isFormValid = state.passengerInfo.name && state.passengerInfo.phone && state.passengerInfo.email;

  return (
    <div className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-[#1B1E4F] mb-2">
        {isAr ? "بيانات المسافر الرئيسي" : "Lead Passenger Details"}
      </h2>
      <p className="text-gray-500 mb-8">
        {isAr 
          ? "يرجى إدخال تفاصيل التواصل الخاصة بك لنتمكن من تأكيد حجزك ومتابعة رحلتك." 
          : "Please enter your contact details so we can confirm your booking and coordinate your journey."}
      </p>

      <div className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#1B1E4F]">{isAr ? "الاسم الكامل" : "Full Name"} *</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400 rtl:right-3 rtl:left-auto" />
              <input
                type="text"
                value={state.passengerInfo.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder={isAr ? "الاسم كما في الهوية" : "Name as on ID"}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-10 rtl:pr-10 rtl:pl-4 text-sm focus:border-[#D9A63A] focus:ring-1 focus:ring-[#D9A63A] outline-none transition-all"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#1B1E4F]">{isAr ? "رقم الهاتف" : "Phone Number"} *</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400 rtl:right-3 rtl:left-auto" />
              <input
                type="tel"
                value={state.passengerInfo.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="+966 50 000 0000"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-10 rtl:pr-10 rtl:pl-4 text-sm focus:border-[#D9A63A] focus:ring-1 focus:ring-[#D9A63A] outline-none transition-all text-left"
                dir="ltr"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-[#1B1E4F]">{isAr ? "البريد الإلكتروني" : "Email Address"} *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400 rtl:right-3 rtl:left-auto" />
              <input
                type="email"
                value={state.passengerInfo.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="example@email.com"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-10 rtl:pr-10 rtl:pl-4 text-sm focus:border-[#D9A63A] focus:ring-1 focus:ring-[#D9A63A] outline-none transition-all text-left"
                dir="ltr"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-[#1B1E4F]">{isAr ? "الجنسية" : "Nationality"}</label>
            <div className="relative">
              <Globe className="absolute left-3 top-3 w-5 h-5 text-gray-400 rtl:right-3 rtl:left-auto" />
              <input
                type="text"
                value={state.passengerInfo.nationality}
                onChange={(e) => updateField('nationality', e.target.value)}
                placeholder={isAr ? "السعودية" : "Saudi Arabia"}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-10 rtl:pr-10 rtl:pl-4 text-sm focus:border-[#D9A63A] focus:ring-1 focus:ring-[#D9A63A] outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-[#1B1E4F]">{isAr ? "طلبات خاصة" : "Special Requests"}</label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400 rtl:right-3 rtl:left-auto" />
            <textarea
              value={state.passengerInfo.specialRequests}
              onChange={(e) => updateField('specialRequests', e.target.value)}
              placeholder={isAr ? "أي متطلبات خاصة بالرحلة (كراسي أطفال، مساعدة كبار السن، إلخ)" : "Any special requirements (Child seats, wheelchair assistance, etc.)"}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-10 rtl:pr-10 rtl:pl-4 text-sm focus:border-[#D9A63A] focus:ring-1 focus:ring-[#D9A63A] outline-none transition-all min-h-[120px] resize-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-between pt-6 border-t border-gray-100">
        <button onClick={prevStep} className="px-6 py-3 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-colors">
          {isAr ? "رجوع" : "Back"}
        </button>
        <button 
          onClick={nextStep} 
          disabled={!isFormValid}
          className="bg-[#1B1E4F] text-white hover:bg-[#D9A63A] hover:text-[#1B1E4F] px-8 py-3 rounded-lg font-bold transition-all flex items-center gap-2 group shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#1B1E4F] disabled:hover:text-white"
        >
          <span>{isAr ? "الخدمات الإضافية" : "Extra Services"}</span>
          <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
