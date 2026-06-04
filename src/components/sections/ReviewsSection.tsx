"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

export function ReviewsSection() {
  const locale = useLocale();
  const isAr = locale === "ar";

  const reviews = [
    {
      id: 1,
      name: isAr ? "أحمد السالم" : "Ahmed Al-Salem",
      role: isAr ? "رئيس تنفيذي" : "CEO",
      quote: isAr 
        ? "خدمة استثنائية بكل المقاييس. سيارة رولز رويس كانت في قمة النظافة والفخامة، والسائق كان محترفاً جداً. ميهار هي خياري الأول دائماً لاجتماعات العمل."
        : "Exceptional service by every measure. The Rolls-Royce was immaculate, and the chauffeur was highly professional. Mehar is always my first choice for business meetings.",
      rating: 5,
    },
    {
      id: 2,
      name: isAr ? "سارة فهد" : "Sarah Fahad",
      role: isAr ? "ضيفة VIP" : "VIP Guest",
      quote: isAr 
        ? "تجربة الاستقبال من مطار جدة كانت سلسة وفاخرة. شعرت بالراحة والأمان التام طوال الرحلة إلى مكة. تفاصيل الخدمة تعكس فخامة حقيقية."
        : "The airport meet-and-greet at Jeddah was seamless and luxurious. I felt completely relaxed and safe during the trip to Makkah. True luxury is in the details.",
      rating: 5,
    },
    {
      id: 3,
      name: isAr ? "د. محمد العمر" : "Dr. Mohammed Al-Omar",
      role: isAr ? "مسافر منتظم" : "Frequent Traveler",
      quote: isAr 
        ? "احترافية لا تضاهى. من سهولة الحجز عبر الموقع إلى التزام السائق بالوقت المحدد. شكراً لفريق ميهار على هذه التجربة الراقية."
        : "Unmatched professionalism. From the ease of booking on the website to the chauffeur's punctuality. Thank you to the Mehar team for a refined experience.",
      rating: 5,
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#F5F4F1] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        
        <div className="flex flex-col items-center text-center mb-16 space-y-6">
          <div className="flex items-center gap-4 justify-center">
            <div className="w-8 h-px bg-[#D9A63A]"></div>
            <span className="text-[#D9A63A] font-bold uppercase tracking-[0.2em] text-sm">
              {isAr ? "آراء عملائنا المميزين" : "Voices of Our Guests"}
            </span>
            <div className="w-8 h-px bg-[#D9A63A]"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1B1E4F] leading-tight max-w-2xl">
            {isAr ? "ثقة تُبنى على التميز المطلق" : "Trust Built on Absolute Excellence"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {reviews.map((review, index) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white p-10 md:p-12 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center text-center relative group hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="absolute -top-6 bg-[#1B1E4F] text-[#D9A63A] w-12 h-12 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Quote className="w-5 h-5 fill-current" />
              </div>
              
              <div className="flex gap-1 mb-8 mt-2">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#D9A63A] text-[#D9A63A]" />
                ))}
              </div>

              <p className="text-gray-600 leading-loose text-lg italic mb-8 font-light grow flex items-center">
                "{review.quote}"
              </p>

              <div className="mt-auto border-t border-gray-100 w-full pt-6">
                <h4 className="font-bold text-[#1B1E4F] text-lg">{review.name}</h4>
                <p className="text-sm text-[#D9A63A] font-bold uppercase tracking-wider mt-1">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
