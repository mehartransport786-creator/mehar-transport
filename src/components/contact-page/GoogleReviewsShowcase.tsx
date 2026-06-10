"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Star, CheckCircle } from "lucide-react";

export function GoogleReviewsShowcase() {
  const t = useTranslations("ContactPage.reviews");

  const reviews = [
    {
      name: "Ahmed Al-Sayed",
      date: "2 weeks ago",
      rating: 5,
      text: "Excellent service for our family Umrah trip. The driver was professional, on time, and the GMC Yukon was very clean and comfortable. Highly recommended for Makkah transfers.",
      category: "Umrah Transportation",
      avatar: "A"
    },
    {
      name: "Sarah Williams",
      date: "1 month ago",
      rating: 5,
      text: "Booked an airport transfer to my hotel in Jeddah. The booking process was smooth via WhatsApp. Driver was waiting at arrivals with a sign. Five-star experience.",
      category: "Airport Transfers",
      avatar: "S"
    },
    {
      name: "Mohammed K.",
      date: "2 months ago",
      rating: 5,
      text: "Used Mehar Transport for corporate travel between Riyadh and Jeddah. Very professional chauffeurs and luxury fleet. They handled everything perfectly.",
      category: "Corporate Travel",
      avatar: "M"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-slate-900 rounded-2xl p-6 lg:p-8 border border-slate-200 dark:border-slate-800 shadow-sm"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t("title")}</h3>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-slate-900 dark:text-white">{t("average")}</span>
            <div className="flex text-amber-500">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-current" />
              ))}
            </div>
          </div>
        </div>
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
          {/* Google G Logo mock */}
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review, idx) => (
          <div key={idx} className="border-b border-slate-100 dark:border-slate-800 last:border-0 pb-6 last:pb-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-lg">
                  {review.avatar}
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                    {review.name}
                    <CheckCircle className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{review.date}</div>
                </div>
              </div>
              <div className="flex text-amber-500">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-3">
              &quot;{review.text}&quot;
            </p>
            <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold rounded-full">
              {review.category}
            </span>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 py-3 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-semibold rounded-xl transition-colors">
        Read All Google Reviews
      </button>
    </motion.div>
  );
}
