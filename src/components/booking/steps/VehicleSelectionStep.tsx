import React from 'react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { Users, Briefcase, Check, Snowflake, Wifi, Droplets } from 'lucide-react';
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
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-3">
        <h3 className="h3 text-white">
          {isAr ? "اختر المركبة" : "Select Vehicle"}
        </h3>
        <p className="text-gray-400 text-lg font-light">
          {isAr ? "مركبات فخمة تلبي جميع احتياجاتك" : "Premium vehicles for your specific needs"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pricings.map((p: any, index: number) => {
          const isSelected = data.vehicleId === p.vehicleId;
          const displayPrice = p.currentPrice || p.basePrice;
          const isMostPopular = index === 1; // Arbitrarily badge the second item as Most Popular
          
          return (
            <div
              key={p.vehicleId}
              onClick={() => updateData({ 
                vehicleId: p.vehicleId, 
                vehicleName: isAr ? p.vehicleNameAr || p.vehicleName : p.vehicleName,
                basePrice: displayPrice
              })}
              className={`relative cursor-pointer rounded-[2rem] overflow-hidden transition-all duration-300 border ${
                isSelected 
                  ? 'border-secondary/50 bg-gradient-to-br from-secondary/10 to-transparent shadow-luxury-hover scale-[1.02]' 
                  : 'border-white/5 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 shadow-luxury'
              }`}
            >
              {isSelected && (
                <div className="absolute top-5 right-5 z-20 bg-secondary text-secondary-foreground p-1.5 rounded-full shadow-luxury">
                  <Check className="w-5 h-5" />
                </div>
              )}

              {isMostPopular && !isSelected && (
                <div className="absolute top-5 right-5 z-20 bg-black/60 backdrop-blur-md border border-secondary/30 text-secondary text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  {isAr ? "الأكثر طلباً" : "Most Popular"}
                </div>
              )}
              
              <div className="h-40 sm:h-48 relative p-4 sm:p-6 flex items-center justify-center bg-gradient-to-b from-white/5 to-transparent">
                <Image
                  src={p.image || '/fleet/camry.png'}
                  alt={p.vehicleName}
                  width={300}
                  height={180}
                  className={`object-contain transition-transform duration-500 ${isSelected ? 'scale-110 drop-shadow-2xl' : 'drop-shadow-xl group-hover:scale-105'}`}
                />
              </div>

              <div className="p-4 sm:p-6 border-t border-secondary/20 space-y-4 sm:space-y-5 bg-black/20">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-white mb-1 leading-tight">
                      {isAr ? p.vehicleNameAr || p.vehicleName : p.vehicleName}
                    </h4>
                    <p className="text-xs sm:text-sm text-secondary font-medium tracking-wide">
                      {isAr ? p.vehicleTypeAr || p.vehicleType : p.vehicleType}
                    </p>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    <p className="text-xl sm:text-2xl font-bold text-white leading-none">{displayPrice}</p>
                    <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest mt-1">SAR</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between text-xs sm:text-sm text-gray-300 pt-2 border-t border-white/5 gap-y-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-black/40 px-2 py-1 rounded-lg border border-white/5" title={isAr ? "الركاب" : "Passengers"}>
                      <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary" />
                      <span className="font-medium">{p.passengers}</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-black/40 px-2 py-1 rounded-lg border border-white/5" title={isAr ? "الحقائب" : "Luggage"}>
                      <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary" />
                      <span className="font-medium">{p.luggage}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-secondary/70">
                    <Snowflake className="w-3.5 h-3.5 sm:w-4 sm:h-4" title={isAr ? "تكييف" : "AC"} />
                    <Wifi className="w-3.5 h-3.5 sm:w-4 sm:h-4" title={isAr ? "واي فاي" : "Wi-Fi"} />
                    <Droplets className="w-3.5 h-3.5 sm:w-4 sm:h-4" title={isAr ? "ماء" : "Water"} />
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
