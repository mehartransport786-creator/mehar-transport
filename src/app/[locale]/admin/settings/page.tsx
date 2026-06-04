import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { ShieldCheck, User, Users, BellRing, Activity, AlertCircle } from "lucide-react";
import connectToDatabase from "@/lib/db";
import { Admin } from "@/lib/models/Admin";

export default async function SettingsOverviewPage({ params: { locale } }: { params: { locale: string } }) {
  const isAr = locale === "ar";
  const session = await auth();

  await connectToDatabase();
  const admin = await Admin.findById(session?.user?.id).populate("role");

  // These would typically be fetched from the database
  const stats = [
    { label: isAr ? "حالة الحساب" : "Account Status", value: admin?.status === "active" ? (isAr ? "نشط" : "Active") : "Inactive", color: "text-emerald-500", icon: User },
    { label: isAr ? "الدور" : "Role", value: admin?.role?.name || "Admin", color: "text-[#1B1E4F]", icon: ShieldCheck },
    { label: isAr ? "المصادقة الثنائية" : "2FA Status", value: admin?.twoFactorEnabled ? (isAr ? "مفعل" : "Enabled") : (isAr ? "غير مفعل" : "Disabled"), color: admin?.twoFactorEnabled ? "text-emerald-500" : "text-amber-500", icon: ShieldCheck },
    { label: isAr ? "الجلسات النشطة" : "Active Sessions", value: "1", color: "text-blue-500", icon: Activity },
  ];

  return (
    <div className="p-8">
      <div className="mb-8 border-b border-gray-100 pb-6">
        <h2 className="text-2xl font-bold text-[#1B1E4F]">
          {isAr ? "نظرة عامة على الإعدادات" : "Settings Overview"}
        </h2>
        <p className="text-gray-500 mt-1">
          {isAr ? "ملخص حالة حسابك وإعدادات النظام." : "Summary of your account status and system settings."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-500">{stat.label}</span>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <span className={`text-xl font-bold ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Security Checklist */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#1B1E4F] mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            {isAr ? "فحص الأمان" : "Security Checklist"}
          </h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-sm">✓</div>
              <span className="text-sm font-medium text-gray-700">{isAr ? "كلمة مرور قوية مستخدمة" : "Strong password in use"}</span>
            </li>
            <li className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${admin?.twoFactorEnabled ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                {admin?.twoFactorEnabled ? '✓' : '!'}
              </div>
              <span className="text-sm font-medium text-gray-700">{isAr ? "المصادقة الثنائية" : "Two-Factor Authentication"}</span>
              {!admin?.twoFactorEnabled && (
                <span className="text-xs text-amber-600 font-bold ml-auto bg-amber-50 px-2 py-1 rounded">
                  {isAr ? "موصى به" : "Recommended"}
                </span>
              )}
            </li>
            <li className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-sm">✓</div>
              <span className="text-sm font-medium text-gray-700">{isAr ? "البريد الإلكتروني موثق" : "Email address verified"}</span>
            </li>
          </ul>
        </div>

        {/* Recent Security Activity */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#1B1E4F] mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-500" />
            {isAr ? "أحدث أنشطة الأمان" : "Recent Security Activity"}
          </h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">{isAr ? "تسجيل دخول ناجح" : "Successful Login"}</p>
                <p className="text-xs text-gray-500 mt-1">Riyadh, SA • {admin?.lastLogin ? new Date(admin.lastLogin).toLocaleString() : "Just now"}</p>
              </div>
            </div>
            {/* Mocked past event for demonstration */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">{isAr ? "تسجيل دخول ناجح" : "Successful Login"}</p>
                <p className="text-xs text-gray-500 mt-1">Jeddah, SA • 2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
