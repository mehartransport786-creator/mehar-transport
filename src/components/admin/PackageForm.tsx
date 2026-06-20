"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Plus, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { fallbackVehicles, fallbackRoutesData } from "@/lib/fallbackData";

export default function PackageForm({ locale, packageData = null }: { locale: string, packageData?: any }) {
  const router = useRouter();
  const isAr = locale === "ar";
  const [loading, setLoading] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const [formData, setFormData] = useState({
    name: packageData?.name || "",
    nameAr: packageData?.nameAr || "",
    slug: packageData?.slug || "",
    description: packageData?.description || "",
    descriptionAr: packageData?.descriptionAr || "",
    category: packageData?.category || "Umrah",
    idealFor: packageData?.idealFor || [""],
    features: packageData?.features || [""],
    featuresAr: packageData?.featuresAr || [""],
    images: packageData?.images || [""],
    includedRoutes: packageData?.includedRoutes?.map((r: any) => typeof r === "object" ? r._id : r) || [],
    availableVehicles: packageData?.availableVehicles?.map((v: any) => typeof v === "object" ? v._id : v) || [],
    isActive: packageData?.isActive !== undefined ? packageData.isActive : true,
    isPopular: packageData?.isPopular || false,
    order: packageData?.order || 0,
  });

  useEffect(() => {
    // Fetch all routes and vehicles for the selection dropdowns
    const fetchData = async () => {
      try {
        const [routesRes, vehiclesRes] = await Promise.all([
          fetch("/api/pricing/routes").catch(() => null),
          fetch("/api/vehicles").catch(() => null)
        ]);
        
        let loadedRoutes = fallbackRoutesData;
        let loadedVehicles = fallbackVehicles;
        
        if (routesRes && routesRes.ok) {
          const rData = await routesRes.json();
          if (rData.routes) loadedRoutes = rData.routes;
          else if (rData.data) loadedRoutes = rData.data;
        }
        
        if (vehiclesRes && vehiclesRes.ok) {
          const vData = await vehiclesRes.json();
          if (vData.data) loadedVehicles = vData.data;
          else if (vData.vehicles) loadedVehicles = vData.vehicles;
        }
        
        setRoutes(loadedRoutes as any);
        setVehicles(loadedVehicles as any);
      } catch (error) {
        console.error("Failed to fetch dependencies", error);
        setRoutes(fallbackRoutesData as any);
        setVehicles(fallbackVehicles as any);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleArrayChange = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const arr = [...(prev as any)[field]];
      arr[index] = value;
      return { ...prev, [field]: arr };
    });
  };

  const addArrayItem = (field: string) => {
    setFormData(prev => ({ ...prev, [field]: [...(prev as any)[field], ""] }));
  };

  const removeArrayItem = (index: number, field: string) => {
    setFormData(prev => {
      const arr = [...(prev as any)[field]];
      arr.splice(index, 1);
      return { ...prev, [field]: arr };
    });
  };

  const handleMultiSelect = (e: React.ChangeEvent<HTMLSelectElement>, field: string) => {
    const values = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, [field]: values }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = packageData ? `/api/admin/packages/${packageData._id}` : `/api/admin/packages`;
      const method = packageData ? "PUT" : "POST";

      // Filter out empty strings from arrays
      const cleanedData = {
        ...formData,
        idealFor: formData.idealFor.filter((i: string) => i.trim() !== ""),
        features: formData.features.filter((f: string) => f.trim() !== ""),
        featuresAr: formData.featuresAr.filter((f: string) => f.trim() !== ""),
        images: formData.images.filter((i: string) => i.trim() !== ""),
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedData),
      });

      if (res.ok) {
        router.push(`/${locale}/admin/packages`);
        router.refresh();
      } else {
        const error = await res.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to save package");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1B1E4F]">
          {packageData ? (isAr ? "تعديل الباقة" : "Edit Package") : (isAr ? "إضافة باقة جديدة" : "Add New Package")}
        </h1>
        <div className="flex items-center gap-4">
          <Link href={`/${locale}/admin/packages`} className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium">
            {isAr ? "إلغاء" : "Cancel"}
          </Link>
          <button type="submit" disabled={loading} className="px-6 py-2 bg-[#D9A63A] text-white font-bold rounded-lg hover:bg-[#c29333] transition-colors disabled:opacity-50 flex items-center gap-2">
            <Save className="w-4 h-4" />
            {loading ? (isAr ? "جاري الحفظ..." : "Saving...") : (isAr ? "حفظ الباقة" : "Save Package")}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Package Name (English)</label>
          <input required name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#D9A63A] outline-none" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Package Name (Arabic)</label>
          <input required name="nameAr" value={formData.nameAr} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#D9A63A] outline-none text-right" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">URL Slug</label>
          <input required name="slug" value={formData.slug} onChange={handleChange} placeholder="e.g. premium-umrah-package" className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#D9A63A] outline-none" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Category</label>
          <select name="category" value={formData.category} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#D9A63A] outline-none bg-white">
            <option value="Umrah">Umrah</option>
            <option value="VIP">VIP</option>
            <option value="Airport Transfer">Airport Transfer</option>
            <option value="Tour">Tour</option>
          </select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold text-gray-700">Description (English)</label>
          <textarea required name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#D9A63A] outline-none" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold text-gray-700">Description (Arabic)</label>
          <textarea required name="descriptionAr" value={formData.descriptionAr} onChange={handleChange} rows={3} className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#D9A63A] outline-none text-right" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="space-y-4">
          <label className="text-sm font-semibold text-gray-700 block">Included Routes</label>
          <select multiple value={formData.includedRoutes} onChange={(e) => handleMultiSelect(e, "includedRoutes")} className="w-full p-3 border border-gray-200 rounded-lg h-48 focus:border-[#D9A63A] outline-none bg-white">
            {routes.map((r: any) => (
              <option key={r._id} value={r._id}>{r.name}</option>
            ))}
          </select>
          <p className="text-xs text-gray-500">Hold Ctrl/Cmd to select multiple routes</p>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-semibold text-gray-700 block">Available Vehicles</label>
          <select multiple value={formData.availableVehicles} onChange={(e) => handleMultiSelect(e, "availableVehicles")} className="w-full p-3 border border-gray-200 rounded-lg h-48 focus:border-[#D9A63A] outline-none bg-white">
            {vehicles.map((v: any) => (
              <option key={v._id} value={v._id}>{v.name}</option>
            ))}
          </select>
          <p className="text-xs text-gray-500">Hold Ctrl/Cmd to select multiple vehicles</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-2">Features (English)</label>
          {formData.features.map((feature: string, idx: number) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input value={feature} onChange={(e) => handleArrayChange(idx, "features", e.target.value)} className="flex-1 p-3 border border-gray-200 rounded-lg" placeholder="Feature..." />
              <button type="button" onClick={() => removeArrayItem(idx, "features")} className="p-3 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-5 h-5" /></button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem("features")} className="text-sm text-[#D9A63A] font-semibold flex items-center gap-1 mt-2"><Plus className="w-4 h-4"/> Add Feature</button>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-2">Features (Arabic)</label>
          {formData.featuresAr.map((feature: string, idx: number) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input value={feature} onChange={(e) => handleArrayChange(idx, "featuresAr", e.target.value)} className="flex-1 p-3 border border-gray-200 rounded-lg text-right" placeholder="ميزة..." />
              <button type="button" onClick={() => removeArrayItem(idx, "featuresAr")} className="p-3 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-5 h-5" /></button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem("featuresAr")} className="text-sm text-[#D9A63A] font-semibold flex items-center gap-1 mt-2"><Plus className="w-4 h-4"/> Add Feature (Arabic)</button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-2">Image URLs</label>
          {formData.images.map((img: string, idx: number) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input value={img} onChange={(e) => handleArrayChange(idx, "images", e.target.value)} className="flex-1 p-3 border border-gray-200 rounded-lg" placeholder="/fleet/image.webp" />
              <button type="button" onClick={() => removeArrayItem(idx, "images")} className="p-3 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-5 h-5" /></button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem("images")} className="text-sm text-[#D9A63A] font-semibold flex items-center gap-1 mt-2"><Plus className="w-4 h-4"/> Add Image URL</button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="w-5 h-5 accent-[#D9A63A]" />
          <span className="font-medium text-gray-700">Active (Visible)</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="isPopular" checked={formData.isPopular} onChange={handleChange} className="w-5 h-5 accent-[#D9A63A]" />
          <span className="font-medium text-gray-700">Mark as Popular</span>
        </label>
      </div>
    </form>
  );
}
