"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "@/lib/motion";
import { Quote, Star, User } from "lucide-react";

export function ReviewsSection() {
    const t = useTranslations('ReviewsSection');
    const locale = useLocale();
    const isAr = locale === "ar";

  const reviews = [
    {
      id: 1,
      name: t("ahmedAlSalem"),
      role: t("ceo"),
      quote: t("exceptionalServiceByEveryMeasureTheRolls"),
      rating: 5,
    },
    {
      id: 2,
      name: t("sarahFahad"),
      role: t("vipGuest"),
      quote: t("theAirportMeetAndGreetAtJeddahWasSeamles"),
      rating: 5,
    },
    {
      id: 3,
      name: t("drMohammedAlOmar"),
      role: t("frequentTraveler"),
      quote: t("unmatchedProfessionalismFromTheEaseOfBoo"),
      rating: 5,
    }
  ];

  return (
    <section className="section-padding bg-muted overflow-hidden">
      <div className="container-fluid">
        
        <div className="flex flex-col items-center text-center mb-12 lg:mb-16 space-y-4 lg:space-y-6 animate-fade-up-luxury">
          <div className="flex items-center gap-4 justify-center">
            <div className="w-8 h-px bg-secondary"></div>
            <span className="text-secondary font-bold uppercase tracking-[0.2em] text-xs md:text-sm">
              {t("voicesOfOurGuests")}
            </span>
            <div className="w-8 h-px bg-secondary"></div>
          </div>
          <h2 className="h2 text-primary leading-tight max-w-2xl">
            {t("trustBuiltOnAbsoluteExcellence")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
          {reviews.map((review, index) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-background p-8 md:p-10 lg:p-12 rounded-[var(--radius-card)] shadow-[var(--shadow-luxury)] border border-border flex flex-col items-center text-center relative group hover:-translate-y-2 transition-transform duration-[var(--duration-base)]"
            >
              <div className="absolute -top-6 bg-primary text-secondary w-12 h-12 rounded-full flex items-center justify-center shadow-[var(--shadow-luxury)] group-hover:scale-110 transition-transform duration-300">
                <Quote className="w-5 h-5 fill-current" />
              </div>
              
              <div className="flex gap-1 mb-6 lg:mb-8 mt-2">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-secondary text-secondary" />
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed md:leading-loose text-base md:text-lg italic mb-6 lg:mb-8 font-light grow flex items-center">
                &quot;{review.quote}&quot;
              </p>

              <div className={`mt-auto border-t border-border w-full pt-6 flex items-center gap-4 text-left ${isAr ? 'flex-row-reverse text-right' : ''}`}>
                <div className="w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-base md:text-lg">{review.name}</h4>
                  <p className="text-[10px] md:text-xs text-secondary font-bold uppercase tracking-wider mt-1">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
