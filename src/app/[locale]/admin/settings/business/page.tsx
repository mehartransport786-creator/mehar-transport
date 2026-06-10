"use client";

import { useLocale } from "next-intl";
import { useState, useEffect } from "react";
import { Save, Building2, MapPin, PhoneCall, Mail, Loader2, CheckCircle } from "lucide-react";

export default function BusinessSettingsPage() {
  const locale = useLocale();
  const isAr = locale === "ar";

  const [settings, setSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/admin/settings/business");
        const data = await res.json();
        if (data.success) {
          setSettings(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings((prev: any) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSettings((prev: any) => ({ ...prev, phoneNumbers: [value] }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      const res = await fetch("/api/admin/settings/business", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Failed to save settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-[#D9A63A]">
        <Loader2 className="w-10 h-10 animate-spin" />
        <p className="mt-4 text-[#1B1E4F] font-semibold">{isAr ? "جاري تحميل الإعدادات..." : "Loading settings..."}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1B1E4F]">
            {isAr ? "إعدادات النشاط" : "Business Settings"}
          </h2>
          <p className="text-gray-500 mt-1">
            {isAr ? "إدارة معلومات الشركة وطرق التواصل والإعدادات الإقليمية." : "Manage company information, contact details, and regional settings."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg animate-in fade-in slide-in-from-right-4">
              <CheckCircle className="w-4 h-4" />
              {isAr ? "تم الحفظ بنجاح!" : "Saved successfully!"}
            </span>
          )}
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#1B1E4F] text-white font-bold rounded-xl text-sm hover:bg-[#2a2f6b] transition-all shadow-lg shadow-[#1B1E4F]/20 disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isAr ? "حفظ الإعدادات" : "Save Settings"}
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-10 max-w-4xl">
        {/* Company Info */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-5 h-5 text-gray-400" />
            <h3 className="text-lg font-bold text-[#1B1E4F]">{isAr ? "معلومات الشركة" : "Company Information"}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 border border-gray-100 rounded-2xl">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">{isAr ? "اسم الشركة (العلامة التجارية)" : "Brand Name"}</label>
              <input type="text" name="companyName" value={settings?.companyName || ''} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#1B1E4F]/20" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">{isAr ? "الاسم القانوني" : "Legal Business Name"}</label>
              <input type="text" name="businessName" value={settings?.businessName || ''} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#1B1E4F]/20" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">{isAr ? "العملة الافتراضية" : "Default Currency"}</label>
              <select name="currency" value={settings?.currency || 'SAR'} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none bg-white focus:ring-2 focus:ring-[#1B1E4F]/20">
                <option value="SAR">SAR (Saudi Riyal)</option>
                <option value="USD">USD (US Dollar)</option>
                <option value="AED">AED (UAE Dirham)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">{isAr ? "ساعات العمل" : "Business Hours"}</label>
              <input type="text" name="businessHours" value={settings?.businessHours || ''} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#1B1E4F]/20" />
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <PhoneCall className="w-5 h-5 text-gray-400" />
            <h3 className="text-lg font-bold text-[#1B1E4F]">{isAr ? "معلومات التواصل" : "Contact Information"}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 border border-gray-100 rounded-2xl">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">{isAr ? "البريد الإلكتروني للدعم" : "Support Email"}</label>
              <input type="email" name="supportEmail" value={settings?.supportEmail || ''} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#1B1E4F]/20" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">{isAr ? "رقم الهاتف" : "Phone Number"}</label>
              <input type="text" name="phoneNumbers" value={settings?.phoneNumbers?.[0] || ''} onChange={handlePhoneChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#1B1E4F]/20" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-gray-700">{isAr ? "واتساب للأعمال" : "WhatsApp Business"}</label>
              <input type="text" name="whatsapp" value={settings?.whatsapp || ''} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#1B1E4F]/20" />
            </div>
          </div>
        </section>

        {/* Address */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-5 h-5 text-gray-400" />
            <h3 className="text-lg font-bold text-[#1B1E4F]">{isAr ? "الموقع الجغرافي" : "Office Address"}</h3>
          </div>
          <div className="space-y-6 p-6 bg-gray-50 border border-gray-100 rounded-2xl">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">{isAr ? "العنوان" : "Address"}</label>
              <textarea name="officeAddress" rows={3} value={settings?.officeAddress || ''} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none resize-none focus:ring-2 focus:ring-[#1B1E4F]/20"></textarea>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">{isAr ? "رابط خرائط جوجل" : "Google Maps Link"}</label>
              <input type="url" name="googleMapsLink" value={settings?.googleMapsLink || ''} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#1B1E4F]/20" />
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}
