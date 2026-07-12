'use client';

import { useState } from 'react';
import { X, Loader2, AlertTriangle } from 'lucide-react';
import { deletePricingRule } from '@/lib/actions/pricing';

export default function DeleteConfirmModal({ 
  isOpen, 
  onClose, 
  rule,
  isAr 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  rule: any;
  isAr: boolean; 
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !rule) return null;

  const route = rule.routeId as any;
  const vehicle = rule.vehicleId as any;

  const handleDelete = async () => {
    setIsLoading(true);
    setError('');

    try {
      await deletePricingRule(rule._id);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-primary mb-2">
            {isAr ? "هل أنت متأكد من الحذف؟" : "Confirm Deletion"}
          </h3>
          <p className="text-gray-500 mb-6">
            {isAr 
              ? `هل أنت متأكد من رغبتك في حذف تسعيرة المسار "${route?.nameAr}" للمركبة "${vehicle?.nameAr}"؟ هذا الإجراء لا يمكن التراجع عنه.`
              : `Are you sure you want to delete the pricing rule for "${route?.name}" using "${vehicle?.name}"? This action cannot be undone.`}
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 text-left">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button 
              type="button" 
              onClick={onClose} 
              disabled={isLoading}
              className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50"
            >
              {isAr ? "إلغاء" : "Cancel"}
            </button>
            <button 
              type="button" 
              onClick={handleDelete}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all disabled:opacity-70"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {isAr ? "حذف نهائياً" : "Yes, Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
