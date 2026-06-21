"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, BookOpen, Clock } from "lucide-react";

export function ContentHubSection() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const posts = [
    {
      title: isAr ? "دليلك الشامل لترتيب المواصلات خلال العمرة" : "Complete Guide to Organizing Umrah Transportation",
      category: isAr ? "نصائح العمرة" : "Umrah Tips",
      date: isAr ? "١٥ أكتوبر ٢٠٢٦" : "Oct 15, 2026",
      image: "/gallery/haram.webp"
    },
    {
      title: isAr ? "أفضل ٥ مسارات سياحية للزيارة في المدينة المنورة" : "Top 5 Historical Routes to Visit in Madinah",
      category: isAr ? "دليل السفر" : "Travel Guide",
      date: isAr ? "٠٢ أكتوبر ٢٠٢٦" : "Oct 02, 2026",
      image: "/cities/madinah.webp"
    },
    {
      title: isAr ? "ماذا تتوقع عند حجز خدمة الاستقبال من المطار؟" : "What to Expect When Booking Airport VIP Meet & Greet?",
      category: isAr ? "خدماتنا" : "Our Services",
      date: isAr ? "٢٠ سبتمبر ٢٠٢٦" : "Sep 20, 2026",
      image: "/services/airport.webp"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-0.5 bg-secondary"></div>
              <span className="text-secondary font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                {isAr ? "مركز المعرفة" : "Knowledge Hub"}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              {isAr ? "أدلة السفر ونصائح العمرة" : "Travel Guides & Umrah Tips"}
            </h2>
          </div>
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-secondary font-bold hover:text-primary transition-colors group"
          >
            {isAr ? "تصفح المدونة" : "Browse All Articles"}
            <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-2xl mb-6 relative shadow-sm group-hover:shadow-xl transition-all duration-300">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 rtl:right-4 rtl:left-auto bg-white/90 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                  {post.category}
                </div>
              </div>
              <div className="space-y-3 px-2">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors line-clamp-2 leading-tight">
                  {post.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
