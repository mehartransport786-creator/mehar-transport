"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Star, CheckCircle2, ShieldCheck, Clock, Check } from "lucide-react";
import Image from "next/image";

export function FeaturedRoutes() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const routes = [
    {
      id: "jed-mak",
      badge: isAr ? "الأكثر طلباً" : "Most Popular",
      rating: "4.9",
      from: isAr ? "مطار جدة" : "Jeddah Airport",
      to: isAr ? "فنادق مكة" : "Makkah Hotels",
      price: "250",
      image: "/routes/makkah-clock-premium.jpg",
      trustFeatures: isAr 
        ? ["تتبع رحلات الطيران", "استقبال وترحيب", "وقت انتظار مجاني", "سائق محترف"]
        : ["Flight Monitoring", "Meet & Greet", "Free Waiting Time", "Professional Driver"]
    },
    {
      id: "mak-mad",
      badge: isAr ? "خدمة فاخرة" : "Premium Transfer",
      rating: "4.8",
      from: isAr ? "مكة المكرمة" : "Makkah",
      to: isAr ? "المدينة المنورة" : "Madinah",
      price: "350",
      image: "/routes/makkah-madinah-premium.jpg",
      trustFeatures: isAr 
        ? ["تنقل خاص", "سيارات فارهة", "خدمة من الباب للباب", "دعم ٢٤/٧"]
        : ["Private Transfer", "Executive Vehicles", "Door-to-Door", "24/7 Support"]
    },
    {
      id: "mad-jed",
      badge: isAr ? "نقل المطار" : "Airport Transfer",
      rating: "4.9",
      from: isAr ? "المدينة المنورة" : "Madinah",
      to: isAr ? "مطار جدة" : "Jeddah Airport",
      price: "350",
      image: "/routes/jeddah-airport-premium.png",
      trustFeatures: isAr 
        ? ["تتبع رحلات الطيران", "تأكيد فوري", "بدون رسوم خفية", "سائق محترف"]
        : ["Flight Tracking", "Instant Confirmation", "No Hidden Fees", "Professional Driver"]
    },
    {
      id: "jed-taif",
      badge: isAr ? "الدرجة الأولى" : "First Class",
      rating: "4.7",
      from: isAr ? "جدة" : "Jeddah",
      to: isAr ? "الطائف" : "Taif",
      price: "400",
      image: "/routes/taif-mountain-premium.png",
      trustFeatures: isAr 
        ? ["تنقل خاص", "سيارات فارهة", "رحلة آمنة", "دعم ٢٤/٧"]
        : ["Private Transfer", "Executive Vehicles", "Safe Journey", "24/7 Support"]
    },
    {
      id: "ruh",
      badge: isAr ? "خدمة رجال الأعمال" : "Executive",
      rating: "5.0",
      from: isAr ? "مطار الرياض" : "Riyadh Airport",
      to: isAr ? "فنادق الرياض" : "Riyadh Hotels",
      price: "300",
      image: "/routes/riyadh-airport-premium.png",
      trustFeatures: isAr 
        ? ["تتبع رحلات الطيران", "استقبال وترحيب", "وقت انتظار مجاني", "تأكيد فوري"]
        : ["Flight Monitoring", "Meet & Greet", "Free Waiting Time", "Instant Confirmation"]
    }
  ];

  return (
    <section className="section-padding bg-[#F8FAFC] relative">
      <div className="container-fluid">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 lg:mb-16 gap-6 animate-fade-up-luxury">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-0.5 bg-[#df9a26]"></div>
              <span className="text-[#df9a26] font-semibold uppercase tracking-[0.2em] text-[13px]">
                {isAr ? "الوجهات الحصرية" : "Exclusive Destinations"}
              </span>
            </div>
            <h2 className="text-[#0F172A] text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              {isAr ? "تنقل فاخر عبر المملكة" : "Premium Chauffeur Routes"}
            </h2>
          </div>
          <Link 
            href="/routes" 
            className="inline-flex items-center justify-center gap-2 text-[#0F172A] font-medium hover:text-[#df9a26] transition-colors group min-h-[48px] px-4 md:px-0 py-2 md:py-0 w-full md:w-auto"
          >
            <span className="text-[18px]">{isAr ? "عرض كل المسارات" : "View All Destinations"}</span>
            <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile Swipeable / Desktop Grid Container */}
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pb-8 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible md:pb-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {routes.map((route, index) => (
            <motion.div 
              key={route.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group bg-white rounded-[24px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#E2E8F0] hover:border-[#df9a26] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-300 ease-out flex flex-col min-w-[85vw] max-w-[400px] md:max-w-none md:min-w-0 snap-center shrink-0 w-full"
            >
              {/* Cinematic Image Container */}
              <div className="aspect-video overflow-hidden relative shrink-0">
                <Image 
                  src={route.image} 
                  alt={`${route.from} to ${route.to}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 group-hover:brightness-105 transition-all duration-700 ease-out"
                />
                
                {/* Premium Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/20 to-transparent opacity-90 transition-opacity duration-300 pointer-events-none"></div>
                
                {/* Badges Floating */}
                <div className="absolute top-5 left-5 right-5 flex justify-between items-start pointer-events-none">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-full text-[13px] font-semibold tracking-wide shadow-sm">
                    {route.badge}
                  </div>
                  <div className="flex items-center gap-1 bg-[#0F172A]/40 backdrop-blur-md px-3 py-1.5 rounded-full text-white border border-white/10">
                    <Star className="w-4 h-4 fill-[#df9a26] text-[#df9a26]" />
                    <span className="text-[13px] font-semibold">{route.rating}</span>
                  </div>
                </div>

                {/* Route Title overlaying image */}
                <div className="absolute bottom-5 left-5 right-5 text-white pointer-events-none">
                  <h3 className="text-[28px] font-semibold leading-tight tracking-tight mb-1 drop-shadow-lg">
                    {route.from}
                  </h3>
                  <div className="flex items-center gap-1.5 text-white/90">
                    <ArrowIcon className="w-4 h-4 text-[#df9a26] shrink-0" />
                    <span className="text-[16px] font-medium">{route.to}</span>
                  </div>
                </div>
              </div>
              
              {/* Card Body */}
              <div className="p-4 md:p-5 flex flex-col flex-1 bg-white relative z-10">
                
                {/* Value Propositions */}
                <div className="grid grid-cols-2 gap-y-2 gap-x-2 mb-4 mt-1">
                  {route.trustFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="bg-[#F8FAFC] p-1 rounded-full shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#df9a26]" />
                      </div>
                      <span className="text-[14px] text-[#1E293B] font-medium leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Price & CTA */}
                <div className="mt-auto pt-4 border-t border-[#E2E8F0]">
                  <div className="flex flex-col mb-3">
                    <span className="text-[#64748B] text-[11px] font-semibold uppercase tracking-wider mb-0.5">
                      {isAr ? "تبدأ الأسعار من" : "Starting From"}
                    </span>
                    <div className="flex items-baseline gap-1 text-[#0F172A]">
                      <span className="text-[28px] font-bold leading-none tracking-tight">{route.price}</span>
                      <span className="text-[14px] font-semibold">SAR</span>
                    </div>
                  </div>
                  
                  <Link 
                    href={`/booking?pickup=${route.from}&dropoff=${route.to}`}
                    className="w-full bg-[#0F172A] text-white group-hover:bg-[#df9a26] group-hover:text-[#0F172A] px-5 py-3 rounded-[10px] font-medium text-[15px] transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(15,23,42,0.1)] group-hover:shadow-[0_8px_25px_rgba(248,167,49,0.3)]"
                  >
                    <span>{isAr ? "احجز تنقلك الفاخر" : "Book Premium Transfer"}</span>
                    <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Trust Indicators (Optional Footer for the section) */}
        <div className="mt-12 lg:mt-16 pt-8 border-t border-[#E2E8F0] flex flex-wrap justify-center gap-x-8 gap-y-4">
          {[
            { icon: ShieldCheck, text: isAr ? "شركة سعودية مرخصة" : "Licensed Saudi Company" },
            { icon: Clock, text: isAr ? "تأكيد فوري" : "Instant Confirmation" },
            { icon: CheckCircle2, text: isAr ? "بدون رسوم خفية" : "No Hidden Fees" }
          ].map((trust, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <trust.icon className="w-5 h-5 text-[#df9a26]" />
              <span className="text-[15px] font-medium text-[#64748B]">{trust.text}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
