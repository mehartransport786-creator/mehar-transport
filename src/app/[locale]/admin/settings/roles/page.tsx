import { auth } from "@/auth";
import { Plus, Settings, ShieldCheck, Check } from "lucide-react";
import connectToDatabase from "@/lib/db";
import { Role } from "@/lib/models/Role";

export default async function RolesPermissionsPage({ params: { locale } }: { params: { locale: string } }) {
  const isAr = locale === "ar";
  const session = await auth();

  await connectToDatabase();
  const roles = await Role.find().sort({ createdAt: 1 }).lean();

  const modules = [
    { key: "bookings", label: "Bookings", labelAr: "الحجوزات" },
    { key: "customers", label: "Customers", labelAr: "العملاء" },
    { key: "fleet", label: "Fleet & Vehicles", labelAr: "الأسطول والمركبات" },
    { key: "drivers", label: "Drivers", labelAr: "السائقين" },
    { key: "routes", label: "Routes & Pricing", labelAr: "المسارات والأسعار" },
    { key: "analytics", label: "Analytics & Reports", labelAr: "التحليلات والتقارير" },
    { key: "users", label: "User Management", labelAr: "إدارة المستخدمين" },
    { key: "settings", label: "System Settings", labelAr: "إعدادات النظام" },
    { key: "seo", label: "SEO & Content", labelAr: "تحسين محركات البحث والمحتوى" },
  ];

  const actions = ["view", "create", "edit", "delete", "export"];

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-primary">
            {isAr ? "الأدوار والصلاحيات (RBAC)" : "Roles & Permissions (RBAC)"}
          </h2>
          <p className="text-gray-500 mt-1">
            {isAr ? "إدارة الأدوار وصلاحيات الوصول لكل قسم في النظام." : "Manage roles and access permissions for each module in the system."}
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl text-sm hover:bg-primary/80 transition-all shadow-lg shadow-primary/20">
          <Plus className="w-4 h-4" />
          {isAr ? "دور جديد" : "New Role"}
        </button>
      </div>

      {/* Roles List */}
      <div className="flex flex-wrap gap-3 mb-8">
        {roles.map((role) => (
          <button 
            key={role._id.toString()}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${
              role.name === "Super Admin" 
                ? "bg-purple-50 border-purple-200 text-purple-700"
                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            {role.name}
          </button>
        ))}
      </div>

      {/* Permissions Matrix Example (Using first role or generic) */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm mb-6">
        <div className="bg-gray-50 p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-primary">{isAr ? "مصفوفة الصلاحيات: مدير العمليات" : "Permissions Matrix: Operations Manager"}</h3>
            <p className="text-sm text-gray-500 mt-1">{isAr ? "يتم تطبيق هذه الصلاحيات على جميع المستخدمين المعينين لهذا الدور." : "These permissions apply to all users assigned this role."}</p>
          </div>
          <button className="px-4 py-2 bg-white border border-gray-200 text-primary text-sm font-bold rounded-xl hover:bg-gray-50 transition-colors">
            {isAr ? "حفظ التغييرات" : "Save Changes"}
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left rtl:text-right px-6 py-4 font-bold text-gray-500">{isAr ? "الوحدة / القسم" : "Module"}</th>
                {actions.map(action => (
                  <th key={action} className="text-center px-4 py-4 font-bold text-gray-500 capitalize">{action}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {modules.map((module) => (
                <tr key={module.key} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    {isAr ? module.labelAr : module.label}
                  </td>
                  {actions.map(action => {
                    // Mocking checked state for demonstration (Operations manager usually has view/create/edit for core modules, but not delete/export)
                    const isChecked = ["bookings", "customers", "drivers", "fleet"].includes(module.key) && ["view", "create", "edit"].includes(action);
                    
                    return (
                      <td key={action} className="px-4 py-4 text-center">
                        <label className="inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="w-5 h-5 rounded border-gray-300 text-secondary focus:ring-secondary bg-gray-50 cursor-pointer" 
                            defaultChecked={isChecked}
                          />
                        </label>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
