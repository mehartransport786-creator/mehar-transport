import React from 'react';
import { useLocale } from 'next-intl';
import { MapPin, Calendar, Clock, Car, User, Phone, CheckCircle2, ShieldCheck, CreditCard, MessageSquare } from 'lucide-react';
import { BookingState } from '../BookingWorkspace';

interface Props {
  data: BookingState;
}

export default function ReviewBookingStep({ data }: Props) {
  const locale = useLocale();
  const isAr = locale === 'ar';

  const DetailRow = ({ icon: Icon, label, value }: any) => (
    <div className="flex items-start gap-4">
      <div className="mt-0.5 text-secondary">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <p className="text-xs text-gray-400 mb-1 uppercase tracking-widest">{label}</p>
        <p className="text-base font-medium text-white">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-3">
        <h3 className="h3 text-white">
          {isAr ? "مراجعة الحجز" : "Review Booking"}
        </h3>
        <p className="text-gray-400 text-lg font-light">
          {isAr ? "يرجى مراجعة تفاصيل الحجز قبل التأكيد" : "Please review your booking details before confirming"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Trip Details Card */}
        <div className="bg-black/40 border border-white/10 rounded-[2rem] p-8 space-y-8 shadow-luxury">
          <h4 className="text-xl font-bold text-white border-b border-white/10 pb-4">
            {isAr ? "تفاصيل الرحلة" : "Trip Summary"}
          </h4>
          <div className="space-y-6">
            <DetailRow icon={MapPin} label={isAr ? "المسار" : "Route"} value={data.routeName} />
            <DetailRow icon={Calendar} label={isAr ? "التاريخ" : "Date"} value={data.travelDate} />
            <DetailRow icon={Clock} label={isAr ? "الوقت" : "Time"} value={data.travelTime} />
            <DetailRow icon={Car} label={isAr ? "المركبة" : "Vehicle"} value={data.vehicleName} />
          </div>
        </div>

        {/* Passenger Card */}
        <div className="bg-black/40 border border-white/10 rounded-[2rem] p-8 space-y-8 shadow-luxury">
          <h4 className="text-xl font-bold text-white border-b border-white/10 pb-4">
            {isAr ? "بيانات الراكب" : "Passenger Details"}
          </h4>
          <div className="space-y-6">
            <DetailRow icon={User} label={isAr ? "الاسم" : "Name"} value={data.customerName} />
            <DetailRow icon={Phone} label={isAr ? "الهاتف" : "Phone"} value={data.customerPhone} />
            {data.flightNumber && (
              <DetailRow icon={CheckCircle2} label={isAr ? "رقم الرحلة" : "Flight"} value={data.flightNumber} />
            )}
            <DetailRow icon={CheckCircle2} label={isAr ? "عدد الركاب" : "Passengers"} value={`${data.passengers} pax`} />
            {(data as any).specialRequests && (
              <DetailRow icon={MessageSquare} label={isAr ? "طلبات خاصة" : "Special Requests"} value={(data as any).specialRequests} />
            )}
          </div>
        </div>
      </div>

      {/* Invoice Breakdown */}
      <div className="bg-gradient-to-br from-secondary/10 to-transparent border border-secondary/30 rounded-[2rem] p-8 shadow-luxury relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none"></div>

        <h4 className="text-2xl font-bold text-white border-b border-white/10 pb-4 mb-6">
          {isAr ? "تفاصيل الدفع" : "Payment Summary"}
        </h4>
        
        <div className="space-y-4 text-base relative z-10">
          <div className="flex justify-between text-gray-300">
            <span>{isAr ? "السعر الأساسي" : "Base Fare"}</span>
            <span className="font-medium text-white">{data.basePrice} SAR</span>
          </div>
          
          {data.meetAndGreet && (
            <div className="flex justify-between text-gray-300">
               <span>{isAr ? "الاستقبال والترحيب" : "Meet & Greet"}</span>
              <span className="font-medium text-white">100 SAR</span>
            </div>
          )}
          {data.vipService && (
            <div className="flex justify-between text-gray-300">
              <span>{isAr ? "خدمة VIP" : "VIP Service"}</span>
              <span className="font-medium text-white">250 SAR</span>
            </div>
          )}
          {data.childSeat && (
            <div className="flex justify-between text-gray-300">
              <span>{isAr ? "مقعد أطفال" : "Child Seat"}</span>
              <span className="font-medium text-white">50 SAR</span>
            </div>
          )}

          <div className="border-t border-white/10 pt-6 mt-6 flex justify-between items-center">
            <span className="text-xl font-bold text-white">{isAr ? "المبلغ الإجمالي" : "Total Amount"}</span>
            <span className="text-4xl font-bold text-secondary">{data.totalPrice} <span className="text-xl text-secondary/80">SAR</span></span>
          </div>
          
          <div className="pt-6 mt-6 flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-400 border-t border-white/5 justify-between">
            <p className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-secondary" />
              {isAr 
                ? "الدفع يتم لاحقاً بعد تأكيد الحجز. لا يطلب الدفع عبر الموقع." 
                : "Payment is collected after confirmation. No upfront payment."}
            </p>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Secure</span>
              <CreditCard className="w-5 h-5 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
