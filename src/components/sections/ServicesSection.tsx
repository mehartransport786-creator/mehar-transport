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
      title: isAr ? "نقل المطار المتميز" : "Premium Airport Transfers",
      description: isAr 
        ? "استقبال لا تشوبه شائبة في مطارات المملكة الرئيسية مع تتبع لحظي لرحلتك." 
        : "Impeccable meet-and-greet at major Saudi airports with real-time flight tracking.",
      image: "/services/airport.webp"
    },
    {
      id: "corporate",
      icon: Building,
      title: isAr ? "نقل الشركات التنفيذي" : "Executive Corporate Travel",
      description: isAr 
        ? "أسطول فاخر لتلبية احتياجات الشركات ورجال الأعمال بكفاءة وخصوصية." 
        : "A luxury fleet tailored for corporate professionals demanding efficiency and privacy.",
      image: "/services/corporate.webp"
    },
    {
      id: "vip",
      icon: Crown,
      title: isAr ? "خدمات كبار الشخصيات" : "VIP & Protocol Services",
      description: isAr 
        ? "أقصى درجات الفخامة والأمان لرحلات الشخصيات الهامة والوفود." 
        : "The highest level of luxury and security for VIPs and official delegations.",
      image: "/services/vip.webp"
    },
    {
      id: "hourly",
      icon: Clock,
      title: isAr ? "سائق تحت التصرف" : "Hourly Chauffeur",
      description: isAr 
        ? "مرونة تامة مع سائق مخصص لتنقلاتك المتعددة على مدار الساعة." 
        : "Total flexibility with a dedicated driver at your disposal by the hour.",
      image: "/services/hourly.webp"
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
    <section className="py-24 lg:py-32 bg-[#F5F4F1]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-6 max-w-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-[#D9A63A]"></div>
              <span className="text-[#D9A63A] font-bold uppercase tracking-[0.2em] text-sm">
                {isAr ? "خدماتنا المخصصة" : "Bespoke Services"}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1B1E4F] leading-tight tracking-tight">
              {isAr ? "مصممة لتجاوز التوقعات" : "Designed to Exceed Expectations"}
            </h2>
          </div>
          <Link 
            href="/services" 
            className="hidden md:inline-flex items-center gap-2 text-[#1B1E4F] font-bold hover:text-[#D9A63A] transition-colors group"
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
              className="group relative h-[400px] lg:h-[450px] rounded-2xl overflow-hidden cursor-pointer"
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
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/40 to-transparent transition-opacity duration-500 group-hover:from-[#0a0a0a]"></div>

              {/* Content */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 text-white">
                <div className="bg-white/10 backdrop-blur-md w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-white/20 transform transition-transform duration-500 group-hover:-translate-y-2">
                  <service.icon className="w-6 h-6 text-[#D9A63A]" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3 transform transition-transform duration-500 group-hover:-translate-y-2">
                  {service.title}
                </h3>
                
                <div className="overflow-hidden h-0 group-hover:h-auto transition-all duration-500 opacity-0 group-hover:opacity-100">
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    {service.description}
                  </p>
                  <Link 
                    href="/booking"
                    className="inline-flex items-center gap-2 text-[#D9A63A] font-bold text-sm uppercase tracking-wider"
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
            className="inline-flex items-center gap-2 text-[#1B1E4F] font-bold hover:text-[#D9A63A] transition-colors group"
          >
            <span>{isAr ? "عرض كل الخدمات" : "View All Services"}</span>
            <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
