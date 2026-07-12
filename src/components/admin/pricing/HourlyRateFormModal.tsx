'use client';

import { useState, useEffect } from 'react';
import { X, Clock, Car, Save, Loader2 } from 'lucide-react';

export default function HourlyRateFormModal({
  isOpen,
  onClose,
  onSubmit,
  isAr,
  initialData = null,
  vehicles = []
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  isAr: boolean;
  initialData?: any;
  vehicles?: any[];
}) {
  const [formData, setFormData] = useState({
    vehicleId: '',
    hourlyRate: 0,
    minimumHours: 4,
    extraHourRate: 0,
    isActive: true
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        vehicleId: initialData.vehicleId?._id || initialData.vehicleId || '',
        hourlyRate: initialData.hourlyRate || 0,
        minimumHours: initialData.minimumHours || 4,
        extraHourRate: initialData.extraHourRate || 0,
        isActive: initialData.isActive ?? true
      });
    } else {
      setFormData({
        vehicleId: '',
        hourlyRate: 0,
        minimumHours: 4,
        extraHourRate: 0,
        isActive: true
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-primary flex items-center gap-2">
            <Clock className="w-5 h-5 text-secondary" />
            {initialData ? (isAr ? 'تعديل السعر بالساعة' : 'Edit Hourly Rate') : (isAr ? 'إضافة تسعيرة بالساعة' : 'Add Hourly Rate')}
          </h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Car className="w-4 h-4 text-gray-400" />
                {isAr ? 'المركبة' : 'Vehicle'}
              </label>
              <select
                required
                disabled={!!initialData} // Usually can't change vehicle on edit due to unique constraint
                value={formData.vehicleId}
                onChange={(e) => setFormData({...formData, vehicleId: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-secondary disabled:opacity-50"
              >
                <option value="">{isAr ? 'اختر المركبة' : 'Select Vehicle'}</option>
                {vehicles.map(v => (
                  <option key={v._id} value={v._id}>{isAr ? v.nameAr : v.name} ({v.type})</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {isAr ? 'سعر الساعة (SAR)' : 'Hourly Rate (SAR)'}
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData({...formData, hourlyRate: Number(e.target.value)})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-secondary"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {isAr ? 'الحد الأدنى (ساعات)' : 'Minimum Hours'}
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={formData.minimumHours}
                  onChange={(e) => setFormData({...formData, minimumHours: Number(e.target.value)})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-secondary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {isAr ? 'سعر الساعة الإضافية (SAR)' : 'Extra Hour Rate (SAR)'}
              </label>
              <input
                type="number"
                min="0"
                required
                value={formData.extraHourRate}
                onChange={(e) => setFormData({...formData, extraHourRate: Number(e.target.value)})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-secondary"
              />
            </div>

            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                className="w-5 h-5 rounded text-secondary focus:ring-secondary"
              />
              <label htmlFor="isActive" className="font-bold text-gray-700 select-none cursor-pointer">
                {isAr ? 'تفعيل هذه التسعيرة' : 'Activate this pricing rule'}
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-colors"
            >
              {isAr ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/80 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {isAr ? 'حفظ' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
