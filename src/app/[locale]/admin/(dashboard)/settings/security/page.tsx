import { auth } from "@/auth";
import { KeyRound, ShieldAlert, MonitorSmartphone, XCircle, LogOut } from "lucide-react";
import connectToDatabase from "@/lib/db";
import { Admin } from "@/lib/models/Admin";
import { AdminSession } from "@/lib/models/AdminSession";

export default async function SecuritySettingsPage({ params: { locale } }: { params: { locale: string } }) {
  const isAr = locale === "ar";
  const session = await auth();

  await connectToDatabase();
  const admin = await Admin.findById(session?.user?.id).lean();
  
  // Fetch active sessions for this admin
  const activeSessions = await AdminSession.find({ adminId: admin?._id, status: "active" })
    .sort({ lastActivity: -1 })
    .lean();

  return (
    <div className="p-8 space-y-10">
      <div className="border-b border-gray-100 pb-6">
        <h2 className="text-2xl font-bold text-primary">
          {isAr ? "الأمان وتسجيل الدخول" : "Security & Login"}
        </h2>
        <p className="text-gray-500 mt-1">
          {isAr ? "إدارة كلمة المرور والمصادقة الثنائية والجلسات النشطة لحسابك." : "Manage your password, two-factor authentication, and active sessions."}
        </p>
      </div>

      {/* Change Password */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary">{isAr ? "تغيير كلمة المرور" : "Change Password"}</h3>
            <p className="text-sm text-gray-500">{isAr ? "يجب أن تحتوي كلمة المرور على 12 حرفاً على الأقل." : "Password must be at least 12 characters."}</p>
          </div>
        </div>

        <form className="max-w-2xl bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">{isAr ? "كلمة المرور الحالية" : "Current Password"}</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">{isAr ? "كلمة المرور الجديدة" : "New Password"}</label>
              <input 
                type="password" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">{isAr ? "تأكيد كلمة المرور" : "Confirm Password"}</label>
              <input 
                type="password" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
              />
            </div>
          </div>
          
          {/* Password Strength Indicator */}
          <div className="pt-2">
            <div className="flex gap-2 mb-2">
              <div className="h-1 flex-1 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-red-500 w-0"></div></div>
              <div className="h-1 flex-1 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-amber-500 w-0"></div></div>
              <div className="h-1 flex-1 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-0"></div></div>
              <div className="h-1 flex-1 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-emerald-600 w-0"></div></div>
            </div>
            <p className="text-xs text-gray-400">{isAr ? "قوة كلمة المرور" : "Password strength"}</p>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="button" className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl text-sm hover:bg-primary/80 transition-colors">
              {isAr ? "تحديث كلمة المرور" : "Update Password"}
            </button>
          </div>
        </form>
      </section>

      <hr className="border-gray-100" />

      {/* Two-Factor Authentication */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-primary">{isAr ? "المصادقة الثنائية (2FA)" : "Two-Factor Authentication"}</h3>
              <p className="text-sm text-gray-500">{isAr ? "أضف طبقة أمان إضافية لحسابك." : "Add an extra layer of security to your account."}</p>
            </div>
          </div>
          <div>
            {admin?.twoFactorEnabled ? (
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-bold rounded-full">
                {isAr ? "مفعل" : "Enabled"}
              </span>
            ) : (
              <span className="px-3 py-1 bg-gray-100 text-gray-500 text-sm font-bold rounded-full">
                {isAr ? "غير مفعل" : "Disabled"}
              </span>
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-sm text-gray-600 max-w-xl">
            {isAr 
              ? "استخدم تطبيق مصادقة (مثل Google Authenticator أو Authy) لإنشاء رموز أمان عند تسجيل الدخول." 
              : "Use an authenticator app (like Google Authenticator or Authy) to generate security codes when you log in."}
          </p>
          <button className="px-6 py-3 bg-white border border-gray-200 text-primary font-bold rounded-xl hover:bg-gray-50 transition-colors whitespace-nowrap">
            {admin?.twoFactorEnabled ? (isAr ? "إدارة إعدادات 2FA" : "Manage 2FA Settings") : (isAr ? "إعداد 2FA الآن" : "Set up 2FA Now")}
          </button>
        </div>
      </section>

      <hr className="border-gray-100" />

      {/* Active Sessions */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <MonitorSmartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-primary">{isAr ? "الجلسات النشطة" : "Active Sessions"}</h3>
              <p className="text-sm text-gray-500">{isAr ? "الأجهزة التي سجلت دخولاً إلى حسابك حالياً." : "Devices currently logged into your account."}</p>
            </div>
          </div>
          <button className="text-sm font-bold text-red-600 hover:text-red-700 flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            {isAr ? "تسجيل الخروج من كل الأجهزة الأخرى" : "Log out all other devices"}
          </button>
        </div>

        <div className="space-y-4">
          {activeSessions.map((s, idx) => {
            const isCurrent = (session?.user as any)?.sessionId === s.sessionToken;
            return (
              <div key={s._id.toString()} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-gray-200 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {s.browser.toLowerCase().includes('mobile') ? (
                      <MonitorSmartphone className="w-5 h-5 text-gray-400" />
                    ) : (
                      <MonitorSmartphone className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 flex items-center gap-2">
                      {s.os} — {s.browser}
                      {isCurrent && (
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] uppercase font-bold rounded">
                          {isAr ? "هذا الجهاز" : "This Device"}
                        </span>
                      )}
                    </p>
                    <div className="text-xs text-gray-500 mt-1 flex gap-3">
                      <span>{s.ip}</span>
                      <span>•</span>
                      <span>{s.location}</span>
                      <span>•</span>
                      <span>{isAr ? "نشط منذ" : "Active since"} {new Date(s.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                {!isCurrent && (
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title={isAr ? "إنهاء الجلسة" : "Terminate Session"}>
                    <XCircle className="w-5 h-5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
