import { FileText, Search, Filter } from "lucide-react";
import connectToDatabase from "@/lib/db";
import PricingAuditLog from "@/lib/models/PricingAuditLog";
import { Admin } from "@/lib/models/Admin";

export default async function PricingAuditLogsPage({ params: { locale } }: { params: { locale: string } }) {
  const isAr = locale === "ar";
  
  await connectToDatabase();
  
  const logs = await PricingAuditLog.find()
    .populate("adminId", "name email")
    .sort({ createdAt: -1 })
    .limit(100)
    .lean();

  return (
    <div className="p-4 md:p-8 flex-1 flex flex-col h-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-primary">
            {isAr ? "سجل التدقيق المالي" : "Financial Audit Logs"}
          </h2>
          <p className="text-gray-500 mt-1">
            {isAr ? "سجل غير قابل للحذف لجميع التغييرات التي تمت على الأسعار." : "Immutable record of all pricing and revenue modifications."}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-6">
        <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 focus-within:border-secondary focus-within:bg-white transition-all">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={isAr ? "البحث في السجلات..." : "Search logs..."}
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
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "المسؤول" : "Admin"}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "نوع التعديل" : "Entity Type"}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "التغيير" : "Modification"}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "السبب" : "Reason"}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "الوقت" : "Timestamp"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logs.map((log) => {
                const admin = log.adminId as any;
                
                return (
                  <tr key={log._id.toString()} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-800">{admin?.name || log.adminEmail}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{log.adminEmail}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full bg-blue-50 text-blue-600">
                        {log.entityType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {log.oldPrice !== undefined && log.newPrice !== undefined ? (
                        <div className="flex items-center gap-2">
                          <span className="line-through text-gray-400">{log.oldPrice}</span>
                          <span className="text-gray-400">→</span>
                          <span className="font-bold text-gray-800">{log.newPrice}</span>
                        </div>
                      ) : (
                        <span className="text-gray-500 text-xs italic">{isAr ? "تعديل إعدادات" : "Configuration change"}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {log.reason}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs font-mono">
                      {new Date(log.createdAt).toLocaleString(isAr ? 'ar-SA' : 'en-US')}
                    </td>
                  </tr>
                );
              })}
              {logs.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400">
                    <FileText className="w-8 h-8 mx-auto mb-3 text-gray-300" />
                    {isAr ? "لا توجد سجلات تدقيق حتى الآن." : "No audit logs found."}
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
