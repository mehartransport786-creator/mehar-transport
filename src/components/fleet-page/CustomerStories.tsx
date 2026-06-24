"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

export function CustomerStories() {
    const t = useTranslations('CustomerStories');
  const locale = useLocale();

  const stories = [
    {
      id: 1,
      name: t("theAhmedFamily"),
      country: t("uae"),
      route: t("jeddahAirportToMakkah"),
      vehicle: "Hyundai Staria",
      rating: 5,
      review: t("ourUmrahTripWithMeharWasExceptionalTheDr"),
      initials: "AF"
    },
    {
      id: 2,
      name: t("davidRichards"),
      country: t("unitedKingdom"),
      route: t("riyadhAirportToKafd"),
      vehicle: "Toyota Camry",
      rating: 5,
      review: t("iUseMeharForAllMyBusinessTripsToSaudiAra"),
      initials: "DR"
    },
    {
      id: 3,
      name: t("alImanGroup"),
      country: t("malaysia"),
      route: t("makkahToMadinah"),
      vehicle: "Toyota Coaster",
      rating: 5,
      review: t("organizingATripFor20PeopleIsNeverEasyBut"),
      initials: "IG"
    }
  ];

  return (
    <section className="py-24 bg-slate-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#D9A63A] font-bold uppercase tracking-[0.2em] text-sm block">
            {t("customerStories")}
          </span>
          <h2 className="text-4xl font-bold text-[#1B1E4F]">
            {t("experiencesBeyondExpectations")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, i) => (
            <motion.div 
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100 relative"
            >
              <Quote className="absolute top-8 right-8 rtl:left-8 rtl:right-auto w-12 h-12 text-gray-100 rotate-180" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(story.rating)].map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 fill-[#D9A63A] text-[#D9A63A]" />
                ))}
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-8 relative z-10 font-medium">
                &quot;{story.review}&quot;
              </p>
              
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <div className="w-12 h-12 rounded-full bg-[#1B1E4F] flex items-center justify-center text-white font-bold shrink-0">
                  {story.initials}
                </div>
                <div>
                  <h4 className="font-bold text-[#1B1E4F]">{story.name}</h4>
                  <div className="text-xs text-gray-500 mt-1">
                    {story.country} • {story.vehicle}
                  </div>
                  <div className="text-[10px] text-[#D9A63A] font-bold uppercase tracking-wider mt-1">
                    {story.route}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
