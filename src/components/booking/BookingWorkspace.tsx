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
      className="w-full h-full flex flex-col lg:flex-row gap-6"
    >
      {/* LEFT SIDE: Booking Journey Workspace (65%) */}
      <div className="w-full lg:w-[65%] flex flex-col bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl h-[85vh] lg:h-full relative">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-black/20">
          <button
            onClick={onCancel}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
            <span>{isAr ? "العودة" : "Back"}</span>
          </button>
          
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {stepLabels.map((label, index) => {
              const stepNumber = index + 1;
              const isActive = step === stepNumber;
              const isPast = step > stepNumber;
              return (
                <div key={label} className="flex items-center">
                  <div className={`w-2.5 h-2.5 rounded-full transition-colors ${isActive ? 'bg-[#D9A63A] shadow-[0_0_8px_rgba(217,166,58,0.6)]' : isPast ? 'bg-white/40' : 'bg-white/10'}`} />
                  {index < stepLabels.length - 1 && (
                    <div className={`w-4 h-px mx-1 transition-colors ${isPast ? 'bg-white/40' : 'bg-white/10'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto hide-scrollbar p-6 md:p-8 relative">
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
          <div className="p-6 border-t border-white/5 bg-black/40 flex items-center justify-between">
            <div>
              {step > 1 && (
                <button
                  onClick={handleBack}
                  className="px-6 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors font-medium flex items-center gap-2"
                >
                  <ArrowPrev className="w-4 h-4" />
                  <span>{isAr ? "السابق" : "Previous"}</span>
                </button>
              )}
            </div>
            
            <button
              disabled={!isStepValid() || isSubmitting}
              onClick={step === 4 ? handleSubmit : handleNext}
              className="flex items-center gap-2 bg-[#D9A63A] text-black px-8 py-3 rounded-xl font-bold hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                isAr ? "جاري التأكيد..." : "Confirming..."
              ) : step === 4 ? (
                isAr ? "تأكيد الحجز" : "Confirm Booking"
              ) : (
                <>
                  <span>{isAr ? "التالي" : "Continue"}</span>
                  <ArrowNext className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* RIGHT SIDE: Persistent Booking Summary (35%) - Hidden on mobile, sticky on desktop */}
      <div className="hidden lg:flex flex-col w-[35%] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D9A63A]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <h3 className="text-xl font-bold text-white mb-8 border-b border-white/10 pb-4">
          {isAr ? "ملخص الرحلة" : "Trip Summary"}
        </h3>
        
        <div className="space-y-6 flex-1">
          {/* Route Info */}
          <div className="space-y-2">
            <p className="text-xs text-gray-500 uppercase tracking-widest">{isAr ? "المسار" : "Route"}</p>
            <p className="text-white font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D9A63A]" />
              {bookingData.routeName || (isAr ? "لم يتم التحديد" : "Not selected")}
            </p>
          </div>

          {/* Date & Time */}
          <div className="space-y-2">
            <p className="text-xs text-gray-500 uppercase tracking-widest">{isAr ? "الموعد" : "Schedule"}</p>
            <p className="text-white font-medium flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D9A63A]" />
              {bookingData.travelDate ? `${bookingData.travelDate} ${bookingData.travelTime}` : (isAr ? "لم يتم التحديد" : "Not selected")}
            </p>
          </div>

          {/* Vehicle */}
          {bookingData.vehicleName && (
            <div className="space-y-2 pt-4 border-t border-white/10">
              <p className="text-xs text-gray-500 uppercase tracking-widest">{isAr ? "المركبة" : "Vehicle"}</p>
              <p className="text-white font-medium">{bookingData.vehicleName}</p>
            </div>
          )}

          {/* Passengers & Extras */}
          {(bookingData.passengers > 1 || bookingData.meetAndGreet || bookingData.vipService || bookingData.childSeat) && (
            <div className="space-y-2 pt-4 border-t border-white/10">
              <p className="text-xs text-gray-500 uppercase tracking-widest">{isAr ? "إضافات" : "Extras"}</p>
              <ul className="text-gray-300 text-sm space-y-1">
                {bookingData.passengers > 1 && <li>{bookingData.passengers} {isAr ? "ركاب" : "Passengers"}</li>}
                {bookingData.meetAndGreet && <li>{isAr ? "استقبال وتوديع" : "Meet & Greet"}</li>}
                {bookingData.vipService && <li>{isAr ? "خدمة كبار الشخصيات" : "VIP Service"}</li>}
                {bookingData.childSeat && <li>{isAr ? "مقعد طفل" : "Child Seat"}</li>}
              </ul>
            </div>
          )}
        </div>

        {/* Total & Trust Indicators */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between mb-8">
            <span className="text-gray-400">{isAr ? "الإجمالي التقديري" : "Estimated Fare"}</span>
            <span className="text-3xl font-bold text-[#D9A63A]">{bookingData.totalPrice} SAR</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-[#D9A63A]" />
              <span>{isAr ? "أسعار ثابتة" : "Fixed Pricing"}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="w-4 h-4 text-[#D9A63A]" />
              <span>{isAr ? "حجز آمن" : "Secure Booking"}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Clock className="w-4 h-4 text-[#D9A63A]" />
              <span>{isAr ? "خدمة 24/7" : "24/7 Service"}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-[#D9A63A]" />
              <span>{isAr ? "سائقون محترفون" : "Pro Chauffeurs"}</span>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
