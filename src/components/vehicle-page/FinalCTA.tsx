"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";

interface FinalCTAProps {
  vehicle: any;
}

export function FinalCTA({ vehicle }: FinalCTAProps) {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section className="bg-[#1B1E4F] py-24 px-4 sm:px-6 lg:px-8 mt-24 text-center">
      <div className="container mx-auto max-w-4xl relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          {isAr ? "تجربة النقل الفاخر مع" : "Experience Premium Transportation with"} <br />
          <span className="text-[#D9A63A]">{isAr ? vehicle.nameAr : vehicle.name}</span>
        </h2>
        
        <p className="text-xl text-gray-300 font-light mb-12 max-w-2xl mx-auto">
          {isAr 
            ? "سائقون محترفون، راحة فاخرة، وخدمة موثوقة في جميع أنحاء المملكة العربية السعودية."
            : "Professional chauffeurs, luxury comfort, and reliable service across Saudi Arabia."}
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <Link 
            href={`/booking?vehicle=${vehicle.id}`}
            className="bg-[#D9A63A] hover:bg-white text-[#1B1E4F] px-10 py-5 rounded-xl font-bold transition-all text-sm uppercase tracking-widest"
          >
            {isAr ? "احجز الآن" : "Book Now"}
          </Link>
          <a 
            href="https://wa.me/966565638120"
            className="bg-transparent hover:bg-white/10 text-white border border-white/30 px-10 py-5 rounded-xl font-bold transition-all text-sm uppercase tracking-widest"
          >
            {isAr ? "تواصل عبر الواتساب" : "WhatsApp Us"}
          </a>
          <a 
            href="tel:+966565638120"
            className="bg-transparent hover:bg-white/10 text-white border border-white/30 px-10 py-5 rounded-xl font-bold transition-all text-sm uppercase tracking-widest"
          >
            {isAr ? "اتصل الآن" : "Call Now"}
          </a>
        </div>
      </div>
    </section>
  );
}
