"use client";

import { useLocale } from "next-intl";
import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  const locale = useLocale();
  const isAr = locale === "ar";
  
  return (
    <a
      href="https://wa.me/966565638120"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 rtl:left-6 ltr:right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#20bd5a] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(37,211,102,0.4)] transition-all duration-300 flex items-center justify-center group"
      aria-label={isAr ? "تواصل معنا عبر واتساب" : "Contact us on WhatsApp"}
    >
      <MessageCircle className="w-8 h-8" />
      
      {/* Tooltip */}
      <span className="absolute rtl:left-full ltr:right-full top-1/2 -translate-y-1/2 rtl:ml-4 ltr:mr-4 px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
        {isAr ? "تحدث معنا" : "Chat with us"}
        {/* Tooltip arrow */}
        <span className="absolute top-1/2 -translate-y-1/2 rtl:-left-1 ltr:-right-1 rtl:border-r-gray-900 ltr:border-l-gray-900 border-[6px] border-transparent" />
      </span>
    </a>
  );
}
