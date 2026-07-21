"use client";

import { motion } from "@/lib/motion";
import { ShieldCheck, FileText, Briefcase, Car, Building, CheckCircle2 } from "lucide-react";

export function RegisteredCompany({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  
  const features = [
    { icon: Building, text: "Registered in Makkah", textAr: "مسجلة في مكة المكرمة" },
    { icon: Map, text: "Saudi Arabia Operations", textAr: "عمليات في السعودية" },
    { icon: Briefcase, text: "Professional Drivers", textAr: "سائقون محترفون" },
    { icon: Car, text: "Commercial Fleet", textAr: "أسطول تجاري" },
    { icon: ShieldCheck, text: "Insurance Coverage", textAr: "تغطية تأمينية" },
    { icon: FileText, text: "Regulatory Compliance", textAr: "امتثال تنظيمي" },
    { icon: ShieldCheck, text: "Transportation Licensing", textAr: "تراخيص النقل" },
  ];

  return (
    <section className="py-24 bg-muted/50 overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <motion.div 
            className="flex-1 w-full"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/5] relative">
                    <div className="absolute inset-0 bg-primary/20 z-10" />
                    <img src="/fleet/yukon.webp" alt="Operations" className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-xl aspect-square relative">
                    <div className="absolute inset-0 bg-secondary/20 z-10" />
                    <img src="/fleet/staria.webp" alt="Fleet" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-xl aspect-square relative">
                    <div className="absolute inset-0 bg-primary/20 z-10" />
                    <img src="/fleet/hiace.webp" alt="Team" className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/5] relative">
                    <div className="absolute inset-0 bg-secondary/20 z-10" />
                    <img src="/fleet/camry.webp" alt="Office" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              
              {/* Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background rounded-full p-6 shadow-2xl z-20 flex flex-col items-center justify-center border-4 border-muted/50">
                <ShieldCheck className="w-12 h-12 text-secondary mb-1" />
                <span className="font-bold text-primary text-sm uppercase tracking-wider">Verified</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="flex-1 space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h2 className="text-secondary font-bold tracking-widest uppercase mb-3 text-sm flex items-center gap-4">
                <span className="w-12 h-px bg-secondary"></span>
                {isAr ? 'الاعتماد والموثوقية' : 'Trust & Compliance'}
              </h2>
              <h3 className="text-3xl md:text-5xl font-bold text-primary leading-tight mb-6">
                {isAr ? 'شركة نقل مرخصة ومسجلة' : 'Registered & Licensed Transportation Company'}
              </h3>
              <p className={`text-muted-foreground text-lg leading-relaxed ${isAr ? 'font-arabic' : ''}`}>
                {isAr 
                  ? 'ميهار للنقل هي كيان تجاري معتمد يعمل بأعلى درجات الامتثال للقوانين السعودية، لنضمن لكم رحلات آمنة وموثوقة.' 
                  : 'Mehar Transport is a fully verified commercial entity operating with the highest level of regulatory compliance in Saudi Arabia, ensuring safe and reliable journeys for our clients.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                  <span className={`font-semibold text-primary ${isAr ? 'font-arabic' : ''}`}>
                    {isAr ? feature.textAr : feature.text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
