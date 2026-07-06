// ============================================================
// MEHAR TRANSPORT — ENTERPRISE ADMIN DATA (CLEARED MOCKS)
// ============================================================

export const kpiCards = [
  { id: "total-bookings",   label: "Total Bookings",       labelAr: "إجمالي الحجوزات",     value: 0,   change: 0,  prefix: "",    suffix: "",    sparkline: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { id: "today-bookings",   label: "Today's Bookings",     labelAr: "حجوزات اليوم",         value: 0,     change: 0,   prefix: "",    suffix: "",    sparkline: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { id: "monthly-revenue",  label: "Monthly Revenue",      labelAr: "إيرادات الشهر",        value: 0, change: 0,  prefix: "",    suffix: " SAR", sparkline: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { id: "active-vehicles",  label: "Active Vehicles",      labelAr: "المركبات النشطة",       value: 0,     change: 0,   prefix: "",    suffix: "",    sparkline: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { id: "pending-requests", label: "Pending Requests",     labelAr: "الطلبات المعلقة",       value: 0,     change: 0,  prefix: "",    suffix: "",    sparkline: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { id: "satisfaction",     label: "Customer Satisfaction", labelAr: "رضا العملاء",          value: 0,    change: 0,   prefix: "",    suffix: "/5",  sparkline: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { id: "conversion",       label: "Conversion Rate",      labelAr: "معدل التحويل",         value: 0,     change: 0,   prefix: "",    suffix: "%",   sparkline: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { id: "avg-booking",      label: "Avg. Booking Value",   labelAr: "متوسط قيمة الحجز",     value: 0,    change: 0,   prefix: "",    suffix: " SAR", sparkline: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
];

export const revenueChartData = [
  { month: "Jan", current: 0, previous: 0 },
  { month: "Feb", current: 0, previous: 0 },
  { month: "Mar", current: 0, previous: 0 },
  { month: "Apr", current: 0, previous: 0 },
  { month: "May", current: 0, previous: 0 },
  { month: "Jun", current: 0, previous: 0 },
  { month: "Jul", current: 0, previous: 0 },
  { month: "Aug", current: 0, previous: 0 },
  { month: "Sep", current: 0, previous: 0 },
  { month: "Oct", current: 0, previous: 0 },
  { month: "Nov", current: 0, previous: 0 },
  { month: "Dec", current: 0, previous: 0 },
];

export const bookingsByRoute: any[] = [];
export const bookingsByVehicle: any[] = [];

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

export const mockBookings: Booking[] = [];
export const liveActivities: any[] = [];
export const mockDrivers: any[] = [];
export const mockCustomers: any[] = [];

export const sidebarMenuItems = [
  { section: "Main",      sectionAr: "الرئيسية",    items: [
    { id: "dashboard",  label: "Dashboard",         labelAr: "لوحة التحكم",       icon: "LayoutDashboard", href: "/admin" },
    { id: "bookings",   label: "Bookings",          labelAr: "الحجوزات",          icon: "CalendarCheck",   href: "/admin/bookings" },
  ]},
  { section: "Operations", sectionAr: "العمليات", items: [
    { id: "routes",     label: "Routes",            labelAr: "المسارات",          icon: "Route",           href: "/admin/routes" },
    { id: "fleet",      label: "Fleet",             labelAr: "الأسطول",           icon: "Car",             href: "/admin/fleet" },
    { id: "pricing",    label: "Pricing Engine",    labelAr: "نظام التسعير",      icon: "Calculator",      href: "/admin/pricing" },
    { id: "drivers",    label: "Drivers",           labelAr: "السائقون",          icon: "UserCog",         href: "/admin/drivers" },
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
