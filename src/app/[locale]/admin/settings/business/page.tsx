import { auth } from "@/auth";
import { Save, Building2, MapPin, PhoneCall, Mail } from "lucide-react";
import connectToDatabase from "@/lib/db";
import { BusinessSettings } from "@/lib/models/BusinessSettings";

export default async function BusinessSettingsPage({ params: { locale } }: { params: { locale: string } }) {
  const isAr = locale === "ar";
  const session = await auth();

  await connectToDatabase();
  let settings = await BusinessSettings.findOne().lean();

  if (!settings) {
    settings = {
      companyName: "Mehar Transport",
      businessName: "Mehar Transport LLC",
      supportEmail: "support@mehar.sa",
      phoneNumbers: ["+966 50 000 0000"],
      whatsapp: "+966 50 000 0000",
      officeAddress: "Jeddah, Saudi Arabia",
      googleMapsLink: "",
      businessHours: "24/7",
      timeZone: "Asia/Riyadh",
      currency: "SAR",
      language: "en"
    };
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
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#1B1E4F] text-white font-bold rounded-xl text-sm hover:bg-[#2a2f6b] transition-all shadow-lg shadow-[#1B1E4F]/20">
          <Save className="w-4 h-4" />
          {isAr ? "حفظ الإعدادات" : "Save Settings"}
        </button>
      </div>

      <form className="space-y-10 max-w-4xl">
        {/* Company Info */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-5 h-5 text-gray-400" />
            <h3 className="text-lg font-bold text-[#1B1E4F]">{isAr ? "معلومات الشركة" : "Company Information"}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 border border-gray-100 rounded-2xl">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">{isAr ? "اسم الشركة (العلامة التجارية)" : "Brand Name"}</label>
              <input type="text" defaultValue={settings.companyName} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">{isAr ? "الاسم القانوني" : "Legal Business Name"}</label>
              <input type="text" defaultValue={settings.businessName} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">{isAr ? "العملة الافتراضية" : "Default Currency"}</label>
              <select defaultValue={settings.currency} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none bg-white">
                <option value="SAR">SAR (Saudi Riyal)</option>
                <option value="USD">USD (US Dollar)</option>
                <option value="AED">AED (UAE Dirham)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">{isAr ? "ساعات العمل" : "Business Hours"}</label>
              <input type="text" defaultValue={settings.businessHours} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" />
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
              <input type="email" defaultValue={settings.supportEmail} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">{isAr ? "رقم الهاتف" : "Phone Number"}</label>
              <input type="text" defaultValue={settings.phoneNumbers[0]} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-gray-700">{isAr ? "واتساب للأعمال" : "WhatsApp Business"}</label>
              <input type="text" defaultValue={settings.whatsapp} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" />
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
              <textarea rows={3} defaultValue={settings.officeAddress} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none resize-none"></textarea>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">{isAr ? "رابط خرائط جوجل" : "Google Maps Link"}</label>
              <input type="url" defaultValue={settings.googleMapsLink} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" />
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}
