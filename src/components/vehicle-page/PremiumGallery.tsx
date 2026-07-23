"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "@/lib/motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import Image from "next/image";

interface PremiumGalleryProps {
  gallery: [string, string, string];
}

export function PremiumGallery({ gallery }: PremiumGalleryProps) {
  const t = useTranslations('PremiumGallery');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % 3);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + 3) % 3);
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-primary">
          {t("experienceTheVehicle")}
        </h3>
        <span className="text-sm font-bold text-secondary uppercase tracking-wider">
          3 {t("photos")}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-[500px]">
        {/* Large featured image (Luggage/Open Tailgate) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative group cursor-pointer rounded-[var(--radius-card)] overflow-hidden h-[300px] md:h-full bg-slate-50 border border-gray-100"
          onClick={() => openLightbox(0)}
        >
          <Image 
            src={gallery[0]} 
            alt="Luggage Capacity" 
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-[var(--duration-base)]"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Maximize2 className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        {/* Stacked smaller images (Rear Cabin, Dashboard) */}
        <div className="grid grid-cols-2 md:grid-cols-1 grid-rows-1 md:grid-rows-2 gap-4 h-[150px] md:h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative group cursor-pointer rounded-[var(--radius-card)] overflow-hidden h-full bg-slate-50 border border-gray-100"
            onClick={() => openLightbox(1)}
          >
            <Image 
              src={gallery[1]} 
              alt="Rear Cabin" 
              fill
              sizes="(max-width: 768px) 50vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-[var(--duration-base)]"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Maximize2 className="w-6 h-6 text-white" />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative group cursor-pointer rounded-[var(--radius-card)] overflow-hidden h-full bg-slate-50 border border-gray-100"
            onClick={() => openLightbox(2)}
          >
            <Image 
              src={gallery[2]} 
              alt="Dashboard" 
              fill
              sizes="(max-width: 768px) 50vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-[var(--duration-base)]"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Maximize2 className="w-6 h-6 text-white" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50 bg-white/10 p-2 rounded-full"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </button>

            <button 
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50 bg-white/10 p-4 rounded-full"
              onClick={prevImage}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button 
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50 bg-white/10 p-4 rounded-full"
              onClick={nextImage}
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full max-w-[90vw] max-h-[85vh]"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <Image
                src={gallery[selectedImage]}
                alt={`Lightbox ${selectedImage}`}
                fill
                className="object-contain"
              />
            </motion.div>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium tracking-widest bg-black/50 px-4 py-2 rounded-full">
              {selectedImage + 1} / 3
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
