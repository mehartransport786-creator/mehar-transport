"use client";

import { useTranslations } from "next-intl";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "@/lib/motion";

const faqs = [
  { question: "How early should I book my airport transfer?", answer: "We recommend booking at least 24 hours in advance to guarantee availability, especially during peak seasons." },
  { question: "Are your drivers licensed and insured?", answer: "Yes, all our drivers are professionally licensed, and our vehicles are fully comprehensively insured for your peace of mind." },
  { question: "Can I request a child seat?", answer: "Absolutely. We provide child and infant seats free of charge. Please mention this requirement in the special requests section when booking." },
  { question: "What if my flight is delayed?", answer: "We actively monitor flight statuses. If your flight is delayed, our driver will automatically adjust the pickup time without any extra charges." },
  { question: "What payment methods do you accept?", answer: "We accept all major credit cards, Apple Pay, Mada, and bank transfers for corporate clients." },
  { question: "Is there a cancellation fee?", answer: "Cancellations made 24 hours prior to the scheduled pickup time are fully refunded. Late cancellations may incur a fee." },
  { question: "Can I hire a chauffeur for the whole day?", answer: "Yes, we offer hourly and daily VIP chauffeur services. You can select this option in our booking form." },
];

export function FAQCenter() {
  const t = useTranslations("ContactPage.faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-background border-t border-border">
      <div className="container-fluid max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t("title")}
          </h2>
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {["Bookings", "Pricing", "Vehicles", "Airport Transfers", "Umrah", "Payments", "Safety", "Corporate"].map((category, idx) => (
              <span key={idx} className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-muted-foreground text-sm font-medium cursor-pointer hover:bg-secondary/10 hover:text-secondary transition-colors duration-[var(--duration-instant)] ease-[var(--ease-out)]">
                {category}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={`border rounded-2xl transition-all duration-300 ${isOpen ? 'border-secondary bg-muted' : 'border-border hover:border-primary/30 bg-background'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-bold text-primary pr-8 rtl:pr-0 rtl:pl-8">{faq.question}</span>
                  <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-1 text-muted-foreground leading-relaxed font-medium">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
