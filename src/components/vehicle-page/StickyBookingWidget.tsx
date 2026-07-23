"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Calendar, MapPin, Users, Phone, ShieldCheck } from "lucide-react";
import { motion } from "@/lib/motion";
import { useRouter } from "next/navigation";

interface StickyBookingWidgetProps {
  vehicleName: string;
  vehicleNameAr: string;
  vehicleSlug: string;
}

export function StickyBookingWidget({ vehicleName, vehicleNameAr, vehicleSlug }: StickyBookingWidgetProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  
  const [formData, setFormData] = useState({
    pickup: "",
    destination: "",
    date: "",
    passengers: "1",
    phone: ""
  });

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicleSlug) return;
    
    // Redirect to the booking engine with prefilled parameters
    const searchParams = new URLSearchParams({
      vehicle: vehicleSlug,
      pickup: formData.pickup,
      destination: formData.destination,
      date: formData.date,
      passengers: formData.passengers
    });
    
    router.push(`/${locale}/booking?${searchParams.toString()}`);
  };

  return (
    <div 
      className="bg-white rounded-[var(--radius-card)] shadow-[var(--shadow-floating)] border border-gray-100 overflow-hidden sticky top-24"
      onMouseEnter={() => router.prefetch(`/${locale}/booking`)}
    >
      <div className="bg-primary p-6 text-white">
        <h3 className="text-xl font-bold mb-1">
          {isAr ? "احجز " + vehicleNameAr : "Reserve " + vehicleName}
        </h3>
        <p className="text-sm text-gray-300">
          {isAr ? "احصل على عرض سعر فوري" : "Get an instant quote"}
        </p>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
              {isAr ? "موقع الاستلام" : "Pickup Location"}
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rtl:left-auto rtl:right-3" />
              <input 
                type="text" 
                required
                placeholder={isAr ? "المطار أو الفندق" : "Airport or Hotel"}
                className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 rtl:pl-4 rtl:pr-10 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                value={formData.pickup}
                onChange={(e) => setFormData({...formData, pickup: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
              {isAr ? "الوجهة" : "Destination"}
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rtl:left-auto rtl:right-3" />
              <input 
                type="text" 
                required
                placeholder={isAr ? "أين تود الذهاب؟" : "Where to?"}
                className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 rtl:pl-4 rtl:pr-10 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                value={formData.destination}
                onChange={(e) => setFormData({...formData, destination: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                {isAr ? "التاريخ" : "Date"}
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rtl:left-auto rtl:right-3" />
                <input 
                  type="date" 
                  required
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 rtl:pl-4 rtl:pr-10 focus:outline-none focus:border-secondary transition-colors"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                {isAr ? "الركاب" : "Passengers"}
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rtl:left-auto rtl:right-3" />
                <input 
                  type="number" 
                  min="1"
                  required
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 rtl:pl-4 rtl:pr-10 focus:outline-none focus:border-secondary transition-colors"
                  value={formData.passengers}
                  onChange={(e) => setFormData({...formData, passengers: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
              {isAr ? "رقم الهاتف" : "Phone Number"}
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rtl:left-auto rtl:right-3" />
              <input 
                type="tel" 
                required
                placeholder="+966 56 563 8120"
                className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 rtl:pl-4 rtl:pr-10 focus:outline-none focus:border-secondary transition-colors text-left"
                dir="ltr"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-secondary text-primary font-bold py-4 rounded-xl mt-4 hover:bg-primary hover:text-white transition-colors uppercase tracking-wider text-sm"
          >
            {isAr ? "تأكيد الحجز الفوري" : "Confirm Instant Booking"}
          </motion.button>
          
        </form>

        <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-xs font-medium bg-slate-50 p-3 rounded-lg border border-gray-100">
          <ShieldCheck className="w-4 h-4 text-green-500" />
          <span>{isAr ? "لا توجد رسوم خفية. إلغاء مجاني." : "No hidden fees. Free cancellation."}</span>
        </div>
      </div>
    </div>
  );
}
