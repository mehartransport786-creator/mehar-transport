"use client";

import { useLocale } from "next-intl";
import { useState } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { Plus, Minus } from "lucide-react";
import { FAQItem } from "@/data/fleet";

interface VehicleFAQProps {
  faqs: FAQItem[];
  theme: {
    primary: string;
    secondary: string;
  };
}

export function VehicleFAQ({ faqs, theme }: VehicleFAQProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Filter out items with empty answers to prevent empty FAQ toggles
  const validFaqs = faqs?.filter(faq => isAr ? faq.aAr?.trim() : faq.a?.trim()) || [];

  if (validFaqs.length === 0) return null;

  return (
    <section>
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-0.5" style={{ backgroundColor: theme.secondary }}></div>
        <span className="font-bold uppercase tracking-[0.2em] text-sm" style={{ color: theme.secondary }}>
          {isAr ? "أسئلة شائعة" : "Frequently Asked Questions"}
        </span>
      </div>

      <div className="space-y-4">
        {validFaqs.map((faq, idx) => (
          <div 
            key={idx}
            className={`border rounded-2xl transition-all duration-300 ${openIndex === idx ? 'border-secondary bg-muted' : 'border-border hover:border-primary/30 bg-background'}`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full px-6 py-5 flex items-center justify-between text-left"
            >
              <h4 className="font-bold text-primary pr-8 rtl:pr-0 rtl:pl-8">
                {isAr ? faq.qAr : faq.q}
              </h4>
              <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === idx ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'}`}>
                {openIndex === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </span>
            </button>
            
            <AnimatePresence>
              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 pt-1 text-muted-foreground leading-relaxed font-medium">
                    {isAr ? faq.aAr : faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
