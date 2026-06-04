import { ReactNode } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { LayoutDashboard, Ticket, Heart, Settings, LogOut } from "lucide-react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const locale = useLocale();
  const isAr = locale === "ar";

  const navItems = [
    { name: isAr ? "نظرة عامة" : "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: isAr ? "حجوزاتي" : "My Bookings", href: "/dashboard/bookings", icon: Ticket },
    { name: isAr ? "المسارات المفضلة" : "Saved Routes", href: "/dashboard/saved", icon: Heart },
    { name: isAr ? "إعدادات الحساب" : "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-1/4 xl:w-1/5">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-32">
              <div className="p-6 border-b border-gray-100 text-center">
                <div className="w-20 h-20 bg-[#1B1E4F] text-[#D9A63A] rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-inner">
                  AS
                </div>
                <h3 className="font-bold text-[#1B1E4F] text-lg">Ahmed Al-Salem</h3>
                <p className="text-sm text-gray-500">Premium Member</p>
              </div>
              
              <nav className="p-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-[#D9A63A]/10 hover:text-[#D9A63A] transition-colors font-medium group"
                  >
                    <item.icon className="w-5 h-5 text-gray-400 group-hover:text-[#D9A63A] transition-colors" />
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="p-4 border-t border-gray-100">
                <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 w-full transition-colors font-medium">
                  <LogOut className="w-5 h-5" />
                  {isAr ? "تسجيل الخروج" : "Sign Out"}
                </button>
              </div>
            </div>
          </div>

          {/* Main Dashboard Content */}
          <div className="w-full lg:w-3/4 xl:w-4/5">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
}
