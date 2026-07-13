import { Link } from "@/i18n/routing";
import { getTranslations, getLocale } from "next-intl/server";
import { MapPin, Phone, Mail, MessageCircle, ChevronDown } from "lucide-react";

import Image from "next/image";

export async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="bg-primary text-primary-foreground section-padding-t pb-12 border-t-[4px] border-secondary relative overflow-hidden">
      {/* Decorative Gold Elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50"></div>
      
      <div className="container-fluid relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 md:gap-x-12 lg:gap-8 mb-16">
          
          {/* Company Info */}
          <div className="space-y-6 md:mb-0 mb-6">
            <Link href="/" className="inline-block bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
              <Image src="/logo.png" alt="Mehar Transport" width={120} height={56} className="h-14 w-auto brightness-0 invert" />
            </Link>
            <p className="text-white/70 text-[15px] leading-relaxed max-w-xs font-light">
              {t("thePremierChoiceForLuxuryTransportation")}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all shadow-md">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all shadow-md">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all shadow-md">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h4 className="text-lg font-bold text-secondary uppercase tracking-wider pb-4 md:pb-6 border-b border-white/10 md:border-none">{t("quickLinks")}</h4>
            <div>
              <ul className="space-y-2">
                <li>
                  <Link href="/fleet" className="text-white/70 hover:text-secondary transition-colors flex items-center gap-2 py-2 md:py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary/50"></span>
                    {t("ourFleet")}
                  </Link>
                </li>
                <li>
                  <Link href="/routes" className="text-white/70 hover:text-secondary transition-colors flex items-center gap-2 py-2 md:py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary/50"></span>
                    {t("routes")}
                  </Link>
                </li>

                <li>
                  <Link href="/booking" className="text-white/70 hover:text-secondary transition-colors flex items-center gap-2 py-2 md:py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary/50"></span>
                    {t("bookNow")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col">
            <h4 className="text-lg font-bold text-secondary uppercase tracking-wider pb-4 md:pb-6 border-b border-white/10 md:border-none">{t("contactUs")}</h4>
            <div>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-secondary">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <a href="https://maps.app.goo.gl/Qrz4rQjfFJt89i45A" target="_blank" rel="noreferrer" className="text-white/70 text-[15px] leading-relaxed pt-2 hover:text-secondary transition-colors">
                    {t("jeddahSaudiArabia")}
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-secondary">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <a href="tel:+966565638120" className="text-white/70 text-[15px] hover:text-secondary transition-colors py-1" dir="ltr">+966 56 563 8120</a>
                    <a href="tel:+966548707332" className="text-white/70 text-[15px] hover:text-secondary transition-colors py-1" dir="ltr">+966 54 870 7332</a>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-secondary">
                    <Mail className="w-4 h-4" />
                  </div>
                  <a href="mailto:info@mehartransport.com" className="text-white/70 text-[15px] hover:text-secondary transition-colors py-2">info@mehartransport.com</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Map/Booking Widget */}
          <div className="space-y-6 pt-4 md:pt-0">
            <h4 className="text-lg font-bold text-secondary uppercase tracking-wider">{t("location")}</h4>
            <div className="w-full h-48 rounded-2xl overflow-hidden border border-white/10 shadow-lg relative group">
              <iframe 
                title="Mehar Transport Location"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                loading="lazy" 
                allowFullScreen 
                referrerPolicy="no-referrer-when-downgrade" 
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Mehar%20Umrah%20Transport,%20Jeddah,%20Saudi%20Arabia&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
              </iframe>
              <a href="https://maps.app.goo.gl/Qrz4rQjfFJt89i45A" target="_blank" rel="noreferrer" className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-secondary text-primary font-bold px-4 py-2 rounded-xl text-sm">Open in Google Maps</span>
              </a>
            </div>
            <a 
              href="https://wa.me/966565638120" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white hover:bg-[#20bd5a] px-4 py-4 rounded-xl text-[15px] font-bold transition-colors shadow-lg min-h-[56px]"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{t("chatOnWhatsapp")}</span>
            </a>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex items-center justify-center">
          <p className="text-white/50 text-[15px] text-center">
            © {new Date().getFullYear()} Mehar Transport. {t("allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  );
}
