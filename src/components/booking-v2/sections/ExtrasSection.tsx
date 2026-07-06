"use client";

import { useLocale } from "next-intl";
import { Sparkles, Baby, Check } from "lucide-react";
import { useBookingV2 } from "../context/BookingV2Context";

export function ExtrasSection() {
  const { state, updateExtras } = useBookingV2();
  const isAr = useLocale() === "ar";

  const extrasConfig = [
    {
      id: "childSeat",
      icon: Baby,
      title: isAr ? "مقعد أطفال" : "Child Seat",
      desc: isAr ? "مقعد أطفال آمن ومعقم (من 1-4 سنوات)" : "Sanitized ISOFIX child seat (1-4 years)",
      price: 50,
      active: state.extras.childSeat
    }
  ];

  const handleToggle = (id: string, currentVal: boolean) => {
    updateExtras({ [id]: !currentVal });
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-5 h-5 text-[#D9A63A]" />
        <h2 className="text-xl font-bold text-[#1B1E4F]">
          {isAr ? "خدمات إضافية" : "Enhance Your Journey"}
        </h2>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        {isAr ? "أضف لمسة من الفخامة والراحة لرحلتك" : "Add these optional extras for a truly premium experience."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {extrasConfig.map((extra) => {
          const Icon = extra.icon;
          return (
            <div
              key={extra.id}
              onClick={() => handleToggle(extra.id, extra.active)}
              className={`relative flex flex-col p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                extra.active 
                  ? 'border-[#D9A63A] bg-[#D9A63A]/5 shadow-md' 
                  : 'border-gray-100 bg-white hover:border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${extra.active ? 'bg-[#D9A63A] text-white' : 'bg-gray-100 text-gray-500'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${extra.active ? 'border-[#D9A63A] bg-[#D9A63A]' : 'border-gray-200'}`}>
                  {extra.active && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
              </div>
              
              <h3 className={`font-bold text-sm mb-1 ${extra.active ? 'text-[#1B1E4F]' : 'text-gray-700'}`}>
                {extra.title}
              </h3>
              <p className="text-xs text-gray-500 mb-3 flex-1 leading-relaxed">
                {extra.desc}
              </p>
              
              <div className={`text-sm font-black mt-auto tabular-nums ${extra.active ? 'text-[#D9A63A]' : 'text-gray-400'}`}>
                +{extra.price} SAR
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
