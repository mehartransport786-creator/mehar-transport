"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRealTime, LiveBooking, LiveActivity } from "@/components/admin/RealTimeProvider";
import { kpiCards as staticKpis, revenueChartData as staticRevenue, bookingsByRoute as staticRoute, bookingsByVehicle as staticVehicle, statusConfig, BookingStatus } from "@/lib/admin-data";
import { Link } from "@/i18n/routing";
import { TrendingUp, TrendingDown, ChevronRight, Wifi, WifiOff } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

// Mini sparkline component
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 80;
  const height = 32;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * height}`).join(" ");

  return (
    <svg width={width} height={height} className="shrink-0">
      <polyline fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  );
}

// Animated counter
function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (displayValue === value) return;
    const diff = value - displayValue;
    const step = Math.ceil(Math.abs(diff) / 20);
    const timer = setInterval(() => {
      setDisplayValue((prev) => {
        if (Math.abs(value - prev) <= step) {
          clearInterval(timer);
          return value;
        }
        return prev + (diff > 0 ? step : -step);
      });
    }, 30);
    return () => clearInterval(timer);
  }, [value, displayValue]);

  return <>{prefix}{typeof displayValue === "number" && displayValue > 999 ? displayValue.toLocaleString() : displayValue}{suffix}</>;
}

// Time ago helper
function timeAgo(dateStr: string, isAr: boolean) {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return isAr ? 'الآن' : 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return isAr ? `منذ ${minutes} دقيقة` : `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return isAr ? `منذ ${hours} ساعة` : `${hours}h ago`;
}

export default function AdminDashboard() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const [chartPeriod, setChartPeriod] = useState<"daily" | "weekly" | "monthly" | "yearly">("monthly");
  const { bookings, activities, metrics, isConnected } = useRealTime();

  const [stats, setStats] = useState({
    revenueChartData: staticRevenue,
    bookingsByRoute: staticRoute,
    bookingsByVehicle: staticVehicle
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/admin/stats');
        const data = await res.json();
        if (data.success) {
          setStats(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    }
    fetchStats();
  }, []);

  // Build live KPI cards from real-time metrics
  const liveKpis = [
    { id: "total-bookings",  label: "Total Bookings",      labelAr: "إجمالي الحجوزات",   value: metrics.totalBookings,    change: 12.5, prefix: "", suffix: "",     sparkline: staticKpis[0].sparkline },
    { id: "today-bookings",  label: "Today's Bookings",    labelAr: "حجوزات اليوم",       value: metrics.todayBookings,    change: 8.2,  prefix: "", suffix: "",     sparkline: staticKpis[1].sparkline },
    { id: "pending",         label: "Pending Bookings",    labelAr: "حجوزات معلقة",       value: metrics.pendingBookings,  change: -4.2, prefix: "", suffix: "",     sparkline: [5, 8, 12, 15, 18, 12, 10, 8, 14, 11, 13, metrics.pendingBookings] },
    { id: "revenue",         label: "Total Revenue",       labelAr: "إجمالي الإيرادات",   value: metrics.revenue,          change: 18.3, prefix: "", suffix: " SAR", sparkline: staticKpis[2].sparkline },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#1B1E4F" }}>
            {isAr ? "لوحة التحكم" : "Dashboard"}
          </h1>
          <p className="text-gray-500 mt-1 text-sm font-medium">
            {isAr ? "مرحباً بك مرة أخرى. إليك ملخص عملياتك المباشر." : "Welcome back. Here's your live operations overview."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
            isConnected ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'
          }`}>
            {isConnected ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
            {isConnected ? (isAr ? 'مباشر' : 'Live') : (isAr ? 'غير متصل' : 'Disconnected')}
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>

      {/* ================================================================ */}
      {/* LIVE KPI Cards */}
      {/* ================================================================ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {liveKpis.map((kpi) => (
          <div
            key={kpi.id}
            className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:border-secondary/20 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  {isAr ? kpi.labelAr : kpi.label}
                </p>
                <div className="text-3xl font-black tracking-tight" style={{ color: "#1B1E4F" }}>
                  <AnimatedNumber value={kpi.value} prefix={kpi.prefix} suffix={kpi.suffix} />
                </div>
              </div>
              <Sparkline data={kpi.sparkline} color={kpi.change >= 0 ? "#16A34A" : "#DC2626"} />
            </div>
            <div className="flex items-center gap-1.5">
              {kpi.change >= 0 ? (
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm font-bold ${kpi.change >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                {kpi.change >= 0 ? "+" : ""}{kpi.change}%
              </span>
              <span className="text-xs text-gray-400 ml-1">{isAr ? "من الشهر الماضي" : "vs last month"}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ================================================================ */}
      {/* Revenue Analytics + Booking Distribution */}
      {/* ================================================================ */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl font-bold" style={{ color: "#1B1E4F" }}>
                {isAr ? "تحليلات الإيرادات" : "Revenue Analytics"}
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                {isAr ? "مقارنة الأداء بالعام السابق" : "Performance compared to previous year"}
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-50 rounded-xl p-1">
              {(["daily", "weekly", "monthly", "yearly"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setChartPeriod(p)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-all ${
                    chartPeriod === p
                      ? "bg-white text-primary shadow-sm"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.revenueChartData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                <defs>
                  <linearGradient id="currentGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1B1E4F" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#1B1E4F" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="previousGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D9A63A" stopOpacity={0.1} />
                    <stop offset="100%" stopColor="#D9A63A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", fontSize: 13, fontWeight: 600 }}
                  formatter={(value: any) => [`${value.toLocaleString()} SAR`]}
                />
                <Area type="monotone" dataKey="previous" stroke="#D9A63A" strokeWidth={2} fill="url(#previousGrad)" strokeDasharray="6 4" name={isAr ? "العام السابق" : "Previous Year"} />
                <Area type="monotone" dataKey="current" stroke="#1B1E4F" strokeWidth={2.5} fill="url(#currentGrad)" name={isAr ? "العام الحالي" : "Current Year"} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 rounded bg-primary"></div>
              <span className="text-xs text-gray-500">{isAr ? "العام الحالي" : "Current Year"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 rounded bg-secondary" style={{ borderTop: "2px dashed #D9A63A", height: 0 }}></div>
              <span className="text-xs text-gray-500">{isAr ? "العام السابق" : "Previous Year"}</span>
            </div>
          </div>
        </div>

        {/* Bookings by Route — Donut Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
          <h2 className="text-xl font-bold mb-6" style={{ color: "#1B1E4F" }}>
            {isAr ? "الحجوزات حسب المسار" : "Bookings by Route"}
          </h2>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={stats.bookingsByRoute} innerRadius={60} outerRadius={95} paddingAngle={4} dataKey="value" cx="50%" cy="50%">
                  {stats.bookingsByRoute.map((entry: any, i: number) => (
                    <Cell key={i} fill={entry.fill} stroke="none" />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", fontSize: 13, fontWeight: 600 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {stats.bookingsByRoute.map((route: any) => (
              <div key={route.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: route.fill }} />
                  <span className="text-gray-600 font-medium">{route.name}</span>
                </div>
                <span className="font-bold" style={{ color: "#1B1E4F" }}>{route.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* Bookings by Vehicle + Live Operations */}
      {/* ================================================================ */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Bookings by Vehicle — Bar Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
          <h2 className="text-xl font-bold mb-8" style={{ color: "#1B1E4F" }}>
            {isAr ? "الحجوزات حسب المركبة" : "Bookings by Vehicle"}
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.bookingsByVehicle} layout="vertical" margin={{ left: 10, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 12, fontWeight: 500 }} width={110} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", fontSize: 13, fontWeight: 600 }} />
                <Bar dataKey="bookings" fill="#1B1E4F" radius={[0, 8, 8, 0]} barSize={20}>
                  {stats.bookingsByVehicle.map((_: any, i: number) => (
                    <Cell key={i} fill={i === 0 ? "#D9A63A" : "#1B1E4F"} opacity={1 - i * 0.08} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* LIVE Operations Center */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold" style={{ color: "#1B1E4F" }}>
              {isAr ? "مركز العمليات" : "Live Operations"}
            </h2>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">LIVE</span>
            </div>
          </div>
          <div className="space-y-1 max-h-[380px] overflow-y-auto hide-scrollbar">
            {activities.length > 0 ? (
              activities.slice(0, 15).map((activity, idx) => (
                <div
                  key={activity._id || idx}
                  className={`flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all group cursor-pointer ${
                    activity.isNew ? 'bg-amber-50/50 border border-amber-200/50' : ''
                  }`}
                  style={activity.isNew ? { animation: 'slideIn 0.4s ease-out' } : {}}
                >
                  <span className="text-lg mt-0.5 shrink-0">{activity.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700 font-medium leading-snug">
                      {isAr ? activity.messageAr : activity.message}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1">
                      {timeAgo(activity.createdAt, isAr)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              // Fallback: show static activities when no real data yet
              <div className="py-8 text-center">
                <p className="text-sm text-gray-400">{isAr ? 'في انتظار أحداث...' : 'Waiting for events...'}</p>
                <p className="text-xs text-gray-300 mt-1">{isAr ? 'ستظهر هنا فور إنشاء حجز' : 'Events will appear here when bookings are created'}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* LIVE Recent Bookings Table */}
      {/* ================================================================ */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between p-6 md:p-8 pb-0">
          <h2 className="text-xl font-bold" style={{ color: "#1B1E4F" }}>
            {isAr ? "أحدث الحجوزات" : "Recent Bookings"}
            <span className="ml-2 text-sm font-normal text-gray-400">({isAr ? 'مباشر' : 'Live'})</span>
          </h2>
          <Link href="/admin/bookings" className="flex items-center gap-1.5 text-sm font-semibold hover:text-secondary transition-colors" style={{ color: "#1B1E4F" }}>
            {isAr ? "عرض الكل" : "View All"} <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="overflow-x-auto p-6 md:p-8 pt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left rtl:text-right pb-4 text-xs font-bold uppercase tracking-wider text-gray-400">{isAr ? "رقم الحجز" : "Booking ID"}</th>
                <th className="text-left rtl:text-right pb-4 text-xs font-bold uppercase tracking-wider text-gray-400">{isAr ? "العميل" : "Customer"}</th>
                <th className="text-left rtl:text-right pb-4 text-xs font-bold uppercase tracking-wider text-gray-400 hidden md:table-cell">{isAr ? "المسار" : "Route"}</th>
                <th className="text-left rtl:text-right pb-4 text-xs font-bold uppercase tracking-wider text-gray-400 hidden lg:table-cell">{isAr ? "المركبة" : "Vehicle"}</th>
                <th className="text-left rtl:text-right pb-4 text-xs font-bold uppercase tracking-wider text-gray-400">{isAr ? "المبلغ" : "Amount"}</th>
                <th className="text-left rtl:text-right pb-4 text-xs font-bold uppercase tracking-wider text-gray-400">{isAr ? "الحالة" : "Status"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {bookings.length > 0 ? (
                bookings.slice(0, 8).map((booking) => {
                  const sc = statusConfig[booking.status as BookingStatus] || statusConfig.pending;
                  return (
                    <tr
                      key={booking.bookingId}
                      className={`hover:bg-gray-50/50 transition-all group ${
                        booking.isNew ? 'bg-amber-50/60' : ''
                      }`}
                      style={booking.isNew ? { animation: 'slideIn 0.5s ease-out' } : {}}
                    >
                      <td className="py-4">
                        <Link href={`/admin/bookings/${booking.bookingId}`} className="font-bold hover:text-secondary transition-colors" style={{ color: "#1B1E4F" }}>
                          {booking.bookingId}
                        </Link>
                      </td>
                      <td className="py-4">
                        <div className="font-semibold text-gray-800">{booking.customerName}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{booking.customerPhone}</div>
                      </td>
                      <td className="py-4 text-gray-600 hidden md:table-cell">{booking.route}</td>
                      <td className="py-4 text-gray-600 hidden lg:table-cell">{booking.vehicleType}</td>
                      <td className="py-4 font-bold" style={{ color: "#1B1E4F" }}>{(booking.totalPrice || 0).toLocaleString()} SAR</td>
                      <td className="py-4">
                        <span
                          className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
                          style={{ color: sc.color, background: sc.bg }}
                        >
                          {isAr ? sc.labelAr : sc.label}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    {isAr ? 'لا توجد حجوزات بعد. أنشئ حجزاً من موقع الويب لرؤيته هنا مباشرة!' : 'No bookings yet. Create a booking from the website to see it appear here live!'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
