import { Link } from "@/i18n/routing";
import { getTranslations, getLocale } from "next-intl/server";
import { MapPin, Phone, Mail, MessageCircle, ChevronDown } from "lucide-react";

import Image from "next/image";

export async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="bg-primary text-primary-foreground section-padding-t pb-12 border-t-[4px] border-secondary relative overflow-hidden">
      {/* Decorative Brand Elements */}
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
              <a href="https://www.youtube.com/@meharumrahtransport" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all shadow-md">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@mehartransport1" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all shadow-md">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/meharumrahtransport" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all shadow-md">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/meharumrahtransport/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all shadow-md">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
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
