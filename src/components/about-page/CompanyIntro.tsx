"use client";

import { motion } from "framer-motion";

export function CompanyIntro({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  
  return (
    <section className="py-24 bg-[#F5F4F1] relative">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Content */}
          <div className="flex-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-[#D9A63A] font-bold tracking-widest uppercase mb-3 text-sm flex items-center gap-4">
                <span className="w-12 h-px bg-[#D9A63A]"></span>
                {isAr ? 'عن ميهار للنقل' : 'About Mehar Transport'}
              </h2>
              <h3 className="text-3xl md:text-5xl font-bold text-[#1B1E4F] leading-tight">
                {isAr ? 'تأسست في 2016.' : 'Founded in 2016.'}
                <br />
                <span className="text-gray-400 font-light">
                  {isAr ? 'شركة نقل مسجلة في مكة.' : 'Registered transportation company in Makkah.'}
                </span>
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`prose prose-lg text-gray-600 ${isAr ? 'font-arabic' : ''}`}
            >
              <p>
                {isAr 
                  ? 'بدأنا برؤية تقديم خدمات نقل موثوقة واحترافية للحجاج، العائلات، السياح، والمسافرين من الشركات.' 
                  : 'Started with a vision to provide reliable and professional transportation services for pilgrims, families, tourists, and corporate travelers.'}
              </p>
              <p>
                {isAr 
                  ? 'على مر السنين، وسعت الشركة عملياتها عبر المدن الكبرى في المملكة العربية السعودية مع بناء شراكات طويلة الأمد مع شركات ووكالات السفر الدولية.' 
                  : 'Over the years, the company has expanded operations across major cities in Saudi Arabia while building long-term partnerships with international travel companies and agencies.'}
              </p>
              <p className="font-semibold text-[#1B1E4F]">
                {isAr 
                  ? 'اليوم، تخدم ميهار للنقل آلاف الركاب سنوياً وتدعم متطلبات النقل الفردية والمؤسسية على حد سواء.' 
                  : 'Today, Mehar Transport serves thousands of passengers annually and supports both individual and corporate transportation requirements.'}
              </p>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div 
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[#1B1E4F]/10 z-10" />
              <img 
                src="/media/camry.png" 
                alt="Mehar Transport Fleet" 
                className="w-full h-full object-cover"
              />
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D9A63A] rounded-bl-[100px] z-20 opacity-90 flex items-center justify-center">
                <div className="text-white text-center">
                  <span className="block text-3xl font-bold">2016</span>
                  <span className="text-xs uppercase tracking-wider">Established</span>
                </div>
              </div>
            </div>
            
            {/* Background decorative shape */}
            <div className="absolute -bottom-8 -left-8 w-64 h-64 border-2 border-[#D9A63A]/20 rounded-full -z-10" />
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#1B1E4F]/5 rounded-full -z-10" />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
