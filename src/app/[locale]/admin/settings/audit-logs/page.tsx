import { auth } from "@/auth";
import { FileTerminal, Search, Filter, Download, Server, MonitorSmartphone } from "lucide-react";
import connectToDatabase from "@/lib/db";
import { AuditLog } from "@/lib/models/AuditLog";

export default async function AuditLogsPage({ params: { locale } }: { params: { locale: string } }) {
  const isAr = locale === "ar";
  const session = await auth();

  await connectToDatabase();
  const logs = await AuditLog.find().sort({ createdAt: -1 }).limit(100).lean();

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1B1E4F]">
            {isAr ? "سجل التدقيق" : "Audit Logs"}
          </h2>
          <p className="text-gray-500 mt-1">
            {isAr ? "تتبع جميع الإجراءات الأمنية والإدارية في النظام." : "Track all security and administrative actions across the system."}
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl text-sm hover:bg-gray-50 transition-colors">
          <Download className="w-4 h-4" />
          {isAr ? "تصدير السجل" : "Export CSV"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-6">
        <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 focus-within:border-[#D9A63A] focus-within:bg-white transition-all">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={isAr ? "البحث بالحدث، المستخدم، الـ IP..." : "Search events, users, IPs..."}
            className="bg-transparent border-none outline-none text-sm flex-1"
          />
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 hover:border-gray-300 px-4 py-3 rounded-xl text-sm font-medium transition-all">
          <Filter className="w-4 h-4" />
          {isAr ? "تصفية متقدمة" : "Advanced Filter"}
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "الوقت" : "Timestamp"}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "المستخدم" : "User"}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "الحدث" : "Action"}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "القسم" : "Module"}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400 hidden lg:table-cell">IP / {isAr ? "الجهاز" : "Device"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-mono text-[13px]">
              {logs.map((log) => (
                <tr key={log._id.toString()} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-700">
                    {log.adminEmail}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded font-bold text-[10px] uppercase ${
                      log.action.includes('DELETE') ? 'bg-red-50 text-red-600' :
                      log.action.includes('CREATE') ? 'bg-emerald-50 text-emerald-600' :
                      log.action.includes('UPDATE') ? 'bg-amber-50 text-amber-600' :
                      log.action.includes('LOGIN') ? 'bg-blue-50 text-blue-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 uppercase font-bold text-[11px]">
                    {log.module}
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell text-gray-500">
                    <div className="flex flex-col gap-1 text-[11px]">
                      <span className="flex items-center gap-1.5"><Server className="w-3 h-3" /> {log.ip}</span>
                      <span className="flex items-center gap-1.5 truncate max-w-[200px]" title={log.browser}><MonitorSmartphone className="w-3 h-3 shrink-0" /> {log.browser}</span>
                    </div>
                  </td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400 font-sans">
                    {isAr ? "لا توجد سجلات بعد." : "No audit logs found."}
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
