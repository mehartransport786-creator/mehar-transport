"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export function FleetFAQ() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // A comprehensive list covering all requested topics
  const faqs = [
    {
      category: isAr ? "المركبات والسعة" : "Vehicles & Capacity",
      questions: [
        { q: isAr ? "ما هي أنواع المركبات المتاحة؟" : "What types of vehicles are available?", a: isAr ? "نقدم مجموعة متنوعة تشمل سيارات السيدان التنفيذية (كيا K5)، والسيارات العائلية (هيونداي ستاريا، ميتسوبيشي إكسباندر)، وحافلات المجموعات (تويوتا هايس، كوستر)، وسيارات النخبة (مرسيدس S-Class، رولز رويس)." : "We offer a wide range including Executive Sedans (Kia K5), Family Vans (Hyundai Staria, Mitsubishi Xpander), Group Vans (Toyota Hiace, Coaster), and Elite vehicles (Mercedes S-Class, Rolls Royce)." },
        { q: isAr ? "كم عدد الركاب المسموح بهم في سيارة مرسيدس S-Class؟" : "How many passengers are allowed in a Mercedes S-Class?", a: isAr ? "تتسع سيارة مرسيدس S-Class لـ 4 ركاب بشكل مريح جداً." : "The Mercedes S-Class comfortably accommodates up to 4 passengers." },
        { q: isAr ? "هل السيارات مزودة بمقاعد للأطفال؟" : "Are child seats available?", a: isAr ? "نعم، نوفر مقاعد للأطفال عند الطلب المسبق أثناء الحجز مجاناً." : "Yes, child seats are available upon request during booking at no extra cost." },
        { q: isAr ? "هل يمكنني اختيار لون السيارة؟" : "Can I choose the color of the vehicle?", a: isAr ? "اللون الأساسي لأسطولنا الفاخر هو الأسود لضمان الفخامة والخصوصية. بالنسبة للألوان الأخرى، تعتمد على التوافر." : "Our luxury fleet primarily features black exteriors to ensure prestige and privacy. Other colors are subject to availability." },
      ]
    },
    {
      category: isAr ? "الأمتعة والتخزين" : "Luggage & Storage",
      questions: [
        { q: isAr ? "ما هي سعة الأمتعة لسيارات السيدان؟" : "What is the luggage capacity for sedans?", a: isAr ? "تتسع سيارات السيدان عادة لـ 3 حقائب كبيرة بالإضافة إلى حقائب اليد." : "Sedans typically accommodate 3 large suitcases in addition to hand luggage." },
        { q: isAr ? "ماذا لو كان لدي أمتعة إضافية؟" : "What if I have extra luggage?", a: isAr ? "إذا كان لديك أمتعة زائدة، ننصح بحجز مركبة عائلية مثل هيونداي ستاريا التي تتسع لـ 6-7 حقائب، أو حافلة نقل مخصصة للأمتعة." : "If you have oversized or extra luggage, we recommend booking a family van like the Hyundai Staria (fits 6-7 bags) or requesting a dedicated luggage vehicle." },
        { q: isAr ? "هل يمكن نقل الكراسي المتحركة؟" : "Can wheelchairs be transported?", a: isAr ? "نعم، جميع مركباتنا العائلية وحافلات المجموعات تتسع للكراسي المتحركة القابلة للطي." : "Yes, all our family vans and group vehicles can comfortably accommodate foldable wheelchairs." }
      ]
    },
    {
      category: isAr ? "نقل العمرة والمطار" : "Umrah & Airport Transfers",
      questions: [
        { q: isAr ? "هل يمكن للسائق انتظارنا في صالة الوصول؟" : "Will the driver wait for us in the arrivals hall?", a: isAr ? "نعم، نقدم خدمة الاستقبال والترحيب حيث ينتظرك السائق بلوحة تحمل اسمك." : "Yes, we provide VIP Meet & Greet services. The chauffeur will wait in the arrivals hall with a name board." },
        { q: isAr ? "ماذا لو تأخرت رحلتي؟" : "What if my flight is delayed?", a: isAr ? "نحن نراقب أوقات الرحلات الجوية على مدار الساعة، لذلك سنعدل وقت الاستقبال تلقائياً دون أي رسوم إضافية." : "We monitor all flight times 24/7. Your pickup time will be automatically adjusted without any additional charges." },
        { q: isAr ? "هل تقدمون خدمات النقل بين مكة والمدينة؟" : "Do you offer transfers between Makkah and Madinah?", a: isAr ? "نعم، نقدم رحلات فاخرة ومريحة بين المدينتين المقدستين لضمان تجربة عمرة سلسة." : "Yes, we provide highly comfortable, premium transfers between the two Holy Cities to ensure a seamless Umrah experience." },
        { q: isAr ? "هل السائقون على دراية بمواقع فنادق الحرم؟" : "Are drivers familiar with Haram hotel locations?", a: isAr ? "بالتأكيد، سائقونا خبراء ومصرح لهم بالوصول إلى كافة فنادق المنطقة المركزية المحيطة بالحرمين." : "Absolutely. Our chauffeurs are experts and have authorized access to all central area hotels surrounding the Harams." }
      ]
    },
    {
      category: isAr ? "الخدمات لكبار الشخصيات" : "VIP Services",
      questions: [
        { q: isAr ? "ما الذي يشمله نقل VIP؟" : "What does VIP transport include?", a: isAr ? "يشمل سيارات فائقة الفخامة، سائق خاص بزي رسمي، مياه معبأة، خدمة إنترنت، استقبال خاص، ومرونة تامة في مسار الرحلة." : "It includes ultra-luxury vehicles, a uniformed chauffeur, complimentary water, Wi-Fi, VIP meet & greet, and complete itinerary flexibility." },
        { q: isAr ? "هل يمكنني حجز رولز رويس لحفل زفاف؟" : "Can I book a Rolls Royce for a wedding?", a: isAr ? "نعم، نقدم باقات خاصة لحفلات الزفاف والمناسبات الخاصة مع خدمة راقية جداً وتزيين عند الطلب." : "Yes, we offer special packages for weddings and special events, featuring white-glove service and optional decorations." },
        { q: isAr ? "هل الخصوصية مضمونة؟" : "Is privacy guaranteed?", a: isAr ? "الخصوصية هي جوهر خدماتنا. جميع مركبات VIP مزودة بنوافذ مظللة وسائقين مدربين على السرية التامة." : "Privacy is the core of our Elite service. All VIP vehicles feature tinted windows and chauffeurs trained in absolute discretion." }
      ]
    },
    {
      category: isAr ? "الأسعار والحجز" : "Pricing & Booking",
      questions: [
        { q: isAr ? "هل الأسعار ثابتة أم تعتمد على العداد؟" : "Are prices fixed or metered?", a: isAr ? "جميع أسعارنا ثابتة وشاملة ولا توجد أي رسوم خفية أو مفاجئة." : "All our prices are fixed, all-inclusive, with absolutely no hidden fees or surge pricing." },
        { q: isAr ? "ما هي طرق الدفع المتاحة؟" : "What payment methods are accepted?", a: isAr ? "نقبل البطاقات الائتمانية (فيزا، ماستركارد)، مدى، أبل باي، والدفع نقداً عند الوصول." : "We accept Credit Cards (Visa, Mastercard), Mada, Apple Pay, and Cash on Arrival." },
        { q: isAr ? "كيف يمكنني إلغاء الحجز؟" : "How can I cancel a booking?", a: isAr ? "يمكنك الإلغاء مجاناً حتى قبل 24 ساعة من موعد الرحلة من خلال حسابك أو بالتواصل مع الدعم." : "You can cancel free of charge up to 24 hours before your scheduled trip through your account or by contacting support." },
        { q: isAr ? "هل هناك رسوم على الانتظار؟" : "Are there waiting charges?", a: isAr ? "نوفر 60 دقيقة انتظار مجانية في المطارات، و15 دقيقة لباقي المواقع." : "We provide 60 minutes of complimentary waiting time at airports, and 15 minutes for all other locations." }
      ]
    },
    {
      category: isAr ? "السلامة والجودة" : "Safety & Quality",
      questions: [
        { q: isAr ? "هل جميع السائقين مرخصين؟" : "Are all drivers licensed?", a: isAr ? "نعم، جميع السائقين يحملون رخصاً مهنية وتم إجراء فحوصات شاملة لخلفياتهم الجنائية والمرورية." : "Yes, all chauffeurs hold professional licenses and have undergone comprehensive background and traffic record checks." },
        { q: isAr ? "هل المركبات مؤمنة؟" : "Are the vehicles insured?", a: isAr ? "نعم، جميع ركابنا ومركباتنا مغطاة بتأمين شامل من الفئة الممتازة." : "Yes, all our passengers and vehicles are fully covered by premium comprehensive insurance." },
        { q: isAr ? "كم مرة يتم صيانة المركبات؟" : "How often are vehicles maintained?", a: isAr ? "تخضع جميع مركباتنا لفحص يومي شامل وصيانة دورية صارمة في الوكالة المعتمدة." : "All vehicles undergo a daily comprehensive check and rigorous scheduled maintenance at authorized dealerships." },
        { q: isAr ? "هل يتم تعقيم المركبات؟" : "Are vehicles sanitized?", a: isAr ? "نعم، يتم تعقيم كل مركبة بالكامل بعد كل رحلة لضمان أعلى معايير النظافة والصحة." : "Yes, every vehicle is thoroughly sanitized after every single journey to ensure the highest health standards." }
      ]
    }
  ];

  // Flatten the FAQs to give them a single continuous index for the accordion state
  const flatFaqs = faqs.flatMap(category => category.questions);

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[800px]">
        
        <div className="text-center mb-16 space-y-4">
          <span className="text-[#D9A63A] font-bold uppercase tracking-[0.2em] text-sm block">
            {isAr ? "الأسئلة الشائعة" : "FAQ"}
          </span>
          <h2 className="text-4xl font-bold text-[#1B1E4F]">
            {isAr ? "كل ما تحتاج معرفته" : "Everything You Need to Know"}
          </h2>
        </div>

        <div className="space-y-12">
          {faqs.map((category, catIdx) => (
            <div key={catIdx}>
              <h3 className="text-2xl font-bold text-[#1B1E4F] mb-6 pb-2 border-b border-gray-100">
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.questions.map((faq, qIdx) => {
                  const globalIdx = catIdx * 100 + qIdx; // Unique key logic
                  const isOpen = openIndex === globalIdx;
                  
                  return (
                    <div 
                      key={globalIdx}
                      className={`border rounded-2xl transition-all duration-300 ${isOpen ? 'border-[#D9A63A] bg-slate-50' : 'border-gray-200 hover:border-[#1B1E4F]/30 bg-white'}`}
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : globalIdx)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left"
                      >
                        <span className="font-bold text-[#1B1E4F] pr-8 rtl:pr-0 rtl:pl-8">{faq.q}</span>
                        <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-[#D9A63A] text-white' : 'bg-gray-100 text-gray-500'}`}>
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
                            <div className="px-6 pb-5 pt-1 text-gray-600 leading-relaxed font-medium">
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
          ))}
        </div>

      </div>
    </section>
  );
}
