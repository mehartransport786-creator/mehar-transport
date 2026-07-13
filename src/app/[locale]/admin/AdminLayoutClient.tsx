"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { sidebarMenuItems } from "@/lib/admin-data";
import { RealTimeProvider } from "@/components/admin/RealTimeProvider";
import { NotificationCenter } from "@/components/admin/NotificationCenter";
import { BookingToast } from "@/components/admin/BookingToast";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard, CalendarCheck, Car, UserCog, Route, Package, Users, Star,
  Image, MessageSquare, BarChart3, FileText, Settings, History, Calculator,
  ChevronLeft, ChevronRight, Search, Globe, Sun, Moon,
  Menu, X, LogOut
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<any>> = {
  LayoutDashboard, CalendarCheck, Car, UserCog, Route, Package, Users, Star,
  Image, MessageSquare, BarChart3, FileText, Settings, History, Calculator
};

export function AdminLayoutClient({ children, session }: { children: React.ReactNode, session: any }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const isAr = locale === "ar";
  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    if (href === "/admin/pricing" && pathname.startsWith("/admin/pricing/routes")) return false;
    return pathname.startsWith(href);
  };

  if (pathname.includes('/login')) {
    return <div className={darkMode ? "dark bg-[#0F172A]" : "bg-white"}>{children}</div>;
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: `/${locale}/admin/login` });
  };

  return (
    <RealTimeProvider>
      <div className={`flex h-screen overflow-hidden ${darkMode ? "dark" : ""}`} style={{ background: darkMode ? "#0F172A" : "#F8F9FC" }}>
        {/* ================================================================ */}
        {/* SIDEBAR */}
        {/* ================================================================ */}
        <aside
          className={`hidden lg:flex flex-col fixed inset-y-0 z-40 transition-all duration-300 ${
            sidebarCollapsed ? "w-20" : "w-[280px]"
          }`}
          style={{ background: "#1B1E4F" }}
        >
          {/* Logo */}
          <div className="flex items-center justify-between px-6 h-[72px] border-b border-white/10">
            {!sidebarCollapsed && (
              <Link href="/admin" className="flex items-center gap-3">
                <div className="bg-white/90 rounded-lg p-1.5">
                  <img src="/logo.png" alt="Mehar" className="h-8 w-auto" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm tracking-wide">MEHAR</div>
                  <div className="text-white/40 text-[10px] uppercase tracking-[0.2em]">Transport Admin</div>
                </div>
              </Link>
            )}
            {sidebarCollapsed && (
              <Link href="/admin" className="mx-auto">
                <div className="bg-white/90 rounded-lg p-1.5">
                  <img src="/logo.png" alt="M" className="h-8 w-auto" />
                </div>
              </Link>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-6 hide-scrollbar">
            {sidebarMenuItems.map((section) => (
              <div key={section.section}>
                {!sidebarCollapsed && (
                  <div className="px-3 mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                    {isAr ? section.sectionAr : section.section}
                  </div>
                )}
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = iconMap[item.icon] || LayoutDashboard;
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        title={sidebarCollapsed ? item.label : undefined}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                          active
                            ? "bg-secondary text-primary shadow-lg shadow-secondary/20"
                            : "text-white/60 hover:bg-white/8 hover:text-white"
                        } ${sidebarCollapsed ? "justify-center" : ""}`}
                      >
                        <Icon className={`w-5 h-5 shrink-0 ${active ? "text-primary" : "text-white/40 group-hover:text-secondary"}`} />
                        {!sidebarCollapsed && (
                          <span>{isAr ? item.labelAr : item.label}</span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Collapse Toggle & Logout */}
          <div className="p-4 border-t border-white/10 space-y-2">
            <button
              onClick={handleLogout}
              className={`w-full flex items-center ${sidebarCollapsed ? "justify-center" : "justify-start"} gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:text-white hover:bg-red-500/20 transition-all text-sm font-bold`}
              title={isAr ? "تسجيل الخروج" : "Logout"}
            >
              <LogOut className="w-5 h-5 shrink-0" />
              {!sidebarCollapsed && <span>{isAr ? "تسجيل الخروج" : "Logout"}</span>}
            </button>

            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-white/40 hover:text-white hover:bg-white/8 transition-all text-sm"
            >
              {sidebarCollapsed
                ? <ChevronRight className="w-5 h-5" />
                : <><ChevronLeft className="w-5 h-5" /><span>{isAr ? "طي" : "Collapse"}</span></>
              }
            </button>
          </div>
        </aside>

        {/* ================================================================ */}
        {/* MOBILE SIDEBAR OVERLAY */}
        {/* ================================================================ */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
            <aside className="relative w-[300px] h-full flex flex-col" style={{ background: "#1B1E4F" }}>
              <div className="flex items-center justify-between px-6 h-[72px] border-b border-white/10">
                <Link href="/admin" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                  <div className="bg-white/90 rounded-lg p-1.5">
                    <img src="/logo.png" alt="Mehar" className="h-8 w-auto" />
                  </div>
                  <div className="text-white font-bold text-sm">MEHAR ADMIN</div>
                </Link>
                <button onClick={() => setMobileMenuOpen(false)} className="text-white/60 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-6">
                {sidebarMenuItems.map((section) => (
                  <div key={section.section}>
                    <div className="px-3 mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                      {isAr ? section.sectionAr : section.section}
                    </div>
                    <div className="space-y-1">
                      {section.items.map((item) => {
                        const Icon = iconMap[item.icon] || LayoutDashboard;
                        const active = isActive(item.href);
                        return (
                          <Link
                            key={item.id}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                              active
                                ? "bg-secondary text-primary"
                                : "text-white/60 hover:bg-white/8 hover:text-white"
                            }`}
                          >
                            <Icon className={`w-5 h-5 ${active ? "text-primary" : "text-white/40"}`} />
                            <span>{isAr ? item.labelAr : item.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </nav>
              <div className="p-4 border-t border-white/10">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-start gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:text-white hover:bg-red-500/20 transition-all text-sm font-bold"
                >
                  <LogOut className="w-5 h-5 shrink-0" />
                  <span>{isAr ? "تسجيل الخروج" : "Logout"}</span>
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* ================================================================ */}
        {/* MAIN CONTENT AREA */}
        {/* ================================================================ */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? "lg:ml-20" : "lg:ml-[280px]"}`}>
          
          {/* TOP NAVIGATION */}
          <header
            className="sticky top-0 z-30 h-[72px] flex items-center justify-between px-4 md:px-8 border-b backdrop-blur-xl"
            style={{
              background: darkMode ? "rgba(15,23,42,0.8)" : "rgba(255,255,255,0.85)",
              borderColor: darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"
            }}
          >
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
                style={{ color: darkMode ? "#fff" : "#1B1E4F" }}
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="hidden md:flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2.5 w-80 border border-transparent focus-within:border-secondary/40 focus-within:bg-white transition-all"
                style={darkMode ? { background: "rgba(255,255,255,0.05)", color: "#fff" } : {}}
              >
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={isAr ? "بحث في الحجوزات، العملاء، المركبات..." : "Search bookings, customers, vehicles..."}
                  className="bg-transparent border-none outline-none text-sm flex-1 placeholder:text-gray-400"
                  style={{ color: darkMode ? "#fff" : "#1B1E4F" }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-700">{isAr ? "متصل مباشر" : "Live"}</span>
              </div>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2.5 rounded-xl transition-colors hover:bg-gray-100"
                style={darkMode ? { color: "#F8A731" } : { color: "#6B7280" }}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <NotificationCenter />

              <div className="hidden md:block w-px h-8 bg-gray-200" style={darkMode ? { background: "rgba(255,255,255,0.1)" } : {}} />

              {/* Profile */}
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white text-sm font-bold uppercase">
                  {session?.user?.name ? session.user.name.charAt(0) : "A"}
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-semibold" style={{ color: darkMode ? "#fff" : "#1B1E4F" }}>
                    {session?.user?.name || "Admin"}
                  </div>
                  <div className="text-[11px] font-bold" style={{ color: darkMode ? "#F8A731" : "#F8A731" }}>
                    {session?.user?.role || "Super Admin"}
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* CONTENT */}
          <main
            className="flex-1 overflow-y-auto px-4 md:px-8 py-8"
            style={{
              background: darkMode ? "#0F172A" : "#F8F9FC",
              color: darkMode ? "#fff" : "#1B1E4F"
            }}
          >
            <div className="max-w-[1600px] mx-auto">
              {children}
            </div>
          </main>
        </div>

        <BookingToast />
      </div>
    </RealTimeProvider>
  );
}
