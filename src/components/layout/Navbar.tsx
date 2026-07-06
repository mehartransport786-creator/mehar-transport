"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
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
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-b border-white/10 py-3" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className={`transition-all duration-300 rounded-md p-1.5 ${!isTransparent ? 'bg-transparent' : 'bg-white/90 backdrop-blur-sm shadow-xl'}`}>
                <img src="/logo.png" alt="Mehar Transport" className={`${!isTransparent ? 'h-10' : 'h-12'} w-auto transition-all duration-300`} />
              </div>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1 lg:space-x-4 rtl:space-x-reverse">
              <Link
                href="/"
                className={`relative px-4 py-2 text-sm font-semibold tracking-wide transition-colors group ${
                  !isTransparent ? 'text-foreground hover:text-secondary' : 'text-white drop-shadow-lg hover:text-white/80'
                }`}
              >
                {isAr ? "الرئيسية" : "Home"}
                <span className={`absolute inset-x-4 bottom-0 h-0.5 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${!isTransparent ? 'bg-secondary' : 'bg-white'}`}></span>
              </Link>

              {/* Fleet Dropdown */}
              <div 
                className="relative group h-full flex items-center"
                onMouseEnter={() => setIsFleetOpen(true)}
                onMouseLeave={() => setIsFleetOpen(false)}
              >
                <Link 
                  href="/fleet"
                  className={`relative flex items-center gap-1 px-4 py-2 text-sm font-semibold tracking-wide transition-colors group/link ${
                    !isTransparent ? 'text-foreground hover:text-secondary' : 'text-white drop-shadow-lg hover:text-white/80'
                  }`}
                >
                  {isAr ? "الأسطول" : "Fleet"}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isFleetOpen ? 'rotate-180' : ''}`} />
                  <span className={`absolute inset-x-4 bottom-0 h-0.5 transform origin-left scale-x-0 transition-transform duration-300 group-hover/link:scale-x-100 ${!isTransparent ? 'bg-secondary' : 'bg-white'}`}></span>
                </Link>
                {isFleetOpen && (
                  <div className="absolute top-full rtl:right-0 ltr:left-0 mt-2 w-64 bg-card rounded-2xl shadow-luxury border border-border/50 py-3 z-50 overflow-hidden transform opacity-100 scale-100 transition-all duration-300 origin-top-left">
                    <Link
                      href="/fleet"
                      className="block px-5 py-3 text-sm font-bold text-secondary hover:bg-muted transition-colors border-b border-border/50 mb-1"
                      onClick={() => setIsFleetOpen(false)}
                    >
                      {isAr ? "عرض كل الأسطول" : "View Full Fleet"}
                    </Link>
                    {mockFleet.map((vehicle) => (
                      <Link
                        key={vehicle.id}
                        href={`/fleet/${vehicle.slug}`}
                        className="block px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted hover:text-secondary transition-colors"
                        onClick={() => setIsFleetOpen(false)}
                      >
                        {isAr ? vehicle.nameAr : vehicle.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>


              <Link
                href="/about"
                className={`relative px-4 py-2 text-sm font-semibold tracking-wide transition-colors group ${
                  !isTransparent ? 'text-foreground hover:text-secondary' : 'text-white drop-shadow-lg hover:text-white/80'
                }`}
              >
                {isAr ? "من نحن" : "About Us"}
                <span className={`absolute inset-x-4 bottom-0 h-0.5 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${!isTransparent ? 'bg-secondary' : 'bg-white'}`}></span>
              </Link>
              
              <Link
                href="/routes"
                className={`relative px-4 py-2 text-sm font-semibold tracking-wide transition-colors group ${
                  !isTransparent ? 'text-foreground hover:text-secondary' : 'text-white drop-shadow-lg hover:text-white/80'
                }`}
              >
                {isAr ? "المسارات" : "Routes"}
                <span className={`absolute inset-x-4 bottom-0 h-0.5 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${!isTransparent ? 'bg-secondary' : 'bg-white'}`}></span>
              </Link>
              
              <Link
                href="/cities"
                className={`relative px-4 py-2 text-sm font-semibold tracking-wide transition-colors group ${
                  !isTransparent ? 'text-foreground hover:text-secondary' : 'text-white drop-shadow-lg hover:text-white/80'
                }`}
              >
                {isAr ? "المدن" : "Cities"}
                <span className={`absolute inset-x-4 bottom-0 h-0.5 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${!isTransparent ? 'bg-secondary' : 'bg-white'}`}></span>
              </Link>
              
              <Link
                href="/blog"
                className={`relative px-4 py-2 text-sm font-semibold tracking-wide transition-colors group ${
                  !isTransparent ? 'text-foreground hover:text-secondary' : 'text-white drop-shadow-lg hover:text-white/80'
                }`}
              >
                {isAr ? "المدونة" : "Blog"}
                <span className={`absolute inset-x-4 bottom-0 h-0.5 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${!isTransparent ? 'bg-secondary' : 'bg-white'}`}></span>
              </Link>
              
              <Link
                href="/contact"
                className={`relative px-4 py-2 text-sm font-semibold tracking-wide transition-colors group ${
                  !isTransparent ? 'text-foreground hover:text-secondary' : 'text-white drop-shadow-lg hover:text-white/80'
                }`}
              >
                {isAr ? "اتصل بنا" : "Contact"}
                <span className={`absolute inset-x-4 bottom-0 h-0.5 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${!isTransparent ? 'bg-secondary' : 'bg-white'}`}></span>
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">

            

            <Link 
              href="/booking" 
              className="btn-luxury bg-secondary text-secondary-foreground hover:bg-[#B58529] px-6 py-2.5 shadow-luxury hover:shadow-luxury-hover"
            >
              {isAr ? 'احجز الآن' : 'Book Now'}
            </Link>
          </div>

          <div className="-mr-2 flex md:hidden gap-4 items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary ${
                !isTransparent ? 'text-foreground hover:bg-accent' : 'text-white hover:bg-white/20'
              }`}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slide-in */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border shadow-2xl h-screen overflow-y-auto pb-32">
          <div className="px-4 pt-4 pb-6 space-y-4">

            <Link
              href="/"
              className="text-foreground hover:text-secondary hover:bg-accent block px-3 py-3 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {isAr ? "الرئيسية" : "Home"}
            </Link>

            {/* Mobile Fleet Section */}
            <div className="pt-2 border-t border-border">
              <Link 
                href="/fleet"
                className="text-muted-foreground px-3 py-2 block text-sm font-bold uppercase tracking-wider hover:text-secondary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {isAr ? "الأسطول" : "Fleet"}
              </Link>
              <div className="pl-4 rtl:pr-4 rtl:pl-0 space-y-1">
                {mockFleet.map((vehicle) => (
                  <Link
                    key={vehicle.id}
                    href={`/fleet/${vehicle.slug}`}
                    className="text-foreground hover:text-secondary block px-3 py-2 rounded-md text-sm transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {isAr ? vehicle.nameAr : vehicle.name}
                  </Link>
                ))}
              </div>
            </div>


            <div className="pt-2 border-t border-border">
              <Link
                href="/about"
                className="text-foreground hover:text-secondary hover:bg-accent block px-3 py-3 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {isAr ? "من نحن" : "About Us"}
              </Link>
              <Link
                href="/routes"
                className="text-foreground hover:text-secondary hover:bg-accent block px-3 py-3 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {isAr ? "المسارات" : "Routes"}
              </Link>
              <Link
                href="/cities"
                className="text-foreground hover:text-secondary hover:bg-accent block px-3 py-3 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {isAr ? "المدن" : "Cities"}
              </Link>
              <Link
                href="/blog"
                className="text-foreground hover:text-secondary hover:bg-accent block px-3 py-3 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {isAr ? "المدونة" : "Blog"}
              </Link>
              <Link
                href="/contact"
                className="text-foreground hover:text-secondary hover:bg-accent block px-3 py-3 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {isAr ? "اتصل بنا" : "Contact"}
              </Link>
            </div>


            <Link 
              href="/booking" 
              className="w-full flex items-center justify-center bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-4 rounded-md text-base font-bold transition-all shadow-md mt-4"
              onClick={() => setIsOpen(false)}
            >
              {isAr ? 'احجز الآن' : 'Book Now'}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
