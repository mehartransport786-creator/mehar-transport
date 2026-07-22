"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/routing";
import { 
  Settings, 
  User, 
  ShieldCheck, 
  Users, 
  UserCheck, 
  Building2, 
  BellRing, 
  FileTerminal, 
  AlertTriangle 
} from "lucide-react";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const pathname = usePathname();

  const navItems = [
    { title: isAr ? "نظرة عامة" : "Overview", href: "/admin/settings", icon: Settings, exact: true },
    { title: isAr ? "الملف الشخصي" : "Profile", href: "/admin/settings/profile", icon: User },
    { title: isAr ? "الأمان وتسجيل الدخول" : "Security & Login", href: "/admin/settings/security", icon: ShieldCheck },
    { title: isAr ? "إدارة المستخدمين" : "User Management", href: "/admin/settings/users", icon: Users },
    { title: isAr ? "الأدوار والصلاحيات" : "Roles & Permissions", href: "/admin/settings/roles", icon: UserCheck },
    { title: isAr ? "إعدادات النشاط" : "Business Settings", href: "/admin/settings/business", icon: Building2 },
    { title: isAr ? "الإشعارات" : "Notifications", href: "/admin/settings/notifications", icon: BellRing },
    { title: isAr ? "سجل التدقيق" : "Audit Logs", href: "/admin/settings/audit-logs", icon: FileTerminal },
    { title: isAr ? "منطقة الخطر" : "Danger Zone", href: "/admin/settings/danger-zone", icon: AlertTriangle, danger: true },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#1B1E4F" }}>
          {isAr ? "إعدادات النظام" : "System Settings"}
        </h1>
        <p className="text-gray-500 mt-1">
          {isAr 
            ? "إدارة الأمان والمستخدمين وتكوينات الشركة من مكان واحد."
            : "Manage security, users, and company configurations from one central hub."}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
        {/* Settings Navigation Sidebar */}
        <div className="w-full md:w-64 shrink-0 flex flex-row md:flex-col gap-2 overflow-x-auto hide-scrollbar pb-2 md:pb-0">
          {navItems.map((item) => {
            // Because pathname includes locale like /en/admin/settings, we check endsWith or includes
            const isActive = item.exact 
              ? pathname === `/${locale}${item.href}` || pathname === `/${locale}${item.href}/`
              : pathname.startsWith(`/${locale}${item.href}`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap shrink-0 md:shrink border md:border-none ${
                  isActive 
                    ? item.danger 
                      ? "bg-red-50 text-red-600" 
                      : "bg-primary text-white shadow-lg shadow-primary/20"
                    : item.danger
                      ? "text-red-500 hover:bg-red-50"
                      : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <item.icon className={`w-4 h-4 ${isActive && !item.danger ? "text-white" : ""}`} />
                {item.title}
              </Link>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[600px]">
          {children}
        </div>
      </div>
    </div>
  );
}
