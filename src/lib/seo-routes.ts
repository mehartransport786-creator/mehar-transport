export const seoRoutesData: Record<string, {
  slug: string;
  name: string; nameAr: string;
  origin: string; originAr: string;
  destination: string; destinationAr: string;
  distance: string; distanceAr: string;
  duration: string; durationAr: string;
  startingPrice: string;
  description: string; descriptionAr: string;
  longDescription: string; longDescriptionAr: string;
  image: string;
  highlights: { en: string; ar: string }[];
  faqs: { question: { en: string; ar: string }; answer: { en: string; ar: string } }[];
}> = {
  'jeddah-to-makkah': {
    slug: 'jeddah-to-makkah',
    name: 'Jeddah to Makkah Transfer', nameAr: 'نقل من جدة إلى مكة',
    origin: 'Jeddah', originAr: 'جدة',
    destination: 'Makkah', destinationAr: 'مكة المكرمة',
    distance: '85 km', distanceAr: '85 كم',
    duration: '1h 15m', durationAr: 'ساعة و 15 دقيقة',
    startingPrice: '200',
    description: 'Premium luxury transport from Jeddah Airport to Makkah hotels. 24/7 availability with Meet & Greet service.',
    descriptionAr: 'نقل فاخر من مطار جدة إلى فنادق مكة. متوفر على مدار الساعة مع خدمة الاستقبال والترحيب.',
    longDescription: 'Start your spiritual journey with peace of mind. Our premium transfer service from King Abdulaziz International Airport (Jeddah) to Makkah provides ultimate comfort for pilgrims and travelers. Whether you choose our economy sedans or VIP luxury SUVs, our professional drivers ensure a safe and smooth 85km journey directly to your hotel in the holy city.',
    longDescriptionAr: 'ابدأ رحلتك الروحانية براحة بال. توفر خدمة النقل الفاخرة لدينا من مطار الملك عبد العزيز الدولي (جدة) إلى مكة المكرمة أقصى درجات الراحة للحجاج والمسافرين. يضمن سائقونا المحترفون رحلة آمنة وسلسة مباشرة إلى فندقك.',
    image: '/images/hero/vip-fleet.jpg',
    highlights: [
      { en: 'Free airport Meet & Greet service', ar: 'خدمة استقبال مجانية في المطار' },
      { en: 'Flight tracking for delayed arrivals', ar: 'تتبع الرحلات للتأخير' },
      { en: 'Direct drop-off at Makkah hotels', ar: 'توصيل مباشر لفنادق مكة' },
      { en: 'Spacious trunks for large luggage', ar: 'مساحة واسعة للأمتعة الكبيرة' }
    ],
    faqs: [
      {
        question: { en: 'Will the driver wait if my flight is delayed?', ar: 'هل سينتظر السائق إذا تأخرت رحلتي؟' },
        answer: { en: 'Yes, we track all flights and provide free waiting time to accommodate delays.', ar: 'نعم، نحن نتتبع جميع الرحلات ونوفر وقت انتظار مجاني.' }
      },
      {
        question: { en: 'Can I book a return trip from Makkah to Jeddah?', ar: 'هل يمكنني حجز رحلة عودة من مكة إلى جدة؟' },
        answer: { en: 'Absolutely. You can book a two-way journey at checkout or book the Makkah to Jeddah route separately.', ar: 'بالتأكيد. يمكنك حجز رحلة ذهاب وعودة أو حجز مسار العودة بشكل منفصل.' }
      }
    ]
  },
  'makkah-to-madinah': {
    slug: 'makkah-to-madinah',
    name: 'Makkah to Madinah Transfer', nameAr: 'نقل من مكة إلى المدينة',
    origin: 'Makkah', originAr: 'مكة المكرمة',
    destination: 'Madinah', destinationAr: 'المدينة المنورة',
    distance: '450 km', distanceAr: '450 كم',
    duration: '4h 30m', durationAr: '4 ساعات و 30 دقيقة',
    startingPrice: '900',
    description: 'Comfortable and safe intercity transfer between the two Holy Cities. Enjoy a relaxing journey with professional drivers.',
    descriptionAr: 'نقل مريح وآمن بين المدينتين المقدستين. استمتع برحلة مريحة مع سائقين محترفين.',
    longDescription: 'Travel between the two holiest cities in Islam with unparalleled comfort. The 450km journey from Makkah to Madinah requires reliable vehicles and experienced drivers. Our modern fleet is equipped with climate control, comfortable seating, and ample luggage space to make the 4.5-hour drive relaxing and serene.',
    longDescriptionAr: 'سافر بين أقدس مدينتين في الإسلام براحة لا مثيل لها. تتطلب الرحلة من مكة إلى المدينة مركبات موثوقة وسائقين ذوي خبرة. أسطولنا الحديث مجهز بوسائل الراحة لتجعل الرحلة الطويلة مريحة وهادئة.',
    image: '/images/hero/economy-fleet.jpg',
    highlights: [
      { en: 'Comfortable seating for long trips', ar: 'مقاعد مريحة للرحلات الطويلة' },
      { en: 'Rest stops available upon request', ar: 'توقف للاستراحة عند الطلب' },
      { en: 'Experienced intercity drivers', ar: 'سائقون ذوو خبرة في المسارات الطويلة' },
      { en: 'Group transport vans available', ar: 'مركبات نقل جماعي متاحة' }
    ],
    faqs: [
      {
        question: { en: 'Can we stop for breaks during the journey?', ar: 'هل يمكننا التوقف للاستراحة أثناء الرحلة؟' },
        answer: { en: 'Yes, our drivers can stop at designated rest areas and mosques along the Haramain highway upon your request.', ar: 'نعم، يمكن للسائق التوقف في استراحات ومساجد محددة على طريق الحرمين.' }
      },
      {
        question: { en: 'What type of vehicles do you recommend for this route?', ar: 'ما نوع المركبات التي توصون بها لهذا المسار؟' },
        answer: { en: 'For optimal comfort on this 4+ hour journey, we highly recommend our SUVs (GMC/Chevy) or Luxury Vans like the Hyundai Staria for families.', ar: 'لأقصى درجات الراحة، نوصي بسيارات الـ SUV أو الفانات الفاخرة مثل هيونداي ستاريا للعائلات.' }
      }
    ]
  },
  'jeddah-to-madinah': {
    slug: 'jeddah-to-madinah',
    name: 'Jeddah to Madinah Transfer', nameAr: 'نقل من جدة إلى المدينة',
    origin: 'Jeddah', originAr: 'جدة',
    destination: 'Madinah', destinationAr: 'المدينة المنورة',
    distance: '420 km', distanceAr: '420 كم',
    duration: '4h 15m', durationAr: '4 ساعات و 15 دقيقة',
    startingPrice: '800',
    description: 'Direct transfers from Jeddah or King Abdulaziz Airport to Madinah. Swift, safe, and comfortable transportation.',
    descriptionAr: 'تنقلات مباشرة من جدة أو المطار إلى المدينة المنورة. نقل سريع وآمن ومريح.',
    longDescription: 'Whether you are arriving at King Abdulaziz International Airport or staying in a Jeddah hotel, our direct transfer service to Madinah is the most convenient way to reach the Prophet\'s City. Skip the hassle of train stations and bus terminals; our door-to-door service ensures you arrive at your Madinah hotel relaxed and ready for Ziyarat.',
    longDescriptionAr: 'سواء كنت تصل إلى مطار جدة أو تقيم في فندق، فإن خدمة النقل المباشر لدينا إلى المدينة المنورة هي الطريقة الأكثر ملاءمة. تخطى عناء محطات القطار والحافلات بفضل خدمتنا المباشرة من الباب للباب.',
    image: '/cities/madinah.webp',
    highlights: [
      { en: 'Direct airport-to-hotel service', ar: 'خدمة مباشرة من المطار للفندق' },
      { en: 'No train or bus transfers needed', ar: 'لا حاجة لتنقلات القطارات أو الحافلات' },
      { en: 'Spacious vehicles for families', ar: 'مركبات واسعة للعائلات' },
      { en: 'Flexible departure times', ar: 'أوقات مغادرة مرنة' }
    ],
    faqs: [
      {
        question: { en: 'Is this faster than taking the train?', ar: 'هل هذا أسرع من ركوب القطار؟' },
        answer: { en: 'While the train itself is fast, a private transfer offers door-to-door convenience without the need to travel to the station, wait for boarding, and arrange another taxi upon arrival in Madinah.', ar: 'بينما القطار سريع، النقل الخاص يوفر راحة التوصيل المباشر دون عناء الذهاب للمحطة والانتظار.' }
      }
    ]
  }
};

export const seoRoutesList = Object.values(seoRoutesData);
