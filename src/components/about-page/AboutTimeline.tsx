"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function AboutTimeline({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const timelineEvents = [
    { year: "2016", title: "Company Founded in Makkah", titleAr: "تأسيس الشركة في مكة المكرمة" },
    { year: "2017", title: "Started Airport Transfer Services", titleAr: "بدء خدمات نقل المطار" },
    { year: "2018", title: "Expanded Intercity Transportation Network", titleAr: "توسيع شبكة النقل بين المدن" },
    { year: "2019", title: "Added Luxury Chauffeur Services", titleAr: "إضافة خدمات السائقين الفاخرة" },
    { year: "2020", title: "Expanded Fleet Operations", titleAr: "توسيع عمليات الأسطول" },
    { year: "2021", title: "Established International B2B Partnerships", titleAr: "تأسيس شراكات دولية بين الشركات (B2B)" },
    { year: "2022", title: "Increased Coverage Across Saudi Arabia", titleAr: "زيادة التغطية عبر المملكة العربية السعودية" },
    { year: "2023", title: "Served Growing Umrah & Tourism Market", titleAr: "خدمة سوق العمرة والسياحة المتنامي" },
    { year: "2024", title: "Expanded Fleet and Digital Booking Systems", titleAr: "توسيع الأسطول وأنظمة الحجز الرقمية" },
    { year: "2025", title: "Modern Transportation Platform & Enterprise Operations", titleAr: "منصة نقل حديثة وعمليات مؤسسية" },
  ];

  return (
    <section className="py-32 bg-primary relative overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="caption-text text-secondary mb-4">
            {isAr ? 'تاريخ الشركة' : 'Company Timeline'}
          </h2>
          <h3 className="h2 text-primary-foreground">
            {isAr ? 'رحلة النمو' : 'Our Journey of Growth'}
          </h3>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-12 md:left-1/2 top-0 bottom-0 w-px bg-primary-foreground/10 -translate-x-1/2" />
          
          <motion.div 
            className="absolute left-12 md:left-1/2 top-0 bottom-0 w-[2px] bg-secondary -translate-x-1/2 origin-top shadow-[0_0_15px_var(--secondary)]"
            style={{ scaleY: scrollYProgress }}
          />

          <div className="space-y-16">
            {timelineEvents.map((event, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={event.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-start md:items-center relative gap-8 md:gap-0 ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-12 md:left-1/2 w-5 h-5 rounded-full bg-secondary shadow-[0_0_20px_var(--secondary)] -translate-x-1/2 mt-1 md:mt-0 z-10 border-4 border-primary" />
                  
                  {/* Content Box */}
                  <div className={`ml-24 md:ml-0 w-full md:w-1/2 ${isEven ? 'md:pl-20' : 'md:pr-20 text-left md:text-right'}`}>
                    <div className="p-8 bg-primary-foreground/5 backdrop-blur-xl border border-primary-foreground/10 rounded-[2rem] hover:bg-primary-foreground/10 hover:border-primary-foreground/20 transition-all duration-300 shadow-[var(--shadow-luxury)] group">
                      <span className="text-secondary text-3xl font-black mb-3 block font-mono group-hover:drop-shadow-[0_0_10px_var(--secondary)] transition-all">
                        {event.year}
                      </span>
                      <h4 className={`text-primary-foreground text-xl font-medium tracking-wide ${isAr ? 'font-arabic' : ''}`}>
                        {isAr ? event.titleAr : event.title}
                      </h4>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
