"use client";

import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/routing";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M12.012 2C6.476 2 2 6.475 2 12.012a9.962 9.962 0 001.332 4.975L2 22l5.166-1.355a9.961 9.961 0 004.846 1.258h.004c5.535 0 10.011-4.476 10.011-10.012 0-2.682-1.045-5.204-2.943-7.102A9.972 9.972 0 0012.012 2zM12 20.218a8.307 8.307 0 01-4.238-1.155l-.304-.18-3.147.825.84-3.07-.197-.314a8.31 8.31 0 01-1.272-4.444c0-4.597 3.742-8.34 8.34-8.34 2.228 0 4.323.868 5.898 2.443A8.32 8.32 0 0120.34 11.88c0 4.597-3.74 8.338-8.34 8.338zM16.58 13.98c-.25-.125-1.488-.735-1.718-.82-.23-.083-.398-.125-.565.125-.168.25-.65 .82-.798.988-.148.168-.295.188-.545.063-2.1-.98-3.328-2.148-4.14-3.528-.168-.25.053-.263.26-.525.138-.175.25-.35.405-.525.078-.088.118-.175.185-.25.118-.21.058-.395-.005-.52-.063-.125-.565-1.363-.775-1.868-.203-.49-.41-.423-.565-.43-.15-.008-.323-.008-.49-.008-.168 0-.44.063-.673.313-.233.25-.888.868-.888 2.115s.91 2.453 1.038 2.62c.125.168 1.788 2.73 4.33 3.825.605.26 1.075.415 1.44.53.608.193 1.16.165 1.595.1.485-.073 1.488-.608 1.698-1.195.21-.588.21-1.093.148-1.195-.063-.105-.233-.168-.483-.293z"
      clipRule="evenodd"
    />
  </svg>
);

export function FloatingWhatsApp() {
  const locale = useLocale();
  const pathname = usePathname();
  const isAr = locale === "ar";
  
  if (pathname.startsWith('/booking') || pathname.startsWith('/admin')) {
    return null;
  }
  
  return (
    <a
      href="https://wa.me/966565638120"
      target="_blank"
      rel="noreferrer"
      className="fixed rtl:left-4 ltr:right-4 z-50 bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-[0_4px_12px_rgba(37,211,102,0.3)] hover:bg-[#20bd5a] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(37,211,102,0.4)] transition-all duration-300 flex items-center justify-center group animate-fade-up-luxury"
      style={{ bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))" }}
      aria-label={isAr ? "تواصل معنا عبر واتساب" : "Contact us on WhatsApp"}
    >
      <WhatsAppIcon className="w-7 h-7 md:w-8 md:h-8" />
      
      {/* Tooltip */}
      <span className="absolute rtl:left-full ltr:right-full top-1/2 -translate-y-1/2 rtl:ml-4 ltr:mr-4 px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
        {isAr ? "تحدث معنا" : "Chat with us"}
        {/* Tooltip arrow */}
        <span className="absolute top-1/2 -translate-y-1/2 rtl:-left-1 ltr:-right-1 rtl:border-r-gray-900 ltr:border-l-gray-900 border-[6px] border-transparent" />
      </span>
    </a>
  );
}
