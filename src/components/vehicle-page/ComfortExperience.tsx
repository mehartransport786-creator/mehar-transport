"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";

interface ComfortExperienceProps {
  theme: any;
}

export function ComfortExperience({ theme }: ComfortExperienceProps) {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section className="relative rounded-3xl overflow-hidden text-white my-12" style={{ backgroundColor: theme.primary }}>
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
      </div>

      <div className="relative z-10 p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center">
        <div className="w-full md:w-1/2 space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-0.5" style={{ backgroundColor: theme.secondary }}></div>
            <span className="font-bold uppercase tracking-[0.2em] text-sm" style={{ color: theme.secondary }}>
              {isAr ? "تجربة الراحة" : "The Comfort Experience"}
            </span>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold leading-tight">
            {isAr ? "مصممة لراحتك المطلقة" : "Engineered for Absolute Comfort"}
          </h3>

          <p className="text-gray-300 font-light leading-relaxed text-lg">
            {isAr 
              ? "نحن نؤمن بأن الرحلة لا تقل أهمية عن الوجهة. استرخ في مقصورة هادئة، واستمتع بمساحة واسعة للأرجل، وتكييف هواء مثالي يضمن وصولك منتعشاً ومستعداً."
              : "We believe the journey is just as important as the destination. Relax in an acoustically quiet cabin, enjoy expansive legroom, and perfect climate control ensuring you arrive completely refreshed."}
          </p>
        </div>

        <motion.div 
          className="w-full md:w-1/2"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop" 
            alt="Comfort Interior" 
            className="w-full h-full object-cover rounded-2xl shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
