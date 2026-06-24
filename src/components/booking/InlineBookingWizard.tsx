"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import { ChevronUp, ArrowRight, ArrowLeft } from 'lucide-react';

import TripDetailsStep from './steps/TripDetailsStep';
import VehicleSelectionStep from './steps/VehicleSelectionStep';
import PassengerInfoStep from './steps/PassengerInfoStep';
import ReviewBookingStep from './steps/ReviewBookingStep';
import BookingSuccessView from './steps/BookingSuccessView';

interface InlineBookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
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

export default function InlineBookingWizard({ isOpen, onClose }: InlineBookingWizardProps) {
  const locale = useLocale();
  const isAr = locale === 'ar';
  
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingState>(initialBookingState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState<string | null>(null);

  const [routes, setRoutes] = useState<any[]>([]);
  const [isLoadingRoutes, setIsLoadingRoutes] = useState(true);
  
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Smooth scroll into view when opened
  useEffect(() => {
    if (isOpen && containerRef.current) {
      setTimeout(() => {
        containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [isOpen]);

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

  const handleClose = () => {
    if (step === 5) {
      setStep(1);
      setBookingData(initialBookingState);
      setBookingRef(null);
    }
    onClose();
  };

  const totalSteps = 4;
  const ArrowNext = isAr ? ArrowLeft : ArrowRight;
  const ArrowPrev = isAr ? ArrowRight : ArrowLeft;

  const stepLabels = isAr 
    ? ["التفاصيل", "المركبة", "الركاب", "المراجعة"] 
    : ["Trip Details", "Vehicle", "Passenger Info", "Review"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full bg-[#050505] border-b border-white/5 overflow-hidden"
        >
          <div className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12">
            
            {/* Header Area */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {step === 5 ? (isAr ? "تم تأكيد حجزك" : "Booking Confirmed") : (isAr ? "أكمل حجزك" : "Complete Your Booking")}
                </h2>
                {step < 5 && (
                  <p className="text-gray-400">
                    {isAr ? "يرجى ملء التفاصيل أدناه لضمان رحلة سلسة." : "Please fill in the details below to ensure a seamless journey."}
                  </p>
                )}
              </div>
              <button
                onClick={handleClose}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 text-white transition-colors text-sm font-medium"
              >
                <span>{isAr ? "إغلاق" : "Close"}</span>
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>

            {/* Premium Text Stepper */}
            {step < 5 && (
              <div className="flex items-center justify-between mb-10 overflow-x-auto hide-scrollbar pb-2">
                {stepLabels.map((label, index) => {
                  const stepNumber = index + 1;
                  const isActive = step === stepNumber;
                  const isPast = step > stepNumber;
                  return (
                    <div key={label} className="flex items-center min-w-max mr-8 last:mr-0">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold mr-3 transition-colors ${isActive ? 'bg-[#D9A63A] text-black' : isPast ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-500'}`}>
                        {stepNumber}
                      </div>
                      <span className={`text-sm font-medium transition-colors ${isActive ? 'text-white' : isPast ? 'text-gray-300' : 'text-gray-600'}`}>
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Content Body */}
            <div className="min-h-[400px]">
              {step === 1 && <TripDetailsStep data={bookingData} updateData={updateData} routes={routes} isLoading={isLoadingRoutes} />}
              {step === 2 && <VehicleSelectionStep data={bookingData} updateData={updateData} routes={routes} />}
              {step === 3 && <PassengerInfoStep data={bookingData} updateData={updateData} />}
              {step === 4 && <ReviewBookingStep data={bookingData} />}
              {step === 5 && <BookingSuccessView bookingRef={bookingRef} onClose={handleClose} />}
            </div>

            {/* Footer Actions */}
            {step < 5 && (
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-8 gap-6 sticky bottom-0 bg-[#050505]/90 backdrop-blur-md z-20 py-4 sm:static sm:bg-transparent sm:backdrop-blur-none sm:py-0">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  {step > 1 && (
                    <button
                      onClick={handleBack}
                      className="p-3 rounded-full border border-white/10 hover:bg-white/10 text-white transition-colors"
                    >
                      <ArrowPrev className="w-5 h-5" />
                    </button>
                  )}
                  {bookingData.totalPrice > 0 && (
                    <div className="ml-auto sm:ml-0 flex flex-col">
                      <span className="text-gray-400 text-xs uppercase tracking-wider">{isAr ? "الإجمالي" : "Total"}</span>
                      <span className="text-2xl font-bold text-[#D9A63A]">{bookingData.totalPrice} SAR</span>
                    </div>
                  )}
                </div>
                
                <button
                  disabled={!isStepValid() || isSubmitting}
                  onClick={step === 4 ? handleSubmit : handleNext}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#D9A63A] text-black px-10 py-4 rounded-xl font-bold hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    isAr ? "جاري التأكيد..." : "Confirming..."
                  ) : step === 4 ? (
                    isAr ? "تأكيد الحجز" : "Confirm Booking"
                  ) : (
                    <>
                      <span>{isAr ? "الاستمرار" : "Continue"}</span>
                      <ArrowNext className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            )}
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
