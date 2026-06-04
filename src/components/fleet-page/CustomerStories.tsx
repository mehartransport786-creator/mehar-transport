"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export function CustomerStories() {
  const locale = useLocale();
  const isAr = locale === "ar";

  const stories = [
    {
      id: 1,
      name: isAr ? "عائلة أحمد" : "The Ahmed Family",
      country: isAr ? "الإمارات العربية المتحدة" : "UAE",
      route: isAr ? "مطار جدة إلى مكة" : "Jeddah Airport to Makkah",
      vehicle: "Hyundai Staria",
      rating: 5,
      review: isAr 
        ? "كانت رحلة العمرة مع ميهار استثنائية. السائق كان ينتظرنا في المطار والسيارة كانت واسعة ومريحة جداً للأطفال. خدمة لا يُعلى عليها."
        : "Our Umrah trip with Mehar was exceptional. The driver was waiting for us at the airport and the vehicle was incredibly spacious and comfortable for the kids. Top-notch service.",
      image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 2,
      name: isAr ? "ديفيد ريتشاردز" : "David Richards",
      country: isAr ? "المملكة المتحدة" : "United Kingdom",
      route: isAr ? "مطار الرياض إلى المركز المالي" : "Riyadh Airport to KAFD",
      vehicle: "Mercedes-Benz S-Class",
      rating: 5,
      review: isAr 
        ? "أستخدم ميهار في جميع رحلات عملي إلى السعودية. احترافية السائقين ونظافة سيارات مرسيدس S-Class تجعلهم الخيار الأول دائماً."
        : "I use Mehar for all my business trips to Saudi Arabia. The professionalism of the drivers and the pristine condition of their S-Class fleet make them my only choice.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 3,
      name: isAr ? "مجموعة الإيمان" : "Al-Iman Group",
      country: isAr ? "ماليزيا" : "Malaysia",
      route: isAr ? "مكة إلى المدينة" : "Makkah to Madinah",
      vehicle: "Toyota Coaster",
      rating: 5,
      review: isAr 
        ? "تنظيم رحلة لـ 20 شخصاً ليس أمراً سهلاً، لكن ميهار جعلت النقل سلساً للغاية. الحافلة كانت مريحة جداً للرحلة الطويلة."
        : "Organizing a trip for 20 people is never easy, but Mehar made the transportation seamless. The Coaster was incredibly comfortable for the long journey.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-24 bg-slate-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#D9A63A] font-bold uppercase tracking-[0.2em] text-sm block">
            {isAr ? "قصص عملائنا" : "Customer Stories"}
          </span>
          <h2 className="text-4xl font-bold text-[#1B1E4F]">
            {isAr ? "تجارب تفوق التوقعات" : "Experiences Beyond Expectations"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, i) => (
            <motion.div 
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100 relative"
            >
              <Quote className="absolute top-8 right-8 rtl:left-8 rtl:right-auto w-12 h-12 text-gray-100 rotate-180" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(story.rating)].map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 fill-[#D9A63A] text-[#D9A63A]" />
                ))}
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-8 relative z-10 font-medium">
                "{story.review}"
              </p>
              
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <img 
                  src={story.image} 
                  alt={story.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-[#1B1E4F]">{story.name}</h4>
                  <div className="text-xs text-gray-500 mt-1">
                    {story.country} • {story.vehicle}
                  </div>
                  <div className="text-[10px] text-[#D9A63A] font-bold uppercase tracking-wider mt-1">
                    {story.route}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
