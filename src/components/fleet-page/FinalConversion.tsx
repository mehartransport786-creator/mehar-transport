"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Calendar, MessageCircle, Phone, FileText } from "lucide-react";

export function FinalConversion() {
    const t = useTranslations('FinalConversion');
  const locale = useLocale();

  return (
    <section className="py-32 bg-[#1B1E4F] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D9A63A]/20 via-[#1B1E4F] to-[#1B1E4F]"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1000px] relative z-10">
        
        <div className="text-center space-y-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {t("chooseThePerfectVehicleForYourJourney")}
          </h2>
          
          <p className="text-xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto">
            {t("whetherYouAreTravelingAloneWithFamilyOrM")}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link 
              href="/booking"
              className="w-full sm:w-auto bg-[#D9A63A] text-[#1B1E4F] hover:bg-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 shadow-2xl group"
            >
              <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>{t("bookNow")}</span>
            </Link>
            
            <a 
              href="mailto:quote@mehar-transport.com"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3"
            >
              <FileText className="w-5 h-5" />
              <span>{t("requestQuote")}</span>
            </a>
            
            <a 
              href="https://wa.me/966565638120"
              className="w-full sm:w-auto bg-[#25D366] text-white hover:bg-[#20bd5a] px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </a>

            <a 
              href="tel:+966565638120"
              className="w-full sm:w-auto hover:bg-white/5 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3"
            >
              <Phone className="w-5 h-5 text-[#D9A63A]" />
              <span>{t("callUs")}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
