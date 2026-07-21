"use client";

import { motion } from "@/lib/motion";
import { Star, Quote } from "lucide-react";

export function AboutReviews({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  
  const reviews = [
    {
      text: "Exceptional service! The driver was waiting for us at Jeddah airport with a clear sign. The GMC Yukon was spotless and the journey to Makkah was incredibly smooth.",
      author: "Ahmed R.",
      country: "UK",
      platform: "Google Reviews",
      rating: 5
    },
    {
      text: "We use Mehar Transport for all our corporate clients visiting Saudi Arabia. Their B2B booking system and reliability are unmatched in the region.",
      author: "Sarah M.",
      country: "UAE",
      platform: "Trustpilot",
      rating: 5
    },
    {
      text: "Booked a round trip for Umrah. Punctual, professional, and very courteous drivers. Highly recommended for families.",
      author: "Tariq H.",
      country: "USA",
      platform: "Google Reviews",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-background border-y border-border">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
          <div className="flex-1">
            <h2 className="text-secondary font-bold tracking-widest uppercase mb-3 text-sm">
              {isAr ? 'تقييمات العملاء' : 'Reviews & Reputation'}
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold text-primary leading-tight">
              {isAr ? 'ماذا يقول عملاؤنا وشركاؤنا' : 'What Our Clients & Partners Say'}
            </h3>
          </div>
          
          <div className="flex gap-8 items-center bg-muted/50 p-6 rounded-[var(--radius-card)] border border-border">
            <div className="text-center">
              <div className="text-4xl font-black text-primary mb-1">4.9</div>
              <div className="flex text-secondary mb-1 justify-center">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Average Rating</div>
            </div>
            <div className="w-px h-16 bg-border" />
            <div className="text-center">
              <div className="text-4xl font-black text-primary mb-1">500+</div>
              <div className="text-sm font-semibold text-primary mb-1">Verified Reviews</div>
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Across Platforms</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-muted/50 p-8 rounded-[var(--radius-card)] relative border border-border hover:border-secondary/30 transition-colors"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-secondary/20" />
              <div className="flex text-secondary mb-6">
                {[...Array(review.rating)].map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-8 leading-relaxed italic">
                "{review.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  {review.author[0]}
                </div>
                <div>
                  <div className="font-bold text-primary">{review.author}</div>
                  <div className="text-xs text-muted-foreground font-semibold">{review.country} • {review.platform}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
