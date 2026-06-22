"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import Link from "next/link";

export function AboutCTA({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D9A63A]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1B1E4F]/5 rounded-full blur-3xl" />
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div 
          className="bg-[#F8F9FC] border border-gray-100 rounded-[3rem] p-10 md:p-16 text-center max-w-5xl mx-auto shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-[#1B1E4F] mb-6 leading-tight">
            {isAr ? 'جاهز للسفر بثقة؟' : 'Ready To Travel With Confidence?'}
          </h2>
          <p className={`text-xl text-gray-500 mb-12 max-w-3xl mx-auto leading-relaxed ${isAr ? 'font-arabic' : ''}`}>
            {isAr 
              ? 'سواء كنت تحتاج إلى نقل من المطار، أو نقل العمرة، أو السفر بين المدن، أو خدمات السائق التنفيذي، فإن ميهار للنقل مستعدة لمساعدتك.' 
              : 'Whether you require airport transfers, Umrah transportation, intercity travel, or executive chauffeur services, Mehar Transport is ready to assist.'}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href={`/${locale}/booking`}
              className="w-full sm:w-auto px-10 py-5 bg-[#D9A63A] text-[#1B1E4F] rounded-2xl font-bold text-lg hover:bg-[#C4962F] transition-all hover:scale-105 shadow-[0_0_30px_rgba(217,166,58,0.3)] flex items-center justify-center gap-2"
            >
              {isAr ? 'احجز الآن' : 'Book Now'}
              <ArrowRight className={`w-6 h-6 ${isAr ? 'rotate-180' : ''}`} />
            </Link>
            
            <Link 
              href={`/${locale}/contact`}
              className="w-full sm:w-auto px-10 py-5 bg-white text-[#1B1E4F] border border-gray-200 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              {isAr ? 'اطلب عرض سعر' : 'Get Quote'}
            </Link>
            
            <div className="flex items-center gap-4 mt-4 sm:mt-0 sm:ml-4">
              <a 
                href="https://wa.me/966565638120" 
                target="_blank" 
                rel="noreferrer"
                className="w-14 h-14 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center hover:bg-[#25D366]/20 transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="w-6 h-6" />
              </a>
              <a 
                href="tel:+966565638120" 
                className="w-14 h-14 rounded-full bg-[#1B1E4F]/10 text-[#1B1E4F] flex items-center justify-center hover:bg-[#1B1E4F]/20 transition-colors"
                title="Call Us"
              >
                <Phone className="w-6 h-6" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
