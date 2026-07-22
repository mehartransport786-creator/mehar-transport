import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { Camera, Save, User } from "lucide-react";
import connectToDatabase from "@/lib/db";
import { Admin } from "@/lib/models/Admin";

export default async function ProfileSettingsPage({ params: { locale } }: { params: { locale: string } }) {
  const isAr = locale === "ar";
  const session = await auth();

  await connectToDatabase();
  const admin = await Admin.findById(session?.user?.id).lean();

  return (
    <div className="p-4 md:p-8 flex-1 flex flex-col h-full">
      <div className="mb-8 border-b border-gray-100 pb-6">
        <h2 className="text-2xl font-bold text-primary">
          {isAr ? "الملف الشخصي" : "Profile Settings"}
        </h2>
        <p className="text-gray-500 mt-1">
          {isAr ? "قم بتحديث معلوماتك الشخصية وطريقة ظهورك في النظام." : "Update your personal information and how you appear in the system."}
        </p>
      </div>

      <form className="max-w-3xl space-y-8">
        {/* Avatar Upload */}
        <div className="flex items-center gap-6">
          <div className="relative group cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
              {admin?.avatar ? (
                <img src={admin.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                admin?.name?.charAt(0).toUpperCase() || <User className="w-10 h-10" />
              )}
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-800">{isAr ? "صورة الملف الشخصي" : "Profile Photo"}</h3>
            <p className="text-sm text-gray-500 mt-1 mb-3">{isAr ? "يُنصح بصورة مربعة بحجم 256x256 بكسل." : "Recommended size: 256x256px square image."}</p>
            <div className="flex gap-3">
              <button type="button" className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                {isAr ? "تغيير الصورة" : "Change Photo"}
              </button>
              <button type="button" className="px-4 py-2 bg-white border border-red-200 text-red-600 text-sm font-semibold rounded-lg hover:bg-red-50 transition-colors">
                {isAr ? "إزالة" : "Remove"}
              </button>
            </div>
          </div>
        </div>

        {/* Personal Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">{isAr ? "الاسم الكامل" : "Full Name"}</label>
            <input 
              type="text" 
              defaultValue={admin?.name}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">{isAr ? "البريد الإلكتروني (للعرض فقط)" : "Email Address (Display)"}</label>
            <input 
              type="email" 
              defaultValue={admin?.email}
              disabled
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 outline-none"
            />
            <p className="text-xs text-gray-400 mt-1">
              {isAr ? "لتغيير بريدك الإلكتروني، اذهب إلى إعدادات الأمان." : "To change your login email, go to Security settings."}
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">{isAr ? "رقم الهاتف" : "Phone Number"}</label>
            <input 
              type="tel" 
              defaultValue={admin?.phone}
              placeholder="+966 56 563 8120"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">{isAr ? "القسم" : "Department"}</label>
            <input 
              type="text" 
              defaultValue={admin?.department}
              placeholder="e.g. Operations, Customer Support"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
            />
          </div>
        </div>

        {/* Preferences */}
        <div className="border-t border-gray-100 pt-8 mt-8">
          <h3 className="text-lg font-bold text-primary mb-6">{isAr ? "التفضيلات" : "Preferences"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">{isAr ? "اللغة المفضلة" : "Preferred Language"}</label>
              <select 
                defaultValue={admin?.language || "en"}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary outline-none bg-white"
              >
                <option value="en">English (US)</option>
                <option value="ar">العربية (Arabic)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">{isAr ? "المنطقة الزمنية" : "Time Zone"}</label>
              <select 
                defaultValue={admin?.timeZone || "Asia/Riyadh"}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary outline-none bg-white"
              >
                <option value="Asia/Riyadh">(UTC+03:00) Riyadh</option>
                <option value="Asia/Dubai">(UTC+04:00) Dubai</option>
                <option value="Europe/London">(UTC+00:00) London</option>
                <option value="America/New_York">(UTC-05:00) New York</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
          <button type="button" className="px-6 py-3 rounded-xl font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors">
            {isAr ? "إلغاء" : "Cancel"}
          </button>
          <button type="button" className="px-6 py-3 flex items-center gap-2 rounded-xl font-bold text-white bg-primary hover:bg-primary/80 transition-all shadow-lg shadow-primary/20">
            <Save className="w-4 h-4" />
            {isAr ? "حفظ التغييرات" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
