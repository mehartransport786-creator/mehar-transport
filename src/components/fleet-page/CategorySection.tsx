"use client";

import { useLocale } from "next-intl";
import { VehicleCard } from "./VehicleCard";
import { Link } from "@/i18n/routing";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface CategorySectionProps {
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  vehicles: any[];
  slug?: string;
  isHub?: boolean; // If true, it uses h1 instead of h2 and doesn't show "View All" link
}

export function CategorySection({
  title,
  titleAr,
  description,
  descriptionAr,
  vehicles,
  slug,
  isHub = false
}: CategorySectionProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const HeadingTag = isHub ? "h1" : "h2";

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container-fluid">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <HeadingTag className={`font-bold text-primary mb-4 ${isHub ? 'text-4xl md:text-5xl lg:text-6xl tracking-tight' : 'text-3xl md:text-4xl'}`}>
              {isAr ? titleAr : title}
            </HeadingTag>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {isAr ? descriptionAr : description}
            </p>
          </div>
          {!isHub && slug && (
            <Link 
              href={`/fleet/${slug}`}
              className="inline-flex items-center gap-2 text-secondary font-bold hover:text-primary transition-colors group"
            >
              <span>{isAr ? "عرض الفئة كاملة" : `Explore ${title}`}</span>
              <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {vehicles.map((vehicle, idx) => (
            <div key={vehicle._id?.toString() || idx} className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both" style={{ animationDelay: `${idx * 60}ms` }}>
              <VehicleCard vehicle={vehicle} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
