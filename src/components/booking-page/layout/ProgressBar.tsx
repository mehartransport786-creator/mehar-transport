"use client";

import { useLocale } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import { useBooking } from "../context/BookingContext";

export function ProgressBar() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const { state } = useBooking();
  
  const currentStep = state.currentStep;
  const totalSteps = 7; // Confirm is 8, but progress bar shows 7 steps

  const steps = isAr 
    ? ["نوع الرحلة", "المسار", "المركبات", "الركاب", "الإضافات", "المراجعة", "الدفع"]
    : ["Trip Type", "Route", "Vehicles", "Passengers", "Extras", "Review", "Payment"];

  return (
    <div className="mb-8 hidden md:block">
      <div className="flex justify-between relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10 -translate-y-1/2 rounded-full"></div>
        <div 
          className="absolute top-1/2 left-0 h-1 bg-[#D9A63A] -z-10 -translate-y-1/2 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${((Math.min(currentStep, totalSteps) - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>
        
        {steps.map((s, i) => {
          const stepNumber = i + 1;
          const isCompleted = currentStep > stepNumber;
          const isActive = currentStep === stepNumber;
          
          return (
            <div key={i} className="flex flex-col items-center gap-2">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-2 shadow-sm
                ${isCompleted 
                  ? 'bg-[#D9A63A] border-[#D9A63A] text-[#1B1E4F]' 
                  : isActive 
                    ? 'bg-[#1B1E4F] border-[#1B1E4F] text-[#D9A63A]' 
                    : 'bg-white border-gray-200 text-gray-400'}`}
              >
                {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : stepNumber}
              </div>
              <span className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'text-[#1B1E4F]' : 'text-gray-400'}`}>
                {s}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
