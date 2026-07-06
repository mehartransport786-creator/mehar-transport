"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function WhyChooseUs({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  
  const advantages = [
    { text: "Established Since 2016", textAr: "تأسست منذ عام 2016" },
    { text: "Registered Makkah Company", textAr: "شركة مسجلة في مكة" },
    { text: "100+ Vehicle Fleet", textAr: "أسطول يتجاوز 100 مركبة" },
    { text: "Airport Specialists", textAr: "متخصصون في نقل المطار" },
    { text: "Umrah Transportation Experts", textAr: "خبراء في نقل العمرة" },
    { text: "B2B Partnerships", textAr: "شراكات مع وكالات السفر" },
    { text: "Multilingual Support", textAr: "دعم متعدد اللغات" },
    { text: "24/7 Availability", textAr: "متاحون على مدار الساعة" },
    { text: "Modern Booking Platform", textAr: "منصة حجز حديثة" },
    { text: "Real-Time Operations", textAr: "عمليات في الوقت الفعلي" },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <motion.div 
            className="flex-1 w-full"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[#D9A63A] font-bold tracking-widest uppercase mb-3 text-sm flex items-center gap-4">
              <span className="w-12 h-px bg-[#D9A63A]"></span>
              {isAr ? 'لماذا ميهار للنقل؟' : 'Why Choose Mehar Transport'}
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold text-[#1B1E4F] leading-tight mb-6">
              {isAr ? 'المعايير القياسية للتميز في النقل' : 'The Gold Standard in Transportation Excellence'}
            </h3>
            <p className={`text-gray-600 text-lg leading-relaxed mb-8 ${isAr ? 'font-arabic' : ''}`}>
              {isAr 
                ? 'نحن نجمع بين الخبرة العميقة، والأسطول الفاخر، والتكنولوجيا المتقدمة لنقدم لك تجربة نقل لا مثيل لها تلبي أعلى المعايير العالمية.' 
                : 'We combine deep local expertise, a premium fleet, and advanced technology to provide an unparalleled transportation experience that meets the highest global standards.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
              {advantages.map((adv, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#D9A63A] shrink-0" />
                  <span className={`font-semibold text-[#1B1E4F] ${isAr ? 'font-arabic' : ''}`}>
                    {isAr ? adv.textAr : adv.text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="flex-1 relative w-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[#1B1E4F]/10 z-10" />
              <img 
                src="/about/chauffeur.webp" 
                alt="Premium Chauffeur" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative background shape */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border-2 border-[#D9A63A]/20 rounded-full -z-10" />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
