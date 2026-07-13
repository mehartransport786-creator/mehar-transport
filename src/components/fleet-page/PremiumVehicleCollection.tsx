"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { mockFleet } from "@/lib/data";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Users, Briefcase, Star, ArrowRight, ArrowLeft } from "lucide-react";

export function PremiumVehicleCollection({ vehicles }: { vehicles: any[] }) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <section id="premium-collection" className="bg-background">
      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px] pt-32 pb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border pb-12">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-0.5 bg-secondary"></div>
              <span className="text-secondary font-bold uppercase tracking-[0.2em] text-sm">
                {isAr ? "مجموعة النخبة" : "The Premium Collection"}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
              {isAr ? "تجربة سفر لا تُنسى" : "Unforgettable Journeys"}
            </h2>
          </div>
          <p className="text-muted-foreground text-lg md:text-xl font-light max-w-md">
            {isAr 
              ? "استكشف أسطولنا الاستثنائي، حيث تمثل كل مركبة معياراً للفخامة والراحة والأداء."
              : "Explore our exceptional fleet, where each vehicle represents the pinnacle of luxury, comfort, and performance."}
          </p>
        </div>
      </div>

      {/* Editorial Layouts */}
      <div className="flex flex-col">
        {vehicles.map((vehicle, index) => {
          const isEven = index % 2 === 0;
          // Determine alternating background colors if desired (or just stick to background)
          const bgColor = isEven ? "bg-background" : "bg-muted/30";
          
          return (
            <div key={vehicle._id || vehicle.slug} className={`${bgColor} relative overflow-hidden`}>
              <div className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px] py-24 lg:py-32`}>
                <div className={`flex flex-col gap-12 lg:gap-24 items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  
                  {/* Image Side */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1 }}
                    className="w-full lg:w-[55%] xl:w-[60%]"
                  >
                    <div className="relative aspect-[4/3] rounded-[var(--radius-card)] overflow-hidden group shadow-[var(--shadow-luxury)] bg-muted border border-border">
                      {/* Studio Lighting Effect */}
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background/80 via-transparent to-transparent"></div>
                      
                      <Image 
                        src={vehicle.image} 
                        alt={vehicle.name} 
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-contain p-8 md:p-12 group-hover:scale-105 transition-transform duration-[1.5s] ease-out drop-shadow-[0_20px_30px_rgba(0,0,0,0.1)]"
                      />
                      {/* Interactive Gallery Hint */}
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                        <Link 
                          href={`/fleet/${vehicle.slug}`}
                          className="bg-background/90 text-primary px-8 py-3 rounded-[var(--radius-btn)] font-bold shadow-[var(--shadow-luxury)] hover:bg-background transition-colors transform translate-y-4 group-hover:translate-y-0 duration-500"
                        >
                          {isAr ? "عرض المعرض" : "View Gallery"}
                        </Link>
                      </div>
                    </div>
                  </motion.div>

                  {/* Content Side */}
                  <div className={`w-full lg:w-[45%] xl:w-[40%] flex flex-col justify-center`}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="space-y-8"
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-secondary text-xs font-bold uppercase tracking-[0.2em]">
                            {isAr ? vehicle.typeAr : vehicle.type}
                          </span>
                          {vehicle.specialLabel && (
                            <>
                              <span className={`w-1 h-1 rounded-full bg-primary/20`}></span>
                              <span className={`text-[10px] font-bold uppercase tracking-wider bg-primary/5 text-primary px-2 py-1 rounded-[var(--radius-sm)]`}>
                                {isAr ? vehicle.specialLabelAr : vehicle.specialLabel}
                              </span>
                            </>
                          )}
                        </div>
                        <h3 className={`text-4xl md:text-5xl font-bold text-primary leading-tight mb-6`}>
                          {isAr ? vehicle.nameAr : vehicle.name}
                        </h3>
                        <p className={`text-lg leading-relaxed text-muted-foreground font-light`}>
                          {isAr ? vehicle.descriptionAr : vehicle.description}
                        </p>
                      </div>

                      <div className={`grid grid-cols-3 gap-6 py-8 border-y border-border`}>
                        <div className="space-y-2">
                          <Users className={`w-6 h-6 text-primary`} />
                          <div className={`text-sm text-muted-foreground`}>{isAr ? "الركاب" : "Passengers"}</div>
                          <div className={`font-bold text-primary text-xl`}>{vehicle.passengers}</div>
                        </div>
                        <div className="space-y-2">
                          <Briefcase className={`w-6 h-6 text-primary`} />
                          <div className={`text-sm text-muted-foreground`}>{isAr ? "الحقائب" : "Luggage"}</div>
                          <div className={`font-bold text-primary text-xl`}>{vehicle.luggage}</div>
                        </div>
                        <div className="space-y-2">
                          <Star className={`w-6 h-6 text-secondary`} />
                          <div className={`text-sm text-muted-foreground`}>{isAr ? "الفخامة" : "Luxury"}</div>
                          <div className="flex gap-0.5 mt-1 items-center h-7">
                            <span className={`font-bold text-primary text-xl mr-1`}>{vehicle.luxuryLevel}</span>
                            <Star className="w-4 h-4 fill-secondary text-secondary" />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                        <Link 
                          href={`/booking?vehicle=${vehicle._id || vehicle.slug}`}
                          className={`w-full sm:w-auto text-center px-8 py-4 rounded-[var(--radius-btn)] font-bold transition-all bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground`}
                        >
                          {isAr ? "احجز الآن" : "Book Now"}
                        </Link>
                        <Link 
                          href={`/fleet/${vehicle.slug}`}
                          className={`w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-[var(--radius-btn)] font-bold transition-all group text-primary hover:bg-primary/5 border border-border`}
                        >
                          <span>{isAr ? "التفاصيل" : "Explore Details"}</span>
                          <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </motion.div>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
