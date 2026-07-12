import { Map, Car, CalendarDays, TrendingUp, AlertCircle, ArrowUpRight, ArrowDownRight } from "lucide-react";
import connectToDatabase from "@/lib/db";
import Route from "@/lib/models/Route";
import Vehicle from "@/lib/models/Vehicle";
import SeasonalPricing from "@/lib/models/SeasonalPricing";

export default async function PricingDashboardPage({ params: { locale } }: { params: { locale: string } }) {
  const isAr = locale === "ar";
  
  await connectToDatabase();
  
  const activeRoutesCount = await Route.countDocuments({ isActive: true });
  const vehiclesCount = await Vehicle.countDocuments({ active: true });
  
  const now = new Date();
  const activeSeasons = await SeasonalPricing.find({
    isActive: true,
    startDate: { $lte: now },
    endDate: { $gte: now }
  }).lean();

  const stats = [
    { label: isAr ? "المسارات النشطة" : "Active Routes", value: activeRoutesCount.toString(), icon: Map, color: "text-blue-500", bg: "bg-blue-50" },
    { label: isAr ? "فئات المركبات" : "Vehicle Categories", value: vehiclesCount.toString(), icon: Car, color: "text-indigo-500", bg: "bg-indigo-50" },
    { label: isAr ? "متوسط السعر للرحلة" : "Avg. Route Price", value: "450 SAR", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50", trend: "+5.2%" },
    { label: isAr ? "المواسم النشطة" : "Active Seasons", value: activeSeasons.length.toString(), icon: CalendarDays, color: "text-amber-500", bg: "bg-amber-50" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8 border-b border-gray-100 pb-6">
        <h2 className="text-2xl font-bold text-primary">
          {isAr ? "لوحة معلومات التسعير" : "Pricing Dashboard"}
        </h2>
        <p className="text-gray-500 mt-1">
          {isAr ? "نظرة عامة على إعدادات التسعير، العوائد، والقواعد النشطة." : "Overview of pricing configurations, revenue impact, and active rules."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-500">{stat.label}</span>
              <div className={`w-10 h-10 rounded-full ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
              {stat.trend && (
                <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  {stat.trend}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Seasonal Rules */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-secondary" />
            {isAr ? "قواعد التسعير الموسمي النشطة" : "Active Seasonal Pricing Rules"}
          </h3>
          
          {activeSeasons.length > 0 ? (
            <div className="space-y-4">
              {activeSeasons.map((season) => (
                <div key={season._id.toString()} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div>
                    <h4 className="font-bold text-gray-800">{isAr ? season.seasonNameAr : season.seasonName}</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(season.startDate).toLocaleDateString()} - {new Date(season.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 text-sm font-bold rounded-lg ${
                      season.adjustmentType.includes('increase') 
                        ? "bg-emerald-100 text-emerald-700" 
                        : "bg-red-100 text-red-700"
                    }`}>
                      {season.adjustmentType.includes('increase') ? "+" : "-"}
                      {season.adjustmentValue}
                      {season.adjustmentType.includes('percentage') ? "%" : " SAR"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center bg-gray-50 rounded-xl border border-gray-100 border-dashed">
              <AlertCircle className="w-8 h-8 text-gray-300 mb-3" />
              <p className="text-sm font-semibold text-gray-500">{isAr ? "لا توجد مواسم نشطة حالياً" : "No active seasonal rules currently"}</p>
            </div>
          )}
        </div>

        {/* Revenue Impact (Mock Chart area) */}
        <div className="bg-primary text-white border border-primary/80 rounded-2xl p-6 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-secondary" />
            {isAr ? "تأثير التسعير (شهري)" : "Pricing Impact (MTD)"}
          </h3>
          <p className="text-sm text-blue-200 mb-6">
            {isAr ? "العائد الإضافي الناتج عن القواعد الديناميكية" : "Extra revenue generated by dynamic rules"}
          </p>
          
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <div className="text-4xl font-black text-secondary mb-2">+12,450 <span className="text-xl">SAR</span></div>
            <p className="text-sm text-blue-200 flex items-center justify-center gap-1">
              <ArrowUpRight className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-bold">14%</span> {isAr ? "مقارنة بالشهر الماضي" : "vs last month"}
            </p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-primary/80 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-blue-200">{isAr ? "من التسعير الموسمي" : "From Seasonal Surges"}</span>
              <span className="font-bold text-white">8,200 SAR</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-blue-200">{isAr ? "من تسعير أوقات الذروة" : "From Peak Hours"}</span>
              <span className="font-bold text-white">4,250 SAR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
