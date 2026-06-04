"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight, ArrowLeft, Clock, MapPin, Calendar, CheckCircle2, Ticket } from "lucide-react";
import { PremiumIcon } from "@/components/ui/PremiumIcon";

export default function BookingsManagementPage() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const activeBookings = [
    {
      id: "MHR-8429",
      date: "Oct 24, 2026",
      time: "14:30 AST",
      pickup: "Jeddah Airport (JED)",
      dropoff: "Fairmont Makkah Clock Royal Tower",
      vehicle: "Mercedes S-Class",
      status: "confirmed",
      price: "1,200 SAR"
    }
  ];

  const pastBookings = [
    {
      id: "MHR-7102",
      date: "Sep 15, 2026",
      time: "09:00 AST",
      pickup: "Riyadh Airport (RUH)",
      dropoff: "Four Seasons Hotel Riyadh",
      vehicle: "Rolls-Royce Ghost",
      status: "completed",
      price: "3,500 SAR"
    },
    {
      id: "MHR-6844",
      date: "Aug 02, 2026",
      time: "18:45 AST",
      pickup: "Al Faisaliah Hotel",
      dropoff: "Riyadh Airport (RUH)",
      vehicle: "Kia K5",
      status: "completed",
      price: "450 SAR"
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#1B1E4F] mb-1">
            {isAr ? "إدارة الحجوزات" : "Bookings Management"}
          </h1>
          <p className="text-gray-500 text-sm">
            {isAr ? "عرض وإدارة رحلاتك الحالية والسابقة" : "View and manage your active and past journeys"}
          </p>
        </div>
        <Link 
          href="/booking" 
          className="bg-[#1B1E4F] text-white hover:bg-[#D9A63A] hover:text-[#1B1E4F] px-6 py-3 rounded-xl font-bold transition-colors inline-flex items-center gap-2 justify-center shrink-0"
        >
          <span>{isAr ? "حجز جديد" : "New Booking"}</span>
          <ArrowIcon className="w-5 h-5" />
        </Link>
      </div>

      {/* Active Bookings */}
      <div>
        <h2 className="text-xl font-bold text-[#1B1E4F] mb-6 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          {isAr ? "الرحلات القادمة" : "Upcoming Journeys"}
        </h2>
        
        <div className="space-y-4">
          {activeBookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-2xl p-6 border-2 border-green-500/20 shadow-sm relative overflow-hidden group hover:border-green-500/40 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-bl-full -mr-16 -mt-16"></div>
              
              <div className="flex flex-col lg:flex-row gap-6 lg:items-center justify-between relative z-10">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-green-50 text-green-700 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider">
                      {isAr ? "مؤكدة" : "Confirmed"}
                    </span>
                    <span className="text-sm font-bold text-gray-400">ID: {booking.id}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                      <PremiumIcon icon={Calendar} size="sm" />
                      <div>
                        <p className="text-sm font-bold text-[#1B1E4F]">{booking.date}</p>
                        <p className="text-xs text-gray-500">{booking.time}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-[#1B1E4F]/10 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-[#1B1E4F]"></div>
                        </div>
                        <div className="w-px h-8 bg-gray-200 my-1"></div>
                        <div className="w-8 h-8 rounded-full bg-[#D9A63A]/20 flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-[#D9A63A]" />
                        </div>
                      </div>
                      <div className="flex-1 space-y-4 mt-1">
                        <p className="font-bold text-[#1B1E4F] text-sm">{booking.pickup}</p>
                        <p className="font-bold text-[#1B1E4F] text-sm">{booking.dropoff}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-4 border-t lg:border-t-0 lg:border-l lg:rtl:border-l-0 lg:rtl:border-r border-gray-100 pt-4 lg:pt-0 lg:pl-6 lg:rtl:pr-6 w-full lg:w-auto">
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{booking.vehicle}</p>
                    <p className="font-bold text-[#1B1E4F] text-xl">{booking.price}</p>
                  </div>
                  <button className="flex items-center gap-2 text-[#D9A63A] bg-[#D9A63A]/10 hover:bg-[#D9A63A]/20 px-4 py-2 rounded-lg font-bold text-sm transition-colors">
                    <Ticket className="w-4 h-4" />
                    {isAr ? "عرض التذكرة" : "View Ticket"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Bookings */}
      <div className="pt-8">
        <h2 className="text-xl font-bold text-gray-500 mb-6 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-gray-400" />
          {isAr ? "الرحلات السابقة" : "Past Journeys"}
        </h2>
        
        <div className="space-y-4">
          {pastBookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm opacity-75 hover:opacity-100 transition-opacity">
              <div className="flex flex-col lg:flex-row gap-6 lg:items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider">
                      {isAr ? "مكتملة" : "Completed"}
                    </span>
                    <span className="text-sm font-bold text-gray-400">ID: {booking.id}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                      <PremiumIcon icon={Calendar} size="sm" />
                      <div>
                        <p className="text-sm font-bold text-gray-600">{booking.date}</p>
                        <p className="text-xs text-gray-400">{booking.time}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                        </div>
                        <div className="w-px h-8 bg-gray-200 my-1"></div>
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                      <div className="flex-1 space-y-4 mt-1">
                        <p className="font-bold text-gray-600 text-sm">{booking.pickup}</p>
                        <p className="font-bold text-gray-600 text-sm">{booking.dropoff}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-4 border-t lg:border-t-0 lg:border-l lg:rtl:border-l-0 lg:rtl:border-r border-gray-100 pt-4 lg:pt-0 lg:pl-6 lg:rtl:pr-6 w-full lg:w-auto">
                  <div className="text-right">
                    <p className="text-xs text-gray-400">{booking.vehicle}</p>
                    <p className="font-bold text-gray-600 text-xl">{booking.price}</p>
                  </div>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-[#1B1E4F] px-4 py-2 rounded-lg font-bold text-sm transition-colors">
                    {isAr ? "إيصال الدفع" : "Receipt"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
