import { Star, Quote } from "lucide-react";

export default function PackageTestimonials({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  const testimonials = [
    {
      name: isAr ? "أحمد المحمد" : "Ahmed Al-Mohammed",
      role: isAr ? "مسافر مع العائلة" : "Family Traveler",
      text: isAr
        ? "باقة العمرة الشاملة كانت ممتازة. السائق كان في انتظارنا في المطار بالرغم من تأخر الرحلة. السيارة كانت نظيفة ومريحة جداً للعائلة."
        : "The Complete Umrah package was excellent. The driver was waiting for us at the airport despite our flight delay. The vehicle was very clean and comfortable for the family.",
      rating: 5,
    },
    {
      name: isAr ? "عمر فاروق" : "Omar Farooq",
      role: isAr ? "زائر" : "Pilgrim",
      text: isAr
        ? "خدمة كبار الشخصيات تفوق التوقعات. اهتمام بأدق التفاصيل من لحظة الوصول وحتى المغادرة. شكراً لفريق العمل."
        : "The VIP service exceeded expectations. Attention to the smallest details from arrival to departure. Thanks to the team.",
      rating: 5,
    }
  ];

  return (
    <section className="py-12 border-t border-gray-100 mt-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-[#D9A63A]/10 flex items-center justify-center text-[#D9A63A]">
          <Star className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#1B1E4F]">
            {isAr ? "آراء العملاء" : "Customer Reviews"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {isAr ? "متوسط التقييم ٤.٩/٥ من عملائنا الكرام" : "Average rating 4.9/5 from our valued customers"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, idx) => (
          <div key={idx} className="bg-[#1B1E4F]/[0.02] rounded-2xl p-6 border border-[#1B1E4F]/5 relative">
            <Quote className="absolute top-6 right-6 rtl:right-auto rtl:left-6 w-8 h-8 text-[#D9A63A]/20" />
            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#D9A63A] text-[#D9A63A]" />
              ))}
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              "{testimonial.text}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-[#1B1E4F] text-sm">{testimonial.name}</h4>
                <p className="text-xs text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
