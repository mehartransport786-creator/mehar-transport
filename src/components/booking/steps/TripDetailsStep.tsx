import React from 'react';
import { useLocale } from 'next-intl';
import { MapPin, Calendar, Clock, Loader2 } from 'lucide-react';
import type { BookingState } from '../BookingWorkspace';
import { CustomSelect } from '../ui/CustomSelect';
import { CustomDatePicker } from '../ui/CustomDatePicker';
import { CustomTimePicker } from '../ui/CustomTimePicker';

interface Props {
  data: BookingState;
  updateData: (data: Partial<BookingState>) => void;
  routes: any[];
  isLoading: boolean;
}

export default function TripDetailsStep({ data, updateData, routes, isLoading }: Props) {
  const locale = useLocale();
  const isAr = locale === 'ar';

  const handleRouteSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const routeId = e.target.value;
    const selectedRoute = routes.find(r => r._id === routeId);
    if (selectedRoute) {
      updateData({ 
        routeId, 
        routeName: isAr ? selectedRoute.nameAr : selectedRoute.name,
        // Reset vehicle selection if route changes
        vehicleId: '',
        vehicleName: '',
        basePrice: 0
      });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-white">
          {isAr ? "تفاصيل الرحلة" : "Trip Details"}
        </h3>
        <p className="text-gray-400">
          {isAr ? "أين تريد الذهاب؟" : "Where would you like to go?"}
        </p>
      </div>

      <div className="grid gap-6">
        {/* Route Selection */}
        <div className="space-y-3">
          <label className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#D9A63A]" />
            {isAr ? "اختر المسار" : "Select Route"}
          </label>
          <div className="relative">
            {isLoading ? (
              <div className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-4 text-white/50 flex items-center justify-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin" />
                {isAr ? "جاري تحميل المسارات..." : "Loading routes..."}
              </div>
            ) : (
              <CustomSelect
                value={data.routeId}
                onChange={(val) => {
                  const selectedRoute = routes.find(r => r._id === val);
                  if (selectedRoute) {
                    updateData({ 
                      routeId: val, 
                      routeName: isAr ? selectedRoute.nameAr : selectedRoute.name,
                      vehicleId: '',
                      vehicleName: '',
                      basePrice: 0
                    });
                  }
                }}
                options={routes.map(route => ({
                  value: route._id,
                  label: isAr ? route.nameAr || route.name : route.name
                }))}
                placeholder={isAr ? "اختر مساراً..." : "Select a route..."}
                icon={<MapPin className="w-5 h-5" />}
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date Selection */}
          <div className="space-y-3">
            <label className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#D9A63A]" />
              {isAr ? "تاريخ الرحلة" : "Travel Date"}
            </label>
            <CustomDatePicker
              value={data.travelDate}
              onChange={(val) => updateData({ travelDate: val })}
              minDate={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Time Selection */}
          <div className="space-y-3">
            <label className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#D9A63A]" />
              {isAr ? "وقت الرحلة" : "Travel Time"}
            </label>
            <CustomTimePicker
              value={data.travelTime}
              onChange={(val) => updateData({ travelTime: val })}
              placeholder={isAr ? "اختر الوقت" : "Select Time"}
            />
          </div>
        </div>

        {/* Trip Type */}
        <div className="space-y-3">
          <label className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
            {isAr ? "نوع الرحلة" : "Trip Type"}
          </label>
          <div className="flex bg-black/40 p-1.5 rounded-2xl border border-white/5 relative">
            <button
              onClick={() => updateData({ tripType: 'one-way' })}
              className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 relative z-10 ${
                data.tripType === 'one-way'
                  ? 'bg-gradient-to-r from-[#D9A63A] to-[#B8860B] text-black shadow-[0_4px_15px_rgba(217,166,58,0.3)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {isAr ? "اتجاه واحد" : "One Way"}
            </button>
            <button
              onClick={() => updateData({ tripType: 'round-trip' })}
              className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 relative z-10 ${
                data.tripType === 'round-trip'
                  ? 'bg-gradient-to-r from-[#D9A63A] to-[#B8860B] text-black shadow-[0_4px_15px_rgba(217,166,58,0.3)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {isAr ? "ذهاب وعودة" : "Round Trip"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
