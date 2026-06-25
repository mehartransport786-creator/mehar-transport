"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useLocale } from 'next-intl';
import { ChevronLeft, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, Clock, MapPin } from 'lucide-react';

import TripDetailsStep from './steps/TripDetailsStep';
import VehicleSelectionStep from './steps/VehicleSelectionStep';
import PassengerInfoStep from './steps/PassengerInfoStep';
import ReviewBookingStep from './steps/ReviewBookingStep';
import BookingSuccessView from './steps/BookingSuccessView';

interface BookingWorkspaceProps {
  onCancel: () => void;
}

export interface BookingState {
  routeId: string;
  routeName: string;
  travelDate: string;
  travelTime: string;
  tripType: string;
  vehicleId: string;
  vehicleName: string;
  basePrice: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  flightNumber: string;
  passengers: number;
  meetAndGreet: boolean;
  vipService: boolean;
  childSeat: boolean;
  totalPrice: number;
}

const initialBookingState: BookingState = {
  routeId: '', routeName: '', travelDate: '', travelTime: '', tripType: 'one-way',
  vehicleId: '', vehicleName: '', basePrice: 0,
  customerName: '', customerPhone: '', customerEmail: '', flightNumber: '', passengers: 1,
  meetAndGreet: false, vipService: false, childSeat: false, totalPrice: 0,
};

export default function BookingWorkspace({ onCancel }: BookingWorkspaceProps) {
  const locale = useLocale();
  const isAr = locale === 'ar';
  
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingState>(initialBookingState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState<string | null>(null);

  const [routes, setRoutes] = useState<any[]>([]);
  const [isLoadingRoutes, setIsLoadingRoutes] = useState(true);
  
  useEffect(() => {
    async function fetchRoutes() {
      try {
        const res = await fetch('/api/pricing/routes');
        const data = await res.json();
        if (data.routes) setRoutes(data.routes);
      } catch (error) {
        console.error('Failed to fetch routes', error);
      } finally {
        setIsLoadingRoutes(false);
      }
    }
    fetchRoutes();
  }, []);

  useEffect(() => {
    let extraCosts = 0;
    if (bookingData.meetAndGreet) extraCosts += 100;
    if (bookingData.vipService) extraCosts += 250;
    if (bookingData.childSeat) extraCosts += 50;

    setBookingData(prev => ({
      ...prev,
      totalPrice: prev.basePrice + extraCosts
    }));
  }, [bookingData.basePrice, bookingData.meetAndGreet, bookingData.vipService, bookingData.childSeat]);

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...bookingData,
        route: bookingData.routeName,
        vehicleType: bookingData.vehicleName,
        status: 'pending',
        priority: 'standard'
      };

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const result = await res.json();
      if (result.success) {
        setBookingRef(result.data.bookingId);
        setStep(5);
      } else {
        alert(isAr ? 'فشل الحجز، يرجى المحاولة مرة أخرى.' : 'Booking failed, please try again.');
      }
    } catch (error) {
      console.error(error);
      alert(isAr ? 'حدث خطأ.' : 'An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateData = (updates: Partial<BookingState>) => {
    setBookingData(prev => ({ ...prev, ...updates }));
  };

  const isStepValid = () => {
    if (step === 1) return bookingData.routeId && bookingData.travelDate && bookingData.travelTime;
    if (step === 2) return bookingData.vehicleId !== '';
    if (step === 3) return bookingData.customerName && bookingData.customerPhone;
    return true;
  };

  const totalSteps = 4;
  const ArrowNext = isAr ? ArrowLeft : ArrowRight;
  const ArrowPrev = isAr ? ArrowRight : ArrowLeft;

  const stepLabels = isAr 
    ? ["التفاصيل", "المركبة", "الركاب", "المراجعة"] 
    : ["Trip Details", "Vehicle", "Passenger Info", "Review"];

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.4 } }
  };

  const stepVariants: Variants = {
    enter: { opacity: 0, x: isAr ? -20 : 20 },
    center: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: isAr ? 20 : -20, transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full max-w-7xl mx-auto h-[85vh] lg:h-[80vh] min-h-[600px] flex flex-col lg:flex-row bg-[#050505]/80 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden relative"
    >
      {/* Top Gold Edge */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D9A63A]/50 to-transparent z-20" />
      
      {/* Subtle background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D9A63A]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      {/* LEFT SIDE: Booking Journey Workspace (65%) */}
      <div className="w-full lg:w-[65%] flex flex-col h-full relative z-10 border-b lg:border-b-0 lg:border-r border-white/5">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-white/[0.02]">
          <button
            onClick={onCancel}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
            <span>{isAr ? "العودة" : "Back"}</span>
          </button>
          
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest text-[#D9A63A] font-bold">
              {isAr ? `الخطوة ${step} من ${totalSteps}: ${stepLabels[step - 1]}` : `Step ${step} of ${totalSteps}: ${stepLabels[step - 1]}`}
            </span>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === step ? 'w-6 bg-[#D9A63A] shadow-[0_0_8px_rgba(217,166,58,0.5)]' : 
                    i < step ? 'w-2 bg-white/40' : 'w-2 bg-white/10'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto hide-scrollbar px-6 md:px-12 py-8 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="h-full"
            >
              {step === 1 && <TripDetailsStep data={bookingData} updateData={updateData} routes={routes} isLoading={isLoadingRoutes} />}
              {step === 2 && <VehicleSelectionStep data={bookingData} updateData={updateData} routes={routes} />}
              {step === 3 && <PassengerInfoStep data={bookingData} updateData={updateData} />}
              {step === 4 && <ReviewBookingStep data={bookingData} />}
              {step === 5 && <BookingSuccessView bookingRef={bookingRef} onClose={onCancel} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        {step < 5 && (
          <div className="px-8 py-6 border-t border-white/5 bg-white/[0.02] flex items-center justify-between">
            <div>
              {step > 1 && (
                <button
                  onClick={handleBack}
                  className="px-6 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors font-medium flex items-center gap-2 group"
                >
                  <ArrowPrev className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm tracking-wide">{isAr ? "السابق" : "Previous"}</span>
                </button>
              )}
            </div>
            
            <button
              disabled={!isStepValid() || isSubmitting}
              onClick={step === 4 ? handleSubmit : handleNext}
              className="flex items-center gap-2 bg-gradient-to-r from-[#D9A63A] to-[#B8860B] text-black px-8 py-3 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(217,166,58,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none group"
            >
              {isSubmitting ? (
                <span className="text-sm tracking-wide">{isAr ? "جاري التأكيد..." : "Confirming..."}</span>
              ) : step === 4 ? (
                <span className="text-sm tracking-wide">{isAr ? "تأكيد الحجز" : "Confirm Booking"}</span>
              ) : (
                <>
                  <span className="text-sm tracking-wide">{isAr ? "التالي" : "Continue"}</span>
                  <ArrowNext className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* RIGHT SIDE: Persistent Booking Summary (35%) */}
      <div className="hidden lg:flex flex-col w-[35%] bg-black/20 p-10 relative z-10">
        
        <h3 className="text-xs tracking-[0.2em] font-bold text-gray-400 uppercase mb-8 border-b border-white/5 pb-4">
          {isAr ? "ملخص الرحلة" : "Trip Summary"}
        </h3>
        
        <div className="space-y-8 flex-1">
          {/* Route Info */}
          <div className="space-y-3">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">{isAr ? "المسار" : "Route"}</p>
            <p className="text-white text-sm font-medium flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
              <MapPin className="w-4 h-4 text-[#D9A63A]" />
              {bookingData.routeName || <span className="text-gray-500">{isAr ? "لم يتم التحديد" : "Not selected"}</span>}
            </p>
          </div>

          {/* Date & Time */}
          <div className="space-y-3">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">{isAr ? "الموعد" : "Schedule"}</p>
            <p className="text-white text-sm font-medium flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
              <Clock className="w-4 h-4 text-[#D9A63A]" />
              {bookingData.travelDate ? `${bookingData.travelDate} ${bookingData.travelTime}` : <span className="text-gray-500">{isAr ? "لم يتم التحديد" : "Not selected"}</span>}
            </p>
          </div>

          {/* Vehicle */}
          {bookingData.vehicleName && (
            <div className="space-y-3 pt-4 border-t border-white/5">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">{isAr ? "المركبة" : "Vehicle"}</p>
              <p className="text-white text-sm font-medium bg-white/5 p-4 rounded-xl border border-white/5">{bookingData.vehicleName}</p>
            </div>
          )}

          {/* Passengers & Extras */}
          {(bookingData.passengers > 1 || bookingData.meetAndGreet || bookingData.vipService || bookingData.childSeat) && (
            <div className="space-y-3 pt-4 border-t border-white/5">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">{isAr ? "إضافات" : "Extras"}</p>
              <ul className="text-gray-300 text-sm space-y-2 bg-white/5 p-4 rounded-xl border border-white/5">
                {bookingData.passengers > 1 && <li className="flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-[#D9A63A] before:rounded-full">{bookingData.passengers} {isAr ? "ركاب" : "Passengers"}</li>}
                {bookingData.meetAndGreet && <li className="flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-[#D9A63A] before:rounded-full">{isAr ? "استقبال وتوديع" : "Meet & Greet"}</li>}
                {bookingData.vipService && <li className="flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-[#D9A63A] before:rounded-full">{isAr ? "خدمة كبار الشخصيات" : "VIP Service"}</li>}
                {bookingData.childSeat && <li className="flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-[#D9A63A] before:rounded-full">{isAr ? "مقعد طفل" : "Child Seat"}</li>}
              </ul>
            </div>
          )}
        </div>

        {/* Total & Trust Indicators */}
        <div className="mt-8 pt-8 border-t border-white/5">
          <div className="flex items-center justify-between mb-8 bg-gradient-to-r from-white/5 to-transparent p-4 rounded-xl border-l-2 border-[#D9A63A]">
            <span className="text-xs uppercase tracking-widest text-gray-400">{isAr ? "الإجمالي التقديري" : "Estimated Fare"}</span>
            <span className="text-3xl font-light tracking-tight text-white">{bookingData.totalPrice} <span className="text-sm text-[#D9A63A] font-bold">SAR</span></span>
          </div>

          <div className="grid grid-cols-2 gap-y-4 gap-x-2">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-gray-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D9A63A]/70" />
              <span>{isAr ? "أسعار ثابتة" : "Fixed Pricing"}</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-gray-500">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D9A63A]/70" />
              <span>{isAr ? "حجز آمن" : "Secure Booking"}</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-gray-500">
              <Clock className="w-3.5 h-3.5 text-[#D9A63A]/70" />
              <span>{isAr ? "خدمة 24/7" : "24/7 Service"}</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-gray-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D9A63A]/70" />
              <span>{isAr ? "سائقون محترفون" : "Pro Chauffeurs"}</span>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
