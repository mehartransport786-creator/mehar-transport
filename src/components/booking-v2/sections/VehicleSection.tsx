"use client";

import { useLocale } from "next-intl";
import { Users, Briefcase, Check, Loader2, AlertCircle } from "lucide-react";
import Image from "next/image";
import { useBookingV2 } from "../context/BookingV2Context";
import { useState, useEffect } from "react";
import { SelectedVehicle } from "../context/BookingV2Context";

/**
 * VehicleSection — PR-3 F01/F19
 *
 * Source of truth changed from mockFleet (lib/data.ts) to GET /api/vehicles,
 * which returns real DB documents with MongoDB _id values. The _id is now
 * carried through to the booking payload as vehicleId so the server can
 * recompute the authoritative price via the pricing engine.
 *
 * Vehicle slug is still used for image paths and display names, since the
 * Vehicle schema has slug: { type: String, required: true, unique: true }
 * and all image files are named after slugs.
 */
export function VehicleSection() {
  const { state, updateState } = useBookingV2();
  const isAr = useLocale() === "ar";

  type DbVehicle = {
    _id: string;
    slug: string;
    name: string;
    nameAr: string;
    type: string;
    typeAr: string;
    passengers: number;
    luggage: number;
    image: string;
    basePrice?: number;
    active: boolean;
  };

  const [dbVehicles, setDbVehicles] = useState<DbVehicle[]>([]);
  const [vehiclePrices, setVehiclePrices] = useState<Record<string, number | null>>({});
  const [loadingVehicles, setLoadingVehicles] = useState(true);
  const [loadingPrices, setLoadingPrices] = useState(false);
  const [vehicleError, setVehicleError] = useState<string | null>(null);

  // Fetch vehicle list from DB on mount
  useEffect(() => {
    async function fetchVehicles() {
      try {
        const res = await fetch('/api/vehicles');
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setDbVehicles(data.data);
          setVehicleError(null);
        } else {
          throw new Error(data.error || 'Failed to load vehicles');
        }
      } catch (err: any) {
        console.error('Failed to fetch vehicles:', err);
        setVehicleError(isAr ? 'تعذّر تحميل المركبات. يُرجى إعادة تحميل الصفحة.' : 'Could not load vehicles. Please refresh the page.');
      } finally {
        setLoadingVehicles(false);
      }
    }
    fetchVehicles();
  }, []);

  // Fetch prices from the server when route/serviceType/hours change
  useEffect(() => {
    if (dbVehicles.length === 0) return;
    if (state.serviceType === "transfer" && !state.routeId) return;

    async function fetchPrices() {
      setLoadingPrices(true);
      const newPrices: Record<string, number | null> = {};

      await Promise.all(
        dbVehicles.map(async (vehicle) => {
          try {
            const payload =
              state.serviceType === "hourly"
                ? {
                    serviceType: "hourly",
                    vehicleId: vehicle._id,
                    durationHours: state.durationHours || 4,
                  }
                : {
                    serviceType: "transfer",
                    routeId: state.routeId,
                    vehicleId: vehicle._id,
                  };

            const res = await fetch('/api/pricing/calculate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok && data.success) {
              newPrices[vehicle._id] = data.data.totalPrice;
            } else if (res.status === 422) {
              // No pricing configured for this vehicle×route — hide the vehicle
              newPrices[vehicle._id] = null;
            } else {
              newPrices[vehicle._id] = null;
            }
          } catch {
            newPrices[vehicle._id] = null;
          }
        })
      );

      setVehiclePrices(newPrices);
      setLoadingPrices(false);
    }

    fetchPrices();
  }, [dbVehicles, state.routeId, state.serviceType, state.durationHours, state.travelDate]);

  const handleSelectVehicle = (vehicle: DbVehicle) => {
    const price = vehiclePrices[vehicle._id];

    const sv: SelectedVehicle = {
      // PR-3: _id is the MongoDB ObjectId — sent to server as vehicleId for pricing
      vehicleId: vehicle._id,
      vehicleName: vehicle.name,
      vehicleNameAr: vehicle.nameAr,
      vehicleType: vehicle.type,
      passengers: vehicle.passengers,
      luggage: vehicle.luggage,
      image: vehicle.image,
      quantity: 1,
      unitPrice: price ?? 0,
    };

    updateState({ selectedVehicle: sv });
  };

  if (loadingVehicles) {
    return (
      <div className="bg-background rounded-[var(--radius-card)] shadow-[var(--shadow-luxury)] border border-border p-8 flex items-center justify-center gap-3 text-muted-foreground">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>{isAr ? "جارٍ تحميل المركبات..." : "Loading vehicles..."}</span>
      </div>
    );
  }

  if (vehicleError) {
    return (
      <div className="bg-background rounded-[var(--radius-card)] shadow-[var(--shadow-luxury)] border border-border p-8">
        <div className="flex items-start gap-3 text-red-600">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{vehicleError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background rounded-[var(--radius-card)] shadow-[var(--shadow-luxury)] border border-border p-6 sm:p-8">
      <h2 className="text-xl font-bold text-primary mb-2">
        {isAr ? "اختر مركبتك" : "Select Vehicle"}
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        {isAr ? "جميع المركبات موديلات حديثة ومعقمة" : "All vehicles are latest models and sanitized."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {dbVehicles.map((vehicle) => {
          const isSelected = state.selectedVehicle?.vehicleId === vehicle._id;
          const price = vehiclePrices[vehicle._id];
          const isLoading = loadingPrices && price === undefined;

          // Don't show vehicles with no pricing configured for this route (null = 422 from engine)
          if (!isLoading && price === null) return null;

          return (
            <div
              key={vehicle._id}
              onClick={() => !isLoading && handleSelectVehicle(vehicle)}
              className={`relative bg-background rounded-2xl border-2 overflow-hidden transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'border-secondary shadow-xl ring-1 ring-secondary/20'
                  : 'border-border hover:border-primary/20 hover:shadow-lg'
              } ${isLoading ? 'opacity-70 pointer-events-none' : ''}`}
            >
              {isSelected && (
                <div className="absolute top-3 left-3 bg-secondary text-primary-foreground p-1.5 rounded-full z-10 shadow-lg animate-in fade-in zoom-in duration-300">
                  <Check className="w-4 h-4" />
                </div>
              )}

              <div className="relative h-44 w-full bg-gradient-to-br from-muted to-muted/80 flex items-center justify-center overflow-hidden">
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  width={280}
                  height={160}
                  className={`object-contain drop-shadow-xl transition-transform duration-[var(--duration-base)] ${isSelected ? 'scale-105' : 'hover:scale-105'}`}
                />
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-primary leading-tight">
                      {isAr ? vehicle.nameAr : vehicle.name}
                    </h3>
                    <span className="inline-block mt-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-primary/5 text-primary/60 uppercase tracking-wider">
                      {vehicle.type}
                    </span>
                  </div>
                  <div className="text-right">
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin text-muted-foreground/30" />
                    ) : (
                      <>
                        <div className="text-xl font-black text-primary tabular-nums">
                          {price?.toFixed(0)} <span className="text-xs text-muted-foreground font-medium ml-0.5">SAR</span>
                        </div>
                        <div className="text-[10px] text-muted-foreground/60 font-medium">
                          {state.serviceType === "hourly"
                            ? (isAr ? `لـ ${state.durationHours} ساعات` : `for ${state.durationHours}h`)
                            : (isAr ? "للرحلة (شامل VAT)" : "per trip (incl. VAT)")}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-border/50">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Users className="w-4 h-4 text-primary/70" />
                    <span className="font-medium">{vehicle.passengers} {isAr ? "ركاب" : "pax"}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Briefcase className="w-4 h-4 text-secondary/70" />
                    <span className="font-medium">{vehicle.luggage} {isAr ? "حقائب" : "bags"}</span>
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
