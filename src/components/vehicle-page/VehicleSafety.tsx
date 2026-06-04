"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ShieldCheck, MapPin, Wrench, ShieldAlert } from "lucide-react";

export function VehicleSafety() {
  const locale = useLocale();
  const isAr = locale === "ar";

  const safetyFeatures = [
    {
      icon: ShieldCheck,
      title: isAr ? "سائقون معتمدون" : "Certified Chauffeurs",
      desc: isAr ? "تم فحص خلفيات جميع السائقين وتدريبهم." : "All drivers are background-checked and trained."
    },
    {
      icon: MapPin,
      title: isAr ? "تتبع GPS 24/7" : "24/7 GPS Tracking",
      desc: isAr ? "مراقبة الرحلات لضمان أمانك." : "Active fleet monitoring for your security."
    },
    {
      icon: ShieldAlert,
      title: isAr ? "تأمين شامل" : "Comprehensive Insurance",
      desc: isAr ? "تغطية تأمينية كاملة لجميع الركاب." : "Full coverage insurance for all passengers."
    },
    {
      icon: Wrench,
      title: isAr ? "صيانة دورية" : "Rigorous Maintenance",
      desc: isAr ? "فحوصات سلامة منتظمة لجميع المركبات." : "Regular safety inspections and servicing."
    }
  ];

  return (
    <section className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm mt-12">
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
        <div className="w-16 h-16 bg-[#1B1E4F]/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-8 h-8 text-[#1B1E4F]" />
        </div>
        <h3 className="text-3xl font-bold text-[#1B1E4F]">
          {isAr ? "سلامتك أولويتنا" : "Your Safety is Our Priority"}
        </h3>
        <p className="text-gray-500">
          {isAr 
            ? "نطبق أعلى معايير السلامة والأمان في كل رحلة لضمان راحة بالك."
            : "We implement the highest safety and security standards on every journey to ensure your peace of mind."}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {safetyFeatures.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                <Icon className="w-5 h-5 text-[#D9A63A]" />
              </div>
              <h4 className="font-bold text-[#1B1E4F] mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
