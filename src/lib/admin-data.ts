// ============================================================
// MEHAR TRANSPORT — ENTERPRISE ADMIN MOCK DATA
// ============================================================

export const kpiCards = [
  { id: "total-bookings",   label: "Total Bookings",       labelAr: "إجمالي الحجوزات",     value: 2847,   change: 12.5,  prefix: "",    suffix: "",    sparkline: [120, 132, 101, 134, 90, 170, 210, 180, 195, 220, 240, 260] },
  { id: "today-bookings",   label: "Today's Bookings",     labelAr: "حجوزات اليوم",         value: 34,     change: 8.2,   prefix: "",    suffix: "",    sparkline: [5, 8, 12, 15, 18, 22, 25, 28, 30, 32, 33, 34] },
  { id: "monthly-revenue",  label: "Monthly Revenue",      labelAr: "إيرادات الشهر",        value: 847500, change: 18.3,  prefix: "",    suffix: " SAR", sparkline: [450000, 520000, 490000, 580000, 620000, 710000, 680000, 750000, 790000, 810000, 830000, 847500] },
  { id: "active-vehicles",  label: "Active Vehicles",      labelAr: "المركبات النشطة",       value: 42,     change: 5.0,   prefix: "",    suffix: "",    sparkline: [35, 36, 38, 37, 40, 39, 41, 40, 42, 41, 42, 42] },
  { id: "pending-requests", label: "Pending Requests",     labelAr: "الطلبات المعلقة",       value: 12,     change: -4.2,  prefix: "",    suffix: "",    sparkline: [20, 18, 15, 14, 16, 13, 12, 14, 11, 13, 12, 12] },
  { id: "satisfaction",     label: "Customer Satisfaction", labelAr: "رضا العملاء",          value: 4.8,    change: 2.1,   prefix: "",    suffix: "/5",  sparkline: [4.2, 4.3, 4.4, 4.5, 4.5, 4.6, 4.6, 4.7, 4.7, 4.8, 4.8, 4.8] },
  { id: "conversion",       label: "Conversion Rate",      labelAr: "معدل التحويل",         value: 68,     change: 3.7,   prefix: "",    suffix: "%",   sparkline: [55, 58, 60, 62, 63, 64, 65, 66, 67, 67, 68, 68] },
  { id: "avg-booking",      label: "Avg. Booking Value",   labelAr: "متوسط قيمة الحجز",     value: 485,    change: 6.9,   prefix: "",    suffix: " SAR", sparkline: [380, 400, 410, 420, 435, 440, 450, 455, 465, 470, 480, 485] },
];

export const revenueChartData = [
  { month: "Jan", current: 520000, previous: 420000 },
  { month: "Feb", current: 580000, previous: 480000 },
  { month: "Mar", current: 490000, previous: 510000 },
  { month: "Apr", current: 620000, previous: 530000 },
  { month: "May", current: 710000, previous: 560000 },
  { month: "Jun", current: 680000, previous: 610000 },
  { month: "Jul", current: 750000, previous: 640000 },
  { month: "Aug", current: 830000, previous: 590000 },
  { month: "Sep", current: 790000, previous: 670000 },
  { month: "Oct", current: 850000, previous: 720000 },
  { month: "Nov", current: 810000, previous: 750000 },
  { month: "Dec", current: 847500, previous: 780000 },
];

export const bookingsByRoute = [
  { name: "Jeddah → Makkah", value: 980, fill: "#1B1E4F" },
  { name: "Makkah → Madinah", value: 720, fill: "#D9A63A" },
  { name: "Madinah → Jeddah", value: 540, fill: "#2563EB" },
  { name: "Jeddah → Taif", value: 310, fill: "#16A34A" },
  { name: "Airport Transfers", value: 297, fill: "#F59E0B" },
];

export const bookingsByVehicle = [
  { name: "Hyundai Staria", bookings: 520 },
  { name: "Toyota Hiace",   bookings: 480 },
  { name: "Kia K5",         bookings: 410 },
  { name: "Xpander",        bookings: 380 },
  { name: "Mercedes S",     bookings: 340 },
  { name: "Toyota Coaster", bookings: 310 },
  { name: "Luxury Bus",     bookings: 250 },
  { name: "Rolls-Royce",    bookings: 157 },
];

export type BookingStatus = "pending" | "confirmed" | "assigned" | "in_progress" | "completed" | "cancelled" | "refunded";

export interface Booking {
  id: string;
  customer: string;
  phone: string;
  route: string;
  vehicle: string;
  driver: string;
  date: string;
  passengers: number;
  amount: number;
  status: BookingStatus;
}

export const statusConfig: Record<BookingStatus, { label: string; labelAr: string; color: string; bg: string }> = {
  pending:     { label: "Pending",     labelAr: "معلّق",     color: "#F59E0B", bg: "#FEF3C7" },
  confirmed:   { label: "Confirmed",   labelAr: "مؤكد",      color: "#2563EB", bg: "#DBEAFE" },
  assigned:    { label: "Assigned",    labelAr: "تم التعيين", color: "#7C3AED", bg: "#EDE9FE" },
  in_progress: { label: "In Progress", labelAr: "قيد التنفيذ",color: "#0891B2", bg: "#CFFAFE" },
  completed:   { label: "Completed",   labelAr: "مكتمل",     color: "#16A34A", bg: "#DCFCE7" },
  cancelled:   { label: "Cancelled",   labelAr: "ملغى",      color: "#DC2626", bg: "#FEE2E2" },
  refunded:    { label: "Refunded",    labelAr: "مسترد",     color: "#6B7280", bg: "#F3F4F6" },
};

export const mockBookings: Booking[] = [
  { id: "MHR-2847", customer: "Ahmed Al-Rashid",    phone: "+966 55 123 4567", route: "Jeddah Airport → Makkah", vehicle: "Mercedes S-Class", driver: "Khalid Omar",     date: "2025-06-01", passengers: 3, amount: 1200, status: "pending" },
  { id: "MHR-2846", customer: "Fatima Hassan",      phone: "+966 50 987 6543", route: "Makkah → Madinah",       vehicle: "Hyundai Staria",   driver: "Saeed Ahmed",     date: "2025-06-01", passengers: 6, amount: 850,  status: "confirmed" },
  { id: "MHR-2845", customer: "Omar Enterprises",   phone: "+966 54 111 2233", route: "Jeddah Airport → Makkah", vehicle: "Rolls-Royce",      driver: "Faisal Mansour",  date: "2025-06-01", passengers: 2, amount: 3500, status: "assigned" },
  { id: "MHR-2844", customer: "Aisha Mohammed",     phone: "+966 56 444 5566", route: "Makkah → Madinah",       vehicle: "Toyota Hiace",     driver: "Youssef Ali",     date: "2025-05-31", passengers: 11, amount: 1800, status: "in_progress" },
  { id: "MHR-2843", customer: "Ali Bakr Group",     phone: "+966 59 777 8899", route: "Madinah → Jeddah",       vehicle: "Toyota Coaster",   driver: "Hassan Ibrahim",  date: "2025-05-31", passengers: 20, amount: 2200, status: "completed" },
  { id: "MHR-2842", customer: "Sarah Al-Qahtani",   phone: "+966 53 222 3344", route: "Jeddah Airport → Makkah", vehicle: "Kia K5",           driver: "Tariq Nasser",    date: "2025-05-31", passengers: 2, amount: 350,  status: "completed" },
  { id: "MHR-2841", customer: "Noor Travel Agency", phone: "+966 51 666 7788", route: "Makkah → Madinah",       vehicle: "Luxury Bus",       driver: "Waleed Saleh",    date: "2025-05-30", passengers: 45, amount: 4500, status: "completed" },
  { id: "MHR-2840", customer: "Mohammed Khalil",    phone: "+966 58 333 4455", route: "Jeddah Airport → Makkah", vehicle: "Xpander",          driver: "Abdulrahman",     date: "2025-05-30", passengers: 5, amount: 480,  status: "cancelled" },
  { id: "MHR-2839", customer: "Layla Ahmad",        phone: "+966 52 555 6677", route: "Madinah → Jeddah",       vehicle: "Hyundai Staria",   driver: "Karim Yusuf",     date: "2025-05-30", passengers: 4, amount: 900,  status: "refunded" },
  { id: "MHR-2838", customer: "Huda Pilgrim Group", phone: "+966 57 888 9900", route: "Makkah → Madinah",       vehicle: "Toyota Hiace",     driver: "Bilal Othman",    date: "2025-05-29", passengers: 12, amount: 1600, status: "completed" },
];

export const liveActivities = [
  { id: 1, type: "booking",    icon: "📋", message: "New booking MHR-2847 from Ahmed Al-Rashid",            messageAr: "حجز جديد MHR-2847 من أحمد الراشد",                   time: "2 min ago",  timeAr: "منذ دقيقتين" },
  { id: 2, type: "payment",    icon: "💳", message: "Payment of 3,500 SAR received for MHR-2845",           messageAr: "تم استلام دفعة 3,500 ريال لحجز MHR-2845",             time: "5 min ago",  timeAr: "منذ 5 دقائق" },
  { id: 3, type: "driver",     icon: "🚗", message: "Driver Faisal Mansour assigned to MHR-2845",           messageAr: "تم تعيين السائق فيصل منصور للحجز MHR-2845",           time: "8 min ago",  timeAr: "منذ 8 دقائق" },
  { id: 4, type: "message",    icon: "💬", message: "New WhatsApp inquiry from +966 50 111 2233",            messageAr: "استفسار واتساب جديد من +966 50 111 2233",             time: "12 min ago", timeAr: "منذ 12 دقيقة" },
  { id: 5, type: "completed",  icon: "✅", message: "Booking MHR-2843 completed successfully",               messageAr: "اكتمل الحجز MHR-2843 بنجاح",                         time: "18 min ago", timeAr: "منذ 18 دقيقة" },
  { id: 6, type: "cancelled",  icon: "❌", message: "Booking MHR-2840 cancelled by customer",                messageAr: "تم إلغاء الحجز MHR-2840 من قبل العميل",              time: "25 min ago", timeAr: "منذ 25 دقيقة" },
  { id: 7, type: "review",     icon: "⭐", message: "New 5-star review from Ali Bakr Group",                  messageAr: "تقييم جديد 5 نجوم من مجموعة علي بكر",                time: "30 min ago", timeAr: "منذ 30 دقيقة" },
  { id: 8, type: "alert",      icon: "🔔", message: "Mercedes S-Class maintenance due in 3 days",            messageAr: "صيانة مرسيدس الفئة-S مستحقة خلال 3 أيام",             time: "45 min ago", timeAr: "منذ 45 دقيقة" },
];

export const mockDrivers = [
  { id: "D001", name: "Khalid Omar",       nameAr: "خالد عمر",        phone: "+966 55 100 2001", photo: "https://i.pravatar.cc/150?u=d001", license: "SAU-DL-45892",  languages: ["Arabic", "English", "Urdu"],       rating: 4.9, availability: "available",  trips: 342, revenue: 156000 },
  { id: "D002", name: "Saeed Ahmed",       nameAr: "سعيد أحمد",       phone: "+966 55 100 2002", photo: "https://i.pravatar.cc/150?u=d002", license: "SAU-DL-33721",  languages: ["Arabic", "English"],              rating: 4.8, availability: "on_trip",    trips: 298, revenue: 132000 },
  { id: "D003", name: "Faisal Mansour",    nameAr: "فيصل منصور",      phone: "+966 55 100 2003", photo: "https://i.pravatar.cc/150?u=d003", license: "SAU-DL-67104",  languages: ["Arabic", "English", "French"],     rating: 5.0, availability: "available",  trips: 412, revenue: 245000 },
  { id: "D004", name: "Youssef Ali",       nameAr: "يوسف علي",        phone: "+966 55 100 2004", photo: "https://i.pravatar.cc/150?u=d004", license: "SAU-DL-12458",  languages: ["Arabic", "Urdu"],                 rating: 4.7, availability: "on_trip",    trips: 267, revenue: 118000 },
  { id: "D005", name: "Hassan Ibrahim",    nameAr: "حسن إبراهيم",     phone: "+966 55 100 2005", photo: "https://i.pravatar.cc/150?u=d005", license: "SAU-DL-98765",  languages: ["Arabic", "English", "Turkish"],    rating: 4.9, availability: "available",  trips: 389, revenue: 198000 },
  { id: "D006", name: "Tariq Nasser",      nameAr: "طارق ناصر",       phone: "+966 55 100 2006", photo: "https://i.pravatar.cc/150?u=d006", license: "SAU-DL-54321",  languages: ["Arabic", "English"],              rating: 4.6, availability: "off_duty",   trips: 215, revenue: 95000 },
];

export const mockCustomers = [
  { id: "C001", name: "Ahmed Al-Rashid",    phone: "+966 55 123 4567", email: "ahmed@email.com",    totalBookings: 12, lifetimeValue: 14200, favoriteRoute: "Jeddah → Makkah",  preferredVehicle: "Mercedes S-Class", tags: ["VIP", "Frequent"],   lastBooking: "2025-06-01" },
  { id: "C002", name: "Fatima Hassan",      phone: "+966 50 987 6543", email: "fatima@email.com",   totalBookings: 8,  lifetimeValue: 6800,  favoriteRoute: "Makkah → Madinah", preferredVehicle: "Hyundai Staria",   tags: ["Family"],            lastBooking: "2025-06-01" },
  { id: "C003", name: "Omar Enterprises",   phone: "+966 54 111 2233", email: "omar@corp.com",      totalBookings: 24, lifetimeValue: 84000, favoriteRoute: "Jeddah Airport",   preferredVehicle: "Rolls-Royce",      tags: ["Corporate", "VIP"],  lastBooking: "2025-06-01" },
  { id: "C004", name: "Noor Travel Agency", phone: "+966 51 666 7788", email: "noor@travel.com",    totalBookings: 36, lifetimeValue: 162000,favoriteRoute: "Makkah → Madinah", preferredVehicle: "Luxury Bus",       tags: ["Agency", "Bulk"],    lastBooking: "2025-05-30" },
  { id: "C005", name: "Sarah Al-Qahtani",   phone: "+966 53 222 3344", email: "sarah@email.com",    totalBookings: 3,  lifetimeValue: 1050,  favoriteRoute: "Jeddah → Makkah",  preferredVehicle: "Kia K5",           tags: ["New"],               lastBooking: "2025-05-31" },
];

export const sidebarMenuItems = [
  { section: "Main",      sectionAr: "الرئيسية",    items: [
    { id: "dashboard",  label: "Dashboard",         labelAr: "لوحة التحكم",       icon: "LayoutDashboard", href: "/admin" },
    { id: "bookings",   label: "Bookings",          labelAr: "الحجوزات",          icon: "CalendarCheck",   href: "/admin/bookings" },
    { id: "vehicles",   label: "Vehicles",          labelAr: "المركبات",          icon: "Car",             href: "/admin/vehicles" },
    { id: "drivers",    label: "Drivers",           labelAr: "السائقون",          icon: "UserCog",         href: "/admin/drivers" },
  ]},
  { section: "Operations", sectionAr: "العمليات", items: [
    { id: "routes",     label: "Routes",            labelAr: "المسارات",          icon: "Route",           href: "/admin/routes" },
    { id: "packages",   label: "Packages",          labelAr: "الباقات",           icon: "Package",         href: "/admin/packages" },
    { id: "pricing",    label: "Pricing Engine",    labelAr: "نظام التسعير",      icon: "Calculator",      href: "/admin/pricing" },
    { id: "customers",  label: "Customers",         labelAr: "العملاء",           icon: "Users",           href: "/admin/customers" },
  ]},
  { section: "Content",   sectionAr: "المحتوى",    items: [
    { id: "blog",       label: "Blog Posts",        labelAr: "المدونة",           icon: "FileText",        href: "/admin/blog" },
    { id: "categories", label: "Categories",        labelAr: "التصنيفات",         icon: "LayoutDashboard", href: "/admin/blog/categories" },
    { id: "tags",       label: "Tags",              labelAr: "الوسوم",            icon: "Star",            href: "/admin/blog/tags" },
    { id: "authors",    label: "Authors",           labelAr: "المؤلفون",          icon: "Users",           href: "/admin/blog/authors" },
    { id: "reviews",    label: "Reviews",           labelAr: "التقييمات",         icon: "Star",            href: "/admin/reviews" },
    { id: "gallery",    label: "Gallery",           labelAr: "المعرض",            icon: "Image",           href: "/admin/gallery" },
    { id: "messages",   label: "Messages",          labelAr: "الرسائل",           icon: "MessageSquare",   href: "/admin/messages" },
  ]},
  { section: "Insights",  sectionAr: "التحليلات",  items: [
    { id: "analytics",  label: "Analytics",         labelAr: "التحليلات",         icon: "BarChart3",       href: "/admin/analytics" },
    { id: "reports",    label: "Reports",           labelAr: "التقارير",          icon: "FileText",        href: "/admin/reports" },
  ]},
  { section: "System",    sectionAr: "النظام",      items: [
    { id: "settings",   label: "Settings",          labelAr: "الإعدادات",         icon: "Settings",        href: "/admin/settings" },
    { id: "activity",   label: "Activity Logs",     labelAr: "سجلات النشاط",      icon: "History",         href: "/admin/activity" },
  ]},
];
