"use client";

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { ChevronDown, ChevronUp, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from "@/lib/motion";

interface FAQ {
  question: { en: string; ar: string };
  answer: { en: string; ar: string };
}

export function RouteFAQ({ faqs }: { faqs: FAQ[] }) {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div 
            key={index} 
            className={`border rounded-2xl transition-all duration-300 ${isOpen ? 'border-secondary bg-muted' : 'border-border hover:border-primary/30 bg-background'}`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left"
            >
              <h3 className="font-bold text-primary pr-8 rtl:pr-0 rtl:pl-8">
                {isAr ? faq.question.ar : faq.question.en}
              </h3>
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
                    {isAr ? faq.answer.ar : faq.answer.en}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
