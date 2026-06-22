"use client";

import { useTranslations } from "next-intl";

export function InteractiveMap() {
  const t = useTranslations("ContactPage.map");

  return (
    <section className="relative w-full h-[500px] lg:h-[600px] bg-slate-100 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
      <iframe 
        width="100%" 
        height="100%" 
        style={{ border: 0 }} 
        loading="lazy" 
        allowFullScreen 
        referrerPolicy="no-referrer-when-downgrade" 
        src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Mehar%20Umrah%20Transport,%20Jeddah,%20Saudi%20Arabia&t=&z=14&ie=UTF8&iwloc=B&output=embed">
      </iframe>

      {/* Floating Panel for Directions */}
      <div className="absolute top-8 left-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/50 hidden md:block w-72 pointer-events-none">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t("title")}</h3>
        <ul className="space-y-3 pointer-events-auto">
          {["Jeddah Airport", "Makkah", "Madinah"].map((landmark, idx) => (
            <li key={idx} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium cursor-default transition-colors">
              <div className="w-2 h-2 rounded-full bg-[#D9A63A]" />
              {landmark}
            </li>
          ))}
        </ul>
        <a 
          href="https://maps.app.goo.gl/Qrz4rQjfFJt89i45A" 
          target="_blank"
          rel="noreferrer"
          className="w-full mt-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors block text-center pointer-events-auto shadow-lg"
        >
          {t("directions")}
        </a>
      </div>
    </section>
  );
}
