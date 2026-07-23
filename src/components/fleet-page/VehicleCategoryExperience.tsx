"use client";

import { useLocale } from "next-intl";
import { mockFleet } from "@/lib/data";
import Image from "next/image";
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
    <section className="section-padding bg-muted">
      <div className="container-fluid">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <div className="w-12 h-0.5 bg-secondary mx-auto" />
          <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
            {isAr ? "اكتشف فئتك المثالية" : "Discover Your Ideal Class"}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {isAr 
              ? "مجموعة مختارة بعناية من المركبات لتلبية احتياجات سفرك بدقة متناهية وفخامة لا تضاهى." 
              : "A meticulously curated selection of vehicles to precisely meet your travel needs with unmatched luxury."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 lg:gap-8">
          {categories.map((cat, idx) => (
            <div 
              key={idx}
              className="group cursor-pointer relative h-[400px] rounded-[var(--radius-card)] overflow-hidden flex flex-col justify-end border border-border bg-background shadow-sm hover:shadow-[var(--shadow-luxury)] transition-all duration-[var(--duration-instant)] ease-[var(--ease-out)] hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-muted via-transparent to-transparent opacity-50"></div>
              
              <Image 
                src={cat.image} 
                alt={cat.vehicle}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-contain p-6 group-hover:scale-105 transition-transform duration-700 ease-out drop-shadow-[0_20px_30px_rgba(0,0,0,0.1)]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent opacity-90 transition-opacity duration-[var(--duration-instant)]" />
              
              <div className="relative z-10 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-[var(--duration-instant)] ease-[var(--ease-out)]">
                <div className="text-secondary text-xs font-bold uppercase tracking-[0.2em] mb-2">{cat.title}</div>
                <h3 className="text-xl font-bold text-primary mb-3">{cat.vehicle}</h3>
                
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--duration-instant)] ease-[var(--ease-out)] delay-75">
                  <div className="text-xs text-muted-foreground font-medium mb-1">{isAr ? "مثالية لـ:" : "Perfect for:"}</div>
                  <div className="text-primary text-sm font-medium mb-4 leading-tight">{cat.perfectFor}</div>
                  
                  <div className="flex items-center gap-2 text-secondary font-bold text-sm uppercase tracking-wider group/link">
                    <span>{isAr ? "استكشف الفئة" : "Explore Class"}</span>
                    <ArrowIcon className="w-4 h-4 group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1 transition-transform duration-[var(--duration-instant)]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
