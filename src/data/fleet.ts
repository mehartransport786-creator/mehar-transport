export type VehicleCategory = "sedan" | "suv" | "van" | "minibus";

export interface FAQItem {
  q: string;
  a: string;
  qAr: string;
  aAr: string;
}

export interface Review {
  name: string;
  country: string;
  route: string;
  rating: number;
  review: string;
  reviewAr: string;
}

export interface Feature {
  id: string;
  label: string;
  labelAr: string;
}

export interface SEOContent {
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  longForm: string;
  longFormAr: string;
}

export interface VehicleData {
  id: string;
  slug: string;
  category: VehicleCategory;
  name: string;
  nameAr: string;
  type: string;
  typeAr: string;
  
  passengers: number;
  luggage: number;
  
  heroImage: string; 
  gallery: [string, string, string]; // [1: Luggage, 2: Rear Cabin, 3: Dashboard]
  interiorImage: string; // For ComfortExperience section
  
  theme: {
    primary: string;
    secondary: string;
    personality: string;
    personalityAr: string;
  };
  
  story: {
    title: string;
    titleAr: string;
    content: string;
    contentAr: string;
  };
  
  perfectFor: Feature[];
  comfortFeatures: Feature[];
  faqs: FAQItem[];
  reviews: Review[];
  seoContent: SEOContent;
}

export const fleetData: VehicleData[] = [
  {
    id: "toyota-camry",
    slug: "toyota-camry",
    category: "sedan",
    name: "Toyota Camry",
    nameAr: "تويوتا كامري",
    type: "Executive Sedan",
    typeAr: "سيدان تنفيذية",
    passengers: 4,
    luggage: 3,
    heroImage: "/fleet/camry.png",
    interiorImage: "/fleet/camry-seats.jpg",
    gallery: [
      "/fleet/camry-exterior-rear.png",
      "/fleet/camry-seats.jpg",
      "/fleet/camry-dashboard.jpg"
    ],
    theme: {
      primary: "#1B1E4F",
      secondary: "#df9a26",
      personality: "Executive Elegance",
      personalityAr: "أناقة تنفيذية"
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
      { q: "How much luggage can it hold?", a: "The trunk accommodates up to 3 large suitcases.", qAr: "كم عدد الحقائب التي يمكن استيعابها؟", aAr: "يتسع الصندوق لما يصل إلى 3 حقائب كبيرة." }
    ],
    reviews: [
      { name: "John Smith", country: "UK", route: "Jeddah Airport to Hotel", rating: 5, review: "Immaculate car, very professional driver.", reviewAr: "سيارة نظيفة جداً، وسائق محترف للغاية." },
      { name: "Ahmed Ali", country: "UAE", route: "Makkah to Jeddah", rating: 5, review: "Smooth ride, perfect for a couple.", reviewAr: "رحلة سلسة، مثالية لشخصين." }
    ],
    seoContent: {
      title: "Luxury Toyota Camry Chauffeur Service in Saudi Arabia",
      titleAr: "خدمة سيارة تويوتا كامري مع سائق خاص في السعودية",
      description: "Experience executive travel with our premium Toyota Camry chauffeur service. Perfect for navigating Riyadh or transfers from Jeddah's King Abdulaziz Airport.",
      descriptionAr: "استمتع بالسفر التنفيذي مع خدمة تويوتا كامري بسائق خاص. مثالية للتنقل في الرياض أو مطار جدة.",
      longForm: "Experience the ultimate in executive travel with our premium Toyota Camry chauffeur service. Perfect for navigating the business districts of Riyadh or ensuring a smooth transfer from Jeddah's King Abdulaziz International Airport. The Toyota Camry combines dynamic performance with a refined interior, making it the top choice for solo travelers and couples who demand reliability without compromising on elegance.",
      longFormAr: "استمتع بأرقى مستويات السفر التنفيذي مع خدمة سيارة تويوتا كامري مع سائق خاص. مثالية للتنقل في الأحياء التجارية بالرياض أو ضمان انتقال سلس من مطار الملك عبد العزيز الدولي بجدة. تجمع تويوتا كامري بين الأداء الديناميكي والمقصورة الراقية، مما يجعلها الخيار الأول للمسافرين الأفراد والأزواج الذين يتطلعون إلى الموثوقية دون المساومة على الأناقة."
    }
  },
  {
    id: "gmc-denali",
    slug: "gmc-denali",
    category: "suv",
    name: "GMC Denali",
    nameAr: "جمس دينالي",
    type: "Premium SUV",
    typeAr: "سيارة دفع رباعي فاخرة",
    passengers: 7,
    luggage: 6,
    heroImage: "/fleet/gmc.png",
    interiorImage: "/fleet/gmc.png", // Will need update if a specific interior exists
    gallery: [
      "/fleet/gmc.png",
      "/fleet/gmc.png",
      "/fleet/gmc.png"
    ],
    theme: {
      primary: "#1B1E4F",
      secondary: "#df9a26",
      personality: "VIP Comfort",
      personalityAr: "راحة كبار الشخصيات"
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
      { q: "Is there enough room for luggage with 7 passengers?", a: "With all 7 seats up, luggage space is limited. For maximum luggage, 5 passengers is ideal.", qAr: "هل يوجد مساحة كافية للأمتعة مع 7 ركاب؟", aAr: "مع رفع المقاعد السبعة، تكون مساحة الأمتعة محدودة. للحصول على مساحة أمتعة كافية، 5 ركاب هو العدد المثالي." }
    ],
    reviews: [
      { name: "Fatima Abdullah", country: "Malaysia", route: "Jeddah to Makkah", rating: 5, review: "Perfect luxury SUV. Driver was very professional and helpful.", reviewAr: "سيارة فاخرة مثالية. السائق كان محترفاً ومتعاوناً جداً." }
    ],
    seoContent: {
      title: "GMC Yukon Premium SUV Chauffeur in Saudi Arabia",
      titleAr: "جمس يوكن بسائق خاص في السعودية",
      description: "Ensure your travel is in absolute luxury with our GMC Yukon chauffeur service. Ideal for VIP Umrah pilgrims and corporate executives in Saudi Arabia.",
      descriptionAr: "اضمن سفرك برفاهية مطلقة مع خدمة جمس يوكن بسائق خاص. مثالية لمعتمري بيت الله الحرام من كبار الشخصيات في السعودية.",
      longForm: "Ensure your travel is in absolute luxury with our GMC Yukon chauffeur service. Ideal for VIP Umrah pilgrims and corporate executives in Saudi Arabia, this premium SUV provides the perfect balance of luxury, safety, and comfort.",
      longFormAr: "اضمن سفرك برفاهية مطلقة مع خدمة سيارة جمس يوكن بسائق خاص. مثالية لمعتمري بيت الله الحرام من كبار الشخصيات والمسؤولين التنفيذيين في السعودية، حيث توفر هذه السيارة الفاخرة التوازن المثالي بين الرفاهية والأمان والراحة."
    }
  },
  {
    id: "hyundai-staria",
    slug: "hyundai-staria",
    category: "van",
    name: "Hyundai Staria",
    nameAr: "هيونداي ستاريا",
    type: "Executive Van",
    typeAr: "فان تنفيذي",
    passengers: 7,
    luggage: 6,
    heroImage: "/fleet/staria.png",
    interiorImage: "/fleet/staria-seats.jpg",
    gallery: [
      "/fleet/staria-exterior-rear.png",
      "/fleet/staria-seats.jpg",
      "/fleet/staria-dashboard.jpg"
    ],
    theme: {
      primary: "#1B1E4F",
      secondary: "#df9a26",
      personality: "Premium Family Luxury",
      personalityAr: "فخامة عائلية راقية"
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
      { id: "climate", label: "Multi-Zone Climate Control", labelAr: "تحكم مناخي متعدد المناطق" }
    ],
    faqs: [
      { q: "How many suitcases can it carry?", a: "The Hyundai Staria can comfortably hold 6 large suitcases in its rear cargo area.", qAr: "كم حقيبة سفر يمكن أن تحمل؟", aAr: "يمكنها استيعاب 6 حقائب سفر كبيرة براحة تامة." },
      { q: "Does it have comfortable seating for elderly passengers?", a: "Absolutely. The wide sliding doors, low step-in height, and captain's chairs make it incredibly accessible and comfortable for elderly travelers.", qAr: "هل المقاعد مريحة لكبار السن؟", aAr: "بالتأكيد. الأبواب المنزلقة الواسعة ومقاعد الكابتن تجعلها سهلة الوصول ومريحة جداً للمسافرين كبار السن." },
      { q: "Can I book it for a full day?", a: "Yes, you can hire the Staria for full-day private tours or personalized itineraries across Makkah, Madinah, and Jeddah.", qAr: "هل يمكنني حجزها ليوم كامل؟", aAr: "نعم، نقدم خيارات الحجز اليومي للمسارات المخصصة." }
    ],
    reviews: [
      { name: "Tariq Mahmood", country: "Pakistan", route: "Madinah to Makkah", rating: 5, review: "The most comfortable ride we've ever had for Umrah. The seats are like first-class airline seats.", reviewAr: "أكثر رحلة مريحة حظينا بها على الإطلاق في العمرة. المقاعد تشبه مقاعد الدرجة الأولى في الطائرات." }
    ],
    seoContent: {
      title: "Luxury Hyundai Staria VIP Hire in Saudi Arabia",
      titleAr: "استئجار هيونداي ستاريا VIP الفاخرة في السعودية",
      description: "Hire a premium Hyundai Staria VIP for Umrah and family transfers. Offering luxury captain's chairs and space for 7 passengers.",
      descriptionAr: "احجز سيارة هيونداي ستاريا VIP الفاخرة لتنقلات العمرة والعائلة. توفر مقاعد كابتن فاخرة ومساحة تتسع لـ 7 ركاب.",
      longForm: "Elevate your group travel with our Hyundai Staria VIP chauffeur service. Perfectly suited for discerning families and premium Umrah clients, the Staria offers an unparalleled luxury van experience. Enjoy captain's chairs, advanced climate control, and expansive legroom as our professional drivers navigate the routes between Jeddah, Makkah, and Madinah. Book the Hyundai Staria for a true first-class journey on the ground.",
      longFormAr: "ارتقِ بتجربة السفر الجماعي مع خدمة السائق الخاص لسيارة هيونداي ستاريا VIP. تعد ستاريا الخيار الأمثل للعائلات الراقية وعملاء باقات العمرة المميزة، حيث تقدم تجربة فان فاخرة لا مثيل لها. استمتع بمقاعد الكابتن، والتحكم المناخي المتقدم، والمساحة الرحبة للأرجل، بينما يقود سائقونا المحترفون عبر المسارات بين جدة ومكة والمدينة. احجز هيونداي ستاريا لتجربة سفر حقيقية من الدرجة الأولى على الأرض."
    }
  },
  {
    id: "hyundai-h1",
    slug: "hyundai-h1",
    category: "van",
    name: "Hyundai H1",
    nameAr: "هيونداي H1",
    type: "Executive Van",
    typeAr: "فان تنفيذي",
    passengers: 7,
    luggage: 6,
    heroImage: "/fleet/starex.png",
    interiorImage: "/fleet/starex.png", // Will need update
    gallery: [
      "/fleet/starex.png",
      "/fleet/starex.png",
      "/fleet/starex.png"
    ],
    theme: {
      primary: "#1B1E4F",
      secondary: "#df9a26",
      personality: "Reliable Group Transport",
      personalityAr: "نقل جماعي موثوق"
    },
    story: {
      title: "Reliable and Spacious Group Transport",
      titleAr: "نقل جماعي موثوق وواسع",
      content: "The Hyundai H1 offers a reliable, comfortable, and spacious solution for medium-sized groups. Perfect for extended families or Umrah groups, the H1 ensures everyone travels together in air-conditioned comfort, with plenty of room for all your luggage.",
      contentAr: "توفر هيونداي H1 حلاً موثوقاً ومريحاً وواسعاً للمجموعات متوسطة الحجم. مثالية للعائلات الكبيرة أو مجموعات العمرة، حيث تضمن سفر الجميع معاً في راحة مكيفة الهواء، مع مساحة وفيرة لجميع أمتعتكم."
    },
    perfectFor: [
      { id: "families", label: "Large Families", labelAr: "العائلات الكبيرة" },
      { id: "umrah", label: "Umrah Groups", labelAr: "مجموعات العمرة" },
      { id: "intercity", label: "Intercity Travel", labelAr: "السفر بين المدن" }
    ],
    comfortFeatures: [
      { id: "space", label: "Spacious Seating for 7", labelAr: "مقاعد واسعة لـ 7 ركاب" },
      { id: "ac", label: "Dual-Zone Climate Control", labelAr: "تحكم مناخي مزدوج" },
      { id: "luggage", label: "Ample Luggage Capacity", labelAr: "سعة أمتعة واسعة" }
    ],
    faqs: [
      { q: "How many people can fit in the Hyundai H1?", a: "It comfortably accommodates up to 7 passengers.", qAr: "كم عدد الركاب؟", aAr: "تتسع لما يصل إلى 7 ركاب براحة تامة." },
      { q: "Is it good for Umrah trips?", a: "Yes, it is highly requested for Umrah trips due to its passenger and luggage capacity.", qAr: "هل هي جيدة لرحلات العمرة؟", aAr: "نعم، هي مطلوبة جداً لرحلات العمرة نظراً لسعتها للركاب والأمتعة." }
    ],
    reviews: [
      { name: "Usman Tariq", country: "UK", route: "Jeddah to Makkah", rating: 5, review: "Perfect size for our group. The AC was strong and the ride was smooth.", reviewAr: "حجم مثالي لمجموعتنا. المكيف كان قوياً والرحلة سلسة." }
    ],
    seoContent: {
      title: "Hyundai H1 Van Rental in Saudi Arabia",
      titleAr: "استئجار فان هيونداي H1 في السعودية",
      description: "Hire a Hyundai H1 with a driver for reliable group transport. Ideal for Umrah groups up to 7 passengers, offering comfort and space.",
      descriptionAr: "استأجر فان هيونداي H1 مع سائق لنقل جماعي موثوق. مثالي لمجموعات العمرة حتى 7 ركاب.",
      longForm: "Hire a Hyundai H1 with a driver for reliable group transport. Ideal for Umrah groups up to 7 passengers, offering comfort, space, and a smooth journey.",
      longFormAr: "استأجر فان هيونداي H1 مع سائق لنقل جماعي موثوق. مثالي لمجموعات العمرة حتى 7 ركاب، ويوفر الراحة والمساحة والرحلة السلسة."
    }
  },
  {
    id: "toyota-hiace",
    slug: "toyota-hiace",
    category: "minibus",
    name: "Toyota Hiace",
    nameAr: "تويوتا هايس",
    type: "Large Van",
    typeAr: "فان كبير",
    passengers: 11,
    luggage: 11,
    heroImage: "/fleet/hiace.png",
    interiorImage: "/fleet/hiace.png", // Will need update
    gallery: [
      "/fleet/hiace.png",
      "/fleet/hiace.png",
      "/fleet/hiace.png"
    ],
    theme: {
      primary: "#1B1E4F",
      secondary: "#df9a26",
      personality: "Maximum Capacity Comfort",
      personalityAr: "راحة السعة القصوى"
    },
    story: {
      title: "Maximum Capacity for Large Groups",
      titleAr: "السعة القصوى للمجموعات الكبيرة",
      content: "When traveling with a large group, the Toyota Hiace is the unparalleled choice. Designed to accommodate up to 11 passengers comfortably along with their luggage, it is the backbone of Umrah transport. With reliable performance and strong air conditioning reaching every row, the Hiace keeps large families and tour groups together effortlessly.",
      contentAr: "عند السفر مع مجموعة كبيرة، تعتبر تويوتا هايس الخيار الذي لا يعلى عليه. صُممت لتستوعب ما يصل إلى 11 راكباً مع أمتعتهم بشكل مريح، وهي العمود الفقري لنقل العمرة. بفضل أدائها الموثوق، وتكييف الهواء القوي الذي يصل إلى كل صف، تحافظ هايس على بقاء العائلات الكبيرة والمجموعات السياحية معاً بكل سهولة."
    },
    perfectFor: [
      { id: "large_groups", label: "Large Groups", labelAr: "المجموعات الكبيرة" },
      { id: "umrah", label: "Umrah Tour Groups", labelAr: "مجموعات رحلات العمرة" },
      { id: "corporate", label: "Corporate Shuttles", labelAr: "نقل الشركات" }
    ],
    comfortFeatures: [
      { id: "seating", label: "Seating for up to 11", labelAr: "مقاعد تصل إلى 11" },
      { id: "ac", label: "Full Cabin Air Conditioning", labelAr: "تكييف هواء لكامل المقصورة" },
      { id: "durability", label: "Smooth & Safe Ride", labelAr: "رحلة سلسة وآمنة" }
    ],
    faqs: [
      { q: "What is the maximum passenger capacity?", a: "The Toyota Hiace can carry up to 11 passengers.", qAr: "ما هي أقصى سعة للركاب؟", aAr: "يمكن لسيارة تويوتا هايس حمل ما يصل إلى 11 راكباً." },
      { q: "Will there be room for all our luggage?", a: "Yes, it features a dedicated cargo area that holds up to 11 large suitcases.", qAr: "هل سيكون هناك متسع لجميع أمتعتنا؟", aAr: "نعم، تتميز بمنطقة مخصصة للأمتعة تتسع لـ 11 حقيبة كبيرة." },
      { q: "Are the drivers experienced with large vans?", a: "Absolutely. All our Hiace drivers are specially licensed and highly experienced in driving large passenger vans.", qAr: "هل السائقون ذوو خبرة في قيادة الحافلات الكبيرة؟", aAr: "بالتأكيد. جميع سائقي هايس لدينا مرخصون خصيصاً وذوو خبرة عالية في قيادة حافلات الركاب الكبيرة." }
    ],
    reviews: [
      { name: "Abdul Rahman", country: "Egypt", route: "Makkah to Madinah", rating: 5, review: "Excellent van for our large family. Everyone was comfortable and the driver was great.", reviewAr: "فان ممتاز لعائلتنا الكبيرة. كان الجميع مرتاحين والسائق كان رائعاً." }
    ],
    seoContent: {
      title: "Toyota Hiace Van Hire with Driver in Saudi Arabia",
      titleAr: "تأجير فان تويوتا هايس مع سائق في السعودية",
      description: "Book a Toyota Hiace for large group transportation in Saudi Arabia. Accommodating up to 11 passengers and 11 bags.",
      descriptionAr: "احجز تويوتا هايس لنقل المجموعات الكبيرة في السعودية. تتسع لـ 11 راكباً و 11 حقيبة.",
      longForm: "Book a Toyota Hiace for large group transportation in Saudi Arabia. Accommodating up to 11 passengers and their luggage, it is the perfect executive van for Umrah groups, large families, and corporate travel, offering unmatched reliability and space.",
      longFormAr: "احجز تويوتا هايس لنقل المجموعات الكبيرة في السعودية. تتسع لـ 11 راكباً مع أمتعتهم، وهي الفان التنفيذي المثالي لمجموعات العمرة، والعائلات الكبيرة، وسفر الشركات، وتوفر موثوقية ومساحة لا مثيل لها."
    }
  },
  {
    id: "coaster-bus",
    slug: "coaster-bus",
    category: "minibus",
    name: "Coaster Bus",
    nameAr: "حافلة كوستر",
    type: "Minibus",
    typeAr: "حافلة صغيرة",
    passengers: 19,
    luggage: 21,
    heroImage: "/fleet/coaster.png",
    interiorImage: "/fleet/coaster.png", // Will need update
    gallery: [
      "/fleet/coaster.png",
      "/fleet/coaster.png",
      "/fleet/coaster.png"
    ],
    theme: {
      primary: "#1B1E4F",
      secondary: "#df9a26",
      personality: "Large Group Travel",
      personalityAr: "نقل المجموعات الكبيرة"
    },
    story: {
      title: "Coordinated Travel for Large Groups",
      titleAr: "سفر منسق للمجموعات الكبيرة",
      content: "For exceptionally large groups, the Coaster Bus offers spacious, reliable, and coordinated travel. With seating for up to 19 passengers and 21 pieces of luggage, it's the most efficient way to transport Umrah tour groups or large corporate teams together.",
      contentAr: "بالنسبة للمجموعات الكبيرة استثنائياً، توفر حافلة كوستر سفراً واسعاً وموثوقاً ومنسقاً. مع مقاعد تتسع لـ 19 راكباً و 21 حقيبة، إنها الطريقة الأكثر كفاءة لنقل مجموعات العمرة أو فرق الشركات الكبيرة معاً."
    },
    perfectFor: [
      { id: "tour_groups", label: "Tour Groups", labelAr: "المجموعات السياحية" },
      { id: "umrah", label: "Umrah Delegations", labelAr: "وفود العمرة" },
      { id: "events", label: "Event Transport", labelAr: "نقل الفعاليات" }
    ],
    comfortFeatures: [
      { id: "seating", label: "Seating for up to 19", labelAr: "مقاعد تصل إلى 19" },
      { id: "ac", label: "Full Cabin Air Conditioning", labelAr: "تكييف هواء لكامل المقصورة" },
      { id: "luggage", label: "Massive Luggage Capacity", labelAr: "سعة أمتعة ضخمة" }
    ],
    faqs: [
      { q: "What is the maximum passenger capacity?", a: "The Coaster Bus can carry up to 19 passengers.", qAr: "ما هي أقصى سعة للركاب؟", aAr: "يمكن لحافلة كوستر حمل ما يصل إلى 19 راكباً." },
      { q: "Will there be room for all our luggage?", a: "Yes, it features a dedicated cargo area that holds up to 21 suitcases.", qAr: "هل سيكون هناك متسع لجميع أمتعتنا؟", aAr: "نعم، تتميز بمنطقة مخصصة للأمتعة تتسع لـ 21 حقيبة." }
    ],
    reviews: [
      { name: "Hassan Ali", country: "Indonesia", route: "Jeddah to Madinah", rating: 5, review: "Great experience for our large tour group of 18 people. Plenty of room for everyone and their bags.", reviewAr: "تجربة رائعة لمجموعتنا السياحية الكبيرة المكونة من 18 شخصاً. مساحة كبيرة للجميع وحقائبهم." }
    ],
    seoContent: {
      title: "Coaster Bus Rental for Umrah Groups in Saudi Arabia",
      titleAr: "تأجير حافلة كوستر لمجموعات العمرة في السعودية",
      description: "Book a 19-seater Coaster Bus for your large group. Perfect for Umrah tours and corporate transport with massive 21-bag capacity.",
      descriptionAr: "احجز حافلة كوستر بـ 19 مقعداً لمجموعتك الكبيرة. مثالية لرحلات العمرة مع سعة 21 حقيبة ضخمة.",
      longForm: "Book a 19-seater Coaster Bus for your large group. Perfect for Umrah tours and corporate transport with a massive 21-bag capacity. Keep your entire delegation together in cool, air-conditioned comfort across Saudi Arabia.",
      longFormAr: "احجز حافلة كوستر بـ 19 مقعداً لمجموعتك الكبيرة. مثالية لرحلات العمرة والنقل للشركات مع سعة 21 حقيبة ضخمة. حافظ على بقاء وفدك بالكامل معاً في راحة مكيفة ومنعشة عبر المملكة العربية السعودية."
    }
  },
  {
    id: "mitsubishi-xpander",
    slug: "mitsubishi-xpander",
    category: "sedan", // Treated as an MPV/sedan crossover, let's put it in sedan or van? Stated earlier it's a "Family MPV" so maybe Van.
    name: "Mitsubishi Xpander",
    nameAr: "ميتسوبيشي إكسباندر",
    type: "Family MPV",
    typeAr: "سيارة عائلية متعددة الأغراض",
    passengers: 5,
    luggage: 4,
    heroImage: "/fleet/camry.png", // Replace with real asset when available
    interiorImage: "/fleet/camry-seats.jpg",
    gallery: [
      "/fleet/camry-exterior-rear.png",
      "/fleet/camry-seats.jpg",
      "/fleet/camry-dashboard.jpg"
    ],
    theme: {
      primary: "#1B1E4F",
      secondary: "#df9a26",
      personality: "Family Practicality",
      personalityAr: "عملية عائلية"
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
      { q: "How many passengers does it seat?", a: "It can seat up to 7 passengers, but 5 is ideal for maximum luggage space.", qAr: "كم عدد الركاب؟", aAr: "تتسع لما يصل إلى 7 ركاب، لكن 5 هو العدد المثالي لأقصى مساحة أمتعة." },
      { q: "Is there enough room for luggage?", a: "For maximum luggage, folding down the rear row allows for up to 4 large bags.", qAr: "هل يوجد مساحة كافية للأمتعة؟", aAr: "للحصول على أقصى مساحة، يؤدي طي الصف الخلفي إلى استيعاب ما يصل إلى 4 حقائب كبيرة." }
    ],
    reviews: [
      { name: "Muhammad Rizwan", country: "Pakistan", route: "Makkah to Madinah", rating: 5, review: "Great car for our family of 5. Very comfortable.", reviewAr: "سيارة رائعة لعائلتنا المكونة من 5 أشخاص. مريحة جداً." }
    ],
    seoContent: {
      title: "Mitsubishi Xpander Family Transport in Saudi Arabia",
      titleAr: "نقل عائلي ميتسوبيشي إكسباندر في السعودية",
      description: "Book the Mitsubishi Xpander for your family's Umrah trip or airport transfer. The smart, comfortable choice for group travel.",
      descriptionAr: "احجز ميتسوبيشي إكسباندر لرحلة عمرة عائلتك أو لتنقلات المطار. الخيار الذكي والمريح للسفر الجماعي.",
      longForm: "Book the Mitsubishi Xpander for your family's Umrah trip or airport transfer. Offering space for up to 5-7 passengers, it's the smart, comfortable choice for group travel in Saudi Arabia.",
      longFormAr: "احجز ميتسوبيشي إكسباندر لرحلة عمرة عائلتك أو لتنقلات المطار. توفر مساحة تتسع لـ 5-7 ركاب، وهي الخيار الذكي والمريح للسفر الجماعي في السعودية."
    }
  }
];

export function getVehicleBySlug(slug: string): VehicleData | undefined {
  return fleetData.find(v => v.slug === slug);
}

export function getVehiclesByCategory(category: VehicleCategory): VehicleData[] {
  return fleetData.filter(v => v.category === category);
}

export function getAllVehicles(): VehicleData[] {
  return fleetData;
}
