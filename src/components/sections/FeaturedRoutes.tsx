"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Clock, Map, Car, CreditCard } from "lucide-react";
import { PremiumIcon } from "@/components/ui/PremiumIcon";
import Image from "next/image";

export function FeaturedRoutes() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const routes = [
    {
      id: "jed-mak",
      from: isAr ? "مطار جدة" : "Jeddah Airport",
      to: isAr ? "مكة المكرمة" : "Makkah",
      distance: "100 km",
      time: "1h 15m",
      vehicles: "Camry, Staria, GMC",
      price: "250",
      image: "/routes/jeddah-makkah.webp"
    },
    {
      id: "mak-mad",
      from: isAr ? "مكة المكرمة" : "Makkah",
      to: isAr ? "المدينة المنورة" : "Madinah",
      distance: "450 km",
      time: "4h 30m",
      vehicles: "S-Class, Hiace, H1",
      price: "1200",
      image: "/routes/makkah-madinah.webp"
    },
    {
      id: "mad-jed",
      from: isAr ? "المدينة المنورة" : "Madinah",
      to: isAr ? "مطار جدة" : "Jeddah Airport",
      distance: "420 km",
      time: "4h 00m",
      vehicles: "Camry, Staria, Coaster",
      price: "1100",
      image: "/routes/madinah-jeddah.webp"
    }
  ];

  return (
    <section className="py-32 bg-slate-50 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-0.5 bg-secondary"></div>
              <span className="text-secondary font-bold uppercase tracking-widest text-sm">
                {isAr ? "الوجهات الأكثر طلباً" : "Popular Routes"}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              {isAr ? "مسارات صُممت لراحتك" : "Journeys Designed for Comfort"}
            </h2>
          </div>
          <Link 
            href="/routes" 
            className="inline-flex items-center gap-2 text-secondary font-bold hover:text-primary transition-colors group"
          >
            {isAr ? "عرض كل المسارات" : "View All Routes"}
            <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {routes.map((route, index) => (
            <motion.div 
              key={route.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <Image 
                  src={route.image} 
                  alt={`${route.from} to ${route.to}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-lg">{route.from}</span>
                    <ArrowIcon className="w-5 h-5 text-secondary" />
                    <span className="font-semibold text-lg">{route.to}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <PremiumIcon icon={Map} size="sm" />
                    <div>
                      <span className="block text-muted-foreground text-xs">{isAr ? "المسافة" : "Distance"}</span>
                      <span className="font-bold text-primary">{route.distance}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <PremiumIcon icon={Clock} size="sm" />
                    <div>
                      <span className="block text-muted-foreground text-xs">{isAr ? "الزمن التقديري" : "Est. Time"}</span>
                      <span className="font-bold text-primary">{route.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm col-span-2">
                    <PremiumIcon icon={Car} size="sm" />
                    <div>
                      <span className="block text-muted-foreground text-xs">{isAr ? "السيارات المتاحة" : "Available Vehicles"}</span>
                      <span className="font-bold text-primary">{route.vehicles}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <div>
                    <span className="text-muted-foreground text-xs block">{isAr ? "يبدأ من" : "Starting from"}</span>
                    <span className="text-xl font-bold text-primary">{route.price} SAR</span>
                  </div>
                  <Link 
                    href={`/booking?pickup=${route.from}&dropoff=${route.to}`}
                    className="bg-primary text-white hover:bg-secondary px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors"
                  >
                    {isAr ? "احجز المسار" : "Book Route"}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
