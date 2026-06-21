"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight, ArrowLeft, Clock, MapPin, Calendar, Star, Award, ShieldCheck } from "lucide-react";
import { PremiumIcon } from "@/components/ui/PremiumIcon";

export default function DashboardOverviewPage() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-[#1B1E4F] rounded-2xl p-8 md:p-10 text-white relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-[url('/routes/jeddah-makkah.webp')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {isAr ? "مرحباً بك، أحمد!" : "Welcome back, Ahmed!"}
            </h1>
            <p className="text-gray-300 font-light">
              {isAr 
                ? "جاهز لرحلتك الفاخرة القادمة؟" 
                : "Ready for your next premium journey?"}
            </p>
          </div>
          <Link 
            href="/booking" 
            className="bg-[#D9A63A] text-[#1B1E4F] hover:bg-white px-8 py-3.5 rounded-xl font-bold transition-colors inline-flex items-center gap-2 justify-center shrink-0"
          >
            <span>{isAr ? "احجز رحلة جديدة" : "Book New Ride"}</span>
            <ArrowIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Next Upcoming Trip (Takes up 2/3 space on desktop) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
            <h2 className="text-xl font-bold text-[#1B1E4F]">
              {isAr ? "الرحلة القادمة" : "Next Upcoming Trip"}
            </h2>
            <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              {isAr ? "مؤكدة" : "Confirmed"}
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 shrink-0">
              <div className="aspect-[4/3] rounded-xl overflow-hidden relative shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1621285816999-52e0e9803bba?q=80&w=2070&auto=format&fit=crop" 
                  alt="Mercedes S-Class" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="text-white font-bold">Mercedes S-Class</div>
                  <div className="text-[#D9A63A] text-xs font-bold uppercase">First Class</div>
                </div>
              </div>
            </div>
            
            <div className="w-full space-y-6">
              <div className="flex gap-4">
                <div className="w-10 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#1B1E4F]/10 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-[#1B1E4F]"></div>
                  </div>
                  <div className="w-px h-12 bg-gray-200 my-1"></div>
                  <div className="w-8 h-8 rounded-full bg-[#D9A63A]/20 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-[#D9A63A]" />
                  </div>
                </div>
                <div className="flex-1 space-y-8 mt-1">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{isAr ? "نقطة الانطلاق" : "Pickup Location"}</p>
                    <p className="font-bold text-[#1B1E4F]">King Abdulaziz International Airport (JED)</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{isAr ? "الوجهة" : "Dropoff Location"}</p>
                    <p className="font-bold text-[#1B1E4F]">Fairmont Makkah Clock Royal Tower</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <PremiumIcon icon={Calendar} size="sm" />
                  <div>
                    <p className="text-xs text-gray-500">{isAr ? "التاريخ" : "Date"}</p>
                    <p className="font-bold text-sm">Oct 24, 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <PremiumIcon icon={Clock} size="sm" />
                  <div>
                    <p className="text-xs text-gray-500">{isAr ? "الوقت" : "Time"}</p>
                    <p className="font-bold text-sm">14:30 AST</p>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Quick Stats & Loyalty */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-[#1B1E4F] mb-6">
              {isAr ? "نظرة سريعة" : "Quick Stats"}
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <PremiumIcon icon={ShieldCheck} size="sm" />
                  <span className="font-medium text-gray-700">{isAr ? "رحلات مكتملة" : "Completed Trips"}</span>
                </div>
                <span className="font-bold text-xl text-[#1B1E4F]">12</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <PremiumIcon icon={Star} size="sm" />
                  <span className="font-medium text-gray-700">{isAr ? "تقييم الركاب" : "Passenger Rating"}</span>
                </div>
                <span className="font-bold text-xl text-[#1B1E4F]">5.0</span>
              </div>
            </div>
          </div>

          <div className="bg-[#D9A63A] rounded-2xl p-8 shadow-sm text-[#1B1E4F] relative overflow-hidden">
            <div className="absolute -top-10 -right-10 opacity-20">
              <Award className="w-40 h-40" />
            </div>
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-2">Mehar Elite</h2>
              <p className="text-sm font-medium opacity-80 mb-6">
                {isAr ? "العضوية الذهبية" : "Gold Tier Membership"}
              </p>
              
              <div className="text-4xl font-black mb-2">2,450</div>
              <p className="text-sm font-bold opacity-80 mb-6 uppercase tracking-wider">
                {isAr ? "نقطة مكافآت" : "Reward Points"}
              </p>
              
              <div className="w-full bg-black/10 rounded-full h-2 mb-2">
                <div className="bg-[#1B1E4F] h-2 rounded-full w-[70%]"></div>
              </div>
              <p className="text-xs font-medium">
                {isAr ? "550 نقطة للوصول للبلاتينيوم" : "550 pts to Platinum"}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
