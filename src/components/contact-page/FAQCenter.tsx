"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  { question: "How early should I book my airport transfer?", answer: "We recommend booking at least 24 hours in advance to guarantee availability, especially during peak seasons." },
  { question: "Are your drivers licensed and insured?", answer: "Yes, all our drivers are professionally licensed, and our vehicles are fully comprehensively insured for your peace of mind." },
  { question: "Can I request a child seat?", answer: "Absolutely. We provide child and infant seats free of charge. Please mention this requirement in the special requests section when booking." },
  { question: "What if my flight is delayed?", answer: "We actively monitor flight statuses. If your flight is delayed, our driver will automatically adjust the pickup time without any extra charges." },
  { question: "Do you offer Umrah transportation packages?", answer: "Yes, we specialize in Umrah transportation between Jeddah, Makkah, and Madinah with our luxury fleet." },
  { question: "What payment methods do you accept?", answer: "We accept all major credit cards, Apple Pay, Mada, and bank transfers for corporate clients." },
  { question: "Is there a cancellation fee?", answer: "Cancellations made 24 hours prior to the scheduled pickup time are fully refunded. Late cancellations may incur a fee." },
  { question: "Can I hire a chauffeur for the whole day?", answer: "Yes, we offer hourly and daily VIP chauffeur services. You can select this option in our booking form." },
];

export function FAQCenter() {
  const t = useTranslations("ContactPage.faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {t("title")}
          </h2>
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {["Bookings", "Pricing", "Vehicles", "Airport Transfers", "Umrah", "Payments", "Safety", "Corporate"].map((category, idx) => (
              <span key={idx} className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium cursor-pointer hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:text-amber-600 transition-colors">
                {category}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/50"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-semibold text-lg text-slate-900 dark:text-white pr-8">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-slate-500 transition-transform duration-300 shrink-0 ${openIndex === index ? "rotate-180" : ""}`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-slate-600 dark:text-slate-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
