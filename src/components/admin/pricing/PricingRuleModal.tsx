'use client';

import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { createPricingRule, updatePricingRule } from '@/lib/actions/pricing';

export default function PricingRuleModal({ 
  isOpen, 
  onClose, 
  rule,
  routes,
  vehicles,
  isAr 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  rule?: any;
  routes: any[];
  vehicles: any[];
  isAr: boolean; 
}) {
  const isEditing = !!rule;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    routeId: '',
    vehicleId: '',
    basePrice: 0,
    currentPrice: 0,
    isActive: true
  });

  useEffect(() => {
    if (rule) {
      setFormData({
        routeId: typeof rule.routeId === 'object' ? rule.routeId._id : rule.routeId,
        vehicleId: typeof rule.vehicleId === 'object' ? rule.vehicleId._id : rule.vehicleId,
        basePrice: rule.basePrice,
        currentPrice: rule.currentPrice,
        isActive: rule.isActive
      });
    } else {
      setFormData({
        routeId: '',
        vehicleId: '',
        basePrice: 0,
        currentPrice: 0,
        isActive: true
      });
    }
    setError('');
  }, [rule, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isEditing) {
        await updatePricingRule(rule._id, {
          basePrice: formData.basePrice,
          currentPrice: formData.currentPrice,
          isActive: formData.isActive
        });
      } else {
        await createPricingRule(formData);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-[#1B1E4F]">
            {isEditing 
              ? (isAr ? "تعديل التسعيرة" : "Edit Pricing Rule") 
              : (isAr ? "إضافة تسعيرة جديدة" : "Add New Pricing Rule")}
          </h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {isAr ? "المسار" : "Route"}
              </label>
              <select 
                required 
                disabled={isEditing}
                value={formData.routeId}
                onChange={(e) => setFormData(prev => ({ ...prev, routeId: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D9A63A] focus:bg-white transition-colors disabled:opacity-60"
              >
                <option value="" disabled>{isAr ? "اختر المسار" : "Select a route"}</option>
                {routes.map(r => (
                  <option key={r._id} value={r._id}>
                    {isAr ? r.nameAr : r.name} ({r.origin} - {r.destination})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {isAr ? "المركبة" : "Vehicle"}
              </label>
              <select 
                required 
                disabled={isEditing}
                value={formData.vehicleId}
                onChange={(e) => setFormData(prev => ({ ...prev, vehicleId: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D9A63A] focus:bg-white transition-colors disabled:opacity-60"
              >
                <option value="" disabled>{isAr ? "اختر المركبة" : "Select a vehicle"}</option>
                {vehicles.map(v => (
                  <option key={v._id} value={v._id}>
                    {isAr ? v.nameAr : v.name}
                  </option>
                ))}
              </select>
              {!isEditing && (
                <p className="text-xs text-gray-500 mt-2">
                  {isAr ? "ملاحظة: لا يمكن تغيير المسار والمركبة بعد الحفظ." : "Note: Route and Vehicle cannot be changed after saving."}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isAr ? "السعر الأساسي (ريال)" : "Base Price (SAR)"}
                </label>
                <input 
                  type="number"
                  required 
                  min="0"
                  value={formData.basePrice}
                  onChange={(e) => setFormData(prev => ({ ...prev, basePrice: Number(e.target.value) }))}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D9A63A] focus:bg-white transition-colors" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isAr ? "السعر الحالي (ريال)" : "Current Price (SAR)"}
                </label>
                <input 
                  type="number"
                  required 
                  min="0"
                  value={formData.currentPrice}
                  onChange={(e) => setFormData(prev => ({ ...prev, currentPrice: Number(e.target.value) }))}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D9A63A] focus:bg-white transition-colors" 
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.isActive}
                  onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
              <span className="text-sm font-medium text-gray-700">
                {formData.isActive ? (isAr ? "نشط" : "Active") : (isAr ? "غير نشط" : "Inactive")}
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
            <button 
              type="button" 
              onClick={onClose} 
              disabled={isLoading}
              className="px-6 py-3 text-gray-600 font-medium hover:bg-gray-50 rounded-xl transition-colors disabled:opacity-50"
            >
              {isAr ? "إلغاء" : "Cancel"}
            </button>
            <button 
              type="submit" 
              disabled={isLoading}
              className="flex items-center gap-2 px-8 py-3 bg-[#1B1E4F] text-white font-bold rounded-xl hover:bg-[#2a2f6b] transition-all disabled:opacity-70"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isEditing ? (isAr ? "تحديث السعر" : "Update Rule") : (isAr ? "حفظ التسعيرة" : "Save Rule")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
