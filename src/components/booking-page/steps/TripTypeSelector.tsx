"use client";

import { useLocale } from "next-intl";
import { useBooking, TripType } from "../context/BookingContext";
import { ArrowRight, ArrowLeft, Plane, Map, Clock, Building, Users, Calendar, Crown, MapPin } from "lucide-react";

export function TripTypeSelector() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const { state, updateState, nextStep } = useBooking();
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const tripTypes = [
    { id: "one-way", icon: ArrowRight, title: isAr ? "ذهاب فقط" : "One Way", desc: isAr ? "نقل من نقطة أ إلى ب" : "Point A to Point B transfer" },
    { id: "round-trip", icon: Map, title: isAr ? "ذهاب وعودة" : "Round Trip", desc: isAr ? "نقل مع العودة" : "Transfer with return journey" },
    { id: "hourly", icon: Clock, title: isAr ? "تأجير بالساعات" : "Hourly Chauffeur", desc: isAr ? "سائق تحت تصرفك" : "Driver at your disposal" },
    { id: "airport", icon: Plane, title: isAr ? "نقل المطار" : "Airport Transfer", desc: isAr ? "من وإلى المطار" : "To and from the airport" },
    { id: "umrah", icon: Building, title: isAr ? "باقات العمرة" : "Umrah Package", desc: isAr ? "تنقلات مكة والمدينة" : "Makkah & Madinah transfers" },
    { id: "vip", icon: Crown, title: isAr ? "نقل كبار الشخصيات" : "VIP Transportation", desc: isAr ? "خدمة فاخرة مميزة" : "Premium luxury service" },
    { id: "corporate", icon: Building, title: isAr ? "نقل الشركات" : "Corporate", desc: isAr ? "للاجتماعات والأعمال" : "For meetings and business" },
    { id: "group", icon: Users, title: isAr ? "نقل المجموعات" : "Group Transfer", desc: isAr ? "للعائلات الكبيرة" : "For large families & groups" },
    { id: "event", icon: Calendar, title: isAr ? "نقل الفعاليات" : "Event Transportation", desc: isAr ? "للمناسبات الخاصة" : "For special occasions" },
    { id: "multi-city", icon: MapPin, title: isAr ? "مدن متعددة" : "Multi-City", desc: isAr ? "نقل بين مدن المملكة" : "Transfer between cities" },
  ];

  const handleSelect = (id: string) => {
    updateState({ tripType: id as TripType });
    // Automatically advance to the next step after a brief delay for better UX
    setTimeout(() => {
      nextStep();
    }, 300);
  };

  return (
    <div className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-[#1B1E4F] mb-2">
        {isAr ? "اختر نوع الرحلة" : "Select Trip Type"}
      </h2>
      <p className="text-gray-500 mb-8">
        {isAr 
          ? "اختر نوع الخدمة التي تناسب احتياجاتك لنتمكن من تخصيص تجربتك." 
          : "Choose the type of service you need so we can tailor your experience."}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tripTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = state.tripType === type.id;
          
          return (
            <button
              key={type.id}
              onClick={() => handleSelect(type.id)}
              className={`p-6 rounded-xl border-2 text-start transition-all duration-300 flex flex-col gap-4 group
                ${isSelected 
                  ? 'border-[#D9A63A] bg-[#D9A63A]/5 shadow-md' 
                  : 'border-gray-100 hover:border-[#D9A63A]/50 hover:bg-gray-50'}`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors
                ${isSelected ? 'bg-[#D9A63A] text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-[#D9A63A]/20 group-hover:text-[#D9A63A]'}`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className={`font-bold text-lg mb-1 ${isSelected ? 'text-[#1B1E4F]' : 'text-gray-700'}`}>
                  {type.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {type.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-10 flex justify-end">
        <button
          onClick={nextStep}
          className="bg-[#1B1E4F] text-white hover:bg-[#D9A63A] hover:text-[#1B1E4F] px-8 py-3 rounded-lg font-bold transition-all flex items-center gap-2 group shadow-lg"
        >
          <span>{isAr ? "الاستمرار" : "Continue"}</span>
          <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
