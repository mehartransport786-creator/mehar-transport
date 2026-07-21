"use client";

import { useLocale } from "next-intl";
import { CheckCircle2, ShieldCheck, Copy, Download, Printer, Car, Users, Calendar, MapPin, Check, MessageCircle, ArrowRight, Wallet } from "lucide-react";
import { useBookingV2 } from "./context/BookingV2Context";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function BookingConfirmation() {
  const { state, updateState } = useBookingV2();
  const isAr = useLocale() === "ar";
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (state.bookingId) {
      navigator.clipboard.writeText(state.bookingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleNewBooking = () => {
    window.location.reload();
  };

  // Safe fallbacks if data is missing
  const bookingId = state.bookingId || "MHT-PENDING";
  
  return (
    <div className="bg-background rounded-3xl shadow-[var(--shadow-luxury)] border border-border overflow-hidden w-full max-w-4xl mx-auto my-8">
      {/* Header Area */}
      <div className="bg-primary p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 ring-8 ring-emerald-500/10">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            {isAr ? "تم تأكيد الحجز بنجاح" : "Booking Confirmed Successfully"}
          </h2>
          <p className="text-primary-foreground/70 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
            {isAr 
              ? "تم استلام حجزك وهو قيد المعالجة من قبل فريقنا. شكرًا لاختيارك مهر للسفر." 
              : "Your booking has been received and is being processed by our team. Thank you for choosing Mehar Transport."}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 md:p-10">
        
        {/* Booking Reference Box */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-muted rounded-[var(--radius-card)] p-6 border border-border mb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-background rounded-xl shadow-sm border border-border flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                {isAr ? "رقم الحجز" : "Booking Reference"}
              </div>
              <div className="text-2xl md:text-3xl font-black text-primary tracking-tight">
                {bookingId}
              </div>
            </div>
          </div>
          <button 
            onClick={handleCopy}
            className="flex items-center gap-2 bg-background border border-border px-5 py-2.5 rounded-[var(--radius-btn)] text-sm font-semibold text-primary hover:bg-muted transition-colors shrink-0 w-full md:w-auto justify-center"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            {copied ? (isAr ? "تم النسخ" : "Copied!") : (isAr ? "نسخ الرقم" : "Copy Reference")}
          </button>
        </div>

        {/* Booking Status */}
        <div className="flex items-center justify-center gap-3 mb-10 bg-emerald-50 text-emerald-700 py-3 rounded-xl font-medium border border-emerald-100">
          <CheckCircle2 className="w-5 h-5" />
          {isAr ? "الحالة الحالية: بانتظار التأكيد" : "Current Status: Awaiting Confirmation"}
        </div>

        {/* Two Column Summary Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          
          {/* Left Column: Journey & Passenger */}
          <div className="space-y-8">
            {/* Journey Details */}
            <section>
              <h3 className="text-lg font-bold text-primary mb-4 border-b border-border pb-2">
                {isAr ? "تفاصيل الرحلة" : "Journey Details"}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground/60 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">{isAr ? "المسار" : "Route"}</div>
                    <div className="font-semibold text-sm text-foreground">
                      {state.serviceType === "transfer" 
                        ? (state.routeName || (isAr ? "مسار مخصص" : "Custom Route"))
                        : (state.pickupLocation || (isAr ? "وجهة مخصصة" : "Custom Location"))}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground/60 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">{isAr ? "تاريخ ووقت الرحلة" : "Date & Time"}</div>
                    <div className="font-semibold text-sm text-foreground">
                      {state.travelDate} {isAr ? "في" : "at"} {state.travelTime}
                      {state.serviceType === "hourly" && ` • ${state.durationHours} ${isAr ? "ساعات" : "hours"}`}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Passenger Information */}
            <section>
              <h3 className="text-lg font-bold text-primary mb-4 border-b border-border pb-2">
                {isAr ? "معلومات المسافر" : "Passenger Information"}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-muted-foreground/60 shrink-0 mt-0.5" />
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3 w-full">
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">{isAr ? "الاسم" : "Name"}</div>
                      <div className="font-semibold text-sm text-foreground">{state.passengerInfo.name}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">{isAr ? "رقم الجوال" : "Mobile"}</div>
                      <div className="font-semibold text-sm text-foreground" dir="ltr">{state.passengerInfo.phone}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-xs text-muted-foreground mb-0.5">{isAr ? "البريد الإلكتروني" : "Email Address"}</div>
                      <div className="font-semibold text-sm text-foreground">{state.passengerInfo.email}</div>
                    </div>
                    {state.passengerInfo.flightNumber && (
                      <div className="col-span-2">
                        <div className="text-xs text-muted-foreground mb-0.5">{isAr ? "رقم الرحلة" : "Flight Number"}</div>
                        <div className="font-semibold text-sm text-foreground">{state.passengerInfo.flightNumber}</div>
                      </div>
                    )}
                    {state.passengerInfo.specialRequests && (
                      <div className="col-span-2">
                        <div className="text-xs text-muted-foreground mb-0.5">{isAr ? "طلبات خاصة" : "Special Requests"}</div>
                        <div className="font-semibold text-sm text-foreground">{state.passengerInfo.specialRequests}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Vehicle & Payment */}
          <div className="space-y-8">
            {/* Vehicle Details */}
            <section>
              <h3 className="text-lg font-bold text-primary mb-4 border-b border-border pb-2">
                {isAr ? "المركبة" : "Vehicle"}
              </h3>
              <div className="flex items-center gap-4 bg-muted/50 p-4 rounded-[var(--radius-card)] border border-border">
                <div className="w-16 h-12 relative bg-background rounded-[var(--radius-card)] border border-border overflow-hidden shrink-0 flex items-center justify-center p-1">
                  {state.selectedVehicle?.image ? (
                    <img src={state.selectedVehicle.image} alt="Vehicle" className="object-contain max-h-full max-w-full" />
                  ) : (
                    <Car className="w-6 h-6 text-muted-foreground/30" />
                  )}
                </div>
                <div>
                  <div className="font-bold text-sm text-primary">
                    {state.selectedVehicle?.vehicleName || "Standard Vehicle"}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {state.passengerCount} {isAr ? "ركاب" : "Passengers"}
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Summary */}
            <section>
              <h3 className="text-lg font-bold text-primary mb-4 border-b border-border pb-2">
                {isAr ? "ملخص الدفع" : "Payment Summary"}
              </h3>
              <div className="space-y-3 bg-muted/50 p-5 rounded-[var(--radius-card)] border border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{isAr ? "السعر الأساسي" : "Base Fare"}</span>
                  <span className="font-medium">{state.pricing.basePrice.toFixed(0)} SAR</span>
                </div>
                
                {state.pricing.adjustments.map((adj, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{adj.name}</span>
                    <span className="font-medium text-secondary">+{adj.amount.toFixed(0)} SAR</span>
                  </div>
                ))}
                
                <div className="pt-3 mt-3 border-t border-border flex justify-between items-center">
                  <span className="font-bold text-primary">{isAr ? "الإجمالي" : "Total Amount"}</span>
                  <span className="text-xl font-black text-primary">{state.pricing.totalPrice.toFixed(0)} SAR</span>
                </div>
                
                <div className="pt-3 mt-1 flex items-center gap-2 text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100">
                  <Wallet className="w-4 h-4 shrink-0" />
                  {isAr ? "طريقة الدفع: نقداً بعد الرحلة" : "Payment: Cash / Card after ride"}
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* What Happens Next? */}
        <div className="bg-primary/5 rounded-[var(--radius-card)] p-6 md:p-8 mb-10 border border-primary/10">
          <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-secondary" />
            {isAr ? "ماذا بعد؟" : "What Happens Next?"}
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-foreground">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
              {isAr ? "تم استلام حجزك بشكل آمن." : "Your booking has been securely received."}
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
              {isAr ? "سيقوم فريق العمليات بمراجعة حجزك." : "Our operations team will review your reservation."}
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
              {isAr ? "سيتم مشاركة تفاصيل السائق قبل موعد الاستلام." : "Your chauffeur details will be shared before pickup."}
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
              {isAr ? "سنتابع حالة رحلة الطيران إن وجدت." : "We will monitor your flight status if applicable."}
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-border">
          <button 
            onClick={() => router.push('/')}
            className="w-full sm:w-auto px-8 py-3.5 bg-primary text-primary-foreground rounded-[var(--radius-btn)] font-bold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
          >
            {isAr ? "العودة للرئيسية" : "Return to Home"}
            <ArrowRight className="w-4 h-4 rtl:-scale-x-100" />
          </button>
          
          <button 
            onClick={handleNewBooking}
            className="w-full sm:w-auto px-8 py-3.5 bg-background text-primary border-2 border-border rounded-[var(--radius-btn)] font-bold text-sm hover:bg-muted hover:border-primary/20 transition-all flex items-center justify-center gap-2"
          >
            {isAr ? "حجز جديد" : "Make Another Booking"}
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto mt-4 sm:mt-0 sm:ml-auto rtl:sm:mr-auto">
            <button 
              onClick={() => alert(isAr ? "جاري تنزيل ملف PDF..." : "Downloading PDF...")} 
              className="p-3 text-muted-foreground hover:text-primary hover:bg-muted rounded-[var(--radius-btn)] transition-all" 
              title={isAr ? "تحميل PDF" : "Download PDF"}
            >
              <Download className="w-5 h-5" />
            </button>
            <button onClick={handlePrint} className="p-3 text-muted-foreground hover:text-primary hover:bg-muted rounded-[var(--radius-btn)] transition-all" title={isAr ? "طباعة" : "Print"}>
              <Printer className="w-5 h-5" />
            </button>
            <a 
              href={`https://wa.me/966548707332?text=Hello, my booking reference is ${bookingId}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all" 
              title={isAr ? "تواصل عبر واتساب" : "Contact via WhatsApp"}
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
