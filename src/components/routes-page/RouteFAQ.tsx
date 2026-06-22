"use client";

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
            className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
              isOpen 
                ? 'border-[#D9A63A] bg-[#D9A63A]/5 shadow-sm' 
                : 'border-gray-200 dark:border-white/10 bg-white dark:bg-[#1B1E4F]'
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
            >
              <h3 className={`font-bold text-lg ${isOpen ? 'text-[#1B1E4F] dark:text-[#D9A63A]' : 'text-gray-900 dark:text-white'}`}>
                {isAr ? faq.question.ar : faq.question.en}
              </h3>
              <div className={`shrink-0 ml-4 rtl:ml-0 rtl:mr-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isOpen ? 'bg-[#D9A63A] text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400'
              }`}>
                {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </button>
            <div 
              className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {isAr ? faq.answer.ar : faq.answer.en}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
