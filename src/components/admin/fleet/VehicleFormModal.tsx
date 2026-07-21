'use client';

import { useState, useEffect } from 'react';
import { X, Car, Users, Briefcase, Plus, Trash2 } from 'lucide-react';

const categories = ['Sedan', 'SUV', 'Van', 'Luxury Van', 'Bus'];

interface VehicleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: any | null;
  isAr: boolean;
  onSaved: (vehicle: any) => void;
}

export default function VehicleFormModal({ isOpen, onClose, vehicle, isAr, onSaved }: VehicleFormModalProps) {
  const isEdit = !!vehicle;
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '', nameAr: '', slug: '',
    type: 'Sedan', typeAr: 'سيدان',
    passengers: 4, luggage: 2,
    description: '', descriptionAr: '',
    image: '',
    features: [] as string[],
    featuresAr: [] as string[],
    active: true,
    hourlyRate: 0,
  });

  const [newFeatureEn, setNewFeatureEn] = useState('');
  const [newFeatureAr, setNewFeatureAr] = useState('');

  useEffect(() => {
    if (vehicle) {
      setForm({
        name: vehicle.name || '', nameAr: vehicle.nameAr || '', slug: vehicle.slug || '',
        type: vehicle.type || 'Sedan', typeAr: vehicle.typeAr || 'سيدان',
        passengers: vehicle.passengers || 4, luggage: vehicle.luggage || 2,
        description: vehicle.description || '', descriptionAr: vehicle.descriptionAr || '',
        image: vehicle.image || '',
        features: vehicle.features || [],
        featuresAr: vehicle.featuresAr || [],
        active: vehicle.active !== false,
        hourlyRate: vehicle.hourlyRate || 0,
      });
    } else {
      setForm({
        name: '', nameAr: '', slug: '',
        type: 'Sedan', typeAr: 'سيدان',
        passengers: 4, luggage: 2,
        description: '', descriptionAr: '',
        image: '',
        features: [], featuresAr: [],
        active: true,
        hourlyRate: 0,
      });
    }
    setError('');
    setNewFeatureEn('');
    setNewFeatureAr('');
  }, [vehicle, isOpen]);

  // Auto-generate slug
  useEffect(() => {
    if (!isEdit && form.name) {
      setForm(prev => ({
        ...prev,
        slug: form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      }));
    }
  }, [form.name, isEdit]);

  const updateField = (key: string, val: any) => setForm(prev => ({ ...prev, [key]: val }));

  const addFeature = () => {
    if (!newFeatureEn || !newFeatureAr) return;
    setForm(prev => ({
      ...prev,
      features: [...prev.features, newFeatureEn],
      featuresAr: [...prev.featuresAr, newFeatureAr]
    }));
    setNewFeatureEn('');
    setNewFeatureAr('');
  };

  const removeFeature = (index: number) => {
    setForm(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
      featuresAr: prev.featuresAr.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    if (!form.name || !form.nameAr) {
      setError(isAr ? 'يرجى إدخال اسم المركبة' : 'Please enter vehicle name');
      return;
    }
    setSaving(true);
    setError('');

    try {
      const url = isEdit ? `/api/admin/fleet/${vehicle._id}` : '/api/admin/fleet';
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
        setError(data.error || 'Failed to save');
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
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold text-primary">{isEdit ? (isAr ? 'تعديل المركبة' : 'Edit Vehicle') : (isAr ? 'إضافة مركبة' : 'Add Vehicle')}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
        </div>

        <div className="px-8 py-6 space-y-6">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">{error}</div>}

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">{isAr ? 'الاسم (EN)' : 'Name (EN)'} *</label>
              <input value={form.name} onChange={(e) => updateField('name', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-secondary outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">{isAr ? 'الاسم (AR)' : 'Name (AR)'} *</label>
              <input value={form.nameAr} onChange={(e) => updateField('nameAr', e.target.value)} dir="rtl"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-secondary outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 mb-1.5">{isAr ? 'الرابط المختصر' : 'Slug'}</label>
              <input value={form.slug} onChange={(e) => updateField('slug', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 font-mono focus:border-secondary outline-none" />
            </div>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 flex items-center gap-1.5"><Car className="w-3.5 h-3.5"/> {isAr ? 'الفئة' : 'Category'}</label>
              <select value={form.type} onChange={(e) => updateField('type', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white outline-none">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 flex items-center gap-1.5"><Users className="w-3.5 h-3.5"/> {isAr ? 'الركاب' : 'Passengers'}</label>
              <input type="number" min="1" value={form.passengers} onChange={(e) => updateField('passengers', Number(e.target.value))}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5"/> {isAr ? 'الحقائب' : 'Luggage'}</label>
              <input type="number" min="0" value={form.luggage} onChange={(e) => updateField('luggage', Number(e.target.value))}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">{isAr ? 'سعر الساعة (SAR)' : 'Hourly Rate (SAR/hr)'}</label>
              <input type="number" min="0" value={form.hourlyRate} onChange={(e) => updateField('hourlyRate', Number(e.target.value))}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white outline-none" />
            </div>
          </div>

          {/* Image & Description */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">{isAr ? 'رابط الصورة' : 'Image URL'}</label>
              <input value={form.image} onChange={(e) => updateField('image', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-secondary outline-none" placeholder="/fleet/camry.png" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">{isAr ? 'الوصف (EN)' : 'Description (EN)'}</label>
                <textarea rows={2} value={form.description} onChange={(e) => updateField('description', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none resize-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">{isAr ? 'الوصف (AR)' : 'Description (AR)'}</label>
                <textarea rows={2} value={form.descriptionAr} onChange={(e) => updateField('descriptionAr', e.target.value)} dir="rtl"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none resize-none" />
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block text-xs font-bold text-primary mb-3">{isAr ? 'المميزات' : 'Features'}</label>
            <div className="space-y-2 mb-3">
              {form.features.map((feat, idx) => (
                <div key={idx} className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                  <div className="flex gap-4 flex-1">
                    <span className="text-sm font-medium w-1/2">{feat}</span>
                    <span className="text-sm text-gray-500 w-1/2 text-right" dir="rtl">{form.featuresAr[idx]}</span>
                  </div>
                  <button onClick={() => removeFeature(idx)} className="text-red-400 hover:text-red-600 p-1 ml-4"><Trash2 className="w-4 h-4"/></button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 items-start">
              <input value={newFeatureEn} onChange={e => setNewFeatureEn(e.target.value)} placeholder="e.g. Free Wi-Fi" className="flex-1 px-3 py-2 border rounded-lg text-sm" />
              <input value={newFeatureAr} onChange={e => setNewFeatureAr(e.target.value)} placeholder="مثال: واي فاي مجاني" dir="rtl" className="flex-1 px-3 py-2 border rounded-lg text-sm" />
              <button onClick={addFeature} type="button" className="p-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"><Plus className="w-4 h-4"/></button>
            </div>
          </div>

        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-8 py-4 flex items-center justify-end gap-3 rounded-b-2xl">
          <button onClick={onClose} className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-50">
            {isAr ? 'إلغاء' : 'Cancel'}
          </button>
          <button onClick={handleSave} disabled={saving}
            className="px-8 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/80 shadow-lg disabled:opacity-50">
            {saving ? (isAr ? 'جاري الحفظ...' : 'Saving...') : isEdit ? (isAr ? 'حفظ التعديلات' : 'Save Changes') : (isAr ? 'إضافة المركبة' : 'Add Vehicle')}
          </button>
        </div>
      </div>
    </div>
  );
}
