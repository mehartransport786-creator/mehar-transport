"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import Image from "next/image";

interface PremiumGalleryProps {
  gallery: string[];
}

export function PremiumGallery({ gallery }: PremiumGalleryProps) {
    const t = useTranslations('PremiumGallery');
  
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // If there are less than 4 images, duplicate them safely just to fill the grid nicely for the demo
  const displayGallery = gallery.length >= 4 ? gallery : [...gallery, ...gallery, ...gallery].slice(0, 4);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % displayGallery.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + displayGallery.length) % displayGallery.length);
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-[#1B1E4F]">
          {t("experienceTheVehicle")}
        </h3>
        <span className="text-sm font-bold text-[#D9A63A] uppercase tracking-wider">
          {displayGallery.length} {t("photos")}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Large featured image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="col-span-2 row-span-2 relative group cursor-pointer rounded-2xl overflow-hidden aspect-video md:aspect-auto h-[300px] md:h-full"
          onClick={() => openLightbox(0)}
        >
          <Image 
            src={displayGallery[0]} 
            alt="Gallery Featured" 
            fill
            sizes="(max-width: 768px) 100vw, 66vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Maximize2 className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        {/* Grid of smaller images */}
        {displayGallery.slice(1, 5).map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="relative group cursor-pointer rounded-2xl overflow-hidden aspect-square md:aspect-[4/3]"
            onClick={() => openLightbox(idx + 1)}
          >
            <Image 
              src={img} 
              alt={`Gallery ${idx + 1}`} 
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Maximize2 className="w-6 h-6 text-white" />
            </div>
            
            {/* Show "View All" overlay on the last small image if there are more */}
            {idx === 3 && displayGallery.length > 5 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                <span className="text-white font-bold text-lg">+{displayGallery.length - 5}</span>
              </div>
            )}
          </motion.div>
        ))}
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
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={displayGallery[selectedImage]}
                alt={`Lightbox ${selectedImage}`}
                fill
                className="object-contain"
              />
            </motion.div>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium tracking-widest bg-black/50 px-4 py-2 rounded-full">
              {selectedImage + 1} / {displayGallery.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
