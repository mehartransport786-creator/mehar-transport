"use client";

import { useBooking } from "../context/BookingContext";
import { Calendar, Clock, MapPin, Plane, Users, Globe, FileText, Phone, ArrowRight, ArrowLeft, MessageCircle, Building2 } from "lucide-react";
import { motion } from "framer-motion";

export function Step3TravelDetails() {
  const { state, updateState, prevStep, nextStep } = useBooking();

  const handleDateChange = (value: string) => {
    updateState({ dates: { ...state.dates, pickupDate: value } });
  };

  const handleTimeChange = (value: string) => {
    updateState({ dates: { ...state.dates, pickupTime: value } });
  };

  const update = (field: string, value: string | number) => {
    if (field === 'passengerCount') {
      updateState({ passengerCount: Math.max(1, Number(value)) });
    } else {
      updateState({ passengerInfo: { ...state.passengerInfo, [field]: value } });
    }
  };

  const isComplete = !!(
    state.dates.pickupDate &&
    state.dates.pickupTime &&
    state.passengerInfo.name.trim() &&
    state.passengerInfo.phone.trim() &&
    state.passengerInfo.pickupLocation.trim() &&
    state.passengerInfo.dropoffLocation.trim()
  );

  const InputField = ({ icon: Icon, label, required, ...props }: any) => (
    <div>
      <label className="flex items-center gap-1 text-sm font-semibold text-[#1B1E4F] mb-2">
        {label}
        {required && <span className="text-red-400 text-xs">*</span>}
      </label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 w-4.5 h-4.5" />
        <input
          {...props}
          className="w-full bg-[#F8F9FC] border-2 border-transparent rounded-xl py-3 pl-11 pr-4 text-sm text-[#1B1E4F] placeholder:text-gray-400 focus:ring-0 focus:border-[#D9A63A] focus:bg-white transition-all"
        />
      </div>
    </div>
  );

  return (
    <div className="p-6 sm:p-8 md:p-10 lg:p-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[#D9A63A]/10 text-[#D9A63A] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
          <FileText className="w-4 h-4" />
          Step 3 of 4
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1B1E4F] mb-2 tracking-tight">
          Travel & Passenger Details
        </h2>
        <p className="text-lg text-[#1B1E4F]/40 font-medium" dir="rtl">تفاصيل السفر والركاب</p>
      </div>

      <div className="space-y-8">
        {/* Section 1: When */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="px-6 py-4 bg-[#F8F9FC] border-b border-gray-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#1B1E4F] text-white flex items-center justify-center text-sm font-bold">1</div>
            <h3 className="font-bold text-[#1B1E4F]">When are you traveling?</h3>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InputField icon={Calendar} label="Travel Date" required type="date" value={state.dates.pickupDate} onChange={(e: any) => handleDateChange(e.target.value)} min={new Date().toISOString().split('T')[0]} />
            <InputField icon={Clock} label="Pickup Time" required type="time" value={state.dates.pickupTime} onChange={(e: any) => handleTimeChange(e.target.value)} />
          </div>
          {/* Date pricing notice */}
          <div className="px-6 pb-5">
            <div className="bg-blue-50 text-blue-700 rounded-xl px-4 py-2.5 text-xs flex items-start gap-2">
              <Calendar className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Changing the date may update pricing. Seasonal and peak period rates are applied automatically based on your selected date.</span>
            </div>
          </div>
        </motion.section>

        {/* Section 2: Where */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="px-6 py-4 bg-[#F8F9FC] border-b border-gray-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#1B1E4F] text-white flex items-center justify-center text-sm font-bold">2</div>
            <h3 className="font-bold text-[#1B1E4F]">Exact locations</h3>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InputField icon={MapPin} label="Pickup Location" required type="text" placeholder="Hotel name, terminal, lobby..." value={state.passengerInfo.pickupLocation} onChange={(e: any) => update('pickupLocation', e.target.value)} />
            <InputField icon={MapPin} label="Drop-off Location" required type="text" placeholder="Hotel name, address..." value={state.passengerInfo.dropoffLocation} onChange={(e: any) => update('dropoffLocation', e.target.value)} />
            <InputField icon={Building2} label="Hotel Name" type="text" placeholder="e.g. Hilton Suites Makkah" value={state.passengerInfo.hotelName} onChange={(e: any) => update('hotelName', e.target.value)} />
            <InputField icon={Plane} label="Flight Number" type="text" placeholder="e.g. SV 101" value={state.passengerInfo.flightNumber} onChange={(e: any) => update('flightNumber', e.target.value)} />
          </div>
        </motion.section>

        {/* Section 3: Who */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="px-6 py-4 bg-[#F8F9FC] border-b border-gray-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#1B1E4F] text-white flex items-center justify-center text-sm font-bold">3</div>
            <h3 className="font-bold text-[#1B1E4F]">Lead passenger</h3>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InputField icon={Users} label="Full Name" required type="text" placeholder="John Doe" value={state.passengerInfo.name} onChange={(e: any) => update('name', e.target.value)} />
            <InputField icon={Phone} label="Phone Number" required type="tel" placeholder="+966 5X XXX XXXX" value={state.passengerInfo.phone} onChange={(e: any) => update('phone', e.target.value)} />
            <InputField icon={MessageCircle} label="WhatsApp (Optional)" type="tel" placeholder="For easier communication" value={state.passengerInfo.whatsapp} onChange={(e: any) => update('whatsapp', e.target.value)} />
            <InputField icon={FileText} label="Email Address" type="email" placeholder="john@example.com" value={state.passengerInfo.email} onChange={(e: any) => update('email', e.target.value)} />
            <InputField icon={Globe} label="Nationality" type="text" placeholder="e.g. Saudi, British" value={state.passengerInfo.nationality} onChange={(e: any) => update('nationality', e.target.value)} />
            <InputField icon={Globe} label="Country" type="text" placeholder="e.g. Saudi Arabia, UK" value={state.passengerInfo.country} onChange={(e: any) => update('country', e.target.value)} />
            <InputField icon={Users} label="Total Passengers" type="number" min="1" max="100" value={state.passengerCount} onChange={(e: any) => update('passengerCount', e.target.value)} />
            <div className="sm:col-span-2">
              <label className="flex items-center gap-1 text-sm font-semibold text-[#1B1E4F] mb-2">Special Requests</label>
              <textarea
                rows={3}
                placeholder="Wheelchair access, child seat, extra luggage, etc."
                value={state.passengerInfo.specialRequests}
                onChange={(e) => update('specialRequests', e.target.value)}
                className="w-full bg-[#F8F9FC] border-2 border-transparent rounded-xl py-3 px-4 text-sm text-[#1B1E4F] placeholder:text-gray-400 focus:ring-0 focus:border-[#D9A63A] focus:bg-white transition-all resize-none"
              />
            </div>
          </div>
        </motion.section>
      </div>

      {/* Navigation */}
      <div className="mt-10 flex justify-between items-center">
        <button
          onClick={prevStep}
          className="flex items-center gap-2 text-gray-400 hover:text-[#1B1E4F] font-semibold transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <motion.button
          onClick={nextStep}
          disabled={!isComplete}
          whileHover={isComplete ? { scale: 1.02 } : {}}
          whileTap={isComplete ? { scale: 0.98 } : {}}
          className="bg-[#1B1E4F] text-white px-8 sm:px-12 py-4 rounded-xl text-base font-bold hover:bg-[#2A2D5F] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-3 shadow-lg shadow-[#1B1E4F]/20"
        >
          Review Booking
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
