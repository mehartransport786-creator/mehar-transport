"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import Image from "next/image";

export function GallerySection() {
    const t = useTranslations('GallerySection');

  const images = [
    { src: "/routes/jeddah-makkah.webp", aspect: "aspect-[4/3]" },
    { src: "/gallery/chauffeur.webp", aspect: "aspect-[3/4]" },
    { src: "/services/vip.webp", aspect: "aspect-square" },
    { src: "/gallery/haram.webp", aspect: "aspect-[3/4]" },
    { src: "/about/interior.webp", aspect: "aspect-square" },
    { src: "/routes/makkah-madinah.webp", aspect: "aspect-[4/3]" },
  ];

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-0.5 bg-secondary"></div>
              <span className="text-secondary font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                <Camera className="w-4 h-4" />
                {t("thePilgrimExperience")}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              {t("galleryOfExcellence")}
            </h2>
          </div>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className={`relative rounded-3xl overflow-hidden group cursor-pointer break-inside-avoid shadow-sm hover:shadow-xl transition-all duration-500`}
            >
              <div className={`${img.aspect} relative w-full h-full`}>
                <Image 
                  src={img.src} 
                  alt="Mehar Transport Experience" 
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                  <Camera className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
