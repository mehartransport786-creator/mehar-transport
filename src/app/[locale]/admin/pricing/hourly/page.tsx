import { Clock, Plus, Edit3, Trash2 } from "lucide-react";
import connectToDatabase from "@/lib/db";
import HourlyPricing from "@/lib/models/HourlyPricing";

export default async function HourlyPricingPage({ params: { locale } }: { params: { locale: string } }) {
  const isAr = locale === "ar";
  
  await connectToDatabase();
  
  const pricingRules = await HourlyPricing.find()
    .populate("vehicleId", "name type image")
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1B1E4F]">
            {isAr ? "تسعير السائق بالساعة" : "Hourly Chauffeur Pricing"}
          </h2>
          <p className="text-gray-500 mt-1">
            {isAr ? "تحديد التسعيرة بالساعة لكل مركبة مع الحد الأدنى للساعات." : "Configure per-vehicle hourly rates and minimum booking hours."}
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#1B1E4F] text-white font-bold rounded-xl text-sm hover:bg-[#2a2f6b] transition-all shadow-lg shadow-[#1B1E4F]/20">
          <Plus className="w-4 h-4" />
          {isAr ? "إضافة تسعيرة بالساعة" : "Add Hourly Rate"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pricingRules.map((rule) => {
          const vehicle = rule.vehicleId as any;
          return (
            <div key={rule._id.toString()} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group relative">
              <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden">
                  {vehicle?.image ? (
                    <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />
                  ) : (
                    <Clock className="w-6 h-6 text-gray-300" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{vehicle?.name}</h3>
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-gray-100 text-gray-500`}>
                    {vehicle?.type}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                  <span className="text-sm text-gray-500">{isAr ? "سعر الساعة" : "Hourly Rate"}</span>
                  <span className="font-black text-xl text-[#1B1E4F]">{rule.hourlyRate} <span className="text-sm font-semibold text-gray-400">SAR</span></span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">{isAr ? "الحد الأدنى" : "Minimum Hours"}</span>
                  <span className="font-bold text-gray-800">{rule.minimumHours} {isAr ? "ساعات" : "hours"}</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">{isAr ? "ساعة إضافية" : "Extra Hour Rate"}</span>
                  <span className="font-bold text-[#D9A63A]">{rule.extraHourRate} SAR</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {pricingRules.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
          <Clock className="w-10 h-10 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">{isAr ? "لا توجد أسعار بالساعة. أضف تسعيرة للبدء." : "No hourly pricing rules configured yet."}</p>
        </div>
      )}
    </div>
  );
}
