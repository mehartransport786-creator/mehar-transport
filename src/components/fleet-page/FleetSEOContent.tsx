"use client";

import { useLocale } from "next-intl";

export function FleetSEOContent() {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section className="py-24 bg-muted border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1000px]">
        
        <div className="prose prose-lg md:prose-xl mx-auto prose-headings:text-primary prose-a:text-secondary prose-p:text-muted-foreground prose-p:leading-relaxed">
          {isAr ? (
            <>
              <h2>خدمات النقل الفاخر في المملكة العربية السعودية</h2>
              <p>
                تعتبر ميهار للنقل الفاخر الوجهة الأولى للمسافرين الباحثين عن التميز والرفاهية في التنقل داخل المملكة العربية السعودية. 
                نحن نقدم أكثر من مجرد خدمة توصيل؛ نحن نقدم تجربة متكاملة مصممة خصيصاً لتلبية أعلى التوقعات. سواء كنت تبحث عن تنقلات 
                المطار في جدة والرياض، أو خدمة السيارات بسائق خاص لحضور اجتماعات عمل، فإن أسطولنا يضمن لك وصولاً آمناً وأنيقاً.
              </p>
              
              <h3>خدمات نقل العمرة الفاخرة</h3>
              <p>
                تمثل رحلة العمرة لحظة روحانية عظيمة، ولهذا حرصنا في ميهار على توفير أسطول متخصص من سيارات جي إم سي يوكن، 
                وهيونداي ستاريا، وحافلات النقل الجماعي الفاخرة لتأمين تنقلات سلسة بين مطار الملك عبد العزيز بجدة، ومكة المكرمة، 
                والمدينة المنورة. سائقونا مدربون تدريباً عالياً للتعامل مع ضيوف الرحمن بمهنية واحترام يتماشى مع جلال هذه الرحلة.
              </p>

              <h3>خدمات السائق الخاص لكبار الشخصيات (VIP)</h3>
              <p>
                للشخصيات البارزة، والدبلوماسيين، وكبار المسؤولين التنفيذيين، تقدم ميهار خدمة النقل من الدرجة الأولى باستخدام سيارات 
                السيارات الفاخرة المخصصة للنخبة. نضمن لك الخصوصية المطلقة، مع نوافذ مظللة بالكامل، ووسائل راحة داخلية حصرية تشمل 
                شبكة إنترنت لاسلكية، وتكييف هواء بتحكم مستقل لكل راكب.
              </p>

              <h3>اختيار المركبة المناسبة لرحلتك</h3>
              <p>
                يعتمد اختيار المركبة المثالية على حجم مجموعتك وطبيعة رحلتك. للعائلات المكونة من 5 إلى 7 أشخاص، نوصي بسيارات ميتسوبيشي 
                إكسباندر أو هيونداي ستاريا التي توفر مساحة رحبة للأمتعة وعربات الأطفال. أما المجموعات التي تتجاوز 10 أشخاص، فإن حافلات 
                تويوتا هايس وهيونداي ستاريكس تعتبر الخيار الاقتصادي الفاخر لضمان بقاء المجموعة معاً طوال الرحلة.
              </p>
              
              <p className="text-sm text-muted-foreground/70 mt-8">
                * محتوى تحسين محركات البحث (SEO) الكامل (1500+ كلمة) متاح عبر نظام إدارة المحتوى (CMS).
              </p>
            </>
          ) : (
            <>
              <h2>Luxury Transportation Services in Saudi Arabia</h2>
              <p>
                Mehar Premium Transport is the premier choice for discerning travelers seeking unparalleled luxury and reliability 
                across the Kingdom of Saudi Arabia. We provide more than just a ride; we deliver a meticulously curated experience 
                designed to exceed the highest expectations. Whether you require executive airport transfers in Jeddah and Riyadh, 
                or a dedicated chauffeur service for business engagements, our world-class fleet ensures you arrive safely and in style.
              </p>

              <h3>Premium Umrah Transportation Services</h3>
              <p>
                The Umrah journey is a profound spiritual undertaking. Recognizing this, Mehar offers a specialized fleet including 
                the GMC Yukon, Hyundai Staria and other vehicles to provide seamless transfers between King Abdulaziz 
                International Airport (Jeddah), Makkah, and Madinah. Our chauffeurs are rigorously trained to serve the guests of 
                Allah with the utmost professionalism and respect, perfectly matching the sanctity of this journey.
              </p>

              <h3>VIP Chauffeur Services for Executives</h3>
              <p>
                For dignitaries, diplomats, and senior executives, Mehar delivers first-class transportation using our Elite category vehicles. We guarantee absolute privacy with fully tinted windows and exclusive interior amenities, 
                including high-speed Wi-Fi, premium bottled water, and independent climate control for every passenger.
              </p>

              <h3>Choosing the Perfect Vehicle for Your Journey</h3>
              <p>
                Selecting the ideal vehicle depends entirely on your group size and the nature of your trip. For families of 5 to 7 
                individuals, we highly recommend the Hyundai Staria or Hyundai H1, which offer generous space for luggage and 
                strollers. For larger groups exceeding 10 passengers, the Toyota Hiace and Coaster Bus represent the perfect blend 
                of luxury and practicality, ensuring your entire party travels together comfortably.
              </p>

              <p className="text-sm text-muted-foreground/70 mt-8 italic">
                * Full 1500+ word long-form SEO content is managed via CMS.
              </p>
            </>
          )}
        </div>

      </div>
    </section>
  );
}
