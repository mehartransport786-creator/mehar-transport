"use client";

import { useLocale } from "next-intl";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface VehicleFAQProps {
  faqs: any[];
  theme: any;
}

export function VehicleFAQ({ faqs, theme }: VehicleFAQProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section>
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-0.5" style={{ backgroundColor: theme.secondary }}></div>
        <span className="font-bold uppercase tracking-[0.2em] text-sm" style={{ color: theme.secondary }}>
          {isAr ? "أسئلة شائعة" : "Frequently Asked Questions"}
        </span>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div 
            key={idx}
            className={`border rounded-2xl overflow-hidden transition-colors ${openIndex === idx ? 'border-[#D9A63A] bg-slate-50' : 'border-gray-100 bg-white hover:border-gray-300'}`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <h4 className="font-bold text-[#1B1E4F] pr-4">
                {isAr ? faq.qAr : faq.q}
              </h4>
              <ChevronDown 
                className={`w-5 h-5 text-gray-400 transition-transform ${openIndex === idx ? 'rotate-180 text-[#D9A63A]' : ''}`} 
              />
            </button>
            
            <AnimatePresence>
              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed">
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
