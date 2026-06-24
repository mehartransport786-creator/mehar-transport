import React from 'react';
import { useLocale } from 'next-intl';
import { MapPin, Calendar, Clock, Loader2 } from 'lucide-react';
import { BookingState } from '../PremiumBookingWizard';

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
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#D9A63A]" />
            {isAr ? "اختر المسار" : "Select Route"}
          </label>
          <div className="relative">
            {isLoading ? (
              <div className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-4 text-white/50 flex items-center justify-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin" />
                {isAr ? "جاري تحميل المسارات..." : "Loading routes..."}
              </div>
            ) : (
              <select
                value={data.routeId}
                onChange={handleRouteSelect}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#D9A63A]/50 transition-all"
              >
                <option value="" disabled>
                  {isAr ? "اختر مساراً..." : "Select a route..."}
                </option>
                {routes.map(route => (
                  <option key={route._id} value={route._id}>
                    {isAr ? route.nameAr || route.name : route.name}
                  </option>
                ))}
              </select>
            )}
            {!isLoading && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                ▼
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#D9A63A]" />
              {isAr ? "تاريخ الرحلة" : "Travel Date"}
            </label>
            <input
              type="date"
              value={data.travelDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => updateData({ travelDate: e.target.value })}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-[#D9A63A]/50 transition-all [color-scheme:dark]"
            />
          </div>

          {/* Time Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D9A63A]" />
              {isAr ? "وقت الرحلة" : "Travel Time"}
            </label>
            <input
              type="time"
              value={data.travelTime}
              onChange={(e) => updateData({ travelTime: e.target.value })}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-[#D9A63A]/50 transition-all [color-scheme:dark]"
            />
          </div>
        </div>

        {/* Trip Type */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-300">
            {isAr ? "نوع الرحلة" : "Trip Type"}
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => updateData({ tripType: 'one-way' })}
              className={`p-4 rounded-xl border transition-all font-medium ${
                data.tripType === 'one-way'
                  ? 'bg-[#D9A63A]/10 border-[#D9A63A] text-[#D9A63A]'
                  : 'bg-[#1a1a1a] border-white/10 text-gray-400 hover:bg-white/5'
              }`}
            >
              {isAr ? "اتجاه واحد" : "One Way"}
            </button>
            <button
              onClick={() => updateData({ tripType: 'round-trip' })}
              className={`p-4 rounded-xl border transition-all font-medium ${
                data.tripType === 'round-trip'
                  ? 'bg-[#D9A63A]/10 border-[#D9A63A] text-[#D9A63A]'
                  : 'bg-[#1a1a1a] border-white/10 text-gray-400 hover:bg-white/5'
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
