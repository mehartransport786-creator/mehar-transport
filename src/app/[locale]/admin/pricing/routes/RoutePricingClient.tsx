'use client';

import { useState } from 'react';
import { Plus, Search, Filter, Edit3, Trash2 } from 'lucide-react';
import PricingRuleModal from '@/components/admin/pricing/PricingRuleModal';
import AddRouteModal from '@/components/admin/pricing/AddRouteModal';
import DeleteConfirmModal from '@/components/admin/pricing/DeleteConfirmModal';

export default function RoutePricingClient({ 
  pricingRules: initialRules, 
  routes, 
  vehicles, 
  isAr 
}: { 
  pricingRules: any[]; 
  routes: any[]; 
  vehicles: any[]; 
  isAr: boolean; 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals state
  const [isAddRouteOpen, setIsAddRouteOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const [selectedRule, setSelectedRule] = useState<any>(null);

  const filteredRules = initialRules.filter(rule => {
    const route = rule.routeId as any;
    const vehicle = rule.vehicleId as any;
    const searchString = `${route?.name} ${route?.nameAr} ${vehicle?.name} ${vehicle?.nameAr}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  const openAddRule = () => {
    setSelectedRule(null);
    setIsPricingModalOpen(true);
  };

  const openEditRule = (rule: any) => {
    setSelectedRule(rule);
    setIsPricingModalOpen(true);
  };

  const openDeleteConfirm = (rule: any) => {
    setSelectedRule(rule);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="p-4 md:p-8 flex-1 flex flex-col h-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-primary">
            {isAr ? "تسعير المسارات" : "Route Pricing"}
          </h2>
          <p className="text-gray-500 mt-1">
            {isAr ? "إدارة أسعار الرحلات لكل مسار ولكل فئة مركبة." : "Manage base and current prices for every route and vehicle combination."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsAddRouteOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-primary text-primary font-bold rounded-xl text-sm hover:bg-gray-50 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            {isAr ? "مسار جديد" : "New Route"}
          </button>
          <button 
            onClick={openAddRule}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl text-sm hover:bg-primary/80 transition-all shadow-lg shadow-primary/20"
          >
            <Plus className="w-4 h-4" />
            {isAr ? "إضافة تسعيرة" : "Add Pricing Rule"}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-6">
        <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 focus-within:border-secondary focus-within:bg-white transition-all">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={isAr ? "البحث بالمسار، المركبة..." : "Search by route, vehicle..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-sm flex-1"
          />
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 hover:border-gray-300 px-4 py-3 rounded-xl text-sm font-medium transition-all">
          <Filter className="w-4 h-4" />
          {isAr ? "تصفية" : "Filter"}
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80">
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "المسار" : "Route"}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "المركبة" : "Vehicle"}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "السعر الأساسي" : "Base Price"}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "السعر الحالي" : "Current Price"}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "الحالة" : "Status"}</th>
                <th className="text-center px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRules.map((rule) => {
                const route = rule.routeId as any;
                const vehicle = rule.vehicleId as any;
                
                return (
                  <tr key={rule._id.toString()} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-800">{isAr ? route?.nameAr : route?.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{isAr ? `${route?.originAr} ← ${route?.destinationAr}` : `${route?.origin} → ${route?.destination}`}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                          {vehicle?.image && <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />}
                        </div>
                        <div>
                          <div className="font-bold text-gray-800">{isAr ? vehicle?.nameAr : vehicle?.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{isAr ? vehicle?.typeAr : vehicle?.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-600">
                      {rule.basePrice} SAR
                    </td>
                    <td className="px-6 py-4 font-bold text-secondary">
                      {rule.currentPrice} SAR
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full ${
                        rule.isActive ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"
                      }`}>
                        {rule.isActive ? (isAr ? "نشط" : "Active") : (isAr ? "متوقف" : "Inactive")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => openEditRule(rule)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                          title={isAr ? "تعديل" : "Edit"}
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => openDeleteConfirm(rule)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                          title={isAr ? "حذف" : "Delete"}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredRules.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    {isAr ? "لا توجد أسعار مضافة حتى الآن." : "No pricing rules found. Create one to get started."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <PricingRuleModal 
        isOpen={isPricingModalOpen} 
        onClose={() => setIsPricingModalOpen(false)} 
        rule={selectedRule} 
        routes={routes} 
        vehicles={vehicles} 
        isAr={isAr} 
      />

      <AddRouteModal 
        isOpen={isAddRouteOpen} 
        onClose={() => setIsAddRouteOpen(false)} 
        isAr={isAr} 
      />

      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        rule={selectedRule} 
        isAr={isAr} 
      />
    </div>
  );
}
