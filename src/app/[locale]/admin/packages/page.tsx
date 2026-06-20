import { Plus, Search, Filter, Edit3, Trash2, Package as PackageIcon, CheckCircle2, XCircle } from "lucide-react";
import connectToDatabase from "@/lib/db";
import Package from "@/lib/models/Package";
import Link from "next/link";
import PackageActions from "@/components/admin/PackageActions";

export default async function AdminPackagesPage({ params: { locale } }: { params: { locale: string } }) {
  const isAr = locale === "ar";
  
  let packages: any[] = [];
  
  try {
    await connectToDatabase();
    packages = await Package.find()
      .populate("includedRoutes", "name origin destination")
      .populate("availableVehicles", "name")
      .sort({ order: 1, createdAt: -1 })
      .lean();
  } catch (error) {
    console.error("Database connection failed");
  }

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1B1E4F] flex items-center gap-2">
            <PackageIcon className="w-6 h-6" />
            {isAr ? "باقات النقل" : "Transportation Packages"}
          </h2>
          <p className="text-gray-500 mt-1">
            {isAr ? "إدارة وتكوين باقات النقل المميزة، تعيين المسارات والمركبات." : "Manage and configure premium transportation packages, assign routes and vehicles."}
          </p>
        </div>
        <Link href={`/${locale}/admin/packages/new`} className="flex items-center gap-2 px-5 py-2.5 bg-[#1B1E4F] text-white font-bold rounded-xl text-sm hover:bg-[#2a2f6b] transition-all shadow-lg shadow-[#1B1E4F]/20">
          <Plus className="w-4 h-4" />
          {isAr ? "إضافة باقة" : "Add Package"}
        </Link>
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-6">
        <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 focus-within:border-[#D9A63A] focus-within:bg-white transition-all">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={isAr ? "البحث بالباقة، التصنيف..." : "Search packages, categories..."}
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
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "الباقة" : "Package"}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "التصنيف" : "Category"}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "المسارات المضمنة" : "Included Routes"}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "المركبات" : "Vehicles"}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "الحالة" : "Status"}</th>
                <th className="text-center px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {packages.map((pkg) => (
                <tr key={pkg._id.toString()} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-800">{isAr ? pkg.nameAr : pkg.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">/{pkg.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 text-xs font-semibold bg-blue-50 text-blue-600 rounded-md">
                      {pkg.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      {pkg.includedRoutes?.slice(0, 3).map((r: any, idx: number) => (
                        <span key={idx} className="text-xs text-gray-600 truncate max-w-[200px]">
                          • {r.origin} → {r.destination}
                        </span>
                      ))}
                      {pkg.includedRoutes?.length > 3 && (
                        <span className="text-xs text-gray-400 italic">+{pkg.includedRoutes.length - 3} more</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex -space-x-2">
                      {pkg.availableVehicles?.slice(0, 4).map((v: any, idx: number) => (
                        <div key={idx} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600 overflow-hidden" title={v.name}>
                          {v.name.substring(0, 2).toUpperCase()}
                        </div>
                      ))}
                      {pkg.availableVehicles?.length > 4 && (
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                          +{pkg.availableVehicles.length - 4}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {pkg.isActive ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-xs font-bold ${pkg.isActive ? 'text-emerald-700' : 'text-red-700'}`}>
                        {pkg.isActive ? (isAr ? "نشط" : "Active") : (isAr ? "غير نشط" : "Inactive")}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <PackageActions packageId={pkg._id.toString()} locale={locale} isAr={isAr} />
                  </td>
                </tr>
              ))}
              {packages.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    <PackageIcon className="w-8 h-8 mx-auto mb-3 text-gray-300" />
                    <p>{isAr ? "لا توجد باقات مضافة حتى الآن." : "No packages found. Create one to get started."}</p>
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
