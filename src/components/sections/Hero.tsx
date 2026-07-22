"use client";

import { motion } from "@/lib/motion";
import { Link, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { MapPin, Calendar, Clock, ArrowRight, ArrowLeft, Star, ShieldCheck, CheckCircle2 } from "lucide-react";
import Image from "next/image";

// PR-6: Removed dead BookingWorkspace inline modal (src/components/booking/ deleted).
// The hero "Book Now" CTA navigates to /booking (booking-v2, the canonical page).

export function Hero() {
  const locale = useLocale();
  const router = useRouter();
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="relative min-h-[calc(100svh+4rem)] lg:min-h-[calc(100vh+6rem)] w-full flex flex-col overflow-hidden">
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 z-0 bg-black">
        <Image
          src="/hero/homepage-hero-new.jpg"
          alt="Mehar Transport Luxury Chauffeur"
          quality={100}
          fill
          priority
          className="object-cover object-center"
        />
        {/* Professional light black overlay */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="my-auto ms-auto max-w-3xl"
        >
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <ShieldCheck className="w-4 h-4 text-secondary" />
            <span className="text-white/90 text-xs font-semibold tracking-wide">
              {isAr ? "خدمة موثوقة في المملكة العربية السعودية" : "Trusted Service Across Saudi Arabia"}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 tracking-tight">
            {isAr ? (
              <>
                تنقّل بفخامة<br />
                <span className="text-secondary">في قلب المملكة</span>
              </>
            ) : (
              <>
                Travel in Luxury<br />
                <span className="text-secondary">Across Saudi Arabia</span>
              </>
            )}
          </h1>

          <p className="text-white/75 text-base sm:text-lg mb-8 max-w-xl leading-relaxed">
            {isAr
              ? "خدمات نقل مميزة للعمرة والمطارات وبين المدن مع أسطول فاخر وسائقين محترفين."
              : "Premium Umrah, airport, and intercity transfers with a luxury fleet and professional chauffeurs."}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 mb-8">
            {[
              { icon: Star, label: isAr ? "تقييم العملاء" : "Customer Rating", value: "4.9★" },
              { icon: CheckCircle2, label: isAr ? "رحلة منجزة" : "Trips completed", value: "10,000+" },
              { icon: MapPin, label: isAr ? "مدن" : "Cities", value: "6" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-secondary" />
                <div>
                  <div className="text-white font-bold text-sm">{value}</div>
                  <div className="text-white/50 text-[11px]">{label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-secondary/30 hover:shadow-xl hover:shadow-secondary/40 hover:-translate-y-0.5"
            >
              {isAr ? "احجز الآن" : "Book Now"}
              <ArrowIcon className="w-4 h-4" />
            </Link>
            <Link
              href="/fleet"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-7 py-3.5 rounded-xl border border-white/20 transition-all"
            >
              {isAr ? "استعرض الأسطول" : "View Fleet"}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
