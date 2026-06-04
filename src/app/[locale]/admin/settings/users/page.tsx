import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { Plus, Search, Filter, MoreVertical, ShieldCheck, Mail, Edit3, Trash2, KeyRound } from "lucide-react";
import connectToDatabase from "@/lib/db";
import { Admin } from "@/lib/models/Admin";

export default async function UserManagementPage({ params: { locale } }: { params: { locale: string } }) {
  const isAr = locale === "ar";
  const session = await auth();

  await connectToDatabase();
  const admins = await Admin.find().populate("role").sort({ createdAt: -1 }).lean();

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1B1E4F]">
            {isAr ? "إدارة المستخدمين" : "User Management"}
          </h2>
          <p className="text-gray-500 mt-1">
            {isAr ? "إضافة وتعديل وحذف مديري النظام وموظفي الشركة." : "Add, edit, and remove system administrators and company staff."}
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#1B1E4F] text-white font-bold rounded-xl text-sm hover:bg-[#2a2f6b] transition-all shadow-lg shadow-[#1B1E4F]/20">
          <Plus className="w-4 h-4" />
          {isAr ? "مستخدم جديد" : "New User"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-6">
        <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 focus-within:border-[#D9A63A] focus-within:bg-white transition-all">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={isAr ? "البحث بالاسم أو البريد..." : "Search by name or email..."}
            className="bg-transparent border-none outline-none text-sm flex-1"
          />
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 hover:border-gray-300 px-4 py-3 rounded-xl text-sm font-medium transition-all">
          <Filter className="w-4 h-4" />
          {isAr ? "تصفية" : "Filter"}
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80">
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "المستخدم" : "User"}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "الدور" : "Role"}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "الحالة" : "Status"}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "تاريخ الإضافة" : "Added Date"}</th>
                <th className="text-left rtl:text-right px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">{isAr ? "آخر ظهور" : "Last Login"}</th>
                <th className="text-center px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {admins.map((user) => (
                <tr key={user._id.toString()} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#1B1E4F] flex items-center justify-center text-white font-bold shrink-0">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          user.name.charAt(0).toUpperCase()
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-gray-800">{user.name}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                          <Mail className="w-3 h-3" /> {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {user.role?.name === "Super Admin" ? (
                        <ShieldCheck className="w-4 h-4 text-purple-600" />
                      ) : (
                        <ShieldCheck className="w-4 h-4 text-blue-500" />
                      )}
                      <span className="font-semibold text-gray-700">{user.role?.name || "Unknown Role"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full ${
                      user.status === "active" ? "bg-emerald-100 text-emerald-700" :
                      user.status === "locked" ? "bg-red-100 text-red-700" :
                      "bg-gray-100 text-gray-600"
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 font-medium">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-gray-500 font-medium">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "-"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title={isAr ? "تعديل" : "Edit"}>
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title={isAr ? "إعادة تعيين كلمة المرور" : "Reset Password"}>
                        <KeyRound className="w-4 h-4" />
                      </button>
                      {user.role?.name !== "Super Admin" && (
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title={isAr ? "حذف" : "Delete"}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
