"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

export function FAQSection() {
  const locale = useLocale();
  const isAr = locale === "ar";
  
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: isAr ? "هل يمكنني حجز سيارة من مطار جدة إلى مكة مباشرة؟" : "Can I book a transfer from Jeddah Airport directly to Makkah?",
      a: isAr 
        ? "نعم، نقدم خدمة النقل المباشر من مطار الملك عبد العزيز بجدة إلى فندقك في مكة المكرمة. سيكون السائق في انتظارك عند بوابة الوصول مع لوحة تحمل اسمك." 
        : "Yes, we provide direct transfer services from King Abdulaziz Airport (Jeddah) to your hotel in Makkah. The driver will be waiting at the arrivals gate with a name sign."
    },
    {
      q: isAr ? "هل الأسعار المعروضة ثابتة أم تتغير؟" : "Are the displayed prices fixed or do they change?",
      a: isAr 
        ? "جميع أسعارنا ثابتة وتشمل كافة الضرائب ورسوم الطريق. لا توجد أي رسوم خفية، والمبلغ المتفق عليه هو ما ستدفعه فقط." 
        : "All our prices are fixed and inclusive of all taxes and toll fees. There are no hidden charges; the agreed amount is exactly what you pay."
    },
    {
      q: isAr ? "هل توفرون مقاعد مخصصة للأطفال؟" : "Do you provide child seats?",
      a: isAr 
        ? "نعم بالتأكيد. نوفر مقاعد أطفال مجانية لضمان سلامة عائلتك. يرجى إبلاغنا بعدد المقاعد المطلوبة وأعمار الأطفال عند الحجز." 
        : "Yes, absolutely. We provide complimentary child seats to ensure your family's safety. Please inform us of the number of seats needed and the children's ages when booking."
    },
    {
      q: isAr ? "ماذا يحدث إذا تأخرت رحلتي الجوية؟" : "What happens if my flight is delayed?",
      a: isAr 
        ? "لا تقلق، فريقنا يراقب مواعيد الرحلات الجوية باستمرار. سيقوم السائق بانتظارك في الوقت الفعلي لوصول طائرتك بدون أي رسوم تأخير إضافية." 
        : "Don't worry, our team monitors flight schedules in real-time. The driver will wait for you based on your actual arrival time without any additional delay charges."
    },
    {
      q: isAr ? "كيف يمكنني الدفع مقابل الرحلة؟" : "How can I pay for the trip?",
      a: isAr 
        ? "نقبل الدفع النقدي للسائق، والتحويل البنكي المسبق، والبطاقات الائتمانية عبر رابط دفع آمن نرسله لك عند تأكيد الحجز." 
        : "We accept cash to the driver, advance bank transfers, and credit cards via a secure payment link sent to you upon booking confirmation."
    },
    {
      q: isAr ? "هل السائقون يتحدثون الإنجليزية؟" : "Do the drivers speak English?",
      a: isAr 
        ? "نعم، نوفر سائقين يتحدثون الإنجليزية والعربية بطلاقة لتسهيل التواصل طوال رحلتك." 
        : "Yes, we provide drivers who are fluent in both English and Arabic to ensure smooth communication throughout your journey."
    }
  ];

  return (
    <section className="py-24 bg-accent/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[800px]">
        
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <HelpCircle className="w-6 h-6 text-secondary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
          </h2>
          <p className="text-muted-foreground">
            {isAr 
              ? "إجابات وافية لأكثر الاستفسارات شيوعاً حول خدماتنا للحجز والنقل."
              : "Comprehensive answers to the most common questions about our booking and transport services."}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-secondary/30 shadow-md' : 'border-slate-100 shadow-sm'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-start focus:outline-none"
                >
                  <span className={`font-bold pr-8 rtl:pr-0 rtl:pl-8 ${isOpen ? 'text-secondary' : 'text-primary'}`}>
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-secondary' : 'text-muted-foreground'}`} />
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-0 text-muted-foreground leading-relaxed">
                        {faq.a}
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
