"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function PackageFAQ({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: isAr ? "ماذا تشمل هذه الباقة؟" : "What is included in this package?",
      a: isAr 
        ? "تشمل الباقة جميع المسارات المذكورة، مركبة خاصة حديثة، سائق محترف، استقبال وترحيب في المطار، وجميع الرسوم الضريبية. لا توجد رسوم خفية." 
        : "The package includes all listed routes, a private modern vehicle, a professional chauffeur, airport meet & greet, and all taxes. There are no hidden fees."
    },
    {
      q: isAr ? "هل يمكنني تخصيص مسار الرحلة؟" : "Can I customize the routes?",
      a: isAr
        ? "نعم، يمكنك حجز هذه الباقة كما هي أو استخدام نظام الحجز لدينا لإضافة وتعديل المسارات حسب احتياجاتك الخاصة."
        : "Yes, you can book this package as is or use our booking engine to add or modify routes according to your specific needs."
    },
    {
      q: isAr ? "هل يمكنني ترقية نوع المركبة لاحقاً؟" : "Can I upgrade my vehicle later?",
      a: isAr
        ? "نعم، نقدم مجموعة واسعة من المركبات الفاخرة (من السيدان وحتى سيارات كبار الشخصيات مثل رولز رويس). يمكنك الترقية في أي وقت من خلال التواصل مع خدمة العملاء."
        : "Yes, we offer a wide range of luxury vehicles (from Sedans to VIP cars like Rolls-Royce). You can upgrade anytime by contacting our support team."
    },
    {
      q: isAr ? "هل يمكنني إضافة جولات زيارات؟" : "Can I add Ziyarat tours?",
      a: isAr
        ? "بالتأكيد! إذا لم تكن باقتك تشمل الزيارات بالفعل، يمكنك إضافتها بسهولة عند الحجز للاستمتاع بجولة سياحية ودينية مخصصة في مكة والمدينة."
        : "Absolutely! If your package doesn't already include Ziyarat, you can easily add it during booking to enjoy a dedicated religious and historical tour in Makkah and Madinah."
    },
    {
      q: isAr ? "هل تتغير الأسعار في مواسم الذروة (مثل رمضان أو الحج)؟" : "Do prices change during peak seasons like Ramadan?",
      a: isAr
        ? "نعم، قد تطبق بعض التعديلات الموسمية على الأسعار خلال فترات الذروة. سيقوم نظام الحجز الخاص بنا بعرض السعر النهائي والدقيق لتواريخ سفرك تلقائياً."
        : "Yes, some seasonal adjustments may apply during high-demand periods. Our booking system will automatically calculate and display the exact final price for your travel dates."
    },
    {
      q: isAr ? "كيف يتم التعامل مع الاستقبال في المطار إذا تأخرت رحلتي؟" : "How are airport pickups handled if my flight is delayed?",
      a: isAr
        ? "فريقنا يراقب مواعيد الرحلات باستمرار. سائقك سينتظرك في الوقت الفعلي لوصول رحلتك دون أي رسوم إضافية على التأخير."
        : "Our team actively monitors flight schedules. Your chauffeur will wait for you at the actual arrival time of your flight without any additional delay charges."
    }
  ];

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-4">
          <HelpCircle className="w-6 h-6 text-[#D9A63A]" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#1B1E4F] mb-4">
          {isAr ? "الأسئلة الشائعة حول الباقة" : "Package Frequently Asked Questions"}
        </h2>
        <p className="text-gray-500">
          {isAr ? "كل ما تحتاج معرفته عن باقاتنا وخدماتنا." : "Everything you need to know about our packages and services."}
        </p>
      </div>

      <div className="space-y-4 max-w-4xl mx-auto">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx} 
              className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-[#D9A63A]/30 shadow-md' : 'border-gray-100 shadow-sm'}`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-start focus:outline-none"
              >
                <span className={`font-bold pr-8 rtl:pr-0 rtl:pl-8 ${isOpen ? 'text-[#D9A63A]' : 'text-[#1B1E4F]'}`}>
                  {faq.q}
                </span>
                <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#D9A63A]' : 'text-gray-400'}`} />
              </button>
              
              {isOpen && (
                <div className="px-6 pb-6 pt-0 text-gray-500 leading-relaxed text-sm">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
