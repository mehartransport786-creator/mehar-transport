"use client";

import { useLocale } from "next-intl";
import { useBooking } from "../context/BookingContext";
import { ArrowRight, ArrowLeft, Star, Coffee, Baby, Shield, Wifi, UserCheck } from "lucide-react";

export function ExtraServices() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const { state, updateState, nextStep, prevStep, calculatePricing } = useBooking();
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const extraServicesList = [
    { id: "meet-greet", icon: UserCheck, price: 150, title: isAr ? "استقبال وترحيب بالمطار" : "Airport Meet & Greet", desc: isAr ? "استقبال بلوحة اسم عند البوابة" : "Name-board greeting at arrivals" },
    { id: "fast-track", icon: Star, price: 250, title: isAr ? "المسار السريع" : "Fast Track Service", desc: isAr ? "أولوية العبور في المطار" : "Priority airport clearance" },
    { id: "child-seat", icon: Baby, price: 50, title: isAr ? "كرسي أطفال" : "Child Seat", desc: isAr ? "مقعد آمن للأطفال" : "Safe seating for children" },
    { id: "refreshments", icon: Coffee, price: 100, title: isAr ? "ضيافة فاخرة" : "Luxury Refreshments", desc: isAr ? "مياه، عصائر، وقهوة" : "Water, juices, and coffee" },
    { id: "wifi", icon: Wifi, price: 50, title: isAr ? "إنترنت 5G" : "5G Wi-Fi", desc: isAr ? "إنترنت عالي السرعة في المركبة" : "High-speed internet in vehicle" },
    { id: "security", icon: Shield, price: 500, title: isAr ? "مرافقة أمنية" : "Security Escort", desc: isAr ? "حماية إضافية لكبار الشخصيات" : "Extra protection for VIPs" },
  ];

  const toggleExtra = (id: string) => {
    const isSelected = state.extras.includes(id);
    let newExtras = [];
    if (isSelected) {
      newExtras = state.extras.filter(e => e !== id);
    } else {
      newExtras = [...state.extras, id];
    }
    updateState({ extras: newExtras });
  };

  return (
    <div className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-[#1B1E4F] mb-2">
        {isAr ? "الخدمات الإضافية" : "Extra Services"}
      </h2>
      <p className="text-gray-500 mb-8">
        {isAr 
          ? "ارتقِ بتجربة سفرك مع خدماتنا الإضافية المصممة لراحتك." 
          : "Elevate your travel experience with our premium add-on services."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {extraServicesList.map((service) => {
          const Icon = service.icon;
          const isSelected = state.extras.includes(service.id);
          
          return (
            <button
              key={service.id}
              onClick={() => toggleExtra(service.id)}
              className={`p-4 rounded-xl border-2 text-start transition-all duration-300 flex items-center justify-between group
                ${isSelected 
                  ? 'border-[#D9A63A] bg-[#D9A63A]/5 shadow-md' 
                  : 'border-gray-100 hover:border-[#D9A63A]/50 hover:bg-gray-50'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors
                  ${isSelected ? 'bg-[#D9A63A] text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-[#D9A63A]/20 group-hover:text-[#D9A63A]'}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`font-bold text-sm mb-1 ${isSelected ? 'text-[#1B1E4F]' : 'text-gray-700'}`}>
                    {service.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {service.desc}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-black text-lg ${isSelected ? 'text-[#D9A63A]' : 'text-gray-400'}`}>
                  +{service.price}
                </div>
                <div className="text-[10px] text-gray-400 uppercase">SAR</div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-10 flex justify-between pt-6 border-t border-gray-100">
        <button onClick={prevStep} className="px-6 py-3 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-colors">
          {isAr ? "رجوع" : "Back"}
        </button>
        <button 
          onClick={() => {
            calculatePricing();
            nextStep();
          }} 
          className="bg-[#1B1E4F] text-white hover:bg-[#D9A63A] hover:text-[#1B1E4F] px-8 py-3 rounded-lg font-bold transition-all flex items-center gap-2 group shadow-lg"
        >
          <span>{isAr ? "مراجعة الرحلة" : "Review Journey"}</span>
          <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
