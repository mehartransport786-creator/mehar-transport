'use client';

import { useState } from 'react';
import { Plus, Search, Filter, Edit3, Trash2, Copy, MoreHorizontal, MapPin, Clock, ArrowRight, Route as RouteIcon, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';
import RouteFormModal from '@/components/admin/routes/RouteFormModal';

const routeTypeLabels: Record<string, { en: string; ar: string; color: string; bg: string }> = {
  airport_transfer: { en: 'Airport', ar: 'مطار', color: 'text-blue-700', bg: 'bg-blue-50' },
  intercity: { en: 'Intercity', ar: 'بين المدن', color: 'text-indigo-700', bg: 'bg-indigo-50' },
  ziyarat: { en: 'Ziyarat', ar: 'زيارات', color: 'text-emerald-700', bg: 'bg-emerald-50' },
  hourly: { en: 'Hourly', ar: 'بالساعة', color: 'text-amber-700', bg: 'bg-amber-50' },
  vip: { en: 'VIP', ar: 'كبار الشخصيات', color: 'text-purple-700', bg: 'bg-purple-50' },
  custom: { en: 'Custom', ar: 'مخصص', color: 'text-gray-700', bg: 'bg-gray-50' },
};

const statusLabels: Record<string, { en: string; ar: string; color: string; bg: string }> = {
  active: { en: 'Active', ar: 'نشط', color: 'text-emerald-700', bg: 'bg-emerald-50' },
  draft: { en: 'Draft', ar: 'مسودة', color: 'text-amber-700', bg: 'bg-amber-50' },
  archived: { en: 'Archived', ar: 'أرشيف', color: 'text-gray-500', bg: 'bg-gray-100' },
};

const kpiData = [
  { label: 'Total Routes', labelAr: 'إجمالي المسارات', icon: RouteIcon, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Total Bookings', labelAr: 'إجمالي الحجوزات', value: '2,847', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Revenue Generated', labelAr: 'الإيرادات', value: '847,500 SAR', icon: DollarSign, color: 'text-[#D9A63A]', bg: 'bg-amber-50' },
  { label: 'Avg. Fare', labelAr: 'متوسط السعر', value: '450 SAR', icon: BarChart3, color: 'text-indigo-600', bg: 'bg-indigo-50' },
];

export default function RoutesManagementClient({ routes: initialRoutes, isAr }: { routes: any[]; isAr: boolean }) {
  const [routes, setRoutes] = useState(initialRoutes);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  const [actionMenuId, setActionMenuId] = useState<string | null>(null);

  const cities = [...new Set(routes.map(r => r.city).filter(Boolean))];

  const filtered = routes.filter(route => {
    const matchSearch = !searchTerm || [route.name, route.nameAr, route.origin, route.destination, route.city]
      .join(' ').toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = !filterType || route.routeType === filterType;
    const matchCity = !filterCity || route.city === filterCity;
    const matchStatus = !filterStatus || route.status === filterStatus;
    return matchSearch && matchType && matchCity && matchStatus;
  });

  const openCreate = () => { setSelectedRoute(null); setIsFormOpen(true); };
  const openEdit = (route: any) => { setSelectedRoute(route); setIsFormOpen(true); setActionMenuId(null); };

  const handleDuplicate = async (route: any) => {
    setActionMenuId(null);
    try {
      const res = await fetch('/api/admin/routes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...route,
          _id: undefined,
          name: `${route.name} (Copy)`,
          nameAr: `${route.nameAr} (نسخة)`,
          slug: `${route.slug}-copy-${Date.now()}`,
          status: 'draft'
        })
      });
      const data = await res.json();
      if (data.success) setRoutes(prev => [data.data, ...prev]);
    } catch (e) { console.error(e); }
  };

  const handleArchive = async (id: string) => {
    setActionMenuId(null);
    try {
      const res = await fetch(`/api/admin/routes/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) setRoutes(prev => prev.filter(r => r._id !== id));
    } catch (e) { console.error(e); }
  };

  const handleSaved = (savedRoute: any) => {
    setRoutes(prev => {
      const idx = prev.findIndex(r => r._id === savedRoute._id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = savedRoute;
        return updated;
      }
      return [savedRoute, ...prev];
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1B1E4F]">
            {isAr ? 'إدارة المسارات' : 'Routes Management'}
          </h1>
          <p className="text-gray-500 mt-1 text-sm font-medium">
            {isAr ? `${routes.length} مسار في النظام` : `${routes.length} routes in the system`}
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-[#1B1E4F] text-white hover:bg-[#2a2f6b] px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-lg shadow-[#1B1E4F]/20"
        >
          <Plus className="w-4 h-4" />
          {isAr ? 'مسار جديد' : 'New Route'}
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{isAr ? kpi.labelAr : kpi.label}</span>
              <div className={`w-9 h-9 rounded-xl ${kpi.bg} flex items-center justify-center`}>
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
            </div>
            <div className="text-2xl font-black text-[#1B1E4F]">
              {idx === 0 ? filtered.length : kpi.value}
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="flex-1 flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-200 focus-within:border-[#D9A63A] transition-all shadow-sm">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={isAr ? 'البحث بالمسار، المدينة...' : 'Search routes, cities...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-sm flex-1"
          />
        </div>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}
          className="bg-white border border-gray-200 text-gray-600 px-4 py-3 rounded-xl text-sm font-medium shadow-sm">
          <option value="">{isAr ? 'كل الأنواع' : 'All Types'}</option>
          {Object.entries(routeTypeLabels).map(([key, val]) => (
            <option key={key} value={key}>{isAr ? val.ar : val.en}</option>
          ))}
        </select>
        <select value={filterCity} onChange={(e) => setFilterCity(e.target.value)}
          className="bg-white border border-gray-200 text-gray-600 px-4 py-3 rounded-xl text-sm font-medium shadow-sm">
          <option value="">{isAr ? 'كل المدن' : 'All Cities'}</option>
          {cities.map(city => <option key={city} value={city}>{city}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-white border border-gray-200 text-gray-600 px-4 py-3 rounded-xl text-sm font-medium shadow-sm">
          <option value="">{isAr ? 'كل الحالات' : 'All Status'}</option>
          {Object.entries(statusLabels).map(([key, val]) => (
            <option key={key} value={key}>{isAr ? val.ar : val.en}</option>
          ))}
        </select>
      </div>

      {/* Routes Table */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? 'المسار' : 'Route'}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? 'المسافة' : 'Distance'}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? 'المدة' : 'Duration'}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? 'النوع' : 'Type'}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? 'المدينة' : 'City'}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? 'الحالة' : 'Status'}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? 'التاريخ' : 'Created'}</th>
                <th className="w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((route) => {
                const typeInfo = routeTypeLabels[route.routeType] || routeTypeLabels.custom;
                const statusInfo = statusLabels[route.status] || statusLabels.active;
                return (
                  <tr key={route._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#1B1E4F]/5 flex items-center justify-center shrink-0">
                          <MapPin className="w-4 h-4 text-[#1B1E4F]" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-800">{isAr ? route.nameAr : route.name}</div>
                          <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                            {isAr ? route.originAr : route.origin}
                            <ArrowRight className="w-3 h-3" />
                            {isAr ? route.destinationAr : route.destination}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-medium">
                      {route.distanceKm ? `${route.distanceKm} km` : '—'}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {route.averageDurationMins ? `${route.averageDurationMins} min` : '—'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${typeInfo.bg} ${typeInfo.color}`}>
                        {isAr ? typeInfo.ar : typeInfo.en}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-medium">{route.city || '—'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${statusInfo.bg} ${statusInfo.color}`}>
                        {isAr ? statusInfo.ar : statusInfo.en}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs">
                      {route.createdAt ? new Date(route.createdAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-4 py-4 relative">
                      <button
                        onClick={() => setActionMenuId(actionMenuId === route._id ? null : route._id)}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      {actionMenuId === route._id && (
                        <div className="absolute right-4 top-12 z-20 bg-white border border-gray-200 rounded-xl shadow-xl py-1 w-44" onMouseLeave={() => setActionMenuId(null)}>
                          <button onClick={() => openEdit(route)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                            <Edit3 className="w-4 h-4" /> {isAr ? 'تعديل' : 'Edit'}
                          </button>
                          <button onClick={() => handleDuplicate(route)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                            <Copy className="w-4 h-4" /> {isAr ? 'نسخ' : 'Duplicate'}
                          </button>
                          <hr className="my-1 border-gray-100" />
                          <button onClick={() => handleArchive(route._id)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">
                            <Trash2 className="w-4 h-4" /> {isAr ? 'أرشفة' : 'Archive'}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-16 text-center">
                    <RouteIcon className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-400 font-medium">{isAr ? 'لا توجد مسارات' : 'No routes found'}</p>
                    <button onClick={openCreate} className="mt-4 text-sm text-[#D9A63A] font-bold hover:underline">
                      {isAr ? 'أضف مسار جديد' : 'Create your first route'}
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <RouteFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        route={selectedRoute}
        isAr={isAr}
        onSaved={handleSaved}
      />
    </div>
  );
}
