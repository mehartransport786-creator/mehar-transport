"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useRealTime } from "@/components/admin/RealTimeProvider";
import { statusConfig, BookingStatus } from "@/lib/admin-data";
import { Link } from "@/i18n/routing";
import { Search, Filter, Download, Plus, Eye, Edit3, Phone, MessageCircle, Wifi } from "lucide-react";

export default function BookingsPage() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const { bookings, isConnected } = useRealTime();
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = bookings.filter((b) => {
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    const matchesSearch = searchQuery === "" ||
      b.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.bookingId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.route?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusCounts = bookings.reduce((acc, b) => {
    acc[b.status] = (acc[b.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const priorityBadge: Record<string, { label: string; color: string; bg: string }> = {
    vip:       { label: 'VIP',       color: '#D97706', bg: '#FEF3C7' },
    urgent:    { label: 'URGENT',    color: '#DC2626', bg: '#FEE2E2' },
    airport:   { label: 'AIRPORT',   color: '#2563EB', bg: '#DBEAFE' },
    group:     { label: 'GROUP',     color: '#16A34A', bg: '#DCFCE7' },
    corporate: { label: 'CORPORATE', color: '#7C3AED', bg: '#EDE9FE' },
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#1B1E4F" }}>
            {isAr ? "إدارة الحجوزات" : "Booking Management"}
          </h1>
          <p className="text-gray-500 mt-1 text-sm font-medium flex items-center gap-2">
            {isAr ? `${bookings.length} حجز في النظام` : `${bookings.length} bookings in the system`}
            <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
              isConnected ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
            }`}>
              <Wifi className="w-3 h-3" />
              {isConnected ? 'Live' : 'Offline'}
            </span>
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#1B1E4F] text-white hover:bg-[#2a2f6b] px-5 py-3 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-[#1B1E4F]/20 hover:-translate-y-0.5">
          <Plus className="w-4 h-4" />
          {isAr ? "حجز جديد" : "New Booking"}
        </button>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
        <button
          onClick={() => setStatusFilter("all")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
            statusFilter === "all"
              ? "bg-[#1B1E4F] text-white shadow-lg"
              : "bg-white text-gray-500 border border-gray-200 hover:border-gray-300"
          }`}
        >
          {isAr ? "الكل" : "All"} <span className="bg-white/20 px-2 py-0.5 rounded-md text-xs">{bookings.length}</span>
        </button>
        {(Object.keys(statusConfig) as BookingStatus[]).map((status) => {
          const sc = statusConfig[status];
          const count = statusCounts[status] || 0;
          return (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                statusFilter === status
                  ? "shadow-lg"
                  : "bg-white border border-gray-200 hover:border-gray-300"
              }`}
              style={statusFilter === status ? { background: sc.bg, color: sc.color } : { color: "#6B7280" }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: sc.color }} />
              {isAr ? sc.labelAr : sc.label}
              <span className="text-xs opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Search & Actions Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
        <div className="flex-1 flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-200 focus-within:border-[#D9A63A]/50 focus-within:ring-2 focus-within:ring-[#D9A63A]/10 transition-all">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={isAr ? "ابحث بالاسم، رقم الحجز، المسار..." : "Search by name, booking ID, route..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-sm flex-1 placeholder:text-gray-400"
            style={{ color: "#1B1E4F" }}
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 hover:border-gray-300 px-4 py-3 rounded-xl text-sm font-medium transition-all">
            <Filter className="w-4 h-4" />
            {isAr ? "فلاتر" : "Filters"}
          </button>
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 hover:border-gray-300 px-4 py-3 rounded-xl text-sm font-medium transition-all">
            <Download className="w-4 h-4" />
            {isAr ? "تصدير" : "Export"}
          </button>
        </div>
      </div>

      {/* Enterprise Booking Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80">
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "رقم الحجز" : "Booking ID"}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "العميل" : "Customer"}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400 hidden md:table-cell">{isAr ? "المسار" : "Route"}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400 hidden lg:table-cell">{isAr ? "المركبة" : "Vehicle"}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400 hidden xl:table-cell">{isAr ? "التاريخ" : "Date"}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400 hidden xl:table-cell">{isAr ? "الركاب" : "Pax"}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "المبلغ" : "Amount"}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "الحالة" : "Status"}</th>
                <th className="text-center px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "إجراء" : "Actions"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length > 0 ? (
                filtered.map((booking) => {
                  const sc = statusConfig[booking.status as BookingStatus] || statusConfig.pending;
                  const pb = priorityBadge[booking.priority];
                  return (
                    <tr
                      key={booking.bookingId}
                      className={`hover:bg-[#F8F9FC] transition-all group ${
                        booking.isNew ? 'bg-amber-50/60 border-l-4 border-l-[#D9A63A]' : ''
                      }`}
                      style={booking.isNew ? { animation: 'fadeSlideIn 0.5s ease-out' } : {}}
                    >
                      <td className="px-6 py-4">
                        <Link href={`/admin/bookings/${booking.bookingId}`} className="font-bold text-[#1B1E4F] hover:text-[#D9A63A] transition-colors">
                          {booking.bookingId}
                        </Link>
                        {pb && (
                          <span
                            className="ml-2 px-1.5 py-0.5 rounded text-[9px] font-bold"
                            style={{ color: pb.color, background: pb.bg }}
                          >
                            {pb.label}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-800">{booking.customerName}</div>
                        <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3" /> {booking.customerPhone}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 hidden md:table-cell font-medium">{booking.route}</td>
                      <td className="px-6 py-4 text-gray-600 hidden lg:table-cell font-medium">{booking.vehicleType}</td>
                      <td className="px-6 py-4 text-gray-500 hidden xl:table-cell text-xs font-medium">{booking.travelDate}</td>
                      <td className="px-6 py-4 text-gray-600 hidden xl:table-cell font-bold text-center">{booking.passengers}</td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-[#1B1E4F]">{(booking.totalPrice || 0).toLocaleString()}</span>
                        <span className="text-xs text-gray-400 ml-1">SAR</span>
                      </td>
                      <td className="px-6 py-4 relative">
                        <select
                          value={booking.status}
                          onChange={async (e) => {
                            const newStatus = e.target.value;
                            try {
                              const res = await fetch(`/api/bookings/${booking.bookingId}`, {
                                method: 'PATCH',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ status: newStatus })
                              });
                              if (!res.ok) throw new Error('Failed to update status');
                            } catch (error) {
                              console.error(error);
                              alert('Failed to update booking status');
                            }
                          }}
                          className="px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider appearance-none cursor-pointer border-none outline-none focus:ring-2 pr-6 w-[120px]"
                          style={{ color: sc.color, background: sc.bg, textShadow: "none" }}
                        >
                          {(Object.keys(statusConfig) as BookingStatus[]).map(status => (
                            <option key={status} value={status} style={{ color: '#000', background: '#fff' }}>
                              {isAr ? statusConfig[status].labelAr : statusConfig[status].label}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-[8px]" style={{ color: sc.color }}>
                          ▼
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link href={`/admin/bookings/${booking.bookingId}`} className="p-2 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors" title="View">
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button className="p-2 rounded-lg hover:bg-amber-50 text-amber-500 transition-colors" title="Edit">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-green-50 text-green-500 transition-colors" title="WhatsApp">
                            <MessageCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="py-16 text-center text-gray-400">
                    <div className="text-4xl mb-3">📋</div>
                    <p className="font-semibold text-gray-500">{isAr ? 'لا توجد حجوزات' : 'No bookings found'}</p>
                    <p className="text-sm mt-1">{isAr ? 'ستظهر الحجوزات هنا فور إنشائها' : 'Bookings will appear here as they are created — in real-time'}</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 border-t border-gray-100">
          <div className="text-sm text-gray-400 font-medium">
            {isAr
              ? `عرض ${filtered.length} من ${bookings.length} حجز`
              : `Showing ${filtered.length} of ${bookings.length} bookings`
            }
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-8px); background: #FEF3C7; }
          50% { background: #FEF3C7; }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
