"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";

export default function PackageGallery({ images, locale }: { images: string[], locale: string }) {
  const isAr = locale === "ar";
  
  // Provide default luxury images if the package has none or too few
  const defaultImages = [
    "/fleet/yukon.webp",
    "/fleet/staria.webp",
    "/hero-makkah.webp",
    "/fleet/coaster.webp"
  ];

  const galleryImages = images && images.length > 0 ? images : defaultImages;

  return (
    <section className="py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-[#1B1E4F]/5 flex items-center justify-center text-[#1B1E4F]">
          <ImageIcon className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-bold text-[#1B1E4F]">
          {isAr ? "معرض الصور" : "Package Gallery"}
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {galleryImages.map((src, idx) => {
          const isFeatured = idx === 0;
          return (
            <div 
              key={idx} 
              className={`relative rounded-2xl overflow-hidden group ${isFeatured ? 'col-span-2 row-span-2 md:col-span-2 md:row-span-2 h-64 md:h-full' : 'h-32 md:h-48'}`}
            >
              <Image 
                src={src} 
                alt={`Gallery image ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
