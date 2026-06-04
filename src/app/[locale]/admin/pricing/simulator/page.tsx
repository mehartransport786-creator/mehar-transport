"use client";

import { useState } from "react";
import { Calculator, Map, Car, CalendarDays, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";

export default function PricingSimulatorPage() {
  const locale = useLocale();
  const isAr = locale === "ar";
  
  const [result, setResult] = useState<any>(null);

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock simulation result
    setResult({
      basePrice: 850,
      adjustments: [
        { name: isAr ? "موسم الحج" : "Hajj Season", amount: 340, isPercentage: true, value: 40 }
      ],
      finalPriceBeforeTax: 1190,
      taxAmount: 178.5,
      totalIncludingTax: 1368.5
    });
  };

  return (
    <div className="p-8">
      <div className="mb-8 border-b border-gray-100 pb-6">
        <h2 className="text-2xl font-bold text-[#1B1E4F] flex items-center gap-2">
          <Calculator className="w-6 h-6 text-[#D9A63A]" />
          {isAr ? "محاكي التسعير" : "Pricing Simulator"}
        </h2>
        <p className="text-gray-500 mt-1">
          {isAr ? "اختبر حسابات الأسعار للعملاء قبل تطبيقها عبر إدخال المتغيرات." : "Test what customers will see before making rules live."}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <form onSubmit={handleSimulate} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="font-bold text-gray-800 border-b border-gray-100 pb-4">{isAr ? "معايير المحاكاة" : "Simulation Parameters"}</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Map className="w-4 h-4 text-gray-400" /> {isAr ? "المسار" : "Route"}
                </label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#D9A63A]">
                  <option value="">{isAr ? "مطار جدة → مكة المكرمة" : "Jeddah Airport → Makkah"}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Car className="w-4 h-4 text-gray-400" /> {isAr ? "المركبة" : "Vehicle"}
                </label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#D9A63A]">
                  <option value="">{isAr ? "تويوتا كوستر (VIP)" : "Toyota Coaster (VIP)"}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-gray-400" /> {isAr ? "تاريخ الرحلة" : "Travel Date"}
                </label>
                <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#D9A63A]" />
              </div>
            </div>

            <button type="submit" className="w-full bg-[#1B1E4F] hover:bg-[#2a2f6b] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-[#1B1E4F]/20 flex items-center justify-center gap-2">
              <Calculator className="w-5 h-5" />
              {isAr ? "تشغيل المحاكي" : "Run Simulation"}
            </button>
          </form>
        </div>

        <div className="w-full lg:w-1/2">
          {result ? (
            <div className="bg-[#1B1E4F] text-white rounded-2xl p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-[#D9A63A] blur-[120px] opacity-20 rounded-full"></div>
              
              <h3 className="font-bold text-xl text-white mb-6 border-b border-white/10 pb-4 relative z-10">
                {isAr ? "تفصيل السعر النهائي" : "Final Fare Breakdown"}
              </h3>
              
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">{isAr ? "السعر الأساسي" : "Base Fare"}</span>
                  <span className="font-semibold">{result.basePrice} SAR</span>
                </div>
                
                {result.adjustments.map((adj: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-emerald-400 flex items-center gap-2">
                      <ArrowRight className="w-3 h-3" /> {adj.name} (+{adj.value}%)
                    </span>
                    <span className="font-semibold text-emerald-400">+{adj.amount} SAR</span>
                  </div>
                ))}
                
                <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                  <span className="text-blue-200">{isAr ? "المجموع الفرعي" : "Subtotal"}</span>
                  <span className="font-semibold">{result.finalPriceBeforeTax} SAR</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">{isAr ? "ضريبة القيمة المضافة (15%)" : "VAT (15%)"}</span>
                  <span className="font-semibold">{result.taxAmount} SAR</span>
                </div>
                
                <div className="border-t border-[#D9A63A]/50 pt-4 mt-2 flex justify-between items-end">
                  <span className="text-lg font-bold text-[#D9A63A]">{isAr ? "الإجمالي المستحق" : "Total Payable"}</span>
                  <span className="text-3xl font-black text-[#D9A63A]">{result.totalIncludingTax} <span className="text-lg">SAR</span></span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-10 text-center bg-gray-50/50">
              <Calculator className="w-12 h-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-bold text-gray-500 mb-2">{isAr ? "في انتظار المعطيات" : "Awaiting Input"}</h3>
              <p className="text-sm text-gray-400">
                {isAr ? "أدخل المعايير واضغط تشغيل المحاكي لرؤية التفصيل." : "Enter parameters and run simulation to view fare breakdown."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
