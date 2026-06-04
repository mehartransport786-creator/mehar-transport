"use client";

import { useLocale } from "next-intl";
import { CheckCircle2, ShieldCheck, MapPin } from "lucide-react";

export function BookingHero() {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <div className="relative bg-[#1B1E4F] overflow-hidden pt-24 pb-12 md:pt-32 md:pb-20">
      <div className="absolute inset-0 z-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1631835706240-a3da19f6a256?q=80&w=2070&auto=format&fit=crop" 
          alt="Luxury Booking" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B1E4F] via-transparent to-[#1B1E4F]/50"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px] text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          {isAr ? "احجز رحلتك بكل سهولة واحترافية" : "Book Your Journey"}
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 font-light">
          {isAr 
            ? "نقل موثوق في جميع أنحاء المملكة العربية السعودية مع سائقين محترفين ومركبات فاخرة."
            : "Reliable transportation across Saudi Arabia with professional drivers and premium vehicles."}
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm md:text-base font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#D9A63A]" />
            <span>{isAr ? "أكثر من 10,000 رحلة" : "10,000+ Transfers"}</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#D9A63A]" />
            <span>{isAr ? "سائقون معتمدون" : "Licensed Drivers"}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#D9A63A]" />
            <span>{isAr ? "تأكيد فوري" : "Instant Confirmation"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
