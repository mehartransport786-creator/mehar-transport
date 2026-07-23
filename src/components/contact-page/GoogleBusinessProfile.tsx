"use client";

import { useTranslations } from "next-intl";
import { Star, MapPin, Clock, Phone, Globe, ExternalLink, CheckCircle } from "lucide-react";
import Image from "next/image";

export function GoogleBusinessProfile() {
  const t = useTranslations("ContactPage.googleProfile");

  return (
    <div className="bg-card text-card-foreground rounded-[var(--radius-card)] overflow-hidden border border-border shadow-[var(--shadow-card)]">
      {/* Header Image mimicking Google Maps */}
      <div className="h-48 w-full bg-slate-200 dark:bg-slate-800 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1580674684081-77673f40f090?auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-6">
          <h3 className="text-2xl font-bold text-white mb-1">Mehar Umrah Transport</h3>
          <p className="text-slate-200 font-medium text-sm">Umrah & Transportation Service in Saudi Arabia</p>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xl font-bold text-primary">{t("rating")}</span>
          <div className="flex text-secondary">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <span className="text-muted-foreground font-medium ml-1">({t("reviews")})</span>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-4">
            <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
            <span className="text-primary font-medium">Al Nawariyah District, Makkah, Saudi Arabia</span>
          </div>
          <div className="flex items-start gap-4">
            <Clock className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
            <span className="text-emerald-600 dark:text-emerald-500 font-medium">{t("hours")}</span>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
            <span className="text-primary font-medium">+966 56 563 8132</span>
          </div>
          <div className="flex items-start gap-4">
            <Globe className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
            <span className="text-primary font-medium">mehartransport.com</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6 p-3 bg-secondary/10 rounded-[var(--radius-sm)] border border-secondary/20">
          <CheckCircle className="w-5 h-5 text-secondary" />
          <span className="text-sm font-medium text-secondary">Verified Google Business Listing</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a 
            href="https://www.google.com/maps/dir//Mehar+Umrah+Transport/@22.8273029,39.9450463" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-[var(--radius-btn)] transition-all duration-[var(--duration-instant)] ease-[var(--ease-out)] flex justify-center items-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            {t("directions")}
          </a>
          <a 
            href="https://www.google.com/maps/place/Mehar+Umrah+Transport/@22.8273029,39.9450463,8z/data=!3m1!4b1!4m6!3m5!1s0xab0a54a62861f32d:0xedcfe9ce9cfa2559!8m2!3d22.8273029!4d39.9450464!16s%2Fg%2F11wfn4dft8" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 border border-border hover:bg-accent text-accent-foreground font-semibold py-3 rounded-[var(--radius-btn)] transition-all duration-[var(--duration-instant)] ease-[var(--ease-out)] flex justify-center items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            View Profile
          </a>
        </div>
      </div>
    </div>
  );
}
