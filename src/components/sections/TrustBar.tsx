"use client";

import { useLocale } from "next-intl";
import { ShieldCheck, Clock, Navigation, Star } from "lucide-react";
import { PremiumIcon } from "@/components/ui/PremiumIcon";

export function TrustBar() {
  const locale = useLocale();
  const isAr = locale === "ar";

  const trustItems = [
    {
      icon: ShieldCheck,
      title: isAr ? "نخبة السائقين" : "Elite Chauffeurs",
      description: isAr ? "مدربون باحترافية عالية" : "Professionally trained",
    },
    {
      icon: Navigation,
      title: isAr ? "رحلات موثوقة" : "Reliable Journeys",
      description: isAr ? "تتبع دقيق وضمان الوصول" : "Precision tracking",
    },
    {
      icon: Clock,
      title: isAr ? "متاحون 24/7" : "24/7 Concierge",
      description: isAr ? "خدمة عملاء على مدار الساعة" : "Round-the-clock support",
    },
    {
      icon: Star,
      title: isAr ? "معايير عالمية" : "World-Class Standards",
      description: isAr ? "مركبات فائقة الفخامة" : "Ultra-luxury fleet",
    }
  ];

  return (
    <div className="bg-white border-b border-gray-100 py-12 relative z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-x divide-gray-100 rtl:divide-x-reverse">
          {trustItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center justify-center text-center space-y-4 px-4 group">
              <PremiumIcon 
                icon={item.icon} 
                size="md" 
                className="transition-transform duration-500 group-hover:scale-110" 
              />
              <div>
                <h3 className="font-bold text-lg text-[#1B1E4F] mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 font-light">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
