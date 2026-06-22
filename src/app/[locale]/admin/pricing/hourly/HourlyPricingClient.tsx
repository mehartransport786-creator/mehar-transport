'use client';

import { useState } from 'react';
import { Clock, Plus, Edit3, Trash2 } from 'lucide-react';
import HourlyRateFormModal from '@/components/admin/pricing/HourlyRateFormModal';
import { useRouter } from 'next/navigation';

export default function HourlyPricingClient({ 
  initialPricingRules, 
  vehicles, 
  isAr 
}: { 
  initialPricingRules: any[]; 
  vehicles: any[];
  isAr: boolean; 
}) {
  const router = useRouter();
  const [pricingRules, setPricingRules] = useState(initialPricingRules);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<any>(null);

  const handleOpenModal = (rule: any = null) => {
    setEditingRule(rule);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingRule(null);
  };

  const handleSubmit = async (formData: any) => {
    try {
      const url = editingRule 
        ? `/api/admin/pricing/hourly/${editingRule._id}` 
        : `/api/admin/pricing/hourly`;
      const method = editingRule ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save hourly rate');
      }

      alert(isAr ? 'تم الحفظ بنجاح' : 'Saved successfully');
      router.refresh();
      
      // Update local state for immediate feedback
      const savedRule = await response.json();
      if (editingRule) {
        setPricingRules(pricingRules.map(r => r._id === savedRule._id ? savedRule : r));
      } else {
        setPricingRules([savedRule, ...pricingRules]);
      }
      
      handleCloseModal();
    } catch (error: any) {
      alert(error.message || (isAr ? 'حدث خطأ أثناء الحفظ' : 'Error saving rate'));
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(isAr ? 'هل أنت متأكد من حذف هذه التسعيرة؟' : 'Are you sure you want to delete this hourly rate?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/pricing/hourly/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete');

      alert(isAr ? 'تم الحذف بنجاح' : 'Deleted successfully');
      setPricingRules(pricingRules.filter(r => r._id !== id));
      router.refresh();
    } catch (error) {
      alert(isAr ? 'حدث خطأ أثناء الحذف' : 'Error deleting rate');
    }
  };

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1B1E4F]">
            {isAr ? "تسعير السائق بالساعة" : "Hourly Chauffeur Pricing"}
          </h2>
          <p className="text-gray-500 mt-1">
            {isAr ? "تحديد التسعيرة بالساعة لكل مركبة مع الحد الأدنى للساعات." : "Configure per-vehicle hourly rates and minimum booking hours."}
          </p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#1B1E4F] text-white font-bold rounded-xl text-sm hover:bg-[#2a2f6b] transition-all shadow-lg shadow-[#1B1E4F]/20"
        >
          <Plus className="w-4 h-4" />
          {isAr ? "إضافة تسعيرة بالساعة" : "Add Hourly Rate"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pricingRules.map((rule) => {
          const vehicle = rule.vehicleId as any;
          if (!vehicle) return null; // Defensive check
          
          return (
            <div key={rule._id} className={`bg-white border ${rule.isActive ? 'border-gray-100' : 'border-red-200 opacity-70'} rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group relative`}>
              <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleOpenModal(rule)}
                  className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(rule._id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden">
                  {vehicle?.image ? (
                    <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />
                  ) : (
                    <Clock className="w-6 h-6 text-gray-300" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{isAr ? vehicle?.nameAr : vehicle?.name}</h3>
                  <div className="flex gap-2 items-center">
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-gray-100 text-gray-500">
                      {isAr ? vehicle?.typeAr : vehicle?.type}
                    </span>
                    {!rule.isActive && (
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-red-100 text-red-500">
                        {isAr ? 'غير فعال' : 'Inactive'}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                  <span className="text-sm text-gray-500">{isAr ? "سعر الساعة" : "Hourly Rate"}</span>
                  <span className="font-black text-xl text-[#1B1E4F]">{rule.hourlyRate} <span className="text-sm font-semibold text-gray-400">SAR</span></span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">{isAr ? "الحد الأدنى" : "Minimum"}</span>
                  <span className="font-bold text-gray-800">{rule.minimumHours} {isAr ? "ساعات" : "hours"}</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">{isAr ? "ساعة إضافية" : "Extra Hour"}</span>
                  <span className="font-bold text-[#D9A63A]">{rule.extraHourRate} SAR</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {pricingRules.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
          <Clock className="w-10 h-10 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">{isAr ? "لا توجد أسعار بالساعة. أضف تسعيرة للبدء." : "No hourly pricing rules configured yet."}</p>
        </div>
      )}

      <HourlyRateFormModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        isAr={isAr}
        initialData={editingRule}
        vehicles={vehicles}
      />
    </div>
  );
}
