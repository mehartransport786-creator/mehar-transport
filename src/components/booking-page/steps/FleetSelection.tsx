"use client";

import { useLocale } from "next-intl";
import { useBooking } from "../context/BookingContext";
import { ArrowRight, ArrowLeft, Users, Briefcase, Plus, Minus, Info } from "lucide-react";

export function FleetSelection() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const { state, updateState, nextStep, prevStep, calculatePricing } = useBooking();
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const handleAddVehicle = (vehicleId: string) => {
    const existing = state.vehicles.find(v => v.vehicleId === vehicleId);
    if (existing) {
      const newVehicles = state.vehicles.map(v => 
        v.vehicleId === vehicleId ? { ...v, quantity: v.quantity + 1 } : v
      );
      updateState({ vehicles: newVehicles });
    } else {
      updateState({ vehicles: [...state.vehicles, { vehicleId, quantity: 1 }] });
    }
    // Calculate pricing is called whenever state updates, but we can't easily trigger it inside here since state updates are async.
    // However, in a robust app, we'd use a useEffect in the context to watch for changes.
  };

  const handleRemoveVehicle = (vehicleId: string) => {
    const existing = state.vehicles.find(v => v.vehicleId === vehicleId);
    if (!existing) return;
    
    if (existing.quantity > 1) {
      const newVehicles = state.vehicles.map(v => 
        v.vehicleId === vehicleId ? { ...v, quantity: v.quantity - 1 } : v
      );
      updateState({ vehicles: newVehicles });
    } else {
      updateState({ vehicles: state.vehicles.filter(v => v.vehicleId !== vehicleId) });
    }
  };

  const getVehicleQuantity = (vehicleId: string) => {
    return state.vehicles.find(v => v.vehicleId === vehicleId)?.quantity || 0;
  };

  const availableVehicles = state.selectedRoute?.pricings || [];

  const recommendedVehicles = availableVehicles.filter((v: any) => {
    // Simple mock recommendation logic
    if (state.passengerCount > 7 && v.vehicleName.toLowerCase().includes('coaster')) return true;
    if (state.passengerCount > 4 && state.passengerCount <= 7 && v.vehicleName.toLowerCase().includes('staria')) return true;
    if (state.tripType === 'vip' && (v.vehicleType.toLowerCase().includes('luxury'))) return true;
    return false;
  });

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#1B1E4F] mb-2">
            {isAr ? "اختيار المركبات" : "Select Your Vehicles"}
          </h2>
          <p className="text-gray-500">
            {isAr 
              ? "يمكنك اختيار مركبة واحدة أو عدة مركبات لتناسب مجموعتك." 
              : "Select one or multiple vehicles to accommodate your group."}
          </p>
        </div>

        {/* Passenger & Luggage Toggles */}
        <div className="flex bg-gray-50 rounded-xl p-2 border border-gray-100 gap-4 shadow-sm">
          <div className="flex items-center gap-3 px-3 py-1">
            <Users className="w-5 h-5 text-[#D9A63A]" />
            <div className="flex items-center gap-2">
              <button 
                onClick={() => updateState({ passengerCount: Math.max(1, state.passengerCount - 1) })}
                className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#1B1E4F]"
              >-</button>
              <span className="font-bold w-4 text-center">{state.passengerCount}</span>
              <button 
                onClick={() => updateState({ passengerCount: state.passengerCount + 1 })}
                className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#1B1E4F]"
              >+</button>
            </div>
          </div>
          <div className="w-px bg-gray-200"></div>
          <div className="flex items-center gap-3 px-3 py-1">
            <Briefcase className="w-5 h-5 text-[#D9A63A]" />
            <div className="flex items-center gap-2">
              <button 
                onClick={() => updateState({ luggageCount: Math.max(0, state.luggageCount - 1) })}
                className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#1B1E4F]"
              >-</button>
              <span className="font-bold w-4 text-center">{state.luggageCount}</span>
              <button 
                onClick={() => updateState({ luggageCount: state.luggageCount + 1 })}
                className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#1B1E4F]"
              >+</button>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Recommendations */}
      {recommendedVehicles.length > 0 && (
        <div className="mb-8 p-4 bg-[#D9A63A]/5 border border-[#D9A63A]/20 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-[#D9A63A]" />
            <h3 className="font-bold text-[#1B1E4F]">{isAr ? "موصى به لرحلتك" : "Recommended for your trip"}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedVehicles.slice(0, 2).map((vehicle: any) => (
              <div key={`rec-${vehicle.vehicleId}`} className="bg-white p-3 rounded-lg flex items-center gap-4 shadow-sm border border-gray-100">
                <img src={vehicle.image} alt={vehicle.vehicleName} className="w-20 h-14 object-cover rounded-md" />
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-[#1B1E4F]">{isAr ? vehicle.vehicleNameAr : vehicle.vehicleName}</h4>
                  <p className="text-xs text-gray-500">{vehicle.passengers} {isAr ? "ركاب" : "Passengers"}</p>
                </div>
                <button 
                  onClick={() => handleAddVehicle(vehicle.vehicleId)}
                  className="bg-[#1B1E4F] text-white px-3 py-1.5 rounded-md text-xs font-bold hover:bg-[#D9A63A] hover:text-[#1B1E4F] transition-colors"
                >
                  {isAr ? "إضافة" : "Add"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
        {availableVehicles.map((vehicle: any) => {
          const quantity = getVehicleQuantity(vehicle.vehicleId);
          const isSelected = quantity > 0;
          
          return (
            <div 
              key={vehicle.vehicleId} 
              className={`flex flex-col border-2 rounded-2xl overflow-hidden transition-all duration-300
                ${isSelected ? 'border-[#D9A63A] shadow-md bg-[#D9A63A]/5' : 'border-gray-100 hover:border-gray-300'}`}
            >
              <div className="relative h-40">
                <img src={vehicle.image} alt={vehicle.vehicleName} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 left-auto rtl:left-2 rtl:right-auto">
                  <span className="bg-white/90 backdrop-blur-sm text-[#1B1E4F] px-2 py-1 rounded text-xs font-bold shadow-sm">
                    {isAr ? vehicle.vehicleTypeAr : vehicle.vehicleType}
                  </span>
                </div>
              </div>
              
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-bold text-lg text-[#1B1E4F] mb-1">{isAr ? vehicle.vehicleNameAr : vehicle.vehicleName}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1"><Users className="w-4 h-4" /> {vehicle.passengers}</div>
                  <div className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {vehicle.luggage}</div>
                </div>
                
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-black text-[#D9A63A] text-xl">{vehicle.currentPrice} SAR</span>
                  
                  {isSelected ? (
                    <div className="flex items-center gap-3 bg-[#1B1E4F] rounded-lg p-1 text-white shadow-md">
                      <button onClick={() => handleRemoveVehicle(vehicle.vehicleId)} className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-md transition-colors"><Minus className="w-4 h-4" /></button>
                      <span className="font-bold w-4 text-center">{quantity}</span>
                      <button onClick={() => handleAddVehicle(vehicle.vehicleId)} className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-md transition-colors"><Plus className="w-4 h-4" /></button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleAddVehicle(vehicle.vehicleId)}
                      className="bg-gray-100 hover:bg-[#1B1E4F] text-[#1B1E4F] hover:text-white px-4 py-2 rounded-lg font-bold transition-colors text-sm shadow-sm"
                    >
                      {isAr ? "اختيار" : "Select"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between pt-6 border-t border-gray-100">
        <button onClick={prevStep} className="px-6 py-3 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-colors">
          {isAr ? "رجوع" : "Back"}
        </button>
        <button 
          onClick={() => {
            // Force pricing recalc when moving to next step
            calculatePricing();
            nextStep();
          }} 
          disabled={state.vehicles.length === 0}
          className="bg-[#1B1E4F] text-white hover:bg-[#D9A63A] hover:text-[#1B1E4F] px-8 py-3 rounded-lg font-bold transition-all flex items-center gap-2 group shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#1B1E4F] disabled:hover:text-white"
        >
          <span>{isAr ? "بيانات الركاب" : "Passenger Details"}</span>
          <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
