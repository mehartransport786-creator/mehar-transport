'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface SeasonalRuleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  rule: any | null;
  isAr: boolean;
  onSaved: (rule: any) => void;
}

export default function SeasonalRuleFormModal({ isOpen, onClose, rule, isAr, onSaved }: SeasonalRuleFormModalProps) {
  const isEdit = !!rule;
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    seasonName: '', seasonNameAr: '',
    startDate: '', endDate: '',
    adjustmentType: 'percentage_increase',
    adjustmentValue: 10,
    priority: 0,
    description: '', descriptionAr: '',
    isActive: true
  });

  useEffect(() => {
    if (rule) {
      setForm({
        seasonName: rule.seasonName || '',
        seasonNameAr: rule.seasonNameAr || '',
        startDate: rule.startDate ? new Date(rule.startDate).toISOString().split('T')[0] : '',
        endDate: rule.endDate ? new Date(rule.endDate).toISOString().split('T')[0] : '',
        adjustmentType: rule.adjustmentType || 'percentage_increase',
        adjustmentValue: rule.adjustmentValue || 0,
        priority: rule.priority || 0,
        description: rule.description || '',
        descriptionAr: rule.descriptionAr || '',
        isActive: rule.isActive !== false
      });
    } else {
      setForm({
        seasonName: '', seasonNameAr: '',
        startDate: '', endDate: '',
        adjustmentType: 'percentage_increase',
        adjustmentValue: 10,
        priority: 0,
        description: '', descriptionAr: '',
        isActive: true
      });
    }
    setError('');
  }, [rule, isOpen]);

  const updateField = (key: string, val: any) => setForm(prev => ({ ...prev, [key]: val }));

  const handleSave = async () => {
    if (!form.seasonName || !form.seasonNameAr || !form.startDate || !form.endDate) {
      setError(isAr ? 'يرجى إدخال الحقول المطلوبة' : 'Please fill required fields');
      return;
    }
    if (new Date(form.startDate) > new Date(form.endDate)) {
      setError(isAr ? 'تاريخ البداية يجب أن يكون قبل تاريخ النهاية' : 'Start date must be before end date');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const url = isEdit ? `/api/admin/pricing/seasonal/${rule._id}` : '/api/admin/pricing/seasonal';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        onSaved(data.data);
        onClose();
      } else {
        setError(data.error || 'Failed to save rule');
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 pb-8">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold text-primary">
            {isEdit ? (isAr ? 'تعديل القاعدة الموسيمة' : 'Edit Seasonal Rule') : (isAr ? 'قاعدة موسيمة جديدة' : 'New Seasonal Rule')}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
        </div>

        <div className="px-8 py-6 space-y-6">
          {error && <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">{isAr ? 'الاسم (EN)' : 'Name (EN)'} *</label>
              <input value={form.seasonName} onChange={e => updateField('seasonName', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-secondary outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">{isAr ? 'الاسم (AR)' : 'Name (AR)'} *</label>
              <input value={form.seasonNameAr} onChange={e => updateField('seasonNameAr', e.target.value)} dir="rtl"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-secondary outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">{isAr ? 'تاريخ البداية' : 'Start Date'} *</label>
              <input type="date" value={form.startDate} onChange={e => updateField('startDate', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-secondary outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">{isAr ? 'تاريخ النهاية' : 'End Date'} *</label>
              <input type="date" value={form.endDate} onChange={e => updateField('endDate', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-secondary outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 mb-1.5">{isAr ? 'نوع التعديل' : 'Adjustment Type'} *</label>
              <select value={form.adjustmentType} onChange={e => updateField('adjustmentType', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:border-secondary outline-none">
                <option value="percentage_increase">{isAr ? 'زيادة بنسبة مئوية (%)' : 'Percentage Increase (%)'}</option>
                <option value="percentage_decrease">{isAr ? 'تخفيض بنسبة مئوية (%)' : 'Percentage Decrease (%)'}</option>
                <option value="fixed_increase">{isAr ? 'زيادة بمبلغ ثابت (SAR)' : 'Fixed Increase (SAR)'}</option>
                <option value="fixed_decrease">{isAr ? 'تخفيض بمبلغ ثابت (SAR)' : 'Fixed Decrease (SAR)'}</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">{isAr ? 'القيمة' : 'Value'} *</label>
              <input type="number" min="0" value={form.adjustmentValue} onChange={e => updateField('adjustmentValue', Number(e.target.value))}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-secondary outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5">{isAr ? 'الأولوية (الرقم الأكبر يطغى عند التعارض)' : 'Priority (Higher number overrides on conflict)'}</label>
            <input type="number" min="0" value={form.priority} onChange={e => updateField('priority', Number(e.target.value))}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-secondary outline-none" />
            <p className="text-xs text-gray-400 mt-1">{isAr ? 'مثال: قاعدة الحج (أولوية 10) ستطغى على قاعدة الصيف (أولوية 1) إذا تداخلت التواريخ.' : 'Example: Hajj (priority 10) will override Summer (priority 1) if dates overlap.'}</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="isActive" checked={form.isActive} onChange={e => updateField('isActive', e.target.checked)} className="w-4 h-4 text-primary rounded border-gray-300" />
              <label htmlFor="isActive" className="text-sm font-bold text-gray-700">{isAr ? 'نشط' : 'Active'}</label>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-8 py-4 flex items-center justify-end gap-3 rounded-b-2xl">
          <button onClick={onClose} className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-50">
            {isAr ? 'إلغاء' : 'Cancel'}
          </button>
          <button onClick={handleSave} disabled={saving}
            className="px-8 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/80 shadow-lg disabled:opacity-50">
            {saving ? (isAr ? 'جاري الحفظ...' : 'Saving...') : isEdit ? (isAr ? 'حفظ التعديلات' : 'Save Changes') : (isAr ? 'إضافة القاعدة' : 'Add Rule')}
          </button>
        </div>
      </div>
    </div>
  );
}
