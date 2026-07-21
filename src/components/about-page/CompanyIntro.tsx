"use client";

import { motion } from "@/lib/motion";

export function CompanyIntro({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          {/* Content */}
          <div className="flex-1 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="caption-text text-secondary mb-4 flex items-center gap-4">
                <span className="w-12 h-px bg-secondary"></span>
                {isAr ? 'عن ميهار للنقل' : 'About Mehar Transport'}
              </h2>
              <h3 className="h2 text-foreground leading-tight">
                {isAr ? 'تأسست في 2016.' : 'Founded in 2016.'}
                <br />
                <span className="text-muted-foreground font-light text-3xl md:text-4xl">
                  {isAr ? 'شركة نقل مسجلة في مكة.' : 'Registered transportation company in Makkah.'}
                </span>
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`space-y-6 text-lg text-muted-foreground leading-relaxed ${isAr ? 'font-arabic' : ''}`}
            >
              <p>
                {isAr 
                  ? 'بدأنا بهدف واضح: تقديم خدمات نقل خاصة وموثوقة للحجاج والعائلات والسياح وعملاء الشركات المسافرين عبر المملكة العربية السعودية.' 
                  : 'Started with a clear purpose: to provide reliable, private transportation for pilgrims, families, tourists, and corporate clients traveling across Saudi Arabia.'}
              </p>
              <p>
                {isAr 
                  ? 'على مر السنوات، توسعنا لتغطية المدن السعودية الكبرى مع بناء شراكات طويلة الأمد مع وكالات سفر دولية وشركات إدارة الوجهات ومزودي خدمات العمرة.' 
                  : 'Over the years, we have expanded to cover major Saudi cities while building long-term partnerships with international travel agencies, destination management companies, and Umrah service providers.'}
              </p>
              <p className="font-semibold text-foreground text-xl">
                {isAr 
                  ? 'اليوم، تخدم ميهار للنقل آلاف الركاب سنوياً — من حجاج فرديين إلى مجموعات شركات — بتوصيل مطار وفندق ونقل عمرة وسفر بين المدن.' 
                  : 'Today, Mehar Transport serves thousands of passengers annually — from individual Umrah pilgrims to corporate groups — providing consistent, professional ground transportation across the Kingdom.'}
              </p>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div 
            className="flex-1 relative w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-square md:aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-[var(--shadow-luxury)] border border-border/50">
              <div className="absolute inset-0 bg-primary/10 z-10" />
              <img 
                src="/fleet/camry.webp" 
                alt="Mehar Transport Fleet" 
                className="w-full h-full object-cover transition-transform duration-[var(--duration-base)] hover:scale-105"
              />
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-secondary rounded-bl-[80px] z-20 flex items-center justify-center shadow-[var(--shadow-luxury)]">
                <div className="text-primary text-center">
                  <span className="block text-4xl font-bold tracking-tighter">2016</span>
                  <span className="text-xs uppercase tracking-widest font-bold">Established</span>
                </div>
              </div>
            </div>
            
            {/* Background decorative shape */}
            <div className="absolute -bottom-10 -left-10 w-72 h-72 border border-secondary/20 rounded-full -z-10" />
            <div className="absolute top-1/2 -right-12 w-48 h-48 bg-secondary/5 rounded-full blur-3xl -z-10" />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
