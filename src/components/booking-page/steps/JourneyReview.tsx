"use client";

import { useLocale } from "next-intl";
import { useBooking } from "../context/BookingContext";
import { ArrowRight, ArrowLeft, MapPin, Calendar, Clock, Car, Users, User, Phone, Mail, ShieldCheck } from "lucide-react";
import { mockFleet } from "@/lib/data";

export function JourneyReview() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const { state, nextStep, prevStep } = useBooking();
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const getVehicleName = (id: string) => {
    const v = mockFleet.find(v => v.id === id);
    return isAr ? v?.nameAr : v?.name;
  };

  return (
    <div className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-[#1B1E4F] mb-6">
        {isAr ? "مراجعة تفاصيل الرحلة" : "Review Journey Details"}
      </h2>
      
      <div className="space-y-6">
        {/* Route Details */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
          <h3 className="font-bold text-[#1B1E4F] mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#D9A63A]" />
            {isAr ? "مسار الرحلة" : "Route"}
          </h3>
          <div className="space-y-4">
            {state.locations.map((loc, index) => (
              <div key={loc.id} className="flex gap-4 items-start">
                <div className="flex flex-col items-center mt-1">
                  <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-green-500' : index === state.locations.length - 1 ? 'bg-red-500' : 'bg-[#D9A63A]'}`}></div>
                  {index < state.locations.length - 1 && <div className="w-0.5 h-10 bg-gray-200 my-1"></div>}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">
                    {index === 0 ? (isAr ? 'من' : 'From') : index === state.locations.length - 1 ? (isAr ? 'إلى' : 'To') : (isAr ? 'توقف' : 'Stop')}
                  </p>
                  <p className="font-bold text-[#1B1E4F]">{loc.address || (isAr ? 'لم يتم التحديد' : 'Not specified')}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex gap-8 mt-6 pt-6 border-t border-gray-200">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase flex items-center gap-1"><Calendar className="w-4 h-4" /> {isAr ? "التاريخ" : "Date"}</p>
              <p className="font-bold text-[#1B1E4F] mt-1">{state.dates.pickupDate || '-'}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase flex items-center gap-1"><Clock className="w-4 h-4" /> {isAr ? "الوقت" : "Time"}</p>
              <p className="font-bold text-[#1B1E4F] mt-1">{state.dates.pickupTime || '-'}</p>
            </div>
          </div>
        </div>

        {/* Vehicles */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
          <h3 className="font-bold text-[#1B1E4F] mb-4 flex items-center gap-2">
            <Car className="w-5 h-5 text-[#D9A63A]" />
            {isAr ? "المركبات المختارة" : "Selected Vehicles"}
          </h3>
          <div className="space-y-3">
            {state.vehicles.map(v => (
              <div key={v.vehicleId} className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200">
                <span className="font-bold text-[#1B1E4F]">{getVehicleName(v.vehicleId)}</span>
                <span className="bg-[#1B1E4F] text-white px-3 py-1 rounded text-sm font-bold">x {v.quantity}</span>
              </div>
            ))}
            {state.vehicles.length === 0 && <p className="text-gray-500 italic text-sm">{isAr ? "لم يتم اختيار مركبات" : "No vehicles selected"}</p>}
          </div>
        </div>

        {/* Passenger Info */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
          <h3 className="font-bold text-[#1B1E4F] mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#D9A63A]" />
            {isAr ? "بيانات المسافر" : "Passenger Details"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">{isAr ? "الاسم" : "Name"}</p>
                <p className="font-bold text-[#1B1E4F]">{state.passengerInfo.name || '-'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">{isAr ? "رقم الهاتف" : "Phone"}</p>
                <p className="font-bold text-[#1B1E4F]" dir="ltr">{state.passengerInfo.phone || '-'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">{isAr ? "البريد الإلكتروني" : "Email"}</p>
                <p className="font-bold text-[#1B1E4F]" dir="ltr">{state.passengerInfo.email || '-'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Extras */}
        {state.extras.length > 0 && (
          <div className="bg-[#D9A63A]/10 rounded-xl p-6 border border-[#D9A63A]/30">
            <h3 className="font-bold text-[#1B1E4F] mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#D9A63A]" />
              {isAr ? "الخدمات الإضافية" : "Extras"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {state.extras.map(e => (
                <span key={e} className="bg-white px-3 py-1 rounded-full text-sm font-bold text-[#1B1E4F] shadow-sm">
                  {e.replace('-', ' ')}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-between pt-6 border-t border-gray-100">
        <button onClick={prevStep} className="px-6 py-3 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-colors">
          {isAr ? "تعديل الرحلة" : "Edit Details"}
        </button>
        <button onClick={nextStep} className="bg-[#1B1E4F] text-white hover:bg-[#D9A63A] hover:text-[#1B1E4F] px-8 py-3 rounded-lg font-bold transition-all flex items-center gap-2 group shadow-lg">
          <span>{isAr ? "الاستمرار للدفع" : "Continue to Payment"}</span>
          <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
