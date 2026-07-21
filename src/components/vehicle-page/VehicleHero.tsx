"use client";

import { useLocale } from "next-intl";
import { motion, useScroll, useTransform } from "@/lib/motion";
import { useRef } from "react";
import { Users, Briefcase, Calendar, ChevronDown } from "lucide-react";
import { Link } from "@/i18n/routing";

interface VehicleHeroProps {
  vehicle: any;
  details: any;
}

export function VehicleHero({ vehicle, details }: VehicleHeroProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={heroRef} className="relative h-[90vh] min-h-[600px] w-full overflow-hidden bg-black flex items-center pt-24">
      {/* Background Image with Parallax */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <img 
          src={vehicle.image} 
          alt={isAr ? vehicle.nameAr : vehicle.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-0.5 bg-secondary" />
              <span className="text-secondary font-bold uppercase tracking-[0.2em] text-sm">
                {isAr ? details.theme.personalityAr : details.theme.personality}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {isAr ? vehicle.nameAr : vehicle.name}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 font-light mb-10 max-w-2xl leading-relaxed">
              {isAr ? vehicle.descriptionAr : vehicle.description}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap items-center gap-8 mb-12"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-lg">{vehicle.passengers}</div>
                <div className="text-gray-400 text-xs uppercase tracking-wider">{isAr ? "ركاب" : "Passengers"}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-lg">{vehicle.luggage}</div>
                <div className="text-gray-400 text-xs uppercase tracking-wider">{isAr ? "حقائب" : "Luggage"}</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link 
              href={`/booking?vehicle=${vehicle.id}`}
              className="bg-secondary text-primary hover:bg-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 text-sm uppercase tracking-widest shadow-xl"
            >
              <Calendar className="w-5 h-5" />
              <span>{isAr ? "احجز الآن" : "Book Now"}</span>
            </Link>
            <a 
              href="https://wa.me/966565638120"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 text-sm uppercase tracking-widest"
            >
              <span>WhatsApp</span>
            </a>
          </motion.div>

        </div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/50 hidden md:block"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </section>
  );
}
