"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Users, Briefcase, ArrowRight } from "lucide-react";
import { VehicleData } from "@/data/fleet";
import { useLocale } from "next-intl";

export interface CategoryContent {
  id: string; // 'all', 'sedan', 'suv', 'van', 'minibus'
  title: string;
  description: string;
  link?: string;
  linkLabel?: string;
}

interface FleetGridProps {
  vehicles: VehicleData[];
  categories: CategoryContent[];
}

export function FleetGrid({ vehicles, categories }: FleetGridProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section className="py-24 bg-background" id="premium-collection">
      <div className="container-fluid">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-8 py-3 rounded-[var(--radius-btn)] text-sm font-bold transition-all duration-[var(--duration-quick)] ${
                activeFilter === cat.id
                  ? "bg-secondary text-white shadow-[var(--shadow-luxury)]"
                  : "bg-muted text-muted-foreground hover:bg-secondary/10 hover:text-primary"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Category SEO Copy (All present in DOM, visually hidden if not active) */}
        <div className="mb-12 max-w-4xl mx-auto text-center min-h-[140px] flex items-center justify-center">
          {categories.map((cat) => (
            <div
              key={`desc-${cat.id}`}
              className={`transition-opacity duration-[var(--duration-base)] w-full ${
                activeFilter === cat.id ? "block animate-in fade-in" : "hidden"
              }`}
            >
              {cat.id !== "all" && (
                <h2 className="text-3xl font-bold text-primary mb-4">{cat.title}</h2>
              )}
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {cat.description}
              </p>
              {cat.link && cat.linkLabel && (
                <Link
                  href={cat.link as any}
                  className="inline-flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors group"
                >
                  <span>{cat.linkLabel}</span>
                  <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isAr ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle) => {
            const isVisible = activeFilter === "all" || activeFilter === vehicle.category;
            
            return (
              <div
                key={vehicle.id}
                className={`flex flex-col bg-white border border-border rounded-[var(--radius-btn)] overflow-hidden shadow-sm hover:shadow-[var(--shadow-luxury)] transition-all duration-[var(--duration-base)] group ${
                  isVisible ? "block animate-in fade-in slide-in-from-bottom-4" : "hidden"
                }`}
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] bg-slate-50 p-8 flex items-center justify-center border-b border-border">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-primary text-xs font-bold rounded-full shadow-sm border border-slate-200">
                      {isAr ? vehicle.typeAr : vehicle.type}
                    </span>
                  </div>
                  <div className="relative w-full h-full">
                    <Image
                      src={vehicle.heroImage}
                      alt={isAr ? vehicle.nameAr : vehicle.name}
                      fill
                      className="object-contain drop-shadow-xl transition-transform duration-[var(--duration-base)] group-hover:-translate-y-1"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    {isAr ? vehicle.nameAr : vehicle.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    {isAr ? vehicle.story.titleAr : vehicle.story.title}
                  </p>

                  {/* Specs */}
                  <div className="flex flex-wrap items-center gap-4 mb-8 mt-auto pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-primary font-bold text-sm bg-slate-50 px-3 py-1.5 rounded-lg">
                      <Users className="w-4 h-4 text-secondary" />
                      <span>
                        {vehicle.passengers} {isAr ? "ركاب" : "Passengers"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-bold text-sm bg-slate-50 px-3 py-1.5 rounded-lg">
                      <Briefcase className="w-4 h-4 text-secondary" />
                      <span>
                        {vehicle.luggage} {isAr ? "حقائب" : "Bags"}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3">
                    <Link
                      href={`/booking?vehicle=${vehicle.id}` as any}
                      className="relative overflow-hidden bg-secondary text-white px-8 py-3.5 rounded-[var(--radius-btn)] font-bold transition-all duration-[var(--duration-instant)] ease-[var(--ease-out)] flex items-center justify-center group shadow-[var(--shadow-luxury)] hover:-translate-y-1 w-full"
                    >
                      <span className="relative z-10">{isAr ? "احجز الآن" : "Book Now"}</span>
                    </Link>
                    <Link
                      href={`/fleet/${vehicle.slug}` as any}
                      className="relative overflow-hidden bg-white text-primary px-8 py-3.5 rounded-[var(--radius-btn)] font-bold transition-all duration-[var(--duration-instant)] ease-[var(--ease-out)] flex items-center justify-center group border border-slate-300 w-full"
                    >
                      <span className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)]"></span>
                      <span className="relative z-10 group-hover:text-white transition-colors duration-[var(--duration-base)]">
                        {isAr ? "عرض التفاصيل" : "View Details"}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
