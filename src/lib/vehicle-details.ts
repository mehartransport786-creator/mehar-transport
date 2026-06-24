import { VehicleDetails } from "@/types/vehicle";

export const vehicleDetails: Record<string, VehicleDetails> = {
  "toyota-camry": {
    theme: {
      primary: "#1B1E4F",
      secondary: "#D9A63A",
      personality: "Executive Elegance",
      personalityAr: "أناقة تنفيذية",
    },
    story: {
      title: "Executive Elegance for the Modern Traveler",
      titleAr: "أناقة تنفيذية للمسافر العصري",
      content: "The Toyota Camry redefines executive transport with its sleek design and sophisticated interior. Engineered for business travelers and couples, it offers a seamless blend of performance, comfort, and advanced technology. Whether you're navigating the bustling streets of Riyadh or enjoying a quiet transfer from Jeddah Airport, the Camry ensures you arrive relaxed and ready.",
      contentAr: "تعيد تويوتا كامري تعريف النقل التنفيذي بتصميمها الأنيق ومقصورتها المتطورة. صُممت لرجال الأعمال والأزواج، وتقدم مزيجاً سلساً من الأداء والراحة والتكنولوجيا المتقدمة. سواء كنت تتنقل في شوارع الرياض المزدحمة أو تستمتع بنقل هادئ من مطار جدة، تضمن لك كامري الوصول وأنت في قمة الاسترخاء والجاهزية."
    },
    perfectFor: [
      { id: "business", label: "Business Travelers", labelAr: "رجال الأعمال" },
      { id: "couples", label: "Couples", labelAr: "الأزواج" },
      { id: "solo", label: "Solo Travelers", labelAr: "المسافرون بمفردهم" },
      { id: "airport", label: "Airport Transfers", labelAr: "تنقلات المطار" }
    ],
    comfortFeatures: [
      { id: "climate", label: "Dual-Zone Climate Control", labelAr: "تحكم مناخي مزدوج المناطق" },
      { id: "legroom", label: "Executive Legroom", labelAr: "مساحة أرجل تنفيذية" },
      { id: "quiet", label: "Acoustic Quiet Cabin", labelAr: "مقصورة هادئة عازلة للصوت" },
      { id: "seats", label: "Premium Leather Seating", labelAr: "مقاعد جلدية فاخرة" }
    ],
    faqs: [
      { q: "How many passengers can fit in the Toyota Camry?", a: "The Toyota Camry comfortably seats up to 4 passengers.", qAr: "كم عدد الركاب في تويوتا كامري؟", aAr: "تتسع تويوتا كامري لـ 4 ركاب بشكل مريح." },
      { q: "Is the Toyota Camry available for airport transfers?", a: "Yes, it is perfectly suited for executive airport transfers.", qAr: "هل تتوفر تويوتا كامري لتنقلات المطار؟", aAr: "نعم، إنها مناسبة تماماً لتنقلات المطار التنفيذية." },
      { q: "Can I book it for intercity travel?", a: "Absolutely. It offers a very comfortable ride for trips between Jeddah, Makkah, and Madinah.", qAr: "هل يمكنني حجزها للسفر بين المدن؟", aAr: "بالتأكيد. توفر رحلة مريحة جداً للتنقل بين جدة، مكة، والمدينة." },
      { q: "How much luggage can it hold?", a: "The trunk accommodates up to 3 large suitcases.", qAr: "كم عدد الحقائب التي يمكن استيعابها؟", aAr: "يتسع الصندوق لما يصل إلى 3 حقائب كبيرة." },
      { q: "Does the car have Wi-Fi?", a: "Complimentary Wi-Fi is available upon request.", qAr: "هل تتوفر شبكة Wi-Fi؟", aAr: "شبكة Wi-Fi مجانية متاحة عند الطلب." }
    ],
    reviews: [
      { name: "John Smith", country: "UK", route: "Jeddah Airport to Hotel", rating: 5, review: "Immaculate car, very professional driver.", reviewAr: "سيارة نظيفة جداً، وسائق محترف للغاية.", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2000&auto=format&fit=crop" },
      { name: "Ahmed Ali", country: "UAE", route: "Makkah to Jeddah", rating: 5, review: "Smooth ride, perfect for a couple.", reviewAr: "رحلة سلسة، مثالية لشخصين.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2000&auto=format&fit=crop" }
    ],
    seoContent: {
      title: "Luxury Toyota Camry Chauffeur Service in Saudi Arabia",
      titleAr: "خدمة سيارة تويوتا كامري مع سائق خاص في السعودية",
      content: "Experience the ultimate in executive travel with our premium Toyota Camry chauffeur service. Perfect for navigating the business districts of Riyadh or ensuring a smooth transfer from Jeddah's King Abdulaziz International Airport. The Toyota Camry combines dynamic performance with a refined interior, making it the top choice for solo travelers and couples who demand reliability without compromising on elegance.",
      contentAr: "استمتع بأرقى مستويات السفر التنفيذي مع خدمة سيارة تويوتا كامري مع سائق خاص. مثالية للتنقل في الأحياء التجارية بالرياض أو ضمان انتقال سلس من مطار الملك عبد العزيز الدولي بجدة. تجمع تويوتا كامري بين الأداء الديناميكي والمقصورة الراقية، مما يجعلها الخيار الأول للمسافرين الأفراد والأزواج الذين يتطلعون إلى الموثوقية دون المساومة على الأناقة."
    }
  },
  "gmc-yukon": {
    theme: {
      primary: "#1B1E4F",
      secondary: "#D9A63A",
      personality: "Family Comfort",
      personalityAr: "راحة العائلة",
    },
    story: {
      title: "Designed for Family Comfort",
      titleAr: "صُممت لراحة العائلة",
      content: "The GMC Yukon is the ideal luxury SUV for families and Umrah groups. Offering exceptional space and versatility, it ensures that every passenger, from the front seat to the third row, enjoys a comfortable journey. With ample headroom, excellent suspension, and superior air conditioning, the Yukon handles long journeys across Saudi Arabia with effortless ease.",
      contentAr: "تعتبر جمس يوكن السيارة الرياضية متعددة الاستخدامات المثالية للعائلات ومجموعات العمرة. توفر مساحة استثنائية ومرونة عالية، مما يضمن لكل راكب، من المقعد الأمامي حتى الصف الثالث، رحلة مريحة. بفضل المساحة الواسعة للرأس، ونظام التعليق الممتاز، وتكييف الهواء الفائق، تتعامل يوكن مع الرحلات الطويلة عبر المملكة بكل سهولة."
    },
    perfectFor: [
      { id: "families", label: "Families", labelAr: "العائلات" },
      { id: "umrah", label: "Small Umrah Groups", labelAr: "مجموعات العمرة الصغيرة" },
      { id: "airport", label: "Airport Transfers with Luggage", labelAr: "تنقلات المطار مع الأمتعة" }
    ],
    comfortFeatures: [
      { id: "space", label: "Spacious 3-Row Seating", labelAr: "مقاعد واسعة بثلاثة صفوف" },
      { id: "ac", label: "Rear AC Vents", labelAr: "فتحات تكييف خلفية" },
      { id: "suspension", label: "Comfort-Tuned Suspension", labelAr: "نظام تعليق مريح" }
    ],
    faqs: [
      { q: "How many passengers does it seat?", a: "It can comfortably seat up to 7 passengers.", qAr: "كم عدد الركاب؟", aAr: "تتسع لـ 7 ركاب بكل راحة." },
      { q: "Is there enough room for luggage with 7 passengers?", a: "With all 7 seats up, luggage space is limited. For maximum luggage, 5 passengers is ideal.", qAr: "هل يوجد مساحة كافية للأمتعة مع 7 ركاب؟", aAr: "مع رفع المقاعد السبعة، تكون مساحة الأمتعة محدودة. للحصول على مساحة أمتعة كافية، 5 ركاب هو العدد المثالي." },
      { q: "Are child seats available?", a: "Yes, child seats can be requested during booking.", qAr: "هل مقاعد الأطفال متوفرة؟", aAr: "نعم، يمكن طلب مقاعد الأطفال أثناء الحجز." },
      { q: "Is it suitable for Makkah to Madinah trips?", a: "Yes, it is very popular for Umrah trips between Makkah and Madinah.", qAr: "هل هي مناسبة لرحلات مكة إلى المدينة؟", aAr: "نعم، تحظى بشعبية كبيرة لرحلات العمرة بين مكة والمدينة." },
      { q: "Are the drivers experienced with Umrah routes?", a: "All our drivers are highly experienced with all routes and hotel locations in the Holy Cities.", qAr: "هل السائقون ذوو خبرة بمسارات العمرة؟", aAr: "جميع سائقينا يمتلكون خبرة واسعة في جميع مسارات ومواقع فنادق المدن المقدسة." }
    ],
    reviews: [
      { name: "Fatima Abdullah", country: "Malaysia", route: "Jeddah to Makkah", rating: 5, review: "Perfect for our family of 6. Driver was very helpful with our bags.", reviewAr: "مثالية لعائلتنا المكونة من 6 أشخاص. السائق كان متعاوناً جداً مع حقائبنا.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2000&auto=format&fit=crop" }
    ],
    seoContent: {
      title: "GMC Yukon Family Transport in Saudi Arabia",
      titleAr: "نقل عائلي جمس يوكن في السعودية",
      content: "Ensure your family travels in absolute comfort with our GMC Yukon chauffeur service. Ideal for Umrah pilgrims and family vacations in Saudi Arabia, this spacious 7-seater provides the perfect balance of comfort, safety, and luggage capacity. Skip the hassle of multiple taxis and keep your family together for airport transfers, Makkah to Madinah trips, and city tours.",
      contentAr: "اضمن سفر عائلتك براحة تامة مع خدمة سيارة جمس يوكن بسائق خاص. مثالية لمعتمري بيت الله الحرام والعطلات العائلية في السعودية، حيث توفر هذه السيارة العائلية ذات الـ 7 مقاعد التوازن المثالي بين الراحة والأمان وسعة الأمتعة. تجنب عناء البحث عن سيارات أجرة متعددة واحتفظ بعائلتك معاً أثناء تنقلات المطار، أو رحلات مكة إلى المدينة، أو الجولات السياحية."
    }
  },
  "hyundai-staria": {
    theme: {
      primary: "#1B1E4F",
      secondary: "#D9A63A",
      personality: "Premium Family Luxury",
      personalityAr: "فخامة عائلية راقية",
    },
    story: {
      title: "The Future of Premium Family Travel",
      titleAr: "مستقبل السفر العائلي الفاخر",
      content: "The Hyundai Staria VIP represents a paradigm shift in luxury group transportation. Its futuristic design gives way to an incredibly spacious, lounge-like interior. Designed for VIP families and premium Umrah clients, the Staria features captain's chairs, expansive windows for panoramic views of the Holy Cities, and whisper-quiet acoustics. It is the definitive choice for those who want first-class comfort for the whole family.",
      contentAr: "تمثل هيونداي ستاريا VIP نقلة نوعية في النقل الجماعي الفاخر. فتصميمها المستقبلي يفتح المجال لمقصورة داخلية واسعة للغاية تشبه صالة الانتظار المريحة. صُممت لعائلات كبار الشخصيات ومعتمري الدرجة الأولى، حيث تتميز ستاريا بمقاعد كابتن مستقلة، ونوافذ واسعة لإطلالات بانورامية على المدن المقدسة، وهدوء تام. إنها الخيار الأمثل لمن يبحثون عن راحة من الدرجة الأولى لجميع أفراد العائلة."
    },
    perfectFor: [
      { id: "vip_families", label: "VIP Families", labelAr: "عائلات كبار الشخصيات" },
      { id: "premium_umrah", label: "Premium Umrah Packages", labelAr: "باقات العمرة الممتازة" },
      { id: "exec_groups", label: "Executive Groups", labelAr: "مجموعات تنفيذية" }
    ],
    comfortFeatures: [
      { id: "captain", label: "VIP Captain's Chairs", labelAr: "مقاعد كابتن VIP" },
      { id: "panoramic", label: "Panoramic Windows", labelAr: "نوافذ بانورامية" },
      { id: "climate", label: "Multi-Zone Climate Control", labelAr: "تحكم مناخي متعدد المناطق" },
      { id: "privacy", label: "Privacy Tints", labelAr: "نوافذ مظللة للخصوصية" }
    ],
    faqs: [
      { q: "Is this the VIP version of the Staria?", a: "Yes, our fleet features the premium VIP configuration with maximum luxury features.", qAr: "هل هذه هي نسخة VIP من ستاريا؟", aAr: "نعم، يضم أسطولنا فئة VIP الفاخرة المزودة بأعلى ميزات الفخامة." },
      { q: "How many suitcases can it carry?", a: "It can comfortably hold 6-7 large suitcases.", qAr: "كم حقيبة سفر يمكن أن تحمل؟", aAr: "يمكنها استيعاب 6-7 حقائب سفر كبيرة براحة تامة." },
      { q: "Does it have comfortable seating for elderly passengers?", a: "Absolutely. The wide sliding doors and captain's chairs make it incredibly accessible and comfortable for elderly travelers.", qAr: "هل المقاعد مريحة لكبار السن؟", aAr: "بالتأكيد. الأبواب المنزلقة الواسعة ومقاعد الكابتن تجعلها سهلة الوصول ومريحة جداً للمسافرين كبار السن." },
      { q: "Can I book it for a full day?", a: "Yes, we offer daily hire options for customized itineraries.", qAr: "هل يمكنني حجزها ليوم كامل؟", aAr: "نعم، نقدم خيارات الحجز اليومي للمسارات المخصصة." }
    ],
    reviews: [
      { name: "Tariq Mahmood", country: "Pakistan", route: "Madinah to Makkah", rating: 5, review: "The most comfortable ride we've ever had for Umrah. The seats are like first-class airline seats.", reviewAr: "أكثر رحلة مريحة حظينا بها على الإطلاق في العمرة. المقاعد تشبه مقاعد الدرجة الأولى في الطائرات.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop" }
    ],
    seoContent: {
      title: "Luxury Hyundai Staria VIP Hire in Saudi Arabia",
      titleAr: "استئجار هيونداي ستاريا VIP الفاخرة في السعودية",
      content: "Elevate your group travel with our Hyundai Staria VIP chauffeur service. Perfectly suited for discerning families and premium Umrah clients, the Staria offers an unparalleled luxury van experience. Enjoy captain's chairs, advanced climate control, and expansive legroom as our professional drivers navigate the routes between Jeddah, Makkah, and Madinah. Book the Hyundai Staria for a true first-class journey on the ground.",
      contentAr: "ارتقِ بتجربة السفر الجماعي مع خدمة السائق الخاص لسيارة هيونداي ستاريا VIP. تعد ستاريا الخيار الأمثل للعائلات الراقية وعملاء باقات العمرة المميزة، حيث تقدم تجربة فان فاخرة لا مثيل لها. استمتع بمقاعد الكابتن، والتحكم المناخي المتقدم، والمساحة الرحبة للأرجل، بينما يقود سائقونا المحترفون عبر المسارات بين جدة ومكة والمدينة. احجز هيونداي ستاريا لتجربة سفر حقيقية من الدرجة الأولى على الأرض."
    }
  },
  "ford-taurus": {
    theme: {
      primary: "#1B1E4F",
      secondary: "#D9A63A",
      personality: "Premium Sedan Comfort",
      personalityAr: "راحة سيدان فاخرة",
    },
    story: {
      title: "Premium Sedan for Elegant Journeys",
      titleAr: "سيدان فاخرة لرحلات أنيقة",
      content: "The Ford Taurus provides a premium and comfortable experience for passengers. Ideal for business professionals, small families, or couples, it ensures a smooth and elegant journey across Saudi Arabia. With a spacious interior, powerful air conditioning, and top-tier safety features, the Taurus guarantees peace of mind and comfort.",
      contentAr: "توفر فورد تورس تجربة فاخرة ومريحة للركاب. مثالية لرجال الأعمال، العائلات الصغيرة، أو الأزواج، تضمن رحلة سلسة وأنيقة عبر المملكة العربية السعودية. بفضل المقصورة الواسعة، وتكييف الهواء القوي، وميزات الأمان الفائقة، تضمن تورس راحة البال والراحة التامة."
    },
    perfectFor: [
      { id: "business", label: "Business Professionals", labelAr: "رجال الأعمال" },
      { id: "couples", label: "Couples", labelAr: "الأزواج" },
      { id: "small_families", label: "Small Families", labelAr: "العائلات الصغيرة" }
    ],
    comfortFeatures: [
      { id: "legroom", label: "Spacious Legroom", labelAr: "مساحة أرجل واسعة" },
      { id: "cooling", label: "Powerful Cabin Cooling", labelAr: "تبريد قوي للمقصورة" },
      { id: "smooth_ride", label: "Smooth & Quiet Ride", labelAr: "رحلة سلسة وهادئة" }
    ],
    faqs: [
      { q: "How many people can travel in the Ford Taurus?", a: "It accommodates up to 4 passengers comfortably.", qAr: "كم عدد الركاب؟", aAr: "تتسع لما يصل إلى 4 ركاب بشكل مريح." },
      { q: "Is there enough space for luggage?", a: "Yes, the trunk is designed to handle up to 3 large suitcases easily.", qAr: "هل توجد مساحة كافية للأمتعة؟", aAr: "نعم، تم تصميم الصندوق لاستيعاب ما يصل إلى 3 حقائب كبيرة بسهولة." },
      { q: "Is the Taurus comfortable for intercity trips?", a: "Yes, it features comfortable seating and excellent AC, perfect for intercity travel.", qAr: "هل تورس مريحة للرحلات بين المدن؟", aAr: "نعم، تتميز بمقاعد مريحة وتكييف ممتاز، وهي مثالية للسفر بين المدن." }
    ],
    reviews: [
      { name: "Abdullah Ali", country: "KSA", route: "Jeddah Airport to Makkah", rating: 5, review: "Very comfortable sedan, quiet ride and the driver was punctual.", reviewAr: "سيدان مريحة جداً، رحلة هادئة والسائق كان دقيقاً في مواعيده.", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2000&auto=format&fit=crop" }
    ],
    seoContent: {
      title: "Ford Taurus Premium Transport Service in Saudi Arabia",
      titleAr: "خدمة النقل الفاخر فورد تورس في السعودية",
      content: "Enjoy your journey with Mehar Transport's Ford Taurus chauffeur service. Trusted by business travelers and couples, the Taurus is an excellent solution for transporting up to 4 passengers comfortably across Saudi Arabia. Enjoy fixed pricing, professional drivers, and pristine vehicles for your Makkah and Madinah transfers.",
      contentAr: "استمتع برحلتك مع خدمة النقل فورد تورس من ميهار للنقل. تعتبر فورد تورس، الموثوقة من قبل رجال الأعمال والأزواج، حلاً ممتازاً لنقل ما يصل إلى 4 ركاب براحة عبر أنحاء المملكة. استمتع بأسعار ثابتة، وسائقين محترفين، ومركبات نظيفة وجاهزة دائماً لتنقلاتك في مكة والمدينة."
    }
  },
  "toyota-coaster": {
    theme: {
      primary: "#1B1E4F",
      secondary: "#D9A63A",
      personality: "Professional Group Travel",
      personalityAr: "نقل جماعي احترافي",
    },
    story: {
      title: "Unifying the Journey",
      titleAr: "توحيد مسار الرحلة",
      content: "The Toyota Coaster is engineered for medium-to-large groups who want to stay together without sacrificing comfort. Perfect for Umrah tour operators, large extended families, and corporate event shuttles, the Coaster seats up to 25 passengers in an airy, air-conditioned environment. A built-in PA system allows group leaders to communicate effortlessly, making it the premier choice for guided tours.",
      contentAr: "صُممت حافلة تويوتا كوستر للمجموعات المتوسطة إلى الكبيرة التي ترغب في البقاء معاً دون التضحية بالراحة. وهي مثالية لمنظمي رحلات العمرة، والعائلات الكبيرة، وحافلات الفعاليات التجارية. تتسع كوستر لما يصل إلى 25 راكباً في بيئة مكيفة وواسعة. يتيح نظام الصوت المدمج لقادة المجموعات التواصل بسهولة، مما يجعلها الخيار الأول للجولات السياحية الموجهة."
    },
    perfectFor: [
      { id: "umrah_operators", label: "Umrah Operators", labelAr: "منظمي رحلات العمرة" },
      { id: "corporate_events", label: "Corporate Events", labelAr: "الفعاليات التجارية" },
      { id: "extended_family", label: "Extended Families", labelAr: "العائلات الكبيرة جداً" }
    ],
    comfortFeatures: [
      { id: "pa_system", label: "PA System for Guides", labelAr: "نظام صوتي للمرشدين" },
      { id: "reading_lights", label: "Individual Reading Lights", labelAr: "مصابيح قراءة فردية" },
      { id: "curtains", label: "Window Curtains", labelAr: "ستائر للنوافذ" }
    ],
    faqs: [
      { q: "How many passengers can the Coaster hold?", a: "It holds up to 25 passengers.", qAr: "كم عدد ركاب كوستر؟", aAr: "تتسع لما يصل إلى 25 راكباً." },
      { q: "Can we use a microphone for our group guide?", a: "Yes, the Coaster comes equipped with a microphone and PA system.", qAr: "هل يمكننا استخدام ميكروفون لمرشد المجموعة؟", aAr: "نعم، تم تجهيز حافلة كوستر بميكروفون ونظام صوتي." },
      { q: "Is there a dedicated space for luggage?", a: "Yes, the rear section and under-seat areas accommodate up to 15 large bags.", qAr: "هل توجد مساحة مخصصة للأمتعة؟", aAr: "نعم، يتسع الجزء الخلفي والمناطق تحت المقاعد لما يصل إلى 15 حقيبة كبيرة." }
    ],
    reviews: [
      { name: "Al-Safwa Tours", country: "UK", route: "Makkah to Madinah Ziyarat", rating: 5, review: "Excellent mini-coach for our Ziyarat tours. Reliable and the driver knew all the historical sites.", reviewAr: "حافلة ممتازة لجولات الزيارات الخاصة بنا. موثوقة والسائق كان يعرف جميع المواقع التاريخية.", image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=2000&auto=format&fit=crop" }
    ],
    seoContent: {
      title: "Toyota Coaster Rental with Driver in Saudi Arabia",
      titleAr: "استئجار تويوتا كوستر مع سائق في السعودية",
      content: "Book a Toyota Coaster with a professional driver for your medium-sized group travels in Saudi Arabia. Accommodating up to 25 passengers, the Coaster is the preferred mini-coach for Umrah operators, educational tours, and corporate events. Travel together in a fully air-conditioned, spacious environment, and ensure your itinerary runs perfectly on time with Mehar Transport.",
      contentAr: "احجز حافلة تويوتا كوستر مع سائق محترف لتنقلات مجموعتك المتوسطة في السعودية. تتسع الحافلة لـ 25 راكباً، وهي حافلة النقل المفضلة لمنظمي رحلات العمرة، والجولات التعليمية، والفعاليات التجارية. سافروا معاً في بيئة واسعة ومكيفة بالكامل، وتأكدوا من سير برنامج رحلتكم في الوقت المحدد تماماً مع ميهار للنقل."
    }
  }
};
