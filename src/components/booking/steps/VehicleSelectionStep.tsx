import React from 'react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { Users, Briefcase, Check } from 'lucide-react';
import { BookingState } from '../BookingWorkspace';

interface Props {
  data: BookingState;
  updateData: (data: Partial<BookingState>) => void;
  routes: any[];
}

export default function VehicleSelectionStep({ data, updateData, routes }: Props) {
  const locale = useLocale();
  const isAr = locale === 'ar';

  const selectedRoute = routes.find(r => r._id === data.routeId);
  const pricings = selectedRoute?.pricings || [];

  if (!data.routeId) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        {isAr ? "يرجى اختيار المسار أولاً" : "Please select a route first"}
      </div>
    );
  }

  if (pricings.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        {isAr ? "لا توجد مركبات متاحة لهذا المسار" : "No vehicles available for this route"}
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-white">
          {isAr ? "اختر المركبة" : "Select Vehicle"}
        </h3>
        <p className="text-gray-400">
          {isAr ? "مركبات فخمة تلبي جميع احتياجاتك" : "Premium vehicles for your specific needs"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pricings.map((p: any) => {
          const isSelected = data.vehicleId === p.vehicleId;
          const displayPrice = p.currentPrice || p.basePrice;
          
          return (
            <div
              key={p.vehicleId}
              onClick={() => updateData({ 
                vehicleId: p.vehicleId, 
                vehicleName: isAr ? p.vehicleNameAr || p.vehicleName : p.vehicleName,
                basePrice: displayPrice
              })}
              className={`relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 border ${
                isSelected 
                  ? 'border-[#D9A63A]/50 bg-gradient-to-br from-[#D9A63A]/10 to-transparent shadow-[0_0_30px_rgba(217,166,58,0.2)] scale-[1.02]' 
                  : 'border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20'
              }`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 z-10 bg-[#D9A63A] text-black p-1 rounded-full">
                  <Check className="w-4 h-4" />
                </div>
              )}
              
              <div className="h-40 relative p-4 flex items-center justify-center bg-gradient-to-b from-white/5 to-transparent">
                <Image
                  src={p.image || '/fleet/camry.png'}
                  alt={p.vehicleName}
                  width={250}
                  height={150}
                  className={`object-contain transition-transform duration-500 ${isSelected ? 'scale-110 drop-shadow-2xl' : 'drop-shadow-xl group-hover:scale-105'}`}
                />
              </div>

              <div className="p-5 border-t border-white/5 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-bold text-white">
                      {isAr ? p.vehicleNameAr || p.vehicleName : p.vehicleName}
                    </h4>
                    <p className="text-sm text-[#D9A63A]">
                      {isAr ? p.vehicleTypeAr || p.vehicleType : p.vehicleType}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-white">{displayPrice}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">SAR</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-md">
                    <Users className="w-4 h-4" />
                    <span>{p.passengers}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-md">
                    <Briefcase className="w-4 h-4" />
                    <span>{p.luggage}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
