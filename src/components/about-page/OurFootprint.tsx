"use client";

import { motion } from "framer-motion";
import { MapPin, Plane, Building, Car, Briefcase, Star } from "lucide-react";

export function OurFootprint({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  
  const locations = [
    { name: "Makkah", nameAr: "مكة المكرمة", top: "55%", left: "30%" },
    { name: "Jeddah", nameAr: "جدة", top: "50%", left: "25%" },
    { name: "Madinah", nameAr: "المدينة المنورة", top: "35%", left: "28%" },
    { name: "Taif", nameAr: "الطائف", top: "58%", left: "35%" },
    { name: "Riyadh", nameAr: "الرياض", top: "45%", left: "60%" },
    { name: "Yanbu", nameAr: "ينبع", top: "40%", left: "20%" },
  ];

  const highlights = [
    { icon: Plane, title: "Airport Transfers", titleAr: "نقل المطار" },
    { icon: Star, title: "Umrah Transportation", titleAr: "نقل العمرة" },
    { icon: Building, title: "Hotel Transfers", titleAr: "نقل الفنادق" },
    { icon: Car, title: "Intercity Travel", titleAr: "السفر بين المدن" },
    { icon: Briefcase, title: "Corporate Transportation", titleAr: "نقل الشركات" },
    { icon: Star, title: "VIP Transportation", titleAr: "نقل كبار الشخصيات (VIP)" },
  ];

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Abstract Background Map Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container-fluid relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-secondary font-bold tracking-widest uppercase mb-3 text-sm flex items-center gap-4">
              <span className="w-12 h-px bg-secondary"></span>
              {isAr ? 'نطاق خدماتنا' : 'Our Footprint'}
            </h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight mb-8">
              {isAr ? 'تغطية واسعة في جميع أنحاء المملكة' : 'Extensive Coverage Across Saudi Arabia'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 bg-primary-foreground/5 backdrop-blur-sm rounded-[var(--radius-card)] border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors cursor-default">
                  <div className="shrink-0 w-10 h-10 rounded-[var(--radius-btn)] bg-secondary/20 flex items-center justify-center text-secondary">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className={`font-semibold text-primary-foreground ${isAr ? 'font-arabic' : ''}`}>
                    {isAr ? item.titleAr : item.title}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stylized Map Area */}
          <motion.div 
            className="w-full lg:w-1/2 relative aspect-square max-w-lg mx-auto"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-primary-foreground/5 rounded-full border border-primary-foreground/10 shadow-[var(--shadow-luxury)] overflow-hidden">
              {/* Map SVG Representation - Abstract */}
              <svg viewBox="0 0 100 100" className="w-full h-full opacity-30 text-secondary" fill="currentColor">
                <path d="M30,20 C40,10 60,10 70,30 C80,40 70,60 60,80 C50,90 40,90 30,70 C20,50 10,40 30,20 Z" />
              </svg>

              {locations.map((loc, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 + 0.5 }}
                  className="absolute flex flex-col items-center group cursor-pointer"
                  style={{ top: loc.top, left: loc.left }}
                >
                  <div className="w-4 h-4 rounded-full bg-secondary relative z-10 shadow-[0_0_15px_var(--secondary)]">
                    <div className="absolute inset-0 rounded-full bg-secondary animate-ping opacity-50" />
                  </div>
                  <div className="absolute top-6 whitespace-nowrap bg-background text-primary px-3 py-1 rounded-[var(--radius-btn)] text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                    {isAr ? loc.nameAr : loc.name}
                  </div>
                </motion.div>
              ))}

              {/* Connecting lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" style={{ zIndex: 5 }}>
                <path d="M 30% 55% L 25% 50% L 28% 35% L 60% 45% L 35% 58% Z" fill="none" stroke="var(--secondary)" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
              </svg>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-background rounded-[var(--radius-card)] p-6 shadow-[var(--shadow-luxury)] z-20 max-w-[200px]">
              <MapPin className="w-8 h-8 text-secondary mb-2" />
              <div className={`font-bold text-primary ${isAr ? 'font-arabic' : ''}`}>
                {isAr ? 'حضور رئيسي في المطارات والفنادق وطرق الحجاج' : 'Major presence across airports, hotels, and pilgrim routes.'}
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
