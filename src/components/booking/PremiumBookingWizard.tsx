"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';

import TripDetailsStep from './steps/TripDetailsStep';
import VehicleSelectionStep from './steps/VehicleSelectionStep';
import PassengerInfoStep from './steps/PassengerInfoStep';
import ReviewBookingStep from './steps/ReviewBookingStep';
import BookingSuccessView from './steps/BookingSuccessView';

interface PremiumBookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface BookingState {
  // Step 1: Trip
  routeId: string;
  routeName: string;
  travelDate: string;
  travelTime: string;
  tripType: string;
  
  // Step 2: Vehicle
  vehicleId: string;
  vehicleName: string;
  basePrice: number;
  
  // Step 3: Passenger
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  flightNumber: string;
  passengers: number;
  
  // Extras
  meetAndGreet: boolean;
  vipService: boolean;
  childSeat: boolean;
  
  // Total
  totalPrice: number;
}

const initialBookingState: BookingState = {
  routeId: '',
  routeName: '',
  travelDate: '',
  travelTime: '',
  tripType: 'one-way',
  vehicleId: '',
  vehicleName: '',
  basePrice: 0,
  customerName: '',
  customerPhone: '',
  customerEmail: '',
  flightNumber: '',
  passengers: 1,
  meetAndGreet: false,
  vipService: false,
  childSeat: false,
  totalPrice: 0,
};

export default function PremiumBookingWizard({ isOpen, onClose }: PremiumBookingWizardProps) {
  const locale = useLocale();
  const isAr = locale === 'ar';
  
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingState>(initialBookingState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState<string | null>(null);

  const [routes, setRoutes] = useState<any[]>([]);
  const [isLoadingRoutes, setIsLoadingRoutes] = useState(true);

  // Fetch routes on mount
  useEffect(() => {
    async function fetchRoutes() {
      try {
        const res = await fetch('/api/pricing/routes');
        const data = await res.json();
        if (data.routes) {
          setRoutes(data.routes);
        }
      } catch (error) {
        console.error('Failed to fetch routes', error);
      } finally {
        setIsLoadingRoutes(false);
      }
    }
    fetchRoutes();
  }, []);

  // Recalculate total price when extras or base price change
  useEffect(() => {
    let extraCosts = 0;
    if (bookingData.meetAndGreet) extraCosts += 100; // Example
    if (bookingData.vipService) extraCosts += 250;
    if (bookingData.childSeat) extraCosts += 50;

    setBookingData(prev => ({
      ...prev,
      totalPrice: prev.basePrice + extraCosts
    }));
  }, [bookingData.basePrice, bookingData.meetAndGreet, bookingData.vipService, bookingData.childSeat]);

  // Lock body scroll when modal is open
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // POST to /api/bookings
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
        setStep(5); // Success step
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
    if (step === 1) {
      return bookingData.routeId && bookingData.travelDate && bookingData.travelTime;
    }
    if (step === 2) {
      return bookingData.vehicleId !== '';
    }
    if (step === 3) {
      return bookingData.customerName && bookingData.customerPhone;
    }
    return true;
  };

  // Close completely or reset
  const handleClose = () => {
    if (step === 5) {
      // If closing from success, reset the form completely
      setStep(1);
      setBookingData(initialBookingState);
      setBookingRef(null);
    }
    onClose();
  };

  const totalSteps = 4;
  const ArrowNext = isAr ? ArrowLeft : ArrowRight;
  const ArrowPrev = isAr ? ArrowRight : ArrowLeft;

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden mx-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md sticky top-0 z-10">
            <div className="flex items-center gap-4">
              {step > 1 && step < 5 && (
                <button
                  onClick={handleBack}
                  className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                >
                  <ArrowPrev className="w-5 h-5" />
                </button>
              )}
              <div>
                <h2 className="text-xl font-bold text-white">
                  {step === 5 ? (isAr ? "اكتمل الحجز" : "Booking Complete") : (isAr ? "احجز رحلتك" : "Book Your Journey")}
                </h2>
                {step < 5 && (
                  <p className="text-sm text-gray-400">
                    {isAr ? `الخطوة ${step} من ${totalSteps}` : `Step ${step} of ${totalSteps}`}
                  </p>
                )}
              </div>
            </div>
            
            <button
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          {step < 5 && (
            <div className="w-full bg-white/5 h-1">
              <motion.div
                className="h-full bg-[#D9A63A]"
                initial={{ width: 0 }}
                animate={{ width: `${(step / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 hide-scrollbar">
            {step === 1 && (
              <TripDetailsStep 
                data={bookingData} 
                updateData={updateData} 
                routes={routes} 
                isLoading={isLoadingRoutes} 
              />
            )}
            {step === 2 && (
              <VehicleSelectionStep 
                data={bookingData} 
                updateData={updateData} 
                routes={routes}
              />
            )}
            {step === 3 && (
              <PassengerInfoStep 
                data={bookingData} 
                updateData={updateData} 
              />
            )}
            {step === 4 && (
              <ReviewBookingStep 
                data={bookingData} 
              />
            )}
            {step === 5 && (
              <BookingSuccessView 
                bookingRef={bookingRef} 
                onClose={handleClose} 
              />
            )}
          </div>

          {/* Footer Actions */}
          {step < 5 && (
            <div className="p-6 border-t border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md sticky bottom-0 z-10 flex items-center justify-between">
              <div className="text-white font-medium">
                {bookingData.totalPrice > 0 && (
                  <>
                    <span className="text-gray-400 text-sm mr-2">{isAr ? "الإجمالي:" : "Total:"}</span>
                    <span className="text-xl font-bold text-[#D9A63A]">{bookingData.totalPrice} SAR</span>
                  </>
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
                    {isAr ? "التالي" : "Continue"}
                    <ArrowNext className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
