"use client";

import { useLocale } from "next-intl";
import { useState, useEffect } from "react";
import { Search, Download, Plus, Phone, Mail, MapPin, Car, DollarSign, Eye, Edit3, Tag, Loader2 } from "lucide-react";

export default function CustomersPage() {
  const locale = useLocale();
  const isAr = locale === "ar";

  const [customers, setCustomers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const res = await fetch('/api/customers');
        const data = await res.json();
        if (data.success) {
          setCustomers(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCustomers();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#1B1E4F" }}>
            {isAr ? "إدارة العملاء" : "Customer Management"}
          </h1>
          <p className="text-gray-500 mt-1 text-sm font-medium">
            {isAr ? "إدارة العلاقات مع العملاء" : "Customer Relationship Management"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 px-4 py-3 rounded-xl text-sm font-medium hover:border-gray-300 transition-all">
            <Download className="w-4 h-4" /> {isAr ? "تصدير" : "Export"}
          </button>
          <button className="flex items-center gap-2 bg-primary text-white hover:bg-primary/80 px-5 py-3 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4" /> {isAr ? "عميل جديد" : "Add Customer"}
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 text-secondary">
          <Loader2 className="w-10 h-10 animate-spin" />
          <p className="mt-4 text-primary font-semibold">{isAr ? "جاري التحميل..." : "Loading customers..."}</p>
        </div>
      ) : (
        <>
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">{isAr ? "إجمالي العملاء" : "Total Customers"}</div>
              <div className="text-3xl font-black text-primary">{customers.length}</div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">{isAr ? "عملاء VIP" : "VIP Customers"}</div>
              <div className="text-3xl font-black text-secondary">{customers.filter(c => c.tags?.includes("VIP")).length}</div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">{isAr ? "إجمالي الحجوزات" : "Total Bookings"}</div>
              <div className="text-3xl font-black text-primary">{customers.reduce((a, c) => a + (c.totalBookings || 0), 0)}</div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">{isAr ? "إجمالي القيمة" : "Lifetime Value"}</div>
              <div className="text-3xl font-black text-primary">{(customers.reduce((a, c) => a + (c.lifetimeValue || 0), 0) / 1000).toFixed(0)}K</div>
            </div>
          </div>

          {/* CRM Table */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50/80">
                    <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "العميل" : "Customer"}</th>
                    <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400 hidden md:table-cell">{isAr ? "التواصل" : "Contact"}</th>
                    <th className="text-center px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400 hidden lg:table-cell">{isAr ? "الحجوزات" : "Bookings"}</th>
                    <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "القيمة" : "Lifetime Value"}</th>
                    <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400 hidden lg:table-cell">{isAr ? "المفضل" : "Preferred"}</th>
                    <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400 hidden xl:table-cell">{isAr ? "العلامات" : "Tags"}</th>
                    <th className="text-center px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "إجراء" : "Actions"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {customers.map((customer) => (
                    <tr key={customer._id || customer.id} className="hover:bg-muted transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white text-sm font-bold shrink-0">
                            {customer.name?.charAt(0) || "U"}
                          </div>
                          <div>
                            <div className="font-semibold text-primary">{customer.name}</div>
                            {customer.lastBooking && (
                              <div className="text-xs text-gray-400 mt-0.5">{isAr ? "آخر حجز" : "Last"}: {new Date(customer.lastBooking).toLocaleDateString()}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <div className="text-xs text-gray-500 space-y-1">
                          <div className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {customer.phone}</div>
                          {customer.email && <div className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {customer.email}</div>}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-primary hidden lg:table-cell">{customer.totalBookings || 0}</td>
                      <td className="px-6 py-4 font-bold text-primary">{(customer.lifetimeValue || 0).toLocaleString()} SAR</td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <div className="text-xs text-gray-500 space-y-1">
                          {customer.favoriteRoute && <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-secondary" /> {customer.favoriteRoute}</div>}
                          {customer.preferredVehicle && <div className="flex items-center gap-1.5"><Car className="w-3 h-3 text-secondary" /> {customer.preferredVehicle}</div>}
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden xl:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {(customer.tags || []).map((tag: string) => (
                            <span key={tag} className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              tag === "VIP" ? "bg-secondary/10 text-secondary"
                              : tag === "Corporate" ? "bg-blue-50 text-blue-600"
                              : tag === "Agency" ? "bg-purple-50 text-purple-600"
                              : tag === "Frequent" ? "bg-emerald-50 text-emerald-600"
                              : "bg-gray-100 text-gray-500"
                            }`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"><Eye className="w-4 h-4" /></button>
                          <button className="p-2 rounded-lg hover:bg-amber-50 text-amber-500 transition-colors"><Edit3 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
