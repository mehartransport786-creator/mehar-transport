import { CalendarDays, Plus, AlertTriangle, ArrowUp, ArrowDown } from "lucide-react";
import connectToDatabase from "@/lib/db";
import SeasonalPricing from "@/lib/models/SeasonalPricing";

export default async function SeasonalPricingPage({ params: { locale } }: { params: { locale: string } }) {
  const isAr = locale === "ar";
  
  await connectToDatabase();
  
  const seasons = await SeasonalPricing.find().sort({ startDate: 1 }).lean();
  
  const now = new Date();
  const activeSeasons = seasons.filter(s => new Date(s.startDate) <= now && new Date(s.endDate) >= now && s.isActive);
  const upcomingSeasons = seasons.filter(s => new Date(s.startDate) > now && s.isActive);
  const pastSeasons = seasons.filter(s => new Date(s.endDate) < now || !s.isActive);

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1B1E4F]">
            {isAr ? "التسعير الموسمي والمناسبات" : "Seasonal & Peak Pricing"}
          </h2>
          <p className="text-gray-500 mt-1">
            {isAr ? "برمجة القواعد الديناميكية لمواسم الحج، العمرة، والأعياد." : "Configure automated price surges or discounts for Hajj, Ramadan, and holidays."}
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#D9A63A] text-white font-bold rounded-xl text-sm hover:bg-[#c29333] transition-all shadow-lg shadow-[#D9A63A]/20">
          <Plus className="w-4 h-4" />
          {isAr ? "إضافة موسم جديد" : "Add Seasonal Rule"}
        </button>
      </div>

      {activeSeasons.length > 0 && (
        <div className="mb-10">
          <h3 className="text-lg font-bold text-[#1B1E4F] mb-4 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            {isAr ? "القواعد النشطة حالياً" : "Currently Active"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeSeasons.map(renderSeasonCard)}
          </div>
        </div>
      )}

      {upcomingSeasons.length > 0 && (
        <div className="mb-10">
          <h3 className="text-lg font-bold text-gray-700 mb-4">{isAr ? "المواسم القادمة" : "Upcoming Seasons"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingSeasons.map(renderSeasonCard)}
          </div>
        </div>
      )}

      {pastSeasons.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-gray-400 mb-4">{isAr ? "السجل والمواسم المنتهية" : "Past & Inactive"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-60 grayscale hover:grayscale-0 transition-all">
            {pastSeasons.map(renderSeasonCard)}
          </div>
        </div>
      )}
    </div>
  );

  function renderSeasonCard(season: any) {
    const isIncrease = season.adjustmentType.includes("increase");
    const isPercentage = season.adjustmentType.includes("percentage");
    
    return (
      <div key={season._id.toString()} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all relative group">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="font-bold text-gray-800 text-lg">{isAr ? season.seasonNameAr : season.seasonName}</h4>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
              <CalendarDays className="w-3 h-3" />
              {new Date(season.startDate).toLocaleDateString()} - {new Date(season.endDate).toLocaleDateString()}
            </div>
          </div>
          <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${isIncrease ? "bg-red-50 text-red-500" : "bg-emerald-50 text-emerald-500"}`}>
            {isIncrease ? <ArrowUp className="w-6 h-6" /> : <ArrowDown className="w-6 h-6" />}
          </div>
        </div>

        <div className="mt-6 flex items-end justify-between">
          <div>
            <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              {isAr ? "التعديل" : "Adjustment"}
            </span>
            <span className={`text-2xl font-black ${isIncrease ? "text-red-600" : "text-emerald-600"}`}>
              {isIncrease ? "+" : "-"}{season.adjustmentValue}{isPercentage ? "%" : " SAR"}
            </span>
          </div>
          <button className="text-sm font-semibold text-blue-600 hover:text-blue-800">
            {isAr ? "تعديل" : "Edit"}
          </button>
        </div>
        
        {(season.description || season.descriptionAr) && (
          <div className="mt-4 pt-4 border-t border-gray-50 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-500 line-clamp-2">
              {isAr ? season.descriptionAr : season.description}
            </p>
          </div>
        )}
      </div>
    );
  }
}
