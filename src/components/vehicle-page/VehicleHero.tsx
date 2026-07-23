"use client";

import { useLocale } from "next-intl";
import { motion } from "@/lib/motion";
import { Users, Briefcase, Calendar } from "lucide-react";
import { Link } from "@/i18n/routing";
import { VehicleData } from "@/data/fleet";
import Image from "next/image";

interface VehicleHeroProps {
  vehicle: VehicleData;
}

export function VehicleHero({ vehicle }: VehicleHeroProps) {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section className="relative min-h-[calc(100svh-5rem)] lg:min-h-[calc(100vh-6rem)] w-full overflow-hidden bg-primary flex items-center pt-20">
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-0.5 bg-secondary" />
                <span className="text-secondary font-bold uppercase tracking-[0.2em] text-sm">
                  {isAr ? vehicle.theme.personalityAr : vehicle.theme.personality}
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                {isAr ? vehicle.nameAr : vehicle.name}
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 font-light mb-10 max-w-2xl leading-relaxed">
                {isAr ? vehicle.seoContent.descriptionAr : vehicle.seoContent.description}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
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
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link 
                href={`/booking?vehicle=${vehicle.slug}`}
                className="bg-secondary text-primary hover:bg-white px-8 py-4 rounded-[var(--radius-card)] font-bold transition-all flex items-center justify-center gap-3 text-sm uppercase tracking-widest shadow-[var(--shadow-luxury)]"
              >
                <Calendar className="w-5 h-5" />
                <span>{isAr ? "احجز الآن" : "Book Now"}</span>
              </Link>
              <a 
                href="https://wa.me/966565638120"
                className="bg-transparent hover:bg-white/10 text-white border border-slate-300 px-8 py-4 rounded-[var(--radius-card)] font-bold transition-all flex items-center justify-center gap-3 text-sm uppercase tracking-widest"
              >
                <span>WhatsApp</span>
              </a>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[600px] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full h-full"
            >
              <Image 
                src={vehicle.heroImage}
                alt={isAr ? vehicle.nameAr : vehicle.name}
                fill
                priority
                className="object-contain drop-shadow-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

