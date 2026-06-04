import { auth } from "@/auth";
import { BellRing, Save, Mail, MessageSquare, Smartphone } from "lucide-react";

export default async function NotificationSettingsPage({ params: { locale } }: { params: { locale: string } }) {
  const isAr = locale === "ar";

  const notifCategories = [
    {
      title: isAr ? "إشعارات الحجوزات" : "Booking Notifications",
      description: isAr ? "تنبيهات عند إنشاء حجز جديد أو تعديله أو إلغائه." : "Alerts when a booking is created, modified, or cancelled.",
      events: [
        { key: "new_booking", label: isAr ? "حجز جديد" : "New Booking", email: true, push: true, sms: false },
        { key: "booking_cancelled", label: isAr ? "إلغاء الحجز" : "Booking Cancelled", email: true, push: true, sms: true },
        { key: "driver_assigned", label: isAr ? "تعيين سائق" : "Driver Assigned", email: false, push: true, sms: false },
      ]
    },
    {
      title: isAr ? "المدفوعات والمحاسبة" : "Payments & Billing",
      description: isAr ? "إشعارات حول عمليات الدفع والمبالغ المستردة." : "Alerts about successful payments and refunds.",
      events: [
        { key: "payment_success", label: isAr ? "دفعة ناجحة" : "Payment Successful", email: true, push: true, sms: false },
        { key: "refund_issued", label: isAr ? "إصدار استرداد" : "Refund Issued", email: true, push: true, sms: false },
      ]
    },
    {
      title: isAr ? "أمان النظام" : "System & Security",
      description: isAr ? "تنبيهات حرجة حول أمان الحساب والنظام." : "Critical alerts about account and system security.",
      events: [
        { key: "new_login", label: isAr ? "تسجيل دخول من جهاز جديد" : "New Device Login", email: true, push: true, sms: false },
        { key: "password_changed", label: isAr ? "تغيير كلمة المرور" : "Password Changed", email: true, push: true, sms: true },
      ]
    }
  ];

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1B1E4F]">
            {isAr ? "إعدادات الإشعارات" : "Notification Settings"}
          </h2>
          <p className="text-gray-500 mt-1">
            {isAr ? "تحكم في متى وكيف تتلقى تنبيهات النظام." : "Control when and how you receive system alerts."}
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#1B1E4F] text-white font-bold rounded-xl text-sm hover:bg-[#2a2f6b] transition-all shadow-lg shadow-[#1B1E4F]/20">
          <Save className="w-4 h-4" />
          {isAr ? "حفظ التفضيلات" : "Save Preferences"}
        </button>
      </div>

      <div className="max-w-4xl space-y-8">
        {notifCategories.map((category, idx) => (
          <section key={idx} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-gray-50 p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-[#1B1E4F]">{category.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{category.description}</p>
            </div>
            
            <div className="divide-y divide-gray-100">
              <div className="flex items-center justify-end gap-6 px-6 py-3 bg-gray-50/50 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <div className="w-16 text-center">{isAr ? "البريد" : "Email"}</div>
                <div className="w-16 text-center">{isAr ? "التطبيق" : "Push"}</div>
                <div className="w-16 text-center">{isAr ? "رسالة" : "SMS"}</div>
              </div>
              
              {category.events.map((event) => (
                <div key={event.key} className="flex items-center justify-between p-6 hover:bg-gray-50/50 transition-colors">
                  <span className="font-semibold text-gray-700">{event.label}</span>
                  <div className="flex items-center gap-6">
                    <label className="w-16 flex justify-center cursor-pointer">
                      <input type="checkbox" defaultChecked={event.email} className="w-5 h-5 rounded border-gray-300 text-[#D9A63A] focus:ring-[#D9A63A] cursor-pointer" />
                    </label>
                    <label className="w-16 flex justify-center cursor-pointer">
                      <input type="checkbox" defaultChecked={event.push} className="w-5 h-5 rounded border-gray-300 text-[#D9A63A] focus:ring-[#D9A63A] cursor-pointer" />
                    </label>
                    <label className="w-16 flex justify-center cursor-pointer">
                      <input type="checkbox" defaultChecked={event.sms} className="w-5 h-5 rounded border-gray-300 text-[#D9A63A] focus:ring-[#D9A63A] cursor-pointer" />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
