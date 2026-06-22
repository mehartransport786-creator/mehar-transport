"use client";

import { useLocale } from "next-intl";
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function BookingFAQ() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = isAr ? [
    {
      q: "كيف يمكنني تعديل أو إلغاء حجزي؟",
      a: "يمكنك تعديل أو إلغاء حجزك مجاناً حتى 24 ساعة قبل موعد انطلاق الرحلة من خلال لوحة تحكم الحساب الخاص بك أو بالتواصل مع خدمة العملاء."
    },
    {
      q: "هل السعر الموضح يشمل جميع الضرائب والرسوم؟",
      a: "نعم، جميع الأسعار المعروضة في ملخص الحجز تشمل ضريبة القيمة المضافة (15%) ولا توجد أي رسوم خفية."
    },
    {
      q: "كيف يمكنني التواصل مع السائق الخاص بي؟",
      a: "بمجرد تأكيد حجزك وقبل موعد الرحلة بـ 12 ساعة، سيتم تزويدك برقم هاتف السائق وبيانات المركبة عبر رسالة نصية والبريد الإلكتروني."
    },
    {
      q: "ماذا لو تأخرت رحلتي الجوية؟",
      a: "نحن نتابع مواعيد الرحلات الجوية لحظة بلحظة، وسائقنا سينتظرك مجاناً لمدة تصل إلى ساعة واحدة من وقت وصول الرحلة الفعلي."
    }
  ] : [
    {
      q: "How can I modify or cancel my booking?",
      a: "You can modify or cancel your booking for free up to 24 hours before the pickup time by contacting customer service."
    },
    {
      q: "Does the price include all taxes and fees?",
      a: "Yes, all prices shown in the booking summary include VAT (15%) and there are no hidden fees."
    },
    {
      q: "How do I contact my driver?",
      a: "Once your booking is confirmed, 12 hours prior to your pickup, you will receive the driver's phone number and vehicle details via SMS and email."
    },
    {
      q: "What if my flight is delayed?",
      a: "We track flight schedules in real-time. Your driver will wait for you free of charge for up to one hour from the actual flight arrival time."
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-[#D9A63A]/10 rounded-full flex items-center justify-center">
          <HelpCircle className="w-5 h-5 text-[#D9A63A]" />
        </div>
        <h2 className="text-2xl font-bold text-[#1B1E4F]">
          {isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className={`border rounded-xl overflow-hidden transition-colors ${isOpen ? 'border-[#D9A63A]/30 bg-[#D9A63A]/5' : 'border-gray-100 bg-gray-50'}`}
            >
              <button 
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between font-bold text-[#1B1E4F] text-start"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180 text-[#D9A63A]' : 'text-gray-400'}`} />
              </button>
              
              {isOpen && (
                <div className="px-6 pb-4 pt-2 text-gray-500 text-sm leading-relaxed border-t border-gray-100">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
