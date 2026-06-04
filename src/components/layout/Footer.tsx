import { Link } from "@/i18n/routing";
import { getTranslations, getLocale } from "next-intl/server";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

export async function Footer() {
  const t = await getTranslations("HomePage");
  const locale = await getLocale();
  const isAr = locale === "ar";

  return (
    <footer className="bg-[#0b0c21] text-white pt-24 pb-12 border-t-[4px] border-secondary relative overflow-hidden">
      {/* Decorative Gold Elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="inline-block bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10">
              <img src="/logo.png" alt="Mehar Transport" className="h-14 w-auto brightness-0 invert" />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs font-light">
              {isAr 
                ? "الخيار الأول للنقل الفاخر في المملكة العربية السعودية. نوفر أسطولاً متميزاً لخدمات العمرة وتوصيل المطارات بأعلى معايير الجودة."
                : "The premier choice for luxury transportation in Saudi Arabia. Providing a distinguished fleet for Umrah services and airport transfers with the highest quality standards."}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-secondary uppercase tracking-wider">{isAr ? "روابط سريعة" : "Quick Links"}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/fleet" className="text-white/70 hover:text-secondary transition-colors inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary/50"></span>
                  {isAr ? "أسطولنا" : "Our Fleet"}
                </Link>
              </li>
              <li>
                <Link href="/routes" className="text-white/70 hover:text-secondary transition-colors inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary/50"></span>
                  {isAr ? "المسارات" : "Routes"}
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-white/70 hover:text-secondary transition-colors inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary/50"></span>
                  {isAr ? "باقات العمرة" : "Umrah Packages"}
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-white/70 hover:text-secondary transition-colors inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary/50"></span>
                  {isAr ? "احجز الآن" : "Book Now"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-secondary uppercase tracking-wider">{isAr ? "تواصل معنا" : "Contact Us"}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-secondary">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-white/70 text-sm leading-relaxed pt-2">
                  {isAr ? "جدة، المملكة العربية السعودية" : "Jeddah, Saudi Arabia"}
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-secondary">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-white/70 text-sm" dir="ltr">+966 50 000 0000</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-secondary">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-white/70 text-sm">info@mehartransport.com</span>
              </li>
            </ul>
          </div>

          {/* Map/Booking Widget */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-secondary uppercase tracking-wider">{isAr ? "خدمة العملاء" : "Customer Service"}</h4>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <p className="text-white/70 text-sm mb-6 leading-relaxed">
                {isAr 
                  ? "فريقنا متواجد على مدار الساعة لخدمتكم والرد على استفساراتكم."
                  : "Our team is available 24/7 to assist you with your booking inquiries."}
              </p>
              <a 
                href="https://wa.me/966565638120" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white hover:bg-[#20bd5a] px-4 py-3 rounded-xl text-sm font-bold transition-colors shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{isAr ? "تواصل عبر واتساب" : "Chat on WhatsApp"}</span>
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Mehar Transport. {isAr ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>
          <div className="flex gap-6 text-sm text-white/50">
            <Link href="/privacy" className="hover:text-secondary transition-colors">{isAr ? "سياسة الخصوصية" : "Privacy Policy"}</Link>
            <Link href="/terms" className="hover:text-secondary transition-colors">{isAr ? "الشروط والأحكام" : "Terms & Conditions"}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
