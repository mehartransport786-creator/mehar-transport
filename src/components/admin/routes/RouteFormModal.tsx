'use client';

import { useState, useEffect } from 'react';
import { X, MapPin, Clock, Globe, FileText } from 'lucide-react';

const routeTypes = [
  { value: 'airport_transfer', labelEn: 'Airport Transfer', labelAr: 'نقل مطار' },
  { value: 'intercity', labelEn: 'Intercity', labelAr: 'بين المدن' },
  { value: 'ziyarat', labelEn: 'Ziyarat', labelAr: 'زيارات' },
  { value: 'hourly', labelEn: 'Hourly', labelAr: 'بالساعة' },
  { value: 'vip', labelEn: 'VIP', labelAr: 'كبار الشخصيات' },
  { value: 'custom', labelEn: 'Custom', labelAr: 'مخصص' },
];

const cities = ['Jeddah', 'Makkah', 'Madinah', 'Taif', 'Riyadh'];

interface RouteFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  route: any | null;
  isAr: boolean;
  onSaved: (route: any) => void;
}

export default function RouteFormModal({ isOpen, onClose, route, isAr, onSaved }: RouteFormModalProps) {
  const isEdit = !!route;
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '', nameAr: '', slug: '',
    origin: '', originAr: '', destination: '', destinationAr: '',
    pickupLocation: '', pickupLocationAr: '', dropoffLocation: '', dropoffLocationAr: '',
    distanceKm: 0, averageDurationMins: 0,
    routeType: 'intercity', city: '',
    description: '', descriptionAr: '',
    image: '',
    seoMeta: { title: '', titleAr: '', description: '', descriptionAr: '' },
    status: 'active' as 'active' | 'draft' | 'archived',
  });

  useEffect(() => {
    if (route) {
      setForm({
        name: route.name || '', nameAr: route.nameAr || '', slug: route.slug || '',
        origin: route.origin || '', originAr: route.originAr || '',
        destination: route.destination || '', destinationAr: route.destinationAr || '',
        pickupLocation: route.pickupLocation || route.origin || '',
        pickupLocationAr: route.pickupLocationAr || route.originAr || '',
        dropoffLocation: route.dropoffLocation || route.destination || '',
        dropoffLocationAr: route.dropoffLocationAr || route.destinationAr || '',
        distanceKm: route.distanceKm || 0, averageDurationMins: route.averageDurationMins || 0,
        routeType: route.routeType || 'intercity', city: route.city || '',
        description: route.description || '', descriptionAr: route.descriptionAr || '',
        image: route.image || '',
        seoMeta: route.seoMeta || { title: '', titleAr: '', description: '', descriptionAr: '' },
        status: route.status || 'active',
      });
    } else {
      setForm({
        name: '', nameAr: '', slug: '',
        origin: '', originAr: '', destination: '', destinationAr: '',
        pickupLocation: '', pickupLocationAr: '', dropoffLocation: '', dropoffLocationAr: '',
        distanceKm: 0, averageDurationMins: 0,
        routeType: 'intercity', city: '',
        description: '', descriptionAr: '',
        image: '',
        seoMeta: { title: '', titleAr: '', description: '', descriptionAr: '' },
        status: 'active',
      });
    }
    setError('');
  }, [route, isOpen]);

  // Auto-generate slug from name
  useEffect(() => {
    if (!isEdit && form.name) {
      setForm(prev => ({
        ...prev,
        slug: form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      }));
    }
  }, [form.name, isEdit]);

  const updateField = (key: string, val: any) => setForm(prev => ({ ...prev, [key]: val }));
  const updateSeo = (key: string, val: string) => setForm(prev => ({ ...prev, seoMeta: { ...prev.seoMeta, [key]: val } }));

  const handleSave = async () => {
    if (!form.name || !form.origin || !form.destination) {
      setError(isAr ? 'يرجى ملء الحقول المطلوبة' : 'Please fill required fields');
      return;
    }
    setSaving(true);
    setError('');

    try {
      const url = isEdit ? `/api/admin/routes/${route._id}` : '/api/admin/routes';
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
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto mx-4" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold text-primary">{isEdit ? (isAr ? 'تعديل المسار' : 'Edit Route') : (isAr ? 'مسار جديد' : 'New Route')}</h2>
            <p className="text-xs text-gray-400 mt-0.5">{isAr ? 'أدخل بيانات المسار' : 'Enter route details'}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
        </div>

        <div className="px-8 py-6 space-y-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">{error}</div>
          )}

          {/* Basic Info */}
          <section>
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-secondary" /> {isAr ? 'المعلومات الأساسية' : 'Basic Information'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">{isAr ? 'اسم المسار (EN)' : 'Route Name (EN)'} *</label>
                <input value={form.name} onChange={(e) => updateField('name', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none transition-all" placeholder="Jeddah Airport → Makkah Hotel" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">{isAr ? 'اسم المسار (AR)' : 'Route Name (AR)'} *</label>
                <input value={form.nameAr} onChange={(e) => updateField('nameAr', e.target.value)} dir="rtl"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none transition-all" placeholder="مطار جدة ← فندق مكة" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 mb-1.5">{isAr ? 'الرابط المختصر' : 'Slug'}</label>
                <input value={form.slug} onChange={(e) => updateField('slug', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 font-mono focus:border-secondary outline-none transition-all" />
              </div>
            </div>
          </section>

          {/* Locations */}
          <section>
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">{isAr ? 'نقاط الانطلاق والوصول' : 'Pickup & Dropoff'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">{isAr ? 'نقطة الانطلاق (EN)' : 'Origin (EN)'} *</label>
                <input value={form.origin} onChange={(e) => updateField('origin', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-secondary outline-none transition-all" placeholder="Jeddah Airport" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">{isAr ? 'نقطة الانطلاق (AR)' : 'Origin (AR)'}</label>
                <input value={form.originAr} onChange={(e) => updateField('originAr', e.target.value)} dir="rtl"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-secondary outline-none transition-all" placeholder="مطار جدة" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">{isAr ? 'نقطة الوصول (EN)' : 'Destination (EN)'} *</label>
                <input value={form.destination} onChange={(e) => updateField('destination', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-secondary outline-none transition-all" placeholder="Makkah Hotel" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">{isAr ? 'نقطة الوصول (AR)' : 'Destination (AR)'}</label>
                <input value={form.destinationAr} onChange={(e) => updateField('destinationAr', e.target.value)} dir="rtl"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-secondary outline-none transition-all" placeholder="فندق مكة" />
              </div>
            </div>
          </section>

          {/* Route Details */}
          <section>
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-secondary" /> {isAr ? 'تفاصيل المسار' : 'Route Details'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">{isAr ? 'المسافة (كم)' : 'Distance (KM)'}</label>
                <input type="number" value={form.distanceKm} onChange={(e) => updateField('distanceKm', Number(e.target.value))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-secondary outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">{isAr ? 'المدة (دقيقة)' : 'Duration (mins)'}</label>
                <input type="number" value={form.averageDurationMins} onChange={(e) => updateField('averageDurationMins', Number(e.target.value))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-secondary outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">{isAr ? 'نوع المسار' : 'Route Type'}</label>
                <select value={form.routeType} onChange={(e) => updateField('routeType', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-secondary outline-none transition-all bg-white">
                  {routeTypes.map(t => <option key={t.value} value={t.value}>{isAr ? t.labelAr : t.labelEn}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">{isAr ? 'المدينة' : 'City'}</label>
                <select value={form.city} onChange={(e) => updateField('city', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-secondary outline-none transition-all bg-white">
                  <option value="">{isAr ? 'اختر المدينة' : 'Select city'}</option>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </section>

          {/* Description */}
          <section>
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-secondary" /> {isAr ? 'الوصف' : 'Description'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">{isAr ? 'الوصف (EN)' : 'Description (EN)'}</label>
                <textarea rows={3} value={form.description} onChange={(e) => updateField('description', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-secondary outline-none transition-all resize-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">{isAr ? 'الوصف (AR)' : 'Description (AR)'}</label>
                <textarea rows={3} value={form.descriptionAr} onChange={(e) => updateField('descriptionAr', e.target.value)} dir="rtl"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-secondary outline-none transition-all resize-none" />
              </div>
            </div>
          </section>

          {/* SEO Meta */}
          <section>
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4 text-secondary" /> {isAr ? 'SEO' : 'SEO Meta'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Meta Title (EN)</label>
                <input value={form.seoMeta.title} onChange={(e) => updateSeo('title', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-secondary outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Meta Title (AR)</label>
                <input value={form.seoMeta.titleAr} onChange={(e) => updateSeo('titleAr', e.target.value)} dir="rtl"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-secondary outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Meta Description (EN)</label>
                <textarea rows={2} value={form.seoMeta.description} onChange={(e) => updateSeo('description', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-secondary outline-none transition-all resize-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Meta Description (AR)</label>
                <textarea rows={2} value={form.seoMeta.descriptionAr} onChange={(e) => updateSeo('descriptionAr', e.target.value)} dir="rtl"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-secondary outline-none transition-all resize-none" />
              </div>
            </div>
          </section>

          {/* Status */}
          <section>
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">{isAr ? 'الحالة والنشر' : 'Status & Publishing'}</h3>
            <div className="flex gap-3">
              {(['active', 'draft', 'archived'] as const).map(s => (
                <button key={s} onClick={() => updateField('status', s)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all border-2 ${
                    form.status === s
                      ? s === 'active' ? 'bg-emerald-500 border-emerald-500 text-white' : s === 'draft' ? 'bg-amber-500 border-amber-500 text-white' : 'bg-gray-500 border-gray-500 text-white'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {s === 'active' ? (isAr ? 'نشط' : 'Active') : s === 'draft' ? (isAr ? 'مسودة' : 'Draft') : (isAr ? 'أرشيف' : 'Archived')}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-8 py-4 flex items-center justify-end gap-3 rounded-b-2xl">
          <button onClick={onClose} className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all">
            {isAr ? 'إلغاء' : 'Cancel'}
          </button>
          <button onClick={handleSave} disabled={saving}
            className="px-8 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/80 transition-all shadow-lg shadow-primary/20 disabled:opacity-50">
            {saving ? (isAr ? 'جاري الحفظ...' : 'Saving...') : isEdit ? (isAr ? 'حفظ التعديلات' : 'Save Changes') : (isAr ? 'إنشاء المسار' : 'Create Route')}
          </button>
        </div>
      </div>
    </div>
  );
}
