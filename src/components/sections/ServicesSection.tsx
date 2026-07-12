"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Plane, Building, Crown, Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";

export function ServicesSection() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const services = [
    {
      id: "airport",
      icon: Plane,
      title: isAr ? "توصيل المطار" : "Airport Transfers",
      description: isAr 
        ? "نستقبلك بجلسة استقبال رسمية في مطارات جدة ومكة والمدينة المنورة، مع متابعة لحظية لرحلتك لضمان توقيت الاستقبال بدقة." 
        : "Professional meet-and-greet at Jeddah, Makkah, and Madinah airports. We monitor your flight in real time to ensure your driver is always ready on arrival.",
      image: "/services/airport.png"
    },
    {
      id: "umrah",
      icon: Crown,
      title: isAr ? "نقل العمرة الخاص" : "Private Umrah Transportation",
      description: isAr 
        ? "تنقلات خاصة ومحجوزة مسبقاً بين مطار جدة، مكة المكرمة، والمدينة المنورة — التسعيرة ثابتة ولا مفاجآت." 
        : "Pre-booked private transfers between Jeddah Airport, Makkah, and Madinah. Fixed pricing, no shared rides, and professional drivers experienced on all Umrah routes.",
      image: "/services/umrah.png"
    },
    {
      id: "intercity",
      icon: Building,
      title: isAr ? "السفر بين المدن" : "Intercity Travel",
      description: isAr 
        ? "تنقلات مريحة بين مكة والمدينة وجدة والرياض والطائف وينبع — بسيارات مريحة وسائقين محترفين." 
        : "Comfortable private travel between Makkah, Madinah, Jeddah, Riyadh, Taif, and Yanbu. Ideal for families, pilgrims, and corporate travelers covering longer distances.",
      image: "/services/corporate.png"
    },
    {
      id: "ziyarah",
      icon: Clock,
      title: isAr ? "جولات الزيارة" : "Ziyarah Tours",
      description: isAr 
        ? "نرتب رحلات زيارة خاصة إلى المواقع الإسلامية في مكة والمدينة ومحيطهما — سائق مخصص لك مدة الجولة كاملة." 
        : "Arranged visits to Islamic historical sites in and around Makkah and Madinah. A dedicated driver accompanies your group throughout the full tour.",
      image: "/services/hourly.png"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-fluid">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-12 lg:mb-16">
          <div className="space-y-4 lg:space-y-6 max-w-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-secondary"></div>
              <span className="caption-text text-secondary tracking-[0.2em]">
                {isAr ? "خدمات النقل" : "Our Transportation Services"}
              </span>
            </div>
            <h2 className="h2 text-primary leading-tight">
              {isAr ? "نقل خاص لكل رحلة" : "Private Transportation for Every Journey"}
            </h2>
          </div>
          <Link 
            href="/services" 
            className="hidden md:inline-flex items-center justify-center gap-2 text-primary font-bold hover:text-secondary transition-colors group min-h-[48px] px-6 py-2 border border-border hover:border-secondary/50 rounded-[var(--radius-btn)]"
          >
            <span>{isAr ? "عرض كل الخدمات" : "View All Services"}</span>
            <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => (
            <motion.div 
              key={service.id} 
              variants={itemVariants}
              className="group relative h-[400px] lg:h-[450px] rounded-[var(--radius-card)] overflow-hidden cursor-pointer shadow-[var(--shadow-luxury)] border border-border"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />
              </div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-500 group-hover:from-black"></div>

              {/* Content */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 lg:p-8 text-primary-foreground">
                <div className="bg-white/10 backdrop-blur-md w-14 h-14 rounded-[var(--radius-sm)] flex items-center justify-center mb-6 border border-white/20 transform transition-transform duration-500 group-hover:-translate-y-2 shadow-[var(--shadow-luxury)]">
                  <service.icon className="w-7 h-7 text-secondary" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3 transform transition-transform duration-500 group-hover:-translate-y-2 tracking-tight">
                  {service.title}
                </h3>
                
                {/* Always show description on mobile since hover doesn't exist, use group-hover on desktop */}
                <div className="overflow-hidden h-auto md:h-0 group-hover:h-auto transition-all duration-500 opacity-100 md:opacity-0 group-hover:opacity-100">
                  <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6 transform translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 font-light">
                    {service.description}
                  </p>
                  <Link 
                    href="/booking"
                    className="inline-flex items-center gap-2 text-secondary font-bold text-[15px] uppercase tracking-wider hover:text-white transition-colors py-2"
                  >
                    <span>{isAr ? "احجز الخدمة" : "Book Service"}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8 md:hidden flex justify-center">
          <Link 
            href="/services" 
            className="w-full inline-flex items-center justify-center gap-2 text-primary font-bold hover:text-secondary transition-colors group min-h-[56px] px-6 py-3 border border-border rounded-[var(--radius-btn)]"
          >
            <span>{isAr ? "عرض كل الخدمات" : "View All Services"}</span>
            <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
