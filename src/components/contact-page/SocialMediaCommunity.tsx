"use client";

import { useTranslations } from "next-intl";
import { Camera, PlaySquare } from "lucide-react";

export function SocialMediaCommunity() {
  const t = useTranslations("ContactPage.social");

  const images = [
    "/cities/jeddah.webp",
    "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1580674684081-77673f40f090?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1621876938914-7227d8db191e?auto=format&fit=crop&w=600&q=80"
  ];

  return (
    <section className="section-padding bg-background border-t border-border overflow-hidden">
      <div className="container-fluid">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {t("title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              See the latest updates, travel stories, and premium experiences from our passengers across Saudi Arabia.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-[var(--radius-btn)] shadow-[var(--shadow-btn)] transition-all duration-[var(--duration-instant)] ease-[var(--ease-out)] hover:-translate-y-0.5">
              <Camera className="w-5 h-5" />
              {t("instagram")}
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-[var(--radius-btn)] shadow-[var(--shadow-btn)] transition-all duration-[var(--duration-instant)] ease-[var(--ease-out)] hover:-translate-y-0.5">
              <PlaySquare className="w-5 h-5" />
              {t("youtube")}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <a
              key={idx}
              href="#"
              className="group relative aspect-square rounded-[var(--radius-card)] overflow-hidden cursor-pointer shadow-[var(--shadow-card)]"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:scale-110"
                style={{ backgroundImage: `url(${img})` }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-[var(--duration-instant)] ease-[var(--ease-out)] flex items-center justify-center">
                <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-[var(--duration-instant)] ease-[var(--ease-out)] scale-50 group-hover:scale-100" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
