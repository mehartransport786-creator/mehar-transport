"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/routing";
import { 
  BarChart3, 
  Map, 
  Clock, 
  CalendarDays, 
  Car, 
  Calculator, 
  ShieldAlert,
  FileText
} from "lucide-react";

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const pathname = usePathname();

  const navItems = [
    { title: isAr ? "نظرة عامة" : "Dashboard", href: "/admin/pricing", icon: BarChart3, exact: true },
    { title: isAr ? "تسعير المسارات" : "Route Pricing", href: "/admin/pricing/routes", icon: Map },
    { title: isAr ? "التسعير بالساعة" : "Hourly Rates", href: "/admin/pricing/hourly", icon: Clock },
    { title: isAr ? "التسعير الموسمي" : "Seasonal Engine", href: "/admin/pricing/seasonal", icon: CalendarDays },
    { title: isAr ? "تسعير المركبات الأساسي" : "Vehicle Base Rates", href: "/admin/pricing/vehicles", icon: Car },
    { title: isAr ? "محاكي التسعير" : "Pricing Simulator", href: "/admin/pricing/simulator", icon: Calculator },
    { title: isAr ? "سجل التدقيق المالي" : "Audit Logs", href: "/admin/pricing/audit-logs", icon: FileText },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#1B1E4F]">
          {isAr ? "إدارة التسعير والإيرادات" : "Pricing & Revenue Management"}
        </h1>
        <p className="text-gray-500 mt-1">
          {isAr 
            ? "التحكم الكامل في أسعار الرحلات والمواسم والمحاكاة الذكية."
            : "Complete control over trip prices, seasonal surges, and intelligent simulation."}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="w-full md:w-64 shrink-0 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = item.exact 
              ? pathname === `/${locale}${item.href}` || pathname === `/${locale}${item.href}/`
              : pathname.startsWith(`/${locale}${item.href}`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive 
                    ? "bg-[#D9A63A] text-white shadow-lg shadow-[#D9A63A]/20"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <item.icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400"}`} />
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
