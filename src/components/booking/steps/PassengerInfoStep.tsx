import React from 'react';
import { useLocale } from 'next-intl';
import { User, Phone, Mail, Plane, Users, Star, Baby } from 'lucide-react';
import { BookingState } from '../BookingWorkspace';

interface Props {
  data: BookingState;
  updateData: (data: Partial<BookingState>) => void;
}

const InputField = ({ 
  icon: Icon, 
  label, 
  value, 
  onChange, 
  type = 'text',
  placeholder = '',
  isAr
}: any) => (
  <div className="space-y-3">
    <label className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">{label}</label>
    <div className="relative">
      <div className={`absolute ${isAr ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-[#D9A63A]`}>
        <Icon className="w-5 h-5" />
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-white appearance-none focus:outline-none focus:ring-1 focus:ring-[#D9A63A]/50 focus:border-[#D9A63A]/50 transition-all hover:bg-white/10 ${isAr ? 'pr-12' : 'pl-12'}`}
      />
    </div>
  </div>
);

const ToggleService = ({ 
  icon: Icon, 
  title, 
  description, 
  price, 
  checked, 
  onChange 
}: any) => (
  <label className={`flex items-start gap-4 p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
    checked ? 'bg-gradient-to-br from-[#D9A63A]/10 to-[#D9A63A]/5 border-[#D9A63A]/50 shadow-[0_0_20px_rgba(217,166,58,0.15)]' : 'bg-white/5 backdrop-blur-sm border-white/5 hover:border-white/10 hover:bg-white/10'
  }`}>
    <div className="pt-1">
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 h-5 accent-[#D9A63A] bg-transparent border-white/20 rounded cursor-pointer" 
      />
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2 text-white font-bold">
          <Icon className="w-4 h-4 text-[#D9A63A]" />
          {title}
        </div>
        <div className="text-[#D9A63A] text-sm font-bold">+{price} SAR</div>
      </div>
      <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
    </div>
  </label>
);

export default function PassengerInfoStep({ data, updateData }: Props) {
  const locale = useLocale();
  const isAr = locale === 'ar';

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Passenger Details */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white">
            {isAr ? "معلومات الراكب" : "Passenger Information"}
          </h3>
          <p className="text-gray-400">
            {isAr ? "يرجى إدخال تفاصيل التواصل الخاصة بك" : "Please enter your contact details"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField 
            icon={User} 
            label={isAr ? "الاسم الكامل" : "Full Name"} 
            value={data.customerName}
            onChange={(val: string) => updateData({ customerName: val })}
            placeholder={isAr ? "محمد عبدالله" : "John Doe"}
            isAr={isAr}
          />
          <InputField 
            icon={Phone} 
            label={isAr ? "رقم الهاتف / الواتساب" : "Phone / WhatsApp"} 
            type="tel"
            value={data.customerPhone}
            onChange={(val: string) => updateData({ customerPhone: val })}
            placeholder="+966 5X XXX XXXX"
            isAr={isAr}
          />
          <InputField 
            icon={Mail} 
            label={isAr ? "البريد الإلكتروني (اختياري)" : "Email (Optional)"} 
            type="email"
            value={data.customerEmail}
            onChange={(val: string) => updateData({ customerEmail: val })}
            placeholder="john@example.com"
            isAr={isAr}
          />
          <InputField 
            icon={Plane} 
            label={isAr ? "رقم الرحلة الجوية (اختياري)" : "Flight Number (Optional)"} 
            value={data.flightNumber}
            onChange={(val: string) => updateData({ flightNumber: val })}
            placeholder="SV 123"
            isAr={isAr}
          />
        </div>

        <div className="max-w-md">
          <InputField 
            icon={Users} 
            label={isAr ? "عدد الركاب الفعلي" : "Number of Passengers"} 
            type="number"
            value={data.passengers}
            onChange={(val: string) => updateData({ passengers: parseInt(val) || 1 })}
            isAr={isAr}
          />
        </div>
      </section>

      {/* Premium Extras */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white">
            {isAr ? "خدمات إضافية (اختياري)" : "Premium Extras (Optional)"}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ToggleService 
            icon={User}
            title={isAr ? "خدمة الاستقبال والترحيب" : "Meet & Greet"}
            description={isAr ? "استقبال بلوحة اسم داخل صالة المطار للمساعدة في الأمتعة." : "Personalized sign-board pickup inside the terminal with luggage assistance."}
            price={100}
            checked={data.meetAndGreet}
            onChange={(val: boolean) => updateData({ meetAndGreet: val })}
          />
          <ToggleService 
            icon={Star}
            title={isAr ? "خدمة VIP" : "VIP Service"}
            description={isAr ? "مشروبات فاخرة، واي فاي مجاني، ومعطر سيارة فاخر." : "Premium refreshments, free Wi-Fi, and luxury ambient car fragrance."}
            price={250}
            checked={data.vipService}
            onChange={(val: boolean) => updateData({ vipService: val })}
          />
          <ToggleService 
            icon={Baby}
            title={isAr ? "مقعد أطفال" : "Child Seat"}
            description={isAr ? "مقعد أطفال آمن ومعقم لتوفير أقصى درجات الراحة." : "Safe, sanitized child seat for maximum comfort and safety."}
            price={50}
            checked={data.childSeat}
            onChange={(val: boolean) => updateData({ childSeat: val })}
          />
        </div>
      </section>

    </div>
  );
}
