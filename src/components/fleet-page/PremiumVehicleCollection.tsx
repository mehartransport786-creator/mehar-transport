"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { mockFleet } from "@/lib/data";
import { Link } from "@/i18n/routing";
import { Users, Briefcase, Star, ArrowRight, ArrowLeft } from "lucide-react";

export function PremiumVehicleCollection({ vehicles }: { vehicles: any[] }) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <section id="premium-collection" className="bg-white">
      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px] pt-32 pb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-gray-200 pb-12">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-0.5 bg-[#D9A63A]"></div>
              <span className="text-[#D9A63A] font-bold uppercase tracking-[0.2em] text-sm">
                {isAr ? "مجموعة النخبة" : "The Premium Collection"}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1B1E4F] leading-tight">
              {isAr ? "تجربة سفر لا تُنسى" : "Unforgettable Journeys"}
            </h2>
          </div>
          <p className="text-gray-500 text-lg md:text-xl font-light max-w-md">
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
          // Determine theme based on vehicle
          const theme = "light";
          const bgColor = theme === "dark" ? "bg-[#0a0a0a]" : "bg-white";
          const textColor = theme === "dark" ? "text-white" : "text-[#1B1E4F]";
          const subTextColor = theme === "dark" ? "text-gray-400" : "text-gray-500";
          
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
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden group shadow-2xl bg-gradient-to-b from-[#1B1E4F] to-[#0d0f28] border border-white/10">
                      {/* Studio Lighting Effect */}
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
                      
                      <img 
                        src={vehicle.image} 
                        alt={vehicle.name} 
                        className="absolute inset-0 w-full h-full object-contain p-8 md:p-12 group-hover:scale-105 transition-transform duration-[1.5s] ease-out drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                      />
                      {/* Interactive Gallery Hint */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                        <Link 
                          href={`/fleet/${vehicle.slug}`}
                          className="bg-white/90 text-[#1B1E4F] px-8 py-3 rounded-full font-bold shadow-2xl hover:bg-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-500"
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
                          <span className="text-[#D9A63A] text-xs font-bold uppercase tracking-[0.2em]">
                            {isAr ? vehicle.typeAr : vehicle.type}
                          </span>
                          {vehicle.specialLabel && (
                            <>
                              <span className={`w-1 h-1 rounded-full ${theme === 'dark' ? 'bg-white/20' : 'bg-[#1B1E4F]/20'}`}></span>
                              <span className={`text-[10px] font-bold uppercase tracking-wider ${theme === 'dark' ? 'bg-white/10 text-white' : 'bg-[#1B1E4F]/5 text-[#1B1E4F]'} px-2 py-1 rounded-sm`}>
                                {isAr ? vehicle.specialLabelAr : vehicle.specialLabel}
                              </span>
                            </>
                          )}
                        </div>
                        <h3 className={`text-4xl md:text-5xl font-bold ${textColor} leading-tight mb-6`}>
                          {isAr ? vehicle.nameAr : vehicle.name}
                        </h3>
                        <p className={`text-lg leading-relaxed ${subTextColor} font-light`}>
                          {isAr ? vehicle.descriptionAr : vehicle.description}
                        </p>
                      </div>

                      <div className={`grid grid-cols-3 gap-6 py-8 border-y ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
                        <div className="space-y-2">
                          <Users className={`w-6 h-6 ${theme === 'dark' ? 'text-white' : 'text-[#1B1E4F]'}`} />
                          <div className={`text-sm ${subTextColor}`}>{isAr ? "الركاب" : "Passengers"}</div>
                          <div className={`font-bold ${textColor} text-xl`}>{vehicle.passengers}</div>
                        </div>
                        <div className="space-y-2">
                          <Briefcase className={`w-6 h-6 ${theme === 'dark' ? 'text-white' : 'text-[#1B1E4F]'}`} />
                          <div className={`text-sm ${subTextColor}`}>{isAr ? "الحقائب" : "Luggage"}</div>
                          <div className={`font-bold ${textColor} text-xl`}>{vehicle.luggage}</div>
                        </div>
                        <div className="space-y-2">
                          <Star className={`w-6 h-6 ${theme === 'dark' ? 'text-[#D9A63A]' : 'text-[#D9A63A]'}`} />
                          <div className={`text-sm ${subTextColor}`}>{isAr ? "الفخامة" : "Luxury"}</div>
                          <div className="flex gap-0.5 mt-1 items-center h-7">
                            <span className={`font-bold ${textColor} text-xl mr-1`}>{vehicle.luxuryLevel}</span>
                            <Star className="w-4 h-4 fill-[#D9A63A] text-[#D9A63A]" />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                        <Link 
                          href={`/booking?vehicle=${vehicle._id || vehicle.slug}`}
                          className={`w-full sm:w-auto text-center px-8 py-4 rounded-xl font-bold transition-all ${
                            theme === 'dark' 
                              ? 'bg-[#D9A63A] text-[#1B1E4F] hover:bg-white' 
                              : 'bg-[#1B1E4F] text-white hover:bg-[#D9A63A] hover:text-[#1B1E4F]'
                          }`}
                        >
                          {isAr ? "احجز الآن" : "Book Now"}
                        </Link>
                        <Link 
                          href={`/fleet/${vehicle.slug}`}
                          className={`w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold transition-all group ${
                            theme === 'dark'
                              ? 'text-white hover:bg-white/5 border border-white/20'
                              : 'text-[#1B1E4F] hover:bg-[#1B1E4F]/5 border border-gray-200'
                          }`}
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
