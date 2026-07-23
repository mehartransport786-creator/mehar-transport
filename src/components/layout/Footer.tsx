import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import Image from "next/image";

export async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="bg-primary text-primary-foreground pt-12 pb-6 border-t-[4px] border-secondary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50"></div>
      
      <div className="container-fluid relative z-10">
        
        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-8 md:gap-x-6 lg:gap-6 mb-10">
          
          {/* Column 1 - Identity */}
          <div className="space-y-6">
            <Link href="/" className="inline-block bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
              <Image src="/logo.png" alt="Mehar Transport" width={120} height={56} className="h-14 w-auto brightness-0 invert" />
            </Link>
            <div className="space-y-4">
              <p className="text-white/80 text-[15px] leading-relaxed font-light">
                Chauffeur-driven transport across Saudi Arabia since 2016. Headquartered in Al Nawariyah, with drivers stationed centrally in Makkah — minutes from the Haram, so your driver reaches you faster. Every vehicle comes with a professional driver.
              </p>
              <p className="text-white/60 text-sm font-medium">
                Nusuk-registered &middot; Licensed by the Ministry of Hajj and Umrah
              </p>
            </div>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/meharumrahtransport" target="_blank" rel="me noopener" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all shadow-md">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.instagram.com/meharumrahtransport/" target="_blank" rel="me noopener" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all shadow-md">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.youtube.com/@meharumrahtransport" target="_blank" rel="me noopener" aria-label="YouTube" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all shadow-md">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@mehartransport1" target="_blank" rel="me noopener" aria-label="TikTok" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all shadow-md">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2 - Our Services */}
          <div>
            <h4 className="text-[16px] font-bold text-white mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="text-white/70 hover:text-secondary text-[15px] transition-colors">
                  All Transport Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Popular Routes */}
          <div>
            <h4 className="text-[16px] font-bold text-white mb-4 lg:mb-6">Popular Routes</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/routes/jeddah-to-makkah" className="text-white/70 hover:text-secondary text-[15px] transition-colors">
                  Jeddah Airport to Makkah
                </Link>
              </li>
              <li>
                <Link href="/routes/makkah-to-madinah" className="text-white/70 hover:text-secondary text-[15px] transition-colors">
                  Makkah to Madinah
                </Link>
              </li>
              <li>
                <Link href="/routes/madinah-to-jeddah-airport" className="text-white/70 hover:text-secondary text-[15px] transition-colors">
                  Madinah to Jeddah Airport
                </Link>
              </li>
              <li>
                <Link href="/routes/makkah-to-jeddah-airport" className="text-white/70 hover:text-secondary text-[15px] transition-colors">
                  Makkah to Jeddah Airport
                </Link>
              </li>
              <li>
                <Link href="/routes/jeddah-to-taif" className="text-white/70 hover:text-secondary text-[15px] transition-colors">
                  Jeddah to Taif
                </Link>
              </li>
              <li>
                <Link href="/routes/riyadh-airport-to-riyadh" className="text-white/70 hover:text-secondary text-[15px] transition-colors">
                  Riyadh Airport to Riyadh Hotels
                </Link>
              </li>
              <li className="pt-1.5">
                <Link href="/routes" className="text-secondary hover:text-white font-medium text-[15px] transition-colors">
                  View All Routes & Fares
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Our Fleet */}
          <div>
            <h4 className="text-[16px] font-bold text-white mb-4 lg:mb-6">Our Fleet</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/fleet/toyota-camry" className="text-white/70 hover:text-secondary text-[15px] transition-colors">
                  Toyota Camry &mdash; Executive Sedan (3 passengers)
                </Link>
              </li>
              <li>
                <Link href="/fleet/hyundai-staria" className="text-white/70 hover:text-secondary text-[15px] transition-colors">
                  Hyundai Staria &mdash; Executive Van (6)
                </Link>
              </li>
              <li>
                <Link href="/fleet/hyundai-h1" className="text-white/70 hover:text-secondary text-[15px] transition-colors">
                  Hyundai H1 &mdash; Executive Van (6)
                </Link>
              </li>
              <li>
                <Link href="/fleet/toyota-hiace" className="text-white/70 hover:text-secondary text-[15px] transition-colors">
                  Toyota Hiace &mdash; Large Van (10)
                </Link>
              </li>
              <li>
                <Link href="/fleet/gmc-denali" className="text-white/70 hover:text-secondary text-[15px] transition-colors">
                  GMC Denali &mdash; Luxury SUV (6)
                </Link>
              </li>
              <li>
                <Link href="/fleet/coaster-bus" className="text-white/70 hover:text-secondary text-[15px] transition-colors">
                  Coaster Bus &mdash; Group Coach (20)
                </Link>
              </li>
              <li className="pt-2">
                <Link href="/fleet" className="text-secondary hover:text-white font-medium text-[15px] transition-colors">
                  View Full Fleet
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5 - Company */}
          <div>
            <h4 className="text-[16px] font-bold text-white mb-4 lg:mb-6">Company</h4>
            <ul className="space-y-2.5">
              <li><Link href="/cities" className="text-white/70 hover:text-secondary text-[15px] transition-colors">Cities We Serve</Link></li>
              <li><Link href="/about" className="text-white/70 hover:text-secondary text-[15px] transition-colors">About Mehar Transport</Link></li>
              <li><Link href="/blog" className="text-white/70 hover:text-secondary text-[15px] transition-colors">Travel Guides & Umrah Tips</Link></li>
              <li><Link href="/contact" className="text-white/70 hover:text-secondary text-[15px] transition-colors">Contact Us</Link></li>
              <li><Link href="/booking" className="text-white/70 hover:text-secondary text-[15px] transition-colors">Book Your Transfer</Link></li>
              <li><Link href="/terms" className="text-white/70 hover:text-secondary text-[15px] transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="text-white/70 hover:text-secondary text-[15px] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/cancellation-policy" className="text-white/70 hover:text-secondary text-[15px] transition-colors">Cancellation & Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact Block */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
          
          <div className="space-y-4 max-w-xl">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Mehar Transport</h3>
              <p className="text-white/70 text-sm flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-secondary" />
                <a href="https://maps.app.goo.gl/Qrz4rQjfFJt89i45A" target="_blank" rel="noreferrer" className="hover:text-secondary transition-colors">
                  Al Nawariyah District, Makkah, Saudi Arabia
                </a>
              </p>
            </div>
            
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              <a href="tel:+966565638120" className="flex items-center gap-2 text-white/80 hover:text-secondary transition-colors text-sm font-medium" dir="ltr">
                <Phone className="w-4 h-4" />
                +966 56 563 8120
              </a>
              <a href="tel:+966548707332" className="flex items-center gap-2 text-white/80 hover:text-secondary transition-colors text-sm font-medium" dir="ltr">
                <Phone className="w-4 h-4" />
                +966 54 870 7332
              </a>
              <a href="mailto:info@mehartransport.com" className="flex items-center gap-2 text-white/80 hover:text-secondary transition-colors text-sm font-medium">
                <Mail className="w-4 h-4" />
                info@mehartransport.com
              </a>
            </div>

            <p className="text-secondary font-medium text-sm pt-2">
              Available 24/7 for airport pickups and Umrah transfers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0">
            <a 
              href="https://wa.me/966565638120" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white hover:bg-[#20bd5a] px-6 py-4 rounded-xl text-sm font-bold transition-colors shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
            <Link 
              href="/booking" 
              className="flex items-center justify-center gap-2 bg-secondary text-primary hover:bg-secondary/90 px-8 py-4 rounded-xl text-sm font-bold transition-colors shadow-lg"
            >
              Book Your Transfer
            </Link>
          </div>
        </div>
        
        {/* Service Areas (Area Served Signal) */}
        <div className="mb-8 text-center border-b border-white/10 pb-8">
          <p className="text-white/40 text-xs font-medium uppercase tracking-widest mb-2">Service Areas</p>
          <p className="text-white/70 text-[15px]">
            Makkah &middot; Madinah &middot; Jeddah &middot; Taif &middot; Riyadh &middot; Yanbu
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} Mehar Transport. All rights reserved.
          </p>
          <p className="text-white/50 text-sm">
            Chauffeur-driven transport — vehicles are always supplied with a professional driver.
          </p>
        </div>
        
      </div>
    </footer>
  );
}
