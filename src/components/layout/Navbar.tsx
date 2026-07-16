"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Menu, X, Globe, MessageCircle, ChevronDown, User } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/routing";
import { mockFleet } from "@/lib/data";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const isAr = locale === "ar";
  const isHome = pathname === "/";
  const isTransparent = !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [isFleetOpen, setIsFleetOpen] = useState(false);
  return (
    <nav 
      className={`fixed top-0 z-50 w-full transition-all duration-500 ease-in-out ${
        isScrolled 
          ? "bg-background/85 backdrop-blur-2xl shadow-luxury border-b border-border/20 py-2.5 lg:py-3.5" 
          : "bg-transparent py-4 lg:py-6"
      }`}
    >
      <div className="container-fluid">
        <div className="flex items-center justify-between">
          
          <div className="flex items-center lg:w-[200px]">
            <Link href="/" className="flex items-center gap-2">
              <div className={`transition-all duration-500 rounded-md p-1.5 ${!isTransparent ? 'bg-transparent' : 'bg-white/95 backdrop-blur-md shadow-xl'}`}>
                <Image src="/logo.png" alt="Mehar Transport" width={200} height={48} className={`w-auto object-contain transition-all duration-500 ${!isTransparent ? 'h-7 sm:h-8 lg:h-10' : 'h-8 sm:h-10 lg:h-12'}`} priority />
              </div>
            </Link>
          </div>
          
          <div className="hidden lg:flex flex-1 justify-center">
            <div className="flex items-center justify-center space-x-1 xl:space-x-6 rtl:space-x-reverse">
              <Link
                href="/"
                className={`relative px-3 xl:px-4 py-2 text-[15px] font-semibold tracking-wide transition-colors duration-300 group ${
                  !isTransparent ? 'text-primary hover:text-secondary' : 'text-white drop-shadow-md hover:text-white/80'
                }`}
              >
                {isAr ? "الرئيسية" : "Home"}
                <span className={`absolute inset-x-4 bottom-0 h-0.5 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${!isTransparent ? 'bg-secondary' : 'bg-white'}`}></span>
              </Link>

              {/* Fleet Dropdown */}
              <div 
                className="relative group h-full flex items-center py-2"
                onMouseEnter={() => setIsFleetOpen(true)}
                onMouseLeave={() => setIsFleetOpen(false)}
              >
                <Link 
                  href="/fleet"
                  className={`relative flex items-center gap-1.5 px-3 xl:px-4 py-2 text-[15px] font-semibold tracking-wide transition-colors duration-300 group/link ${
                    !isTransparent ? 'text-primary hover:text-secondary' : 'text-white drop-shadow-md hover:text-white/80'
                  }`}
                >
                  {isAr ? "الأسطول" : "Fleet"}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isFleetOpen ? 'rotate-180' : ''}`} />
                  <span className={`absolute inset-x-4 bottom-0 h-0.5 transform origin-left scale-x-0 transition-transform duration-300 group-hover/link:scale-x-100 ${!isTransparent ? 'bg-secondary' : 'bg-white'}`}></span>
                </Link>
                
                <div className={`absolute top-full rtl:right-0 ltr:left-0 pt-2 w-72 z-50 transition-all duration-300 origin-top-left ${isFleetOpen ? 'opacity-100 visible scale-100 translate-y-0' : 'opacity-0 invisible scale-95 -translate-y-2'}`}>
                  <div className="bg-card rounded-2xl shadow-luxury border border-border/50 py-3 overflow-hidden">
                    <Link
                      href="/fleet"
                      className="block px-6 py-3 text-[15px] font-bold text-secondary hover:bg-muted transition-colors border-b border-border/50 mb-1"
                      onClick={() => setIsFleetOpen(false)}
                    >
                      {isAr ? "عرض كل الأسطول" : "View Full Fleet"}
                    </Link>
                    {mockFleet.map((vehicle) => (
                      <Link
                        key={vehicle.id}
                        href={`/fleet/${vehicle.slug}`}
                        className="block px-6 py-3 text-[15px] font-medium text-foreground hover:bg-muted hover:text-secondary transition-colors"
                        onClick={() => setIsFleetOpen(false)}
                      >
                        {isAr ? vehicle.nameAr : vehicle.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href="/about"
                className={`relative px-3 xl:px-4 py-2 text-[15px] font-semibold tracking-wide transition-colors duration-300 group ${
                  !isTransparent ? 'text-primary hover:text-secondary' : 'text-white drop-shadow-md hover:text-white/80'
                }`}
              >
                {isAr ? "من نحن" : "About Us"}
                <span className={`absolute inset-x-4 bottom-0 h-0.5 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${!isTransparent ? 'bg-secondary' : 'bg-white'}`}></span>
              </Link>
              

              <Link
                href="/cities"
                className={`relative px-3 xl:px-4 py-2 text-[15px] font-semibold tracking-wide transition-colors duration-300 group ${
                  !isTransparent ? 'text-primary hover:text-secondary' : 'text-white drop-shadow-md hover:text-white/80'
                }`}
              >
                {isAr ? "المدن" : "Cities"}
                <span className={`absolute inset-x-4 bottom-0 h-0.5 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${!isTransparent ? 'bg-secondary' : 'bg-white'}`}></span>
              </Link>
              
              <Link
                href="/blog"
                className={`relative px-3 xl:px-4 py-2 text-[15px] font-semibold tracking-wide transition-colors duration-300 group ${
                  !isTransparent ? 'text-primary hover:text-secondary' : 'text-white drop-shadow-md hover:text-white/80'
                }`}
              >
                {isAr ? "المدونة" : "Blog"}
                <span className={`absolute inset-x-4 bottom-0 h-0.5 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${!isTransparent ? 'bg-secondary' : 'bg-white'}`}></span>
              </Link>
              
              <Link
                href="/contact"
                className={`relative px-3 xl:px-4 py-2 text-[15px] font-semibold tracking-wide transition-colors duration-300 group ${
                  !isTransparent ? 'text-primary hover:text-secondary' : 'text-white drop-shadow-md hover:text-white/80'
                }`}
              >
                {isAr ? "اتصل بنا" : "Contact"}
                <span className={`absolute inset-x-4 bottom-0 h-0.5 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${!isTransparent ? 'bg-secondary' : 'bg-white'}`}></span>
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center justify-end lg:w-[200px]">
            <Link 
              href="/booking" 
              className="btn-luxury bg-secondary text-secondary-foreground hover:bg-secondary/80 px-6 xl:px-8 py-3.5 shadow-luxury hover:shadow-luxury-hover text-[15px]"
            >
              {isAr ? 'احجز الآن' : 'Book Now'}
            </Link>
          </div>

          <div className="-mr-2 flex lg:hidden gap-4 items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-3 w-12 h-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary transition-colors ${
                !isTransparent ? 'text-foreground hover:bg-accent' : 'text-white hover:bg-white/20'
              }`}
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-7 w-7" /> : <Menu className="block h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slide-in */}
      <div 
        className={`lg:hidden fixed top-[72px] sm:top-[88px] left-0 w-full h-[calc(100vh-72px)] bg-background/95 backdrop-blur-3xl border-t border-border/50 shadow-2xl overflow-y-auto transition-all duration-500 ease-in-out transform ${
          isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="px-6 pt-6 pb-32 flex flex-col space-y-2">
          <Link
            href="/"
            className="text-foreground hover:text-secondary hover:bg-accent flex items-center px-4 py-4 rounded-xl text-lg font-semibold transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {isAr ? "الرئيسية" : "Home"}
          </Link>

          {/* Mobile Fleet Section */}
          <div className="pt-4 mt-2 border-t border-border/50">
            <Link 
              href="/fleet"
              className="text-muted-foreground px-4 py-3 flex text-sm font-bold uppercase tracking-[0.2em] hover:text-secondary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {isAr ? "الأسطول" : "Fleet"}
            </Link>
            <div className="pl-4 rtl:pr-4 rtl:pl-0 space-y-1 mt-2">
              {mockFleet.map((vehicle) => (
                <Link
                  key={vehicle.id}
                  href={`/fleet/${vehicle.slug}`}
                  className="text-foreground hover:text-secondary flex items-center px-4 py-3 rounded-xl text-base font-medium transition-colors hover:bg-accent/50"
                  onClick={() => setIsOpen(false)}
                >
                  {isAr ? vehicle.nameAr : vehicle.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-border/50">
            <Link
              href="/about"
              className="text-foreground hover:text-secondary hover:bg-accent flex items-center px-4 py-4 rounded-xl text-lg font-semibold transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {isAr ? "من نحن" : "About Us"}
            </Link>

            <Link
              href="/cities"
              className="text-foreground hover:text-secondary hover:bg-accent flex items-center px-4 py-4 rounded-xl text-lg font-semibold transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {isAr ? "المدن" : "Cities"}
            </Link>
            <Link
              href="/blog"
              className="text-foreground hover:text-secondary hover:bg-accent flex items-center px-4 py-4 rounded-xl text-lg font-semibold transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {isAr ? "المدونة" : "Blog"}
            </Link>
            <Link
              href="/contact"
              className="text-foreground hover:text-secondary hover:bg-accent flex items-center px-4 py-4 rounded-xl text-lg font-semibold transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {isAr ? "اتصل بنا" : "Contact"}
            </Link>
          </div>

          <div className="mt-8 pt-8">
            <Link 
              href="/booking" 
              className="w-full flex items-center justify-center bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-4 rounded-xl text-[17px] font-bold transition-all shadow-luxury hover:shadow-luxury-hover min-h-[56px]"
              onClick={() => setIsOpen(false)}
            >
              {isAr ? 'احجز الآن' : 'Book Now'}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
