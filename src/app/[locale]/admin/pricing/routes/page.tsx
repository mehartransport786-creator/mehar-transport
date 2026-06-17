import { Map, Plus, Search, Filter, Edit3, Trash2 } from "lucide-react";
import connectToDatabase from "@/lib/db";
import RoutePricing from "@/lib/models/RoutePricing";
import Route from "@/lib/models/Route";

export default async function RoutePricingPage({ params: { locale } }: { params: { locale: string } }) {
  const isAr = locale === "ar";
  
  let pricingRules: any[] = [];
  
  try {
    await connectToDatabase();
    pricingRules = await RoutePricing.find()
      .populate("routeId", "name nameAr origin destination")
      .populate("vehicleId", "name type image")
      .sort({ createdAt: -1 })
      .lean();
  } catch (error) {
    console.error("Database connection failed, using mock data for admin view");
    const mockVehicles = [
      { _id: 'v1', name: 'Car (4 Seater)', nameAr: 'سيارة (4 مقاعد)', type: 'Sedan', typeAr: 'سيدان', image: '/fleet/kia-k5.webp' },
      { _id: 'v2', name: 'Hiace (11 Seater)', nameAr: 'هايس (11 مقعد)', type: 'Van', typeAr: 'فان', image: '/fleet/hiace.webp' },
      { _id: 'v3', name: 'GMC (7 Seater)', nameAr: 'جمس (7 مقاعد)', type: 'SUV', typeAr: 'سيارة دفع رباعي', image: '/fleet/yukon.webp' },
      { _id: 'v4', name: 'Starex (7 Seater)', nameAr: 'ستاريكس (7 مقاعد)', type: 'Van', typeAr: 'فان', image: '/fleet/starex.webp' },
      { _id: 'v5', name: 'Staria (7 Seater)', nameAr: 'ستاريا (7 مقاعد)', type: 'Luxury Van', typeAr: 'فان فاخر', image: '/fleet/staria.webp' },
      { _id: 'v6', name: 'Coaster (17 Seater)', nameAr: 'كوستر (17 مقعد)', type: 'Bus', typeAr: 'حافلة', image: '/fleet/coaster.webp' }
    ];
    
    const mockRoutesData = [
      { _id: 'r1', name: 'Jeddah Airport to Jeddah Hotel', nameAr: 'مطار جدة إلى فندق جدة', origin: 'Jeddah Airport', destination: 'Jeddah Hotel', prices: [150, 250, 300, 200, 200, 400] },
      { _id: 'r2', name: 'Jeddah Airport to Makkah Hotel', nameAr: 'مطار جدة إلى فندق مكة', origin: 'Jeddah Airport', destination: 'Makkah Hotel', prices: [200, 350, 500, 300, 300, 550] },
      { _id: 'r3', name: 'Jeddah Airport to Madinah Hotel', nameAr: 'مطار جدة إلى فندق المدينة', origin: 'Jeddah Airport', destination: 'Madinah Hotel', prices: [400, 550, 1000, 500, 500, 1100] }
    ];

    pricingRules = mockRoutesData.flatMap(route => 
      mockVehicles.map((vehicle, idx) => ({
        _id: `${route._id}-${vehicle._id}`,
        routeId: route,
        vehicleId: vehicle,
        basePrice: route.prices[idx],
        currentPrice: route.prices[idx],
        isActive: true
      }))
    );
  }

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1B1E4F]">
            {isAr ? "تسعير المسارات" : "Route Pricing"}
          </h2>
          <p className="text-gray-500 mt-1">
            {isAr ? "إدارة أسعار الرحلات لكل مسار ولكل فئة مركبة." : "Manage base and current prices for every route and vehicle combination."}
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#1B1E4F] text-white font-bold rounded-xl text-sm hover:bg-[#2a2f6b] transition-all shadow-lg shadow-[#1B1E4F]/20">
          <Plus className="w-4 h-4" />
          {isAr ? "إضافة تسعيرة" : "Add Pricing Rule"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-6">
        <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 focus-within:border-[#D9A63A] focus-within:bg-white transition-all">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={isAr ? "البحث بالمسار، المركبة..." : "Search by route, vehicle..."}
            className="bg-transparent border-none outline-none text-sm flex-1"
          />
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 hover:border-gray-300 px-4 py-3 rounded-xl text-sm font-medium transition-all">
          <Filter className="w-4 h-4" />
          {isAr ? "تصفية" : "Filter"}
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80">
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "المسار" : "Route"}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "المركبة" : "Vehicle"}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "السعر الأساسي" : "Base Price"}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "السعر الحالي" : "Current Price"}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "الحالة" : "Status"}</th>
                <th className="text-center px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pricingRules.map((rule) => {
                const route = rule.routeId as any;
                const vehicle = rule.vehicleId as any;
                
                return (
                  <tr key={rule._id.toString()} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-800">{isAr ? route?.nameAr : route?.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{route?.origin} → {route?.destination}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                          {vehicle?.image && <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />}
                        </div>
                        <div>
                          <div className="font-bold text-gray-800">{vehicle?.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{vehicle?.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-600">
                      {rule.basePrice} SAR
                    </td>
                    <td className="px-6 py-4 font-bold text-[#D9A63A]">
                      {rule.currentPrice} SAR
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full ${
                        rule.isActive ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"
                      }`}>
                        {rule.isActive ? (isAr ? "نشط" : "Active") : (isAr ? "متوقف" : "Inactive")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title={isAr ? "تعديل" : "Edit"}>
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title={isAr ? "حذف" : "Delete"}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {pricingRules.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    {isAr ? "لا توجد أسعار مضافة حتى الآن." : "No pricing rules found. Create one to get started."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
