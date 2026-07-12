"use client";

import { useLocale } from "next-intl";
import { Banknote, ShieldCheck } from "lucide-react";

export function PaymentSection() {
  const isAr = useLocale() === "ar";

  return (
    <div className="bg-background rounded-[var(--radius-card)] shadow-[var(--shadow-luxury)] border border-border p-6 sm:p-8">
      <h2 className="text-xl font-bold text-primary mb-6">
        {isAr ? "طريقة الدفع" : "Payment Method"}
      </h2>

      <div className="relative overflow-hidden bg-primary rounded-2xl p-6 border border-primary/10">
        {/* Decorative background element */}
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-primary-foreground/5 rounded-full blur-2xl" />
        
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center shrink-0">
            <Banknote className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary-foreground mb-1">
              {isAr ? "الدفع نقداً بعد الرحلة" : "Cash / Card after the ride"}
            </h3>
            <p className="text-sm text-primary-foreground/60 mb-4 leading-relaxed max-w-md">
              {isAr 
                ? "لا حاجة للدفع الآن. يمكنك الدفع نقداً أو باستخدام البطاقة للسائق بعد الوصول إلى وجهتك بأمان."
                : "No payment required now. You can pay with cash or card directly to your chauffeur upon safe arrival at your destination."}
            </p>
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              {isAr ? "حجز مؤكد وبدون رسوم إلغاء" : "Guaranteed booking. No cancellation fees."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
