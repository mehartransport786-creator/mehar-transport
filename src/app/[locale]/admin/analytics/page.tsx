"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { revenueChartData, bookingsByRoute, bookingsByVehicle } from "@/lib/admin-data";
import { TrendingUp, TrendingDown, DollarSign, CalendarCheck, Car, Users, MapPin } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

const weeklyData = [
  { day: "Mon", bookings: 42, revenue: 18500 },
  { day: "Tue", bookings: 38, revenue: 16200 },
  { day: "Wed", bookings: 55, revenue: 24800 },
  { day: "Thu", bookings: 48, revenue: 21000 },
  { day: "Fri", bookings: 72, revenue: 35600 },
  { day: "Sat", bookings: 68, revenue: 32100 },
  { day: "Sun", bookings: 45, revenue: 19800 },
];

const cityData = [
  { name: "Makkah",  value: 1240, fill: "#1B1E4F" },
  { name: "Madinah", value: 890,  fill: "#D9A63A" },
  { name: "Jeddah",  value: 720,  fill: "#2563EB" },
  { name: "Taif",    value: 180,  fill: "#16A34A" },
];

const monthlyGrowth = [
  { month: "Jan", bookings: 220, revenue: 520, customers: 45 },
  { month: "Feb", bookings: 245, revenue: 580, customers: 52 },
  { month: "Mar", bookings: 198, revenue: 490, customers: 48 },
  { month: "Apr", bookings: 265, revenue: 620, customers: 61 },
  { month: "May", bookings: 310, revenue: 710, customers: 73 },
  { month: "Jun", bookings: 290, revenue: 680, customers: 68 },
  { month: "Jul", bookings: 335, revenue: 750, customers: 82 },
  { month: "Aug", bookings: 370, revenue: 830, customers: 91 },
  { month: "Sep", bookings: 345, revenue: 790, customers: 85 },
  { month: "Oct", bookings: 380, revenue: 850, customers: 95 },
  { month: "Nov", bookings: 360, revenue: 810, customers: 88 },
  { month: "Dec", bookings: 390, revenue: 848, customers: 98 },
];

export default function AnalyticsPage() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const [activeTab, setActiveTab] = useState("revenue");

  const tabs = [
    { id: "revenue",   label: isAr ? "الإيرادات" : "Revenue",   icon: DollarSign },
    { id: "bookings",  label: isAr ? "الحجوزات" : "Bookings",  icon: CalendarCheck },
    { id: "vehicles",  label: isAr ? "المركبات" : "Vehicles",  icon: Car },
    { id: "routes",    label: isAr ? "المسارات" : "Routes",    icon: MapPin },
    { id: "customers", label: isAr ? "العملاء" : "Customers", icon: Users },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#1B1E4F" }}>
          {isAr ? "مركز التحليلات" : "Analytics Center"}
        </h1>
        <p className="text-gray-500 mt-1 text-sm font-medium">
          {isAr ? "تحليلات شاملة لأعمالك" : "Comprehensive business analytics & insights"}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white rounded-2xl border border-gray-100 p-1.5 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-lg"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Revenue Tab */}
      {activeTab === "revenue" && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
            {[
              { label: isAr ? "إيرادات اليوم" : "Today's Revenue",   value: "28,500 SAR", change: "+12.5%" },
              { label: isAr ? "إيرادات الأسبوع" : "Weekly Revenue",   value: "168,000 SAR", change: "+8.3%" },
              { label: isAr ? "إيرادات الشهر" : "Monthly Revenue",  value: "847,500 SAR", change: "+18.3%" },
              { label: isAr ? "إيرادات السنة" : "Yearly Revenue",   value: "8.47M SAR",   change: "+22.1%" },
            ].map((card, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">{card.label}</div>
                <div className="text-2xl font-black text-primary">{card.value}</div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-xs font-bold text-emerald-600">{card.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Revenue Over Time */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
            <h3 className="text-lg font-bold text-primary mb-6">{isAr ? "الإيرادات الشهرية" : "Monthly Revenue Trend"}</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueChartData}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1B1E4F" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#1B1E4F" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", fontWeight: 600 }} formatter={(v: any) => [`${v.toLocaleString()} SAR`]} />
                  <Area type="monotone" dataKey="current" stroke="#1B1E4F" strokeWidth={2.5} fill="url(#revGrad)" name={isAr ? "الحالي" : "Current"} />
                  <Area type="monotone" dataKey="previous" stroke="#D9A63A" strokeWidth={2} fill="transparent" strokeDasharray="6 4" name={isAr ? "السابق" : "Previous"} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Breakdown */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
            <h3 className="text-lg font-bold text-primary mb-6">{isAr ? "نمط الأسبوع" : "Weekly Revenue Pattern"}</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", fontWeight: 600 }} />
                  <Bar dataKey="revenue" fill="#1B1E4F" radius={[8, 8, 0, 0]} barSize={40} name={isAr ? "الإيرادات" : "Revenue"} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Bookings Tab */}
      {activeTab === "bookings" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
              <h3 className="text-lg font-bold text-primary mb-6">{isAr ? "اتجاه الحجوزات" : "Booking Growth Trend"}</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", fontWeight: 600 }} />
                    <Line type="monotone" dataKey="bookings" stroke="#1B1E4F" strokeWidth={2.5} dot={{ r: 4, fill: "#1B1E4F" }} name={isAr ? "الحجوزات" : "Bookings"} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
              <h3 className="text-lg font-bold text-primary mb-6">{isAr ? "حجوزات أسبوعية" : "Weekly Bookings"}</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", fontWeight: 600 }} />
                    <Bar dataKey="bookings" fill="#D9A63A" radius={[8, 8, 0, 0]} barSize={40} name={isAr ? "الحجوزات" : "Bookings"} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vehicles Tab */}
      {activeTab === "vehicles" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
          <h3 className="text-lg font-bold text-primary mb-6">{isAr ? "الحجوزات حسب المركبة" : "Bookings by Vehicle"}</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingsByVehicle} layout="vertical" margin={{ left: 20, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 13, fontWeight: 600 }} width={120} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", fontWeight: 600 }} />
                <Bar dataKey="bookings" fill="#1B1E4F" radius={[0, 8, 8, 0]} barSize={24}>
                  {bookingsByVehicle.map((_, i) => (
                    <Cell key={i} fill={i === 0 ? "#D9A63A" : "#1B1E4F"} opacity={1 - i * 0.08} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Routes Tab */}
      {activeTab === "routes" && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
            <h3 className="text-lg font-bold text-primary mb-6">{isAr ? "الحجوزات حسب المسار" : "Bookings by Route"}</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={bookingsByRoute} innerRadius={70} outerRadius={110} paddingAngle={4} dataKey="value">
                    {bookingsByRoute.map((entry, i) => <Cell key={i} fill={entry.fill} stroke="none" />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", fontWeight: 600 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 mt-4">
              {bookingsByRoute.map((r) => (
                <div key={r.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ background: r.fill }} /><span className="text-gray-600 font-medium">{r.name}</span></div>
                  <span className="font-bold text-primary">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
            <h3 className="text-lg font-bold text-primary mb-6">{isAr ? "الحجوزات حسب المدينة" : "Bookings by City"}</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={cityData} innerRadius={70} outerRadius={110} paddingAngle={4} dataKey="value">
                    {cityData.map((entry, i) => <Cell key={i} fill={entry.fill} stroke="none" />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", fontWeight: 600 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 mt-4">
              {cityData.map((c) => (
                <div key={c.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ background: c.fill }} /><span className="text-gray-600 font-medium">{c.name}</span></div>
                  <span className="font-bold text-primary">{c.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Customers Tab */}
      {activeTab === "customers" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
          <h3 className="text-lg font-bold text-primary mb-6">{isAr ? "نمو العملاء" : "Customer Growth"}</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyGrowth}>
                <defs>
                  <linearGradient id="custGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D9A63A" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#D9A63A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", fontWeight: 600 }} />
                <Area type="monotone" dataKey="customers" stroke="#D9A63A" strokeWidth={2.5} fill="url(#custGrad)" name={isAr ? "عملاء جدد" : "New Customers"} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
