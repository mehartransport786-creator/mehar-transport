"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { mockFleet } from "@/lib/data";
import { ArrowRight, ArrowLeft } from "lucide-react";

export function VehicleCategoryExperience() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  // We map the categories explicitly as requested in the brief
  const categories = [
    {
      title: isAr ? "تنفيذي" : "EXECUTIVE",
      vehicle: "Toyota Camry",
      perfectFor: isAr ? "رجال الأعمال، المطار، الأزواج" : "Business, Airport, Couples",
      image: mockFleet.find(v => v.id === "toyota-camry")?.image || "",
    },
    {
      title: isAr ? "عائلي فاخر" : "PREMIUM VAN",
      vehicle: "Hyundai Staria",
      perfectFor: isAr ? "السفر العائلي الفاخر، عمرة VIP" : "Premium Family Travel, VIP Umrah",
      image: mockFleet.find(v => v.id === "hyundai-staria")?.image || "",
    },
    {
      title: isAr ? "دفع رباعي فاخر" : "LUXURY SUV",
      vehicle: "GMC Denali",
      perfectFor: isAr ? "العائلات، المجموعات الصغيرة، العمرة" : "Families, Small Groups, Umrah",
      image: mockFleet.find(v => v.id === "gmc-denali")?.image || "",
    },
    {
      title: isAr ? "فان تنفيذي" : "EXECUTIVE VAN",
      vehicle: "Hyundai H1",
      perfectFor: isAr ? "المجموعات، العائلات، الشركات" : "Groups, Families, Corporate",
      image: mockFleet.find(v => v.id === "hyundai-h1")?.image || "",
    },
    {
      title: isAr ? "فان كبير" : "LARGE VAN",
      vehicle: "Toyota Hiace",
      perfectFor: isAr ? "المجموعات الكبيرة، العائلات الممتدة" : "Large Groups, Extended Families",
      image: mockFleet.find(v => v.id === "toyota-hiace")?.image || "",
    },
    {
      title: isAr ? "حافلة صغيرة" : "MINIBUS",
      vehicle: "Coaster Bus",
      perfectFor: isAr ? "السياحة، الحملات الكبيرة، الفعاليات" : "Tourism, Large Pilgrimage Groups, Events",
      image: mockFleet.find(v => v.id === "coaster-bus")?.image || "",
    },
  ];

  return (
    <section className="py-32 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="w-12 h-0.5 bg-secondary mx-auto"
          />
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-primary"
          >
            {isAr ? "اكتشف فئتك المثالية" : "Discover Your Ideal Class"}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground"
          >
            {isAr 
              ? "مجموعة مختارة بعناية من المركبات لتلبية احتياجات سفرك بدقة متناهية وفخامة لا تضاهى." 
              : "A meticulously curated selection of vehicles to precisely meet your travel needs with unmatched luxury."}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {categories.map((cat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group cursor-pointer relative h-[400px] rounded-[var(--radius-card)] overflow-hidden flex flex-col justify-end"
            >
              <div className="absolute inset-0 bg-background border border-border rounded-[var(--radius-card)]"></div>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-muted via-transparent to-transparent rounded-[var(--radius-card)]"></div>
              
              <img 
                src={cat.image} 
                className="absolute inset-0 w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-1000 drop-shadow-[0_20px_30px_rgba(0,0,0,0.1)]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-90 transition-opacity duration-500 rounded-[var(--radius-card)]" />
              
              <div className="relative z-10 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="text-secondary text-xs font-bold uppercase tracking-[0.2em] mb-2">{cat.title}</div>
                <h3 className="text-2xl font-bold text-primary mb-4">{cat.vehicle}</h3>
                
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <div className="text-sm text-muted-foreground font-medium mb-1">{isAr ? "مثالية لـ:" : "Perfect for:"}</div>
                  <div className="text-primary font-medium mb-6 leading-tight">{cat.perfectFor}</div>
                  
                  <div className="flex items-center gap-2 text-secondary font-bold text-sm uppercase tracking-wider group/link">
                    <span>{isAr ? "استكشف الفئة" : "Explore Class"}</span>
                    <ArrowIcon className="w-4 h-4 group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1 transition-transform" />
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
