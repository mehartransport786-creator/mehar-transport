"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users, Briefcase } from "lucide-react";
import Link from "next/link";

export function AboutFleetShowcase({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  
  const fleet = [
    {
      name: "Toyota Camry",
      image: "/fleet/camry.png",
      pax: 4,
      bags: 2,
      category: "Executive Sedan",
    },
    {
      name: "GMC Yukon",
      image: "/fleet/gmc.png",
      pax: 7,
      bags: 7,
      category: "Luxury SUV",
    },
    {
      name: "Hyundai Staria",
      image: "/fleet/staria.png",
      pax: 7,
      bags: 7,
      category: "Premium Van",
    },
    {
      name: "Toyota Hiace",
      image: "/fleet/hiace.png",
      pax: 12,
      bags: 12,
      category: "Group Van",
    }
  ];

  return (
    <section className="py-24 bg-[#F5F4F1]">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-[#D9A63A] font-bold tracking-widest uppercase mb-3 text-sm">
              {isAr ? 'أسطولنا الفاخر' : 'Our Luxury Fleet'}
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold text-[#1B1E4F]">
              {isAr ? '100+ مركبة جاهزة لخدمتكم' : '100+ Vehicles Ready To Serve'}
            </h3>
          </div>
          <Link 
            href={`/${locale}/fleet`}
            className="hidden md:inline-flex items-center gap-2 text-[#1B1E4F] font-bold hover:text-[#D9A63A] transition-colors"
          >
            {isAr ? 'استكشف الأسطول' : 'Explore Fleet'}
            <ArrowRight className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fleet.map((vehicle, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#1B1E4F]/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {vehicle.category}
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-[#1B1E4F] mb-4">{vehicle.name}</h4>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#D9A63A]" />
                    <span>{vehicle.pax} {isAr ? 'ركاب' : 'Pax'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-[#D9A63A]" />
                    <span>{vehicle.bags} {isAr ? 'حقائب' : 'Bags'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link 
            href={`/${locale}/fleet`}
            className="inline-flex items-center gap-2 text-[#1B1E4F] font-bold hover:text-[#D9A63A] transition-colors"
          >
            {isAr ? 'استكشف الأسطول' : 'Explore Fleet'}
            <ArrowRight className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} />
          </Link>
        </div>
      </div>
    </section>
  );
}
