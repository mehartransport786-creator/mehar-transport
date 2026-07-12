'use client';

import { useState } from 'react';
import { Plus, Search, Edit3, Trash2, MoreHorizontal, Users, Briefcase, Car, TrendingUp } from 'lucide-react';
import VehicleFormModal from '@/components/admin/fleet/VehicleFormModal';
import { Link } from '@/i18n/routing';

const categoryLabels: Record<string, { en: string; ar: string; color: string; bg: string }> = {
  Sedan: { en: 'Sedan', ar: 'سيدان', color: 'text-blue-700', bg: 'bg-blue-50' },
  SUV: { en: 'SUV', ar: 'دفع رباعي', color: 'text-indigo-700', bg: 'bg-indigo-50' },
  Van: { en: 'Van', ar: 'فان', color: 'text-emerald-700', bg: 'bg-emerald-50' },
  'Luxury Van': { en: 'Luxury Van', ar: 'فان فاخر', color: 'text-purple-700', bg: 'bg-purple-50' },
  Bus: { en: 'Bus', ar: 'حافلة', color: 'text-amber-700', bg: 'bg-amber-50' },
};

export default function FleetManagementClient({ vehicles: initialVehicles, isAr }: { vehicles: any[]; isAr: boolean }) {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [actionMenuId, setActionMenuId] = useState<string | null>(null);

  const categories = [...new Set(vehicles.map(v => v.type).filter(Boolean))];

  const filtered = vehicles.filter(v => {
    const matchSearch = !searchTerm || [v.name, v.nameAr, v.type, v.typeAr]
      .join(' ').toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = !filterCategory || v.type === filterCategory;
    return matchSearch && matchCategory;
  });

  const openCreate = () => { setSelectedVehicle(null); setIsFormOpen(true); };
  const openEdit = (vehicle: any) => { setSelectedVehicle(vehicle); setIsFormOpen(true); setActionMenuId(null); };

  const handleDelete = async (id: string) => {
    setActionMenuId(null);
    if (!confirm(isAr ? 'هل أنت متأكد من تعطيل هذه المركبة؟' : 'Are you sure you want to deactivate this vehicle?')) return;
    try {
      const res = await fetch(`/api/admin/fleet/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) setVehicles(prev => prev.filter(v => v._id !== id));
    } catch (e) { console.error(e); }
  };

  const handleSaved = (savedVehicle: any) => {
    setVehicles(prev => {
      const idx = prev.findIndex(v => v._id === savedVehicle._id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = savedVehicle;
        return updated;
      }
      return [savedVehicle, ...prev];
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
            {isAr ? 'إدارة الأسطول' : 'Fleet Management'}
          </h1>
          <p className="text-gray-500 mt-1 text-sm font-medium">
            {isAr ? `${vehicles.length} مركبة في الأسطول` : `${vehicles.length} vehicles in the fleet`}
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-primary text-white hover:bg-primary/80 px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-lg shadow-primary/20"
        >
          <Plus className="w-4 h-4" />
          {isAr ? 'مركبة جديدة' : 'Add Vehicle'}
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{isAr ? 'إجمالي الأسطول' : 'Total Fleet'}</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
              <Car className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <div className="text-2xl font-black text-primary">{vehicles.length}</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{isAr ? 'إجمالي المقاعد' : 'Total Seats Capacity'}</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Users className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <div className="text-2xl font-black text-primary">{vehicles.reduce((acc, v) => acc + (v.passengers || 0), 0)}</div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="flex-1 flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-200 focus-within:border-secondary transition-all shadow-sm">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={isAr ? 'ابحث عن مركبة...' : 'Search vehicles...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-sm flex-1"
          />
        </div>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}
          className="bg-white border border-gray-200 text-gray-600 px-4 py-3 rounded-xl text-sm font-medium shadow-sm">
          <option value="">{isAr ? 'كل الفئات' : 'All Categories'}</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      {/* Fleet Table */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? 'المركبة' : 'Vehicle'}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? 'الفئة' : 'Category'}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? 'السعة' : 'Capacity'}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? 'المميزات' : 'Features'}</th>
                <th className="w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((vehicle) => {
                const catInfo = categoryLabels[vehicle.type] || { en: vehicle.type, ar: vehicle.typeAr, color: 'text-gray-700', bg: 'bg-gray-50' };
                return (
                  <tr key={vehicle._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 relative rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden">
                          {vehicle.image ? (
                            <img src={vehicle.image} alt={vehicle.name} className="object-contain w-full h-full p-1" />
                          ) : (
                            <Car className="w-6 h-6 text-gray-300" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-gray-800">{isAr ? vehicle.nameAr : vehicle.name}</div>
                          <div className="text-xs text-gray-400 mt-0.5">{vehicle.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${catInfo.bg} ${catInfo.color}`}>
                        {isAr ? catInfo.ar : catInfo.en}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{vehicle.passengers}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Briefcase className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{vehicle.luggage}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {(isAr ? vehicle.featuresAr : vehicle.features)?.slice(0, 2).map((feat: string, i: number) => (
                          <span key={i} className="px-2 py-0.5 text-[10px] bg-gray-100 text-gray-600 rounded whitespace-nowrap">
                            {feat}
                          </span>
                        ))}
                        {(vehicle.features?.length > 2) && (
                          <span className="px-2 py-0.5 text-[10px] bg-gray-50 text-gray-400 rounded">
                            +{vehicle.features.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 relative">
                      <button
                        onClick={() => setActionMenuId(actionMenuId === vehicle._id ? null : vehicle._id)}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      {actionMenuId === vehicle._id && (
                        <div className="absolute right-4 top-12 z-20 bg-white border border-gray-200 rounded-xl shadow-xl py-1 w-44" onMouseLeave={() => setActionMenuId(null)}>
                          <button onClick={() => openEdit(vehicle)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                            <Edit3 className="w-4 h-4" /> {isAr ? 'تعديل' : 'Edit'}
                          </button>
                          <Link href={`/admin/pricing/routes`} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                            <TrendingUp className="w-4 h-4" /> {isAr ? 'إدارة التسعير' : 'Manage Pricing'}
                          </Link>
                          <hr className="my-1 border-gray-100" />
                          <button onClick={() => handleDelete(vehicle._id)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">
                            <Trash2 className="w-4 h-4" /> {isAr ? 'تعطيل' : 'Deactivate'}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-16 text-center">
                    <Car className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-400 font-medium">{isAr ? 'لا توجد مركبات' : 'No vehicles found'}</p>
                    <button onClick={openCreate} className="mt-4 text-sm text-secondary font-bold hover:underline">
                      {isAr ? 'أضف مركبتك الأولى' : 'Add your first vehicle'}
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <VehicleFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        vehicle={selectedVehicle}
        isAr={isAr}
        onSaved={handleSaved}
      />
    </div>
  );
}
