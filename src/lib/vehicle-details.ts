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
  "kia-k5": {
    theme: {
      primary: "#1B1E4F",
      secondary: "#D9A63A",
      personality: "Modern Elegance",
      personalityAr: "أناقة عصرية",
    },
    story: {
      title: "Modern Elegance for the Discerning Traveler",
      titleAr: "أناقة عصرية للمسافر المميز",
      content: "The Kia K5 brings a bold, modern design to the executive sedan class. With its spacious interior, advanced comfort features, and smooth ride, it is perfect for airport transfers and intercity travel. Whether you're traveling for business or leisure, the K5 ensures a relaxing and stylish journey.",
      contentAr: "تضفي كيا K5 تصميماً جريئاً وعصرياً على فئة سيارات السيدان التنفيذية. بفضل مقصورتها الواسعة وميزات الراحة المتقدمة والرحلة السلسة، فهي مثالية لتنقلات المطار والسفر بين المدن. سواء كنت تسافر للعمل أو الترفيه، تضمن لك K5 رحلة مريحة وأنيقة."
    },
    perfectFor: [
      { id: "business", label: "Business Travelers", labelAr: "رجال الأعمال" },
      { id: "couples", label: "Couples", labelAr: "الأزواج" },
      { id: "airport", label: "Airport Transfers", labelAr: "تنقلات المطار" }
    ],
    comfortFeatures: [
      { id: "climate", label: "Automatic Climate Control", labelAr: "تحكم مناخي تلقائي" },
      { id: "smooth", label: "Smooth Suspension", labelAr: "تعليق سلس" },
      { id: "quiet", label: "Quiet Cabin", labelAr: "مقصورة هادئة" }
    ],
    faqs: [
      { q: "How many passengers can fit in the Kia K5?", a: "The Kia K5 comfortably seats up to 4 passengers.", qAr: "كم عدد الركاب في كيا K5؟", aAr: "تتسع كيا K5 لـ 4 ركاب بشكل مريح." },
      { q: "Is it suitable for intercity travel?", a: "Yes, it provides a very comfortable ride for trips between cities like Jeddah and Makkah.", qAr: "هل هي مناسبة للسفر بين المدن؟", aAr: "نعم، توفر رحلة مريحة جداً للتنقل بين مدن مثل جدة ومكة." },
      { q: "How much luggage can it hold?", a: "The trunk accommodates up to 3 medium-to-large suitcases.", qAr: "كم عدد الحقائب التي يمكن استيعابها؟", aAr: "يتسع الصندوق لما يصل إلى 3 حقائب متوسطة إلى كبيرة." }
    ],
    reviews: [
      { name: "Sara Al-Otaibi", country: "KSA", route: "Jeddah Airport to Makkah", rating: 5, review: "Very stylish car, extremely clean and comfortable.", reviewAr: "سيارة أنيقة جداً، نظيفة ومريحة للغاية.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2000&auto=format&fit=crop" }
    ],
    seoContent: {
      title: "Kia K5 Chauffeur Service in Saudi Arabia",
      titleAr: "خدمة سيارة كيا K5 مع سائق في السعودية",
      content: "Travel in modern style with our Kia K5 chauffeur service. Ideal for individuals and couples looking for a reliable and comfortable sedan for airport transfers and city tours in Saudi Arabia.",
      contentAr: "سافر بأسلوب عصري مع خدمة سيارة كيا K5 مع سائق خاص. مثالية للأفراد والأزواج الذين يبحثون عن سيارة سيدان موثوقة ومريحة لتنقلات المطار والجولات السياحية في السعودية."
    }
  },
  "mitsubishi-xpander": {
    theme: {
      primary: "#1B1E4F",
      secondary: "#D9A63A",
      personality: "Family Practicality",
      personalityAr: "عملية عائلية",
    },
    story: {
      title: "Spacious Comfort for Small Families",
      titleAr: "راحة واسعة للعائلات الصغيرة",
      content: "The Mitsubishi Xpander is the ultimate Family MPV, combining the comfort of a sedan with the spaciousness of a minivan. It is the perfect choice for small families and Umrah groups who need extra room for passengers and luggage. With its flexible seating and excellent air conditioning, every journey is a pleasure.",
      contentAr: "تعد ميتسوبيشي إكسباندر سيارة العائلة MPV المثالية، حيث تجمع بين راحة سيارات السيدان ورحابة الميني فان. إنها الخيار الأمثل للعائلات الصغيرة ومجموعات العمرة التي تحتاج إلى مساحة إضافية للركاب والأمتعة. بفضل مقاعدها المرنة وتكييف الهواء الممتاز، كل رحلة تصبح ممتعة."
    },
    perfectFor: [
      { id: "families", label: "Small Families", labelAr: "العائلات الصغيرة" },
      { id: "umrah", label: "Umrah Groups", labelAr: "مجموعات العمرة" },
      { id: "airport", label: "Airport Transfers with Luggage", labelAr: "تنقلات المطار مع الأمتعة" }
    ],
    comfortFeatures: [
      { id: "space", label: "Flexible 3-Row Seating", labelAr: "مقاعد مرنة بثلاثة صفوف" },
      { id: "ac", label: "Rear AC Vents", labelAr: "فتحات تكييف خلفية" },
      { id: "ride", label: "Comfortable Ride", labelAr: "رحلة مريحة" }
    ],
    faqs: [
      { q: "How many passengers does it seat?", a: "It can seat up to 7 passengers.", qAr: "كم عدد الركاب؟", aAr: "تتسع لما يصل إلى 7 ركاب." },
      { q: "Is there enough room for luggage?", a: "For maximum luggage, 4-5 passengers is ideal to fold down the rear seats.", qAr: "هل يوجد مساحة كافية للأمتعة؟", aAr: "للحصول على أقصى مساحة للأمتعة، يفضل أن يكون عدد الركاب 4-5 لطي المقاعد الخلفية." }
    ],
    reviews: [
      { name: "Muhammad Rizwan", country: "Pakistan", route: "Makkah to Madinah", rating: 5, review: "Great car for our family of 5. Very comfortable.", reviewAr: "سيارة رائعة لعائلتنا المكونة من 5 أشخاص. مريحة جداً.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop" }
    ],
    seoContent: {
      title: "Mitsubishi Xpander Family Transport in Saudi Arabia",
      titleAr: "نقل عائلي ميتسوبيشي إكسباندر في السعودية",
      content: "Book the Mitsubishi Xpander for your family's Umrah trip or airport transfer. Offering space for up to 7 passengers, it's the smart, comfortable choice for group travel in Saudi Arabia.",
      contentAr: "احجز ميتسوبيشي إكسباندر لرحلة عمرة عائلتك أو لتنقلات المطار. توفر مساحة تتسع لـ 7 ركاب، وهي الخيار الذكي والمريح للسفر الجماعي في السعودية."
    }
  },
  "hyundai-starex": {
    theme: {
      primary: "#1B1E4F",
      secondary: "#D9A63A",
      personality: "Reliable Group Transport",
      personalityAr: "نقل جماعي موثوق",
    },
    story: {
      title: "Reliable and Spacious Group Transport",
      titleAr: "نقل جماعي موثوق وواسع",
      content: "The Hyundai Starex offers a reliable, comfortable, and spacious solution for medium-sized groups. Perfect for extended families or Umrah groups, the Starex ensures everyone travels together in air-conditioned comfort, with plenty of room for all your luggage.",
      contentAr: "توفر هيونداي ستاريكس حلاً موثوقاً ومريحاً وواسعاً للمجموعات متوسطة الحجم. مثالية للعائلات الكبيرة أو مجموعات العمرة، حيث تضمن ستاريكس سفر الجميع معاً في راحة مكيفة الهواء، مع مساحة وفيرة لجميع أمتعتكم."
    },
    perfectFor: [
      { id: "families", label: "Large Families", labelAr: "العائلات الكبيرة" },
      { id: "umrah", label: "Umrah Groups", labelAr: "مجموعات العمرة" },
      { id: "intercity", label: "Intercity Travel", labelAr: "السفر بين المدن" }
    ],
    comfortFeatures: [
      { id: "space", label: "Spacious Seating for 9", labelAr: "مقاعد واسعة لـ 9 ركاب" },
      { id: "ac", label: "Dual-Zone Climate Control", labelAr: "تحكم مناخي مزدوج" },
      { id: "luggage", label: "Ample Luggage Capacity", labelAr: "سعة أمتعة واسعة" }
    ],
    faqs: [
      { q: "How many people can fit in the Hyundai Starex?", a: "It comfortably accommodates up to 9 passengers.", qAr: "كم عدد الركاب؟", aAr: "تتسع لما يصل إلى 9 ركاب براحة تامة." },
      { q: "Is it good for Umrah trips?", a: "Yes, it is highly requested for Umrah trips due to its passenger and luggage capacity.", qAr: "هل هي جيدة لرحلات العمرة؟", aAr: "نعم، هي مطلوبة جداً لرحلات العمرة نظراً لسعتها للركاب والأمتعة." }
    ],
    reviews: [
      { name: "Usman Tariq", country: "UK", route: "Jeddah to Makkah", rating: 5, review: "Perfect size for our group. The AC was strong and the ride was smooth.", reviewAr: "حجم مثالي لمجموعتنا. المكيف كان قوياً والرحلة سلسة.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2000&auto=format&fit=crop" }
    ],
    seoContent: {
      title: "Hyundai Starex Van Rental in Saudi Arabia",
      titleAr: "استئجار فان هيونداي ستاريكس في السعودية",
      content: "Hire a Hyundai Starex with a driver for reliable group transport. Ideal for Umrah groups up to 9 passengers, offering comfort, space, and a smooth journey.",
      contentAr: "استأجر فان هيونداي ستاريكس مع سائق لنقل جماعي موثوق. مثالي لمجموعات العمرة حتى 9 ركاب، ويوفر الراحة والمساحة والرحلة السلسة."
    }
  },
  "toyota-hiace": {
    theme: {
      primary: "#1B1E4F",
      secondary: "#D9A63A",
      personality: "Maximum Capacity Comfort",
      personalityAr: "راحة السعة القصوى",
    },
    story: {
      title: "Maximum Capacity for Large Groups",
      titleAr: "السعة القصوى للمجموعات الكبيرة",
      content: "When traveling with a large group, the Toyota Hiace is the unparalleled choice. Designed to accommodate up to 13 passengers comfortably, it is the backbone of Umrah transport. With reliable performance, strong air conditioning reaching every row, and substantial luggage space, the Hiace keeps large families and tour groups together effortlessly.",
      contentAr: "عند السفر مع مجموعة كبيرة، تعتبر تويوتا هايس الخيار الذي لا يعلى عليه. صُممت لتستوعب ما يصل إلى 13 راكباً بشكل مريح، وهي العمود الفقري لنقل العمرة. بفضل أدائها الموثوق، وتكييف الهواء القوي الذي يصل إلى كل صف، ومساحة الأمتعة الكبيرة، تحافظ هايس على بقاء العائلات الكبيرة والمجموعات السياحية معاً بكل سهولة."
    },
    perfectFor: [
      { id: "large_groups", label: "Large Groups", labelAr: "المجموعات الكبيرة" },
      { id: "umrah", label: "Umrah Tour Groups", labelAr: "مجموعات رحلات العمرة" },
      { id: "corporate", label: "Corporate Shuttles", labelAr: "نقل الشركات" }
    ],
    comfortFeatures: [
      { id: "seating", label: "Seating for up to 13", labelAr: "مقاعد تصل إلى 13" },
      { id: "ac", label: "Full Cabin Air Conditioning", labelAr: "تكييف هواء لكامل المقصورة" },
      { id: "durability", label: "Smooth & Safe Ride", labelAr: "رحلة سلسة وآمنة" }
    ],
    faqs: [
      { q: "What is the maximum passenger capacity?", a: "The Toyota Hiace can carry up to 13 passengers.", qAr: "ما هي أقصى سعة للركاب؟", aAr: "يمكن لسيارة تويوتا هايس حمل ما يصل إلى 13 راكباً." },
      { q: "Will there be room for all our luggage?", a: "Yes, it features a dedicated cargo area that holds up to 10 large suitcases.", qAr: "هل سيكون هناك متسع لجميع أمتعتنا؟", aAr: "نعم، تتميز بمنطقة مخصصة للأمتعة تتسع لـ 10 حقائب كبيرة." },
      { q: "Are the drivers experienced with large vans?", a: "Absolutely. All our Hiace drivers are specially licensed and highly experienced in driving large passenger vans.", qAr: "هل السائقون ذوو خبرة في قيادة الحافلات الكبيرة؟", aAr: "بالتأكيد. جميع سائقي هايس لدينا مرخصون خصيصاً وذوو خبرة عالية في قيادة حافلات الركاب الكبيرة." }
    ],
    reviews: [
      { name: "Abdul Rahman", country: "Egypt", route: "Makkah to Madinah", rating: 5, review: "Excellent van for our large family. Everyone was comfortable and the driver was great.", reviewAr: "فان ممتاز لعائلتنا الكبيرة. كان الجميع مرتاحين والسائق كان رائعاً.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop" }
    ],
    seoContent: {
      title: "Toyota Hiace Van Hire with Driver in Saudi Arabia",
      titleAr: "تأجير فان تويوتا هايس مع سائق في السعودية",
      content: "Book a Toyota Hiace for large group transportation in Saudi Arabia. Accommodating up to 13 passengers, it is the perfect executive van for Umrah groups, large families, and corporate travel, offering unmatched reliability and space.",
      contentAr: "احجز تويوتا هايس لنقل المجموعات الكبيرة في السعودية. تتسع لما يصل إلى 13 راكباً، وهي الفان التنفيذي المثالي لمجموعات العمرة، والعائلات الكبيرة، وسفر الشركات، وتوفر موثوقية ومساحة لا مثيل لها."
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
      { id: "premium_umrah", label: "Premium Umrah Transportation", labelAr: "تنقلات العمرة الممتازة" },
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
  "gmc-yukon": {
    theme: {
      primary: "#1B1E4F",
      secondary: "#D9A63A",
      personality: "VIP Comfort",
      personalityAr: "راحة كبار الشخصيات",
    },
    story: {
      title: "Designed for VIP Comfort",
      titleAr: "صُممت لراحة كبار الشخصيات",
      content: "The GMC Yukon is the ideal Premium SUV for VIPs, executives, and luxury Umrah trips. Offering exceptional space and versatility, it ensures that every passenger enjoys a premium journey. With ample headroom, excellent suspension, and superior air conditioning, the Yukon handles long journeys across Saudi Arabia with effortless ease.",
      contentAr: "تعتبر جمس يوكن السيارة الرياضية متعددة الاستخدامات الفاخرة المثالية لكبار الشخصيات والمسؤولين التنفيذيين ورحلات العمرة الفاخرة. توفر مساحة استثنائية ومرونة عالية، مما يضمن لكل راكب رحلة فاخرة. بفضل المساحة الواسعة للرأس، ونظام التعليق الممتاز، وتكييف الهواء الفائق، تتعامل يوكن مع الرحلات الطويلة عبر المملكة بكل سهولة."
    },
    perfectFor: [
      { id: "vip", label: "VIP Clients", labelAr: "كبار الشخصيات" },
      { id: "executives", label: "Corporate Executives", labelAr: "المسؤولون التنفيذيون" },
      { id: "airport", label: "Luxury Airport Transfers", labelAr: "تنقلات المطار الفاخرة" }
    ],
    comfortFeatures: [
      { id: "space", label: "Spacious VIP Seating", labelAr: "مقاعد VIP واسعة" },
      { id: "ac", label: "Premium Climate Control", labelAr: "تحكم مناخي فاخر" },
      { id: "suspension", label: "Air Ride Suspension", labelAr: "نظام تعليق هوائي" }
    ],
    faqs: [
      { q: "How many passengers does it seat?", a: "It can comfortably seat up to 7 passengers.", qAr: "كم عدد الركاب؟", aAr: "تتسع لـ 7 ركاب بكل راحة." },
      { q: "Is there enough room for luggage with 7 passengers?", a: "With all 7 seats up, luggage space is limited. For maximum luggage, 5 passengers is ideal.", qAr: "هل يوجد مساحة كافية للأمتعة مع 7 ركاب؟", aAr: "مع رفع المقاعد السبعة، تكون مساحة الأمتعة محدودة. للحصول على مساحة أمتعة كافية، 5 ركاب هو العدد المثالي." },
      { q: "Is it suitable for VIP Makkah trips?", a: "Yes, it is highly requested for VIP Umrah trips.", qAr: "هل هي مناسبة لرحلات مكة VIP؟", aAr: "نعم، هي مطلوبة جداً لرحلات العمرة لكبار الشخصيات." }
    ],
    reviews: [
      { name: "Fatima Abdullah", country: "Malaysia", route: "Jeddah to Makkah", rating: 5, review: "Perfect luxury SUV. Driver was very professional and helpful.", reviewAr: "سيارة فاخرة مثالية. السائق كان محترفاً ومتعاوناً جداً.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2000&auto=format&fit=crop" }
    ],
    seoContent: {
      title: "GMC Yukon Premium SUV Chauffeur in Saudi Arabia",
      titleAr: "جمس يوكن بسائق خاص في السعودية",
      content: "Ensure your travel is in absolute luxury with our GMC Yukon chauffeur service. Ideal for VIP Umrah pilgrims and corporate executives in Saudi Arabia, this premium SUV provides the perfect balance of luxury, safety, and comfort.",
      contentAr: "اضمن سفرك برفاهية مطلقة مع خدمة سيارة جمس يوكن بسائق خاص. مثالية لمعتمري بيت الله الحرام من كبار الشخصيات والمسؤولين التنفيذيين في السعودية، حيث توفر هذه السيارة الفاخرة التوازن المثالي بين الرفاهية والأمان والراحة."
    }
  }
};
