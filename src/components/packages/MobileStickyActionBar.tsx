"use client";

import { MessageCircle, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileStickyActionBar({ pkg, locale, selectedVehicleId }: { pkg: any, locale: string, selectedVehicleId: string }) {
  const isAr = locale === "ar";
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling down a bit
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBookNow = () => {
    window.location.href = `/${locale}/booking?package=${pkg.slug}&vehicle=${selectedVehicleId}`;
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/966565638120?text=${encodeURIComponent(`Hello, I am interested in the ${pkg.name} package.`)}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] p-4 lg:hidden flex gap-3"
        >
          <button 
            onClick={handleWhatsApp}
            className="w-14 h-14 bg-[#25D366] text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-[#25D366]/20"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
          
          <button 
            onClick={handleBookNow}
            className="flex-1 bg-[#D9A63A] text-[#1B1E4F] rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-[#D9A63A]/20"
          >
            {isAr ? "احجز الآن" : "Book Now"}
            <ArrowRight className="w-5 h-5 rtl:rotate-180" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
