"use client";

import { useBooking, BookingProvider } from "./context/BookingContext";
import { motion, AnimatePresence } from "framer-motion";
import { Check, MapPin, Car, FileText, CheckCircle2, ShieldCheck, Clock, Headset, Star } from "lucide-react";

import { Step1RouteSelection } from "./steps/Step1RouteSelection";
import { Step2VehicleSelection } from "./steps/Step2VehicleSelection";
import { Step3TravelDetails } from "./steps/Step3TravelDetails";
import { Step4ReviewAndConfirm } from "./steps/Step4ReviewAndConfirm";
import { StickyBookingSummary } from "./layout/StickyBookingSummary";
import { BookingFAQ } from "./layout/BookingFAQ";

/* ─── Step Definition ─── */
const STEPS = [
  { num: 1, label: "Route", icon: MapPin },
  { num: 2, label: "Vehicle", icon: Car },
  { num: 3, label: "Details", icon: FileText },
  { num: 4, label: "Confirm", icon: CheckCircle2 },
];

/* ─── Progress Bar ─── */
function ProgressBar() {
  const { state, setStep } = useBooking();

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
      <div className="flex items-center justify-between relative">
        {/* Connection Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-100 z-0 mx-12 sm:mx-16" />
        <div
          className="absolute top-5 left-0 h-0.5 bg-secondary z-0 transition-all duration-700 ease-out mx-12 sm:mx-16"
          style={{ width: `${((state.currentStep - 1) / (STEPS.length - 1)) * 100}%`, maxWidth: 'calc(100% - 6rem)' }}
        />

        {STEPS.map((step) => {
          const isActive = state.currentStep === step.num;
          const isCompleted = state.completedSteps.includes(step.num) || state.currentStep > step.num;
          const isClickable = isCompleted || step.num <= state.currentStep;
          const Icon = step.icon;

          return (
            <button
              key={step.num}
              onClick={() => isClickable && setStep(step.num)}
              disabled={!isClickable}
              className="flex flex-col items-center gap-2 relative z-10 group disabled:cursor-default"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-110'
                  : isCompleted
                    ? 'bg-secondary text-white shadow-md shadow-secondary/20'
                    : 'bg-gray-100 text-gray-400'
              }`}>
                {isCompleted && !isActive ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              </div>
              <span className={`text-xs font-semibold transition-colors ${
                isActive ? 'text-primary' : isCompleted ? 'text-secondary' : 'text-gray-400'
              }`}>
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Collapsed Step Header ─── */
function CollapsedStep({ stepNum, title, subtitle, onEdit }: {
  stepNum: number; title: string; subtitle?: string; onEdit: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-5 sm:p-6 flex items-center justify-between cursor-pointer hover:bg-muted transition-colors"
      onClick={onEdit}
    >
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-xl bg-secondary text-white flex items-center justify-center shadow-sm">
          <Check className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base font-bold text-primary">{title}</h3>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <button className="text-secondary text-sm font-semibold hover:underline shrink-0">Edit</button>
    </motion.div>
  );
}

/* ─── Main Engine ─── */
function BookingEngineContent() {
  const { state, setStep } = useBooking();

  // Build subtitle strings for collapsed steps
  const routeSubtitle = state.selectedRoutes.filter(Boolean).map((r: any) => `${r.origin} → ${r.destination}`).join(" · ") || "";
  const vehicleSubtitle = state.vehicles.map(v => `${v.quantity}× ${v.vehicleName}`).join(", ") || "";
  const detailsSubtitle = state.passengerInfo.name
    ? `${state.passengerInfo.name} · ${state.dates.pickupDate} at ${state.dates.pickupTime}`
    : "";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="relative bg-primary overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-secondary/5 rounded-full blur-2xl" />
        </div>

        <div className="relative container mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-secondary px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
              <ShieldCheck className="w-4 h-4" />
              Premium Booking Experience
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-3 tracking-tight">
              Book Your Journey
            </h1>
            <p className="text-base sm:text-lg text-white/50 max-w-xl mx-auto">
              Premium chauffeur-driven transportation across Saudi Arabia. Fixed pricing, professional drivers, luxury vehicles.
            </p>
          </motion.div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-8 text-white/40 text-xs sm:text-sm"
          >
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-secondary" /> 24/7 Service</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-secondary" /> Licensed Drivers</span>
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-secondary" /> 4.9★ Google Rating</span>
            <span className="flex items-center gap-1.5"><Headset className="w-4 h-4 text-secondary" /> Instant Confirmation</span>
          </motion.div>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px] -mt-6 relative z-10 pb-24">
        {/* Progress Bar */}
        <div className="mb-6">
          <ProgressBar />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Steps Column */}
          <div className="flex-1 lg:w-2/3 space-y-4">
            {/* Step 1 */}
            <div id="booking-step-1">
              <motion.div
                layout
                className={`bg-white rounded-2xl overflow-hidden transition-all duration-500 border ${
                  state.currentStep === 1
                    ? 'border-secondary/40 shadow-[0_8px_30px_rgb(0,0,0,0.06)]'
                    : state.completedSteps.includes(1) || state.currentStep > 1
                      ? 'border-gray-100 shadow-sm'
                      : 'border-gray-100 shadow-sm opacity-60'
                }`}
              >
                {state.currentStep === 1 ? (
                  <Step1RouteSelection />
                ) : (state.completedSteps.includes(1) || state.currentStep > 1) ? (
                  <CollapsedStep stepNum={1} title="Route Selected" subtitle={routeSubtitle} onEdit={() => setStep(1)} />
                ) : null}
              </motion.div>
            </div>

            {/* Step 2 */}
            {state.currentStep >= 2 && (
              <div id="booking-step-2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  layout
                  className={`bg-white rounded-2xl overflow-hidden transition-all duration-500 border ${
                    state.currentStep === 2
                      ? 'border-secondary/40 shadow-[0_8px_30px_rgb(0,0,0,0.06)]'
                      : state.completedSteps.includes(2) || state.currentStep > 2
                        ? 'border-gray-100 shadow-sm'
                        : 'border-gray-100 shadow-sm opacity-60'
                  }`}
                >
                  {state.currentStep === 2 ? (
                    <Step2VehicleSelection />
                  ) : (state.completedSteps.includes(2) || state.currentStep > 2) ? (
                    <CollapsedStep stepNum={2} title="Vehicles Selected" subtitle={vehicleSubtitle} onEdit={() => setStep(2)} />
                  ) : null}
                </motion.div>
              </div>
            )}

            {/* Step 3 */}
            {state.currentStep >= 3 && (
              <div id="booking-step-3">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  layout
                  className={`bg-white rounded-2xl overflow-hidden transition-all duration-500 border ${
                    state.currentStep === 3
                      ? 'border-secondary/40 shadow-[0_8px_30px_rgb(0,0,0,0.06)]'
                      : state.completedSteps.includes(3) || state.currentStep > 3
                        ? 'border-gray-100 shadow-sm'
                        : 'border-gray-100 shadow-sm opacity-60'
                  }`}
                >
                  {state.currentStep === 3 ? (
                    <Step3TravelDetails />
                  ) : (state.completedSteps.includes(3) || state.currentStep > 3) ? (
                    <CollapsedStep stepNum={3} title="Travel Details Completed" subtitle={detailsSubtitle} onEdit={() => setStep(3)} />
                  ) : null}
                </motion.div>
              </div>
            )}

            {/* Step 4 */}
            {state.currentStep >= 4 && (
              <div id="booking-step-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="bg-white rounded-2xl overflow-hidden border border-secondary/40 shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
                >
                  <Step4ReviewAndConfirm />
                </motion.div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:w-[360px] xl:w-[400px] shrink-0">
            <StickyBookingSummary />
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <BookingFAQ />
        </div>
      </div>
    </div>
  );
}

import { Suspense } from "react";

export function BookingEngine() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading booking engine...</div>}>
      <BookingProvider>
        <BookingEngineContent />
      </BookingProvider>
    </Suspense>
  );
}
