"use client";

import { useLocale } from "next-intl";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockFleet } from "@/lib/data";
import { Link } from "@/i18n/routing";
import { ArrowRight, ArrowLeft, Users, Briefcase } from "lucide-react";
import Image from "next/image";

export function FleetShowcase() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  
  // We'll showcase the top 4 premium vehicles on the homepage
  const showcaseVehicles = mockFleet.slice(0, 4);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="section-padding bg-background text-foreground overflow-hidden relative">
      <div className="container-fluid">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-12 lg:mb-16 relative z-10 animate-fade-up-luxury">
          <div className="space-y-4 lg:space-y-6 max-w-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-secondary"></div>
              <span className="text-secondary font-bold uppercase tracking-[0.2em] text-[13px] md:text-sm">
                {isAr ? "أسطولنا" : "Our Fleet"}
              </span>
            </div>
            <h2 className="h2 text-primary leading-tight tracking-tight">
              {isAr ? "اختر السيارة المناسبة لرحلتك" : "Choose the Right Vehicle for Your Journey"}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed max-w-2xl">
              {isAr ? "سواء كنت مسافراً بمفردك أو مع عائلتك أو ضمن مجموعة، أسطولنا يغطي توصيل المطار ورحلات العمرة والسفر بين المدن عبر المملكة." : "Whether travelling alone, with your family, or as part of a larger group, our fleet covers airport transfers, Umrah journeys, intercity travel, and Ziyarah tours throughout Saudi Arabia."}
            </p>
          </div>
          <Link 
            href="/fleet" 
            className="hidden md:inline-flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors group"
          >
            <span>{isAr ? "اكتشف الأسطول كاملاً" : "Explore Full Fleet"}</span>
            <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Interactive Showcase */}
        <div className="flex flex-col lg:flex-row gap-8 h-auto lg:h-[600px] relative z-10">
          
          {/* Main Display Image */}
          <div className="w-full lg:w-2/3 h-[450px] sm:h-[500px] lg:h-full rounded-[var(--radius-image)] overflow-hidden relative group border border-border bg-muted animate-fade-up-luxury" style={{ animationDelay: "0.1s" }}>
            {/* Studio Lighting Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent opacity-60"></div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.05, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 p-8 md:p-16"
              >
                <Image
                  src={showcaseVehicles[activeIndex].image}
                  alt={showcaseVehicles[activeIndex].name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                />
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent pointer-events-none"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="inline-block px-3 py-1 bg-secondary/10 backdrop-blur-md border border-secondary/20 text-secondary rounded-[var(--radius-sm)] text-xs font-bold uppercase tracking-wider mb-3 lg:mb-4">
                    {isAr ? showcaseVehicles[activeIndex].typeAr : showcaseVehicles[activeIndex].type}
                  </div>
                  <h3 className="h3 mb-4 lg:mb-6 text-primary">
                    {isAr ? showcaseVehicles[activeIndex].nameAr : showcaseVehicles[activeIndex].name}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-4 lg:gap-6 mb-6 lg:mb-8 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-secondary" />
                      <span className="text-[15px] font-medium">{showcaseVehicles[activeIndex].passengers} {isAr ? "ركاب" : "Passengers"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-secondary" />
                      <span className="text-[15px] font-medium">{showcaseVehicles[activeIndex].luggage} {isAr ? "حقائب" : "Luggage"}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 lg:gap-4">
                    <Link 
                      href={`/fleet/${showcaseVehicles[activeIndex].slug}`}
                      className="btn-luxury w-full sm:w-auto min-h-[56px] flex items-center justify-center bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground px-8 py-3.5 rounded-[var(--radius-btn)] font-semibold transition-colors text-[15px]"
                    >
                      {isAr ? "التفاصيل والصور" : "Details & Gallery"}
                    </Link>
                    <Link 
                      href={`/booking?vehicle=${showcaseVehicles[activeIndex].id}`}
                      className="w-full sm:w-auto min-h-[56px] flex items-center justify-center bg-transparent border border-primary/20 text-primary hover:bg-primary/5 px-8 py-3.5 rounded-[var(--radius-btn)] font-semibold transition-colors text-[15px]"
                    >
                      {isAr ? "احجز الآن" : "Book Now"}
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Selector List */}
          <div className="w-full lg:w-1/3 flex flex-col gap-3 lg:gap-4 animate-fade-up-luxury" style={{ animationDelay: "0.2s" }}>
            {showcaseVehicles.map((vehicle, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={vehicle.id}
                  onClick={() => setActiveIndex(index)}
                  className={`flex items-center gap-4 p-4 rounded-[var(--radius-card)] transition-all duration-300 text-start group border-2
                    ${isActive 
                      ? 'bg-primary/5 border-secondary shadow-[var(--shadow-luxury)]' 
                      : 'bg-transparent border-border hover:border-primary/20 hover:bg-primary/5'}`}
                >
                  <div className="w-20 h-14 lg:w-24 lg:h-16 rounded-[var(--radius-sm)] overflow-hidden shrink-0 relative bg-white border border-border">
                    <Image 
                      src={vehicle.image} 
                      alt={vehicle.name} 
                      fill
                      sizes="96px"
                      className={`object-contain p-2 transition-transform duration-500 drop-shadow-md ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}
                    />
                    <div className={`absolute inset-0 transition-colors duration-300 ${isActive ? 'bg-secondary/5' : 'bg-transparent group-hover:bg-black/5'}`}></div>
                  </div>
                  <div>
                    <h4 className={`font-bold mb-1 transition-colors text-[15px] lg:text-base ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`}>
                      {isAr ? vehicle.nameAr : vehicle.name}
                    </h4>
                    <p className="text-[10px] lg:text-xs text-secondary uppercase tracking-wider font-bold">
                      {isAr ? vehicle.typeAr : vehicle.type}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

        </div>
        
        <div className="mt-8 md:hidden flex justify-center">
          <Link 
            href="/fleet" 
            className="inline-flex items-center justify-center gap-2 text-primary font-bold hover:text-secondary transition-colors group min-h-[48px] px-6 py-2 border border-primary/20 rounded-[var(--radius-btn)]"
          >
            <span>{isAr ? "اكتشف الأسطول كاملاً" : "Explore Full Fleet"}</span>
            <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
