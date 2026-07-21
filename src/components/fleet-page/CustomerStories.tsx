"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "@/lib/motion";
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
      vehicle: "Toyota Hiace",
      rating: 5,
      review: t("organizingATripFor20PeopleIsNeverEasyBut"),
      initials: "IG"
    }
  ];

  return (
    <section className="py-24 bg-muted border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-secondary font-bold uppercase tracking-[0.2em] text-sm block">
            {t("customerStories")}
          </span>
          <h2 className="text-4xl font-bold text-primary">
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
              className="bg-background rounded-[2rem] p-8 shadow-xl border border-border relative"
            >
              <Quote className="absolute top-8 right-8 rtl:left-8 rtl:right-auto w-12 h-12 text-muted rotate-180" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(story.rating)].map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-8 relative z-10 font-medium">
                &quot;{story.review}&quot;
              </p>
              
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shrink-0">
                  {story.initials}
                </div>
                <div>
                  <h4 className="font-bold text-primary">{story.name}</h4>
                  <div className="text-xs text-muted-foreground mt-1">
                    {story.country} • {story.vehicle}
                  </div>
                  <div className="text-[10px] text-secondary font-bold uppercase tracking-wider mt-1">
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
