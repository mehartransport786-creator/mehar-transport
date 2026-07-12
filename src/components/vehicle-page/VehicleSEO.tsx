"use client";

import { useLocale } from "next-intl";

interface VehicleSEOProps {
  seo: {
    title: string;
    titleAr: string;
    content: string;
    contentAr: string;
  };
}

export function VehicleSEO({ seo }: VehicleSEOProps) {
  const locale = useLocale();
  const isAr = locale === "ar";

  if (!seo) return null;

  return (
    <section className="bg-slate-50 rounded-3xl p-8 md:p-12 mt-12 border border-gray-100 prose prose-lg max-w-none prose-headings:text-primary prose-p:text-gray-600">
      <h2 className="text-2xl font-bold mb-6">
        {isAr ? seo.titleAr : seo.title}
      </h2>
      <div className="leading-relaxed font-light">
        {isAr ? seo.contentAr : seo.content}
      </div>
    </section>
  );
}
