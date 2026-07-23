"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Users, Briefcase, ArrowRight, ArrowLeft } from "lucide-react";

export function VehicleCard({ vehicle }: { vehicle: any }) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="group cursor-pointer relative rounded-[var(--radius-card)] overflow-hidden flex flex-col bg-background border border-border shadow-sm hover:shadow-[var(--shadow-luxury)] transition-all duration-[var(--duration-instant)] ease-[var(--ease-out)] hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-muted/30 overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-muted via-transparent to-transparent opacity-50 z-0"></div>
        <Image 
          src={vehicle.image} 
          alt={isAr ? vehicle.nameAr : vehicle.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain p-6 group-hover:scale-105 transition-transform duration-700 ease-out drop-shadow-[0_10px_15px_rgba(0,0,0,0.1)] relative z-10"
        />
        {/* Special Label if any */}
        {vehicle.specialLabel && (
          <div className="absolute top-4 right-4 rtl:left-4 rtl:right-auto z-20">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground px-3 py-1.5 rounded-full shadow-sm">
              {isAr ? vehicle.specialLabelAr : vehicle.specialLabel}
            </span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.2em]">
            {isAr ? vehicle.typeAr : vehicle.type}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-primary mb-2 line-clamp-1">
          {isAr ? vehicle.nameAr : vehicle.name}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-6 min-h-[40px]">
          {isAr ? vehicle.descriptionAr : vehicle.description}
        </p>

        {/* Specs */}
        <div className="flex items-center gap-6 py-4 border-y border-border mb-6">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary">{vehicle.passengers}</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary">{vehicle.luggage}</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3 mt-auto">
          <Link 
            href={`/booking?vehicle=${vehicle._id || vehicle.slug}`}
            className="flex-1 text-center px-4 py-3 rounded-[var(--radius-btn)] font-bold transition-all duration-[var(--duration-instant)] ease-[var(--ease-out)] bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground shadow-sm text-sm"
          >
            {isAr ? "احجز" : "Book Now"}
          </Link>
          <Link 
            href={`/fleet/${vehicle.slug}`}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-[var(--radius-btn)] font-bold transition-all duration-[var(--duration-instant)] ease-[var(--ease-out)] text-primary hover:bg-primary/5 border border-border text-sm group/btn"
          >
            <span>{isAr ? "التفاصيل" : "View Details"}</span>
            <ArrowIcon className="w-4 h-4 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
