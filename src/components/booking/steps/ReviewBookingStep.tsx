import React from 'react';
import { useLocale } from 'next-intl';
import { MapPin, Calendar, Clock, Car, User, Phone, CheckCircle2 } from 'lucide-react';
import { BookingState } from '../PremiumBookingWizard';

interface Props {
  data: BookingState;
}

export default function ReviewBookingStep({ data }: Props) {
  const locale = useLocale();
  const isAr = locale === 'ar';

  const DetailRow = ({ icon: Icon, label, value }: any) => (
    <div className="flex items-start gap-4">
      <div className="mt-0.5 text-[#D9A63A]">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs text-gray-400 mb-0.5">{label}</p>
        <p className="text-sm font-medium text-white">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-white">
          {isAr ? "مراجعة الحجز" : "Review Booking"}
        </h3>
        <p className="text-gray-400">
          {isAr ? "يرجى مراجعة تفاصيل الحجز قبل التأكيد" : "Please review your booking details before confirming"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Trip Details Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
          <h4 className="text-lg font-bold text-white border-b border-white/10 pb-4">
            {isAr ? "تفاصيل الرحلة" : "Trip Summary"}
          </h4>
          <div className="space-y-4">
            <DetailRow icon={MapPin} label={isAr ? "المسار" : "Route"} value={data.routeName} />
            <DetailRow icon={Calendar} label={isAr ? "التاريخ" : "Date"} value={data.travelDate} />
            <DetailRow icon={Clock} label={isAr ? "الوقت" : "Time"} value={data.travelTime} />
            <DetailRow icon={Car} label={isAr ? "المركبة" : "Vehicle"} value={data.vehicleName} />
          </div>
        </div>

        {/* Passenger Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
          <h4 className="text-lg font-bold text-white border-b border-white/10 pb-4">
            {isAr ? "بيانات الراكب" : "Passenger Details"}
          </h4>
          <div className="space-y-4">
            <DetailRow icon={User} label={isAr ? "الاسم" : "Name"} value={data.customerName} />
            <DetailRow icon={Phone} label={isAr ? "الهاتف" : "Phone"} value={data.customerPhone} />
            {data.flightNumber && (
              <DetailRow icon={CheckCircle2} label={isAr ? "رقم الرحلة" : "Flight"} value={data.flightNumber} />
            )}
            <DetailRow icon={CheckCircle2} label={isAr ? "عدد الركاب" : "Passengers"} value={`${data.passengers} pax`} />
          </div>
        </div>
      </div>

      {/* Invoice Breakdown */}
      <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6">
        <h4 className="text-lg font-bold text-white border-b border-white/10 pb-4 mb-4">
          {isAr ? "تفاصيل الدفع" : "Payment Summary"}
        </h4>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-gray-300">
            <span>{isAr ? "السعر الأساسي" : "Base Fare"}</span>
            <span>{data.basePrice} SAR</span>
          </div>
          
          {data.meetAndGreet && (
            <div className="flex justify-between text-gray-300">
              <span>{isAr ? "الاستقبال والترحيب" : "Meet & Greet"}</span>
              <span>100 SAR</span>
            </div>
          )}
          {data.vipService && (
            <div className="flex justify-between text-gray-300">
              <span>{isAr ? "خدمة VIP" : "VIP Service"}</span>
              <span>250 SAR</span>
            </div>
          )}
          {data.childSeat && (
            <div className="flex justify-between text-gray-300">
              <span>{isAr ? "مقعد أطفال" : "Child Seat"}</span>
              <span>50 SAR</span>
            </div>
          )}

          <div className="border-t border-white/10 pt-4 mt-4 flex justify-between items-center">
            <span className="font-bold text-white">{isAr ? "المبلغ الإجمالي" : "Total Amount"}</span>
            <span className="text-2xl font-bold text-[#D9A63A]">{data.totalPrice} SAR</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {isAr 
              ? "* الدفع يتم لاحقاً بعد تأكيد الحجز من قبل الإدارة. لا يطلب الدفع عبر الموقع حالياً." 
              : "* Payment is collected later upon admin confirmation. No payment required right now."}
          </p>
        </div>
      </div>

    </div>
  );
}
