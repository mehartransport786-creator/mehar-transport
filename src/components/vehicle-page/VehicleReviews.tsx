"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface VehicleReviewsProps {
  reviews: any[];
  theme: any;
}

export function VehicleReviews({ reviews, theme }: VehicleReviewsProps) {
  const locale = useLocale();
  const isAr = locale === "ar";

  if (!reviews || reviews.length === 0) return null;

  return (
    <section>
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-0.5" style={{ backgroundColor: theme.secondary }}></div>
        <span className="font-bold uppercase tracking-[0.2em] text-sm" style={{ color: theme.secondary }}>
          {isAr ? "آراء العملاء" : "Customer Stories"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden"
          >
            <Quote className="absolute top-6 right-6 w-16 h-16 text-slate-50 rtl:left-6 rtl:right-auto rotate-180" />
            
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`} />
              ))}
            </div>

            <p className="text-gray-600 italic mb-6 relative z-10 text-lg leading-relaxed">
              "{isAr ? review.reviewAr : review.review}"
            </p>

            <div className="flex items-center gap-4 mt-auto">
              {review.image ? (
                <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400">
                  {review.name.charAt(0)}
                </div>
              )}
              <div>
                <h4 className="font-bold text-primary">{review.name}</h4>
                <p className="text-xs text-gray-500">{review.country} • {routeText(review.route)}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );

  function routeText(route: string) {
    if (isAr) {
      if (route.includes("Jeddah Airport to Hotel")) return "مطار جدة إلى الفندق";
      if (route.includes("Makkah to Jeddah")) return "مكة إلى جدة";
      if (route.includes("Jeddah to Makkah")) return "جدة إلى مكة";
      if (route.includes("Madinah to Makkah")) return "المدينة إلى مكة";
      if (route.includes("Ziyarat")) return "جولات المزارات";
      if (route.includes("Riyadh")) return "الرياض";
    }
    return route;
  }
}
