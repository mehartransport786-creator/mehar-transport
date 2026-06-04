"use client";

import { useLocale } from "next-intl";
import { useBooking } from "../context/BookingContext";
import { ArrowRight, ArrowLeft, CreditCard, Banknote, Building2, Apple, Smartphone, ShieldCheck } from "lucide-react";
import { useState } from "react";

export function PaymentCenter() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const { state, nextStep, prevStep, updateState } = useBooking();
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const paymentMethods = [
    { id: "credit-card", icon: CreditCard, title: isAr ? "بطاقة ائتمان / مدى" : "Credit Card / Mada" },
    { id: "apple-pay", icon: Apple, title: "Apple Pay" },
    { id: "stc-pay", icon: Smartphone, title: "STC Pay" },
    { id: "bank-transfer", icon: Building2, title: isAr ? "تحويل بنكي" : "Bank Transfer" },
    { id: "cash", icon: Banknote, title: isAr ? "نقداً للسائق" : "Cash to Driver" },
  ];

  const handleSelect = (id: string) => {
    updateState({ paymentMethod: id });
  };

  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Mock processing delay
    setTimeout(() => {
      setIsProcessing(false);
      nextStep();
    }, 2000);
  };

  return (
    <div className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-[#1B1E4F] mb-2 flex items-center gap-3">
        {isAr ? "بوابة الدفع الآمن" : "Secure Payment Center"}
        <ShieldCheck className="w-6 h-6 text-green-500" />
      </h2>
      <p className="text-gray-500 mb-8">
        {isAr 
          ? "جميع المعاملات مشفرة ومؤمنة بأحدث تقنيات الحماية." 
          : "All transactions are encrypted and secured with industry-leading technology."}
      </p>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            const isSelected = state.paymentMethod === method.id;
            
            return (
              <button
                key={method.id}
                onClick={() => handleSelect(method.id)}
                className={`p-4 rounded-xl border-2 text-start transition-all duration-300 flex items-center gap-4 group
                  ${isSelected 
                    ? 'border-[#D9A63A] bg-[#D9A63A]/5 shadow-md' 
                    : 'border-gray-100 hover:border-[#D9A63A]/50 hover:bg-gray-50'}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors
                  ${isSelected ? 'bg-[#D9A63A] text-white' : 'bg-gray-100 text-gray-500'}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className={`font-bold text-sm ${isSelected ? 'text-[#1B1E4F]' : 'text-gray-700'}`}>
                  {method.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Credit Card Mock Form */}
        {state.paymentMethod === 'credit-card' && (
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-6 max-w-lg">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">{isAr ? "رقم البطاقة" : "Card Number"}</label>
                <input type="text" placeholder="0000 0000 0000 0000" className="w-full mt-1 bg-white border border-gray-300 rounded-lg px-4 py-2" dir="ltr" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">{isAr ? "تاريخ الانتهاء" : "Expiry Date"}</label>
                  <input type="text" placeholder="MM/YY" className="w-full mt-1 bg-white border border-gray-300 rounded-lg px-4 py-2" dir="ltr" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">CVC</label>
                  <input type="text" placeholder="123" className="w-full mt-1 bg-white border border-gray-300 rounded-lg px-4 py-2" dir="ltr" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">{isAr ? "الاسم على البطاقة" : "Name on Card"}</label>
                <input type="text" placeholder="JOHN DOE" className="w-full mt-1 bg-white border border-gray-300 rounded-lg px-4 py-2" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-between pt-6 border-t border-gray-100">
        <button onClick={prevStep} disabled={isProcessing} className="px-6 py-3 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50">
          {isAr ? "رجوع" : "Back"}
        </button>
        <button 
          onClick={handlePayment} 
          disabled={isProcessing}
          className="bg-[#D9A63A] text-[#1B1E4F] hover:bg-[#1B1E4F] hover:text-[#D9A63A] px-8 py-3 rounded-lg font-bold transition-all flex items-center gap-2 group shadow-lg disabled:opacity-50"
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              {isAr ? "جاري المعالجة..." : "Processing..."}
            </span>
          ) : (
            <>
              <span>{isAr ? `تأكيد الدفع (${state.pricing.total} ر.س)` : `Pay ${state.pricing.total} SAR`}</span>
              <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
