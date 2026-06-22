"use client";

import { motion } from "framer-motion";
import { Handshake, Building2, Globe2, Briefcase, FileText, CheckCircle2 } from "lucide-react";

export function B2BPartnerships({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  
  const partnerships = [
    { icon: Handshake, text: "B2B Transportation Services", textAr: "خدمات النقل بين الشركات (B2B)" },
    { icon: Globe2, text: "Travel Agency Partnerships", textAr: "شراكات وكالات السفر" },
    { icon: Briefcase, text: "Tour Operator Support", textAr: "دعم منظمي الرحلات" },
    { icon: Building2, text: "Corporate Accounts", textAr: "حسابات الشركات" },
    { icon: Building2, text: "Hospitality Collaborations", textAr: "تعاون مع قطاع الضيافة" },
    { icon: FileText, text: "Long-Term Contracts", textAr: "عقود طويلة الأجل" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[#D9A63A] font-bold tracking-widest uppercase mb-3 text-sm">
            {isAr ? 'الثقة والأعمال' : 'International Partnerships'}
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-[#1B1E4F] leading-tight mb-6">
            {isAr ? 'موثوقون من قبل شركاء السفر الدوليين' : 'Trusted by International Travel Partners'}
          </h3>
          <p className={`text-gray-600 text-lg leading-relaxed ${isAr ? 'font-arabic' : ''}`}>
            {isAr 
              ? 'تتعاون ميهار للنقل مع وكالات السفر ومنظمي الرحلات ومقدمي خدمات العمرة وشركات السفر الأوروبية التي تتطلب خدمات نقل موثوقة لعملائها الذين يزورون المملكة العربية السعودية.' 
              : 'Mehar Transport collaborates with travel agencies, tour operators, Umrah service providers, and European travel companies requiring reliable transportation services for their clients visiting Saudi Arabia.'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {partnerships.map((partner, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#F8F9FC] border border-gray-100 rounded-2xl p-6 flex flex-col items-center text-center group hover:border-[#D9A63A]/30 hover:bg-white hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#D9A63A] shadow-sm mb-4 group-hover:scale-110 transition-transform">
                <partner.icon className="w-6 h-6" />
              </div>
              <div className={`font-semibold text-[#1B1E4F] ${isAr ? 'font-arabic' : ''}`}>
                {isAr ? partner.textAr : partner.text}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
