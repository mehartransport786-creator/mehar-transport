import React from 'react';
import { useLocale } from 'next-intl';
import { MapPin, Calendar, Clock, Loader2 } from 'lucide-react';
import type { BookingState } from '../BookingWorkspace';
import { CustomSelect } from '@/components/ui/CustomSelect';
import { CustomDatePicker } from '@/components/ui/CustomDatePicker';
import { CustomTimePicker } from '@/components/ui/CustomTimePicker';

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
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-3">
        <h3 className="h3 text-white">
          {isAr ? "تفاصيل الرحلة" : "Trip Details"}
        </h3>
        <p className="text-gray-400 text-lg font-light">
          {isAr ? "أين تريد الذهاب؟" : "Where would you like to go?"}
        </p>
      </div>

      <div className="grid gap-8">
        {/* Route Selection */}
        <div className="space-y-4">
          <label className="caption-text text-[11px] text-gray-400 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-secondary" />
            {isAr ? "اختر المسار" : "Select Route"}
          </label>
          <div className="relative">
            {isLoading ? (
              <div className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white/50 flex items-center justify-center gap-3">
                <Loader2 className="w-6 h-6 animate-spin text-secondary" />
                <span className="font-medium text-base">{isAr ? "جاري تحميل المسارات..." : "Loading routes..."}</span>
              </div>
            ) : (
              <div className="text-lg">
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
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Date Selection */}
          <div className="space-y-4">
            <label className="caption-text text-[11px] text-gray-400 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-secondary" />
              {isAr ? "تاريخ الرحلة" : "Travel Date"}
            </label>
            <div className="text-lg">
              <CustomDatePicker
                value={data.travelDate}
                onChange={(val) => updateData({ travelDate: val })}
                minDate={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Time Selection */}
          <div className="space-y-4">
            <label className="caption-text text-[11px] text-gray-400 flex items-center gap-2">
              <Clock className="w-4 h-4 text-secondary" />
              {isAr ? "وقت الرحلة" : "Travel Time"}
            </label>
            <div className="text-lg">
              <CustomTimePicker
                value={data.travelTime}
                onChange={(val) => updateData({ travelTime: val })}
                placeholder={isAr ? "اختر الوقت" : "Select Time"}
              />
            </div>
          </div>
        </div>

        {/* Trip Type */}
        <div className="space-y-4">
          <label className="caption-text text-[11px] text-gray-400 flex items-center gap-2">
            {isAr ? "نوع الرحلة" : "Trip Type"}
          </label>
          <div className="flex bg-black/40 p-2 rounded-2xl border border-white/10 relative">
            <button
              onClick={() => updateData({ tripType: 'one-way' })}
              className={`flex-1 py-4 rounded-xl font-bold text-base transition-all duration-300 relative z-10 ${
                data.tripType === 'one-way'
                  ? 'bg-secondary text-secondary-foreground shadow-luxury'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {isAr ? "اتجاه واحد" : "One Way"}
            </button>
            <button
              onClick={() => updateData({ tripType: 'round-trip' })}
              className={`flex-1 py-4 rounded-xl font-bold text-base transition-all duration-300 relative z-10 ${
                data.tripType === 'round-trip'
                  ? 'bg-secondary text-secondary-foreground shadow-luxury'
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
