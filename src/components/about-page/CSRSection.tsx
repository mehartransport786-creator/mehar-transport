"use client";

import { motion } from "@/lib/motion";

export function CSRSection({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-secondary/5" />
      <div className="container px-4 md:px-6 mx-auto relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-secondary/30 text-secondary text-sm font-bold tracking-widest uppercase mb-8">
            {isAr ? 'المسؤولية الاجتماعية' : 'Corporate Social Responsibility'}
          </div>
          
          <h3 className="text-3xl md:text-5xl font-bold text-primary-foreground leading-tight mb-8">
            {isAr ? 'التزام بخدمة ضيوف الرحمن ودعم رؤية المملكة' : 'Commitment to Serving Pilgrims & Supporting Saudi Vision'}
          </h3>
          
          <p className={`text-xl text-primary-foreground/80 leading-relaxed mb-8 ${isAr ? 'font-arabic' : ''}`}>
            {isAr 
              ? 'نعتبر خدمة الحجاج والمعتمرين شرفاً ومسؤولية كبرى. نحن ملتزمون بتوفير تجارب نقل محترمة ومريحة تليق بزوار بيت الله الحرام.' 
              : 'We consider serving Hajj and Umrah pilgrims an immense honor and responsibility. We are deeply committed to providing respectful, comfortable transportation experiences worthy of the guests of the Holy Mosques.'}
          </p>

          <p className={`text-lg text-primary-foreground/60 leading-relaxed ${isAr ? 'font-arabic' : ''}`}>
            {isAr 
              ? 'كما نفخر بدعم نمو قطاع السياحة في المملكة العربية السعودية من خلال تقديم خدمات نقل ترتقي بالمعايير العالمية وتعكس كرم الضيافة الأصيل.' 
              : 'We also take pride in supporting the growth of the tourism sector in Saudi Arabia by delivering transportation services that elevate global standards and reflect authentic hospitality.'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
