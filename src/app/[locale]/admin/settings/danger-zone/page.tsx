import { auth } from "@/auth";
import { AlertTriangle, Database, Power, Trash2 } from "lucide-react";

export default async function DangerZonePage({ params: { locale } }: { params: { locale: string } }) {
  const isAr = locale === "ar";

  return (
    <div className="p-4 md:p-8 flex-1 flex flex-col h-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-red-600 flex items-center gap-3">
            <AlertTriangle className="w-6 h-6" />
            {isAr ? "منطقة الخطر" : "Danger Zone"}
          </h2>
          <p className="text-gray-500 mt-1">
            {isAr ? "إجراءات حساسة لا يمكن التراجع عنها. يرجى المتابعة بحذر شديد." : "Highly sensitive actions that cannot be undone. Please proceed with extreme caution."}
          </p>
        </div>
      </div>

      <div className="space-y-6 max-w-4xl">
        {/* Revoke All Sessions */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 border border-red-200 bg-red-50/50 rounded-2xl">
          <div>
            <h3 className="text-lg font-bold text-red-700 mb-1">{isAr ? "إنهاء جميع الجلسات" : "Revoke All Sessions"}</h3>
            <p className="text-sm text-red-600/80">
              {isAr 
                ? "سيتم تسجيل خروج جميع المستخدمين النشطين فوراً، بما فيهم أنت. سيتعين على الجميع تسجيل الدخول من جديد." 
                : "Instantly logs out all active users across all devices, including yourself. Everyone will have to log in again."}
            </p>
          </div>
          <button className="shrink-0 px-6 py-2.5 bg-red-100 text-red-700 font-bold rounded-xl text-sm border border-red-200 hover:bg-red-200 transition-colors">
            {isAr ? "إنهاء كل الجلسات" : "Revoke All Sessions"}
          </button>
        </div>

        {/* Maintenance Mode */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 border border-red-200 bg-red-50/50 rounded-2xl">
          <div>
            <h3 className="text-lg font-bold text-red-700 mb-1">{isAr ? "وضع الصيانة" : "System Maintenance Mode"}</h3>
            <p className="text-sm text-red-600/80">
              {isAr 
                ? "يوقف النظام عن استقبال حجوزات جديدة من العملاء. سيتم عرض صفحة تحت الصيانة." 
                : "Stops the system from accepting any new bookings from the public website. A maintenance page will be shown."}
            </p>
          </div>
          <button className="shrink-0 px-6 py-2.5 bg-red-100 text-red-700 font-bold rounded-xl text-sm border border-red-200 hover:bg-red-200 transition-colors">
            {isAr ? "تفعيل وضع الصيانة" : "Enable Maintenance"}
          </button>
        </div>

        {/* Database Backup */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 border border-red-200 bg-red-50/50 rounded-2xl">
          <div>
            <h3 className="text-lg font-bold text-red-700 mb-1">{isAr ? "نسخ احتياطي لقاعدة البيانات" : "Database Backup"}</h3>
            <p className="text-sm text-red-600/80">
              {isAr 
                ? "تصدير نسخة كاملة من قاعدة البيانات (الحجوزات، العملاء، السجلات)." 
                : "Export a complete JSON/BSON snapshot of the database including all bookings, users, and logs."}
            </p>
          </div>
          <button className="shrink-0 px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl text-sm hover:bg-red-700 transition-colors flex items-center gap-2">
            <Database className="w-4 h-4" />
            {isAr ? "تصدير النسخة" : "Export Backup"}
          </button>
        </div>

      </div>
    </div>
  );
}
