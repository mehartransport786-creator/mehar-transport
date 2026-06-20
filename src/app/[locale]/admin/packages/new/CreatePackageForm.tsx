"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import Link from "next/link";

export default function CreatePackageForm({ locale, routes, vehicles }: { locale: string, routes: any[], vehicles: any[] }) {
  const isAr = locale === "ar";
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    nameAr: "",
    description: "",
    descriptionAr: "",
    category: "Umrah",
    isActive: true,
    isPopular: false,
    order: 0,
    idealFor: [""],
    features: [""],
    featuresAr: [""],
    images: ["/hero-makkah.webp"], // Default image
    includedRoutes: [] as string[],
    availableVehicles: [] as string[]
  });

  const handleArrayChange = (field: 'idealFor' | 'features' | 'featuresAr' | 'images', index: number, value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field: 'idealFor' | 'features' | 'featuresAr' | 'images') => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeArrayItem = (field: 'idealFor' | 'features' | 'featuresAr' | 'images', index: number) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const toggleSelection = (field: 'includedRoutes' | 'availableVehicles', id: string) => {
    const isSelected = formData[field].includes(id);
    const newArray = isSelected 
      ? formData[field].filter(itemId => itemId !== id)
      : [...formData[field], id];
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Clean up empty array items
      const cleanedData = {
        ...formData,
        idealFor: formData.idealFor.filter(i => i.trim() !== ""),
        features: formData.features.filter(i => i.trim() !== ""),
        featuresAr: formData.featuresAr.filter(i => i.trim() !== ""),
        images: formData.images.filter(i => i.trim() !== ""),
      };

      const res = await fetch("/api/admin/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedData),
      });

      if (!res.ok) throw new Error(await res.text());

      router.push(`/${locale}/admin/packages`);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to create package");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/${locale}/admin/packages`} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-[#1B1E4F] shadow-sm border border-gray-100 transition-colors">
            <ArrowLeft className="w-5 h-5 rtl:rotate-180" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#1B1E4F]">{isAr ? "إنشاء باقة جديدة" : "Create New Package"}</h1>
            <p className="text-sm text-gray-500">{isAr ? "أدخل تفاصيل ومسارات الباقة." : "Enter the package details and routes."}</p>
          </div>
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="flex items-center gap-2 bg-[#1B1E4F] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#2a2f6b] transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {loading ? (isAr ? "جاري الحفظ..." : "Saving...") : (isAr ? "حفظ الباقة" : "Save Package")}
        </button>
      </div>

      {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-bold text-[#1B1E4F] border-b border-gray-100 pb-4">{isAr ? "المعلومات الأساسية" : "Basic Info"}</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Package Name (En)</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#D9A63A] focus:bg-white transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">اسم الباقة (عربي)</label>
                <input required type="text" value={formData.nameAr} onChange={e => setFormData({...formData, nameAr: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#D9A63A] focus:bg-white transition-all text-right" dir="rtl" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description (En)</label>
                <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#D9A63A] focus:bg-white transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">الوصف (عربي)</label>
                <textarea required rows={3} value={formData.descriptionAr} onChange={e => setFormData({...formData, descriptionAr: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#D9A63A] focus:bg-white transition-all text-right" dir="rtl" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#D9A63A] focus:bg-white transition-all">
                  <option value="Umrah">Umrah</option>
                  <option value="Airport">Airport</option>
                  <option value="VIP">VIP</option>
                  <option value="Family">Family</option>
                  <option value="Group">Group</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Display Order</label>
                <input type="number" value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value) || 0})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#D9A63A] focus:bg-white transition-all" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-bold text-[#1B1E4F] border-b border-gray-100 pb-4">{isAr ? "ميزات الباقة" : "Package Features"}</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Features (En)</label>
                {formData.features.map((feat, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input type="text" value={feat} onChange={e => handleArrayChange('features', idx, e.target.value)} className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#D9A63A]" />
                    <button type="button" onClick={() => removeArrayItem('features', idx)} className="text-red-500 p-2"><X className="w-4 h-4"/></button>
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem('features')} className="text-[#D9A63A] text-sm font-semibold flex items-center gap-1 mt-2"><Plus className="w-3 h-3"/> Add Feature</button>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">المميزات (عربي)</label>
                {formData.featuresAr.map((feat, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input type="text" value={feat} onChange={e => handleArrayChange('featuresAr', idx, e.target.value)} className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#D9A63A] text-right" dir="rtl" />
                    <button type="button" onClick={() => removeArrayItem('featuresAr', idx)} className="text-red-500 p-2"><X className="w-4 h-4"/></button>
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem('featuresAr')} className="text-[#D9A63A] text-sm font-semibold flex items-center gap-1 mt-2"><Plus className="w-3 h-3"/> إضافة ميزة</button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Configuration */}
        <div className="space-y-6">
          
          {/* Status & Options */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
            <h3 className="font-bold text-[#1B1E4F] border-b border-gray-100 pb-4">{isAr ? "خيارات متقدمة" : "Options"}</h3>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="w-5 h-5 rounded border-gray-300 text-[#D9A63A] focus:ring-[#D9A63A]" />
              <span className="text-sm font-semibold text-gray-700">{isAr ? "تفعيل الباقة" : "Package is Active"}</span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={formData.isPopular} onChange={e => setFormData({...formData, isPopular: e.target.checked})} className="w-5 h-5 rounded border-gray-300 text-[#D9A63A] focus:ring-[#D9A63A]" />
              <span className="text-sm font-semibold text-gray-700">{isAr ? "عرض كباقة شعبية" : "Mark as Popular"}</span>
            </label>
          </div>

          {/* Included Routes Selection */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
            <h3 className="font-bold text-[#1B1E4F] border-b border-gray-100 pb-4">{isAr ? "المسارات المضمنة" : "Included Routes"}</h3>
            <p className="text-xs text-gray-500 mb-4">{isAr ? "اختر المسارات بالترتيب الذي تريد ظهوره في مسار الرحلة." : "Select the routes in the order they should appear in the timeline."}</p>
            
            <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
              {routes.map(route => (
                <label key={route._id} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors border ${formData.includedRoutes.includes(route._id) ? 'border-[#D9A63A] bg-[#D9A63A]/5' : 'border-gray-100 hover:bg-gray-50'}`}>
                  <input 
                    type="checkbox" 
                    checked={formData.includedRoutes.includes(route._id)}
                    onChange={() => toggleSelection('includedRoutes', route._id)}
                    className="w-4 h-4 rounded border-gray-300 text-[#D9A63A] focus:ring-[#D9A63A]" 
                  />
                  <div>
                    <div className="text-sm font-bold text-gray-800">{isAr ? route.nameAr : route.name}</div>
                    <div className="text-xs text-gray-500">{route.origin} → {route.destination}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Available Vehicles Selection */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
            <h3 className="font-bold text-[#1B1E4F] border-b border-gray-100 pb-4">{isAr ? "المركبات المتاحة" : "Available Vehicles"}</h3>
            <p className="text-xs text-gray-500 mb-4">{isAr ? "السعر سيتم حسابه تلقائياً بناءً على تسعيرة المسارات المختارة." : "Pricing will be auto-calculated based on Route Pricing."}</p>
            
            <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
              {vehicles.map(vehicle => (
                <label key={vehicle._id} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors border ${formData.availableVehicles.includes(vehicle._id) ? 'border-[#D9A63A] bg-[#D9A63A]/5' : 'border-gray-100 hover:bg-gray-50'}`}>
                  <input 
                    type="checkbox" 
                    checked={formData.availableVehicles.includes(vehicle._id)}
                    onChange={() => toggleSelection('availableVehicles', vehicle._id)}
                    className="w-4 h-4 rounded border-gray-300 text-[#D9A63A] focus:ring-[#D9A63A]" 
                  />
                  <div>
                    <div className="text-sm font-bold text-gray-800">{isAr ? vehicle.nameAr : vehicle.name}</div>
                    <div className="text-xs text-gray-500">{vehicle.type}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

        </div>
      </div>
    </form>
  );
}
