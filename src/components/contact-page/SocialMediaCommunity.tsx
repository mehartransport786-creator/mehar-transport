"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Camera, PlaySquare } from "lucide-react";
import Image from "next/image";

export function SocialMediaCommunity() {
  const t = useTranslations("ContactPage.social");

  const images = [
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1580674684081-77673f40f090?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1621876938914-7227d8db191e?auto=format&fit=crop&w=600&q=80"
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {t("title")}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl">
              See the latest updates, travel stories, and premium experiences from our passengers across Saudi Arabia.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full transition-all">
              <Camera className="w-5 h-5" />
              {t("instagram")}
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-all">
              <PlaySquare className="w-5 h-5" />
              {t("youtube")}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <motion.a
              key={idx}
              href="#"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${img})` }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-50 group-hover:scale-100" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
