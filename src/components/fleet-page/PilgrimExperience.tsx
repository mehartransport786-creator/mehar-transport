"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { MapPin, PlaneTakeoff, Building2, Users2 } from "lucide-react";

export function PilgrimExperience() {
  const locale = useLocale();
  const isAr = locale === "ar";

  const steps = [
    {
      icon: PlaneTakeoff,
      title: isAr ? "استقبال كبار الشخصيات بالمطار" : "VIP Airport Meet & Greet",
      desc: isAr 
        ? "سائقونا بانتظارك في صالة الوصول مع لوحة ترحيبية والمساعدة في حمل الأمتعة."
        : "Our chauffeurs wait in the arrivals hall with a name board, ready to assist with your luggage."
    },
    {
      icon: MapPin,
      title: isAr ? "نقل سلس إلى مكة والمدينة" : "Seamless Holy City Transfers",
      desc: isAr 
        ? "تنقلات هادئة ومريحة بين جدة ومكة المكرمة والمدينة المنورة في مركبات فاخرة."
        : "Serene and comfortable transfers between Jeddah, Makkah, and Madinah in premium vehicles."
    },
    {
      icon: Building2,
      title: isAr ? "توصيل مباشر للفنادق" : "Direct Hotel Drop-offs",
      desc: isAr 
        ? "معرفة تامة بمواقع الفنادق لضمان وصولك مباشرة إلى باب فندقك دون عناء."
        : "Expert knowledge of hotel locations ensuring you are dropped directly at your hotel entrance."
    },
    {
      icon: Users2,
      title: isAr ? "رعاية فائقة للحجاج والمعتمرين" : "Dedicated Pilgrim Care",
      desc: isAr 
        ? "سائقون محترفون ومدربون خصيصاً لتلبية احتياجات ضيوف الرحمن باحترام وتقدير."
        : "Professional chauffeurs specially trained to serve the needs of pilgrims with utmost respect."
    }
  ];

  return (
    <section className="py-24 bg-[#0a0a0a] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-12 h-0.5 bg-[#D9A63A] mx-auto"
          />
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold leading-tight"
          >
            {isAr ? "تجربة العمرة الفاخرة" : "The Luxury Umrah Experience"}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 font-light"
          >
            {isAr 
              ? "نحن نتشرف بخدمة ضيوف الرحمن. تم تصميم خدمات نقل العمرة لدينا لتوفير أقصى درجات السكينة والراحة، لتتفرغ تماماً لعبادتك."
              : "It is our honor to serve the guests of Allah. Our Umrah transportation services are designed to provide maximum serenity and comfort, allowing you to focus entirely on your worship."}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:bg-white/10 transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#D9A63A]/10 flex items-center justify-center text-[#D9A63A] mb-8 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed font-light">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
