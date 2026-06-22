'use client';

import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { createRoute } from '@/lib/actions/pricing';

export default function AddRouteModal({ 
  isOpen, 
  onClose, 
  isAr 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  isAr: boolean; 
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    nameAr: '',
    origin: '',
    originAr: '',
    destination: '',
    destinationAr: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await createRoute(formData);
      setFormData({
        name: '', nameAr: '', origin: '', originAr: '', destination: '', destinationAr: ''
      });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-[#1B1E4F]">
            {isAr ? "إضافة مسار جديد" : "Add New Route"}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Route Name (EN)</label>
              <input 
                required 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D9A63A] focus:bg-white transition-colors" 
                placeholder="e.g. Jeddah to Makkah" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">اسم المسار (AR)</label>
              <input 
                required 
                name="nameAr" 
                value={formData.nameAr} 
                onChange={handleChange} 
                dir="rtl"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D9A63A] focus:bg-white transition-colors" 
                placeholder="مثال: جدة إلى مكة" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Origin (EN)</label>
              <input 
                required 
                name="origin" 
                value={formData.origin} 
                onChange={handleChange} 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D9A63A] focus:bg-white transition-colors" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">نقطة الانطلاق (AR)</label>
              <input 
                required 
                name="originAr" 
                value={formData.originAr} 
                onChange={handleChange} 
                dir="rtl"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D9A63A] focus:bg-white transition-colors" 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Destination (EN)</label>
              <input 
                required 
                name="destination" 
                value={formData.destination} 
                onChange={handleChange} 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D9A63A] focus:bg-white transition-colors" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">الوجهة (AR)</label>
              <input 
                required 
                name="destinationAr" 
                value={formData.destinationAr} 
                onChange={handleChange} 
                dir="rtl"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D9A63A] focus:bg-white transition-colors" 
              />
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
              {isAr ? "حفظ المسار" : "Save Route"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
