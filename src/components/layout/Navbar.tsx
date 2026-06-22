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

  const toggleLang = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  const [dynamicPackages, setDynamicPackages] = useState<any[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch('/api/packages');
        if (res.ok) {
          const data = await res.json();
          if (data.packages) {
            setDynamicPackages(data.packages);
          }
        }
      } catch (error) {
        console.error("Failed to fetch packages for navbar", error);
      }
    };
    fetchPackages();
  }, []);

  const [isPackagesOpen, setIsPackagesOpen] = useState(false);
  const [isFleetOpen, setIsFleetOpen] = useState(false);
  return (
    <nav 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border py-2" 
          : "bg-transparent py-4"
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
            <div className="ml-10 flex items-baseline space-x-8 rtl:space-x-reverse">
              <Link
                href="/"
                className={`transition-colors px-3 py-2 text-sm font-medium hover:text-secondary ${
                  !isTransparent ? 'text-foreground' : 'text-white drop-shadow-md'
                }`}
              >
                {isAr ? "الرئيسية" : "Home"}
              </Link>

              {/* Fleet Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setIsFleetOpen(true)}
                onMouseLeave={() => setIsFleetOpen(false)}
              >
                <Link 
                  href="/fleet"
                  className={`flex items-center gap-1 transition-colors px-3 py-2 text-sm font-medium hover:text-secondary ${
                    !isTransparent ? 'text-foreground' : 'text-white drop-shadow-md'
                  }`}
                >
                  {isAr ? "الأسطول" : "Fleet"}
                  <ChevronDown className="w-4 h-4" />
                </Link>
                {isFleetOpen && (
                  <div className="absolute top-full rtl:right-0 ltr:left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                    <Link
                      href="/fleet"
                      className="block px-4 py-2.5 text-sm font-bold text-[#D9A63A] hover:bg-secondary/10 transition-colors border-b border-gray-100 mb-1"
                      onClick={() => setIsFleetOpen(false)}
                    >
                      {isAr ? "عرض كل الأسطول" : "View Full Fleet"}
                    </Link>
                    {mockFleet.map((vehicle) => (
                      <Link
                        key={vehicle.id}
                        href={`/fleet/${vehicle.slug}`}
                        className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-secondary/10 hover:text-secondary transition-colors"
                        onClick={() => setIsFleetOpen(false)}
                      >
                        {isAr ? vehicle.nameAr : vehicle.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Packages Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setIsPackagesOpen(true)}
                onMouseLeave={() => setIsPackagesOpen(false)}
              >
                <Link 
                  href="/packages"
                  className={`flex items-center gap-1 transition-colors px-3 py-2 text-sm font-medium hover:text-secondary ${
                    !isTransparent ? 'text-foreground' : 'text-white drop-shadow-md'
                  }`}
                >
                  {isAr ? "الباقات" : "Packages"}
                  <ChevronDown className="w-4 h-4" />
                </Link>
                {isPackagesOpen && (
                  <div className="absolute top-full rtl:right-0 ltr:left-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                    <Link
                      href="/packages"
                      className="block px-4 py-2.5 text-sm font-bold text-[#D9A63A] hover:bg-secondary/10 transition-colors border-b border-gray-100 mb-1"
                      onClick={() => setIsPackagesOpen(false)}
                    >
                      {isAr ? "عرض كل الباقات" : "View All Packages"}
                    </Link>
                    {dynamicPackages.map((pkg) => (
                      <Link
                        key={pkg.slug}
                        href={`/packages/${pkg.slug}`}
                        className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-secondary/10 hover:text-secondary transition-colors"
                        onClick={() => setIsPackagesOpen(false)}
                      >
                        {isAr ? pkg.nameAr : pkg.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/about"
                className={`transition-colors px-3 py-2 text-sm font-medium hover:text-secondary ${
                  !isTransparent ? 'text-foreground' : 'text-white drop-shadow-md'
                }`}
              >
                {isAr ? "من نحن" : "About Us"}
              </Link>
              
              <Link
                href="/routes"
                className={`transition-colors px-3 py-2 text-sm font-medium hover:text-secondary ${
                  !isTransparent ? 'text-foreground' : 'text-white drop-shadow-md'
                }`}
              >
                {isAr ? "المسارات" : "Routes"}
              </Link>
              
              <Link
                href="/cities"
                className={`transition-colors px-3 py-2 text-sm font-medium hover:text-secondary ${
                  !isTransparent ? 'text-foreground' : 'text-white drop-shadow-md'
                }`}
              >
                {isAr ? "المدن" : "Cities"}
              </Link>
              
              <Link
                href="/blog"
                className={`transition-colors px-3 py-2 text-sm font-medium hover:text-secondary ${
                  !isTransparent ? 'text-foreground' : 'text-white drop-shadow-md'
                }`}
              >
                {isAr ? "المدونة" : "Blog"}
              </Link>
              
              <Link
                href="/contact"
                className={`transition-colors px-3 py-2 text-sm font-medium hover:text-secondary ${
                  !isTransparent ? 'text-foreground' : 'text-white drop-shadow-md'
                }`}
              >
                {isAr ? "اتصل بنا" : "Contact"}
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={toggleLang}
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-secondary ${
                !isTransparent ? 'text-foreground' : 'text-white drop-shadow-md'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>{locale === 'en' ? 'العربية' : 'English'}</span>
            </button>
            

            <Link 
              href="/booking" 
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-2.5 rounded-md text-sm font-bold transition-all shadow-lg"
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

            {/* Mobile Packages Section */}
            <div className="pt-2 border-t border-border">
              <Link 
                href="/packages"
                className="text-muted-foreground px-3 py-2 block text-sm font-bold uppercase tracking-wider hover:text-secondary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {isAr ? "الباقات" : "Packages"}
              </Link>
              <div className="pl-4 rtl:pr-4 rtl:pl-0 space-y-1">
                {dynamicPackages.map((pkg) => (
                  <Link
                    key={pkg.slug}
                    href={`/packages/${pkg.slug}`}
                    className="text-foreground hover:text-secondary block px-3 py-2 rounded-md text-sm transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {isAr ? pkg.nameAr : pkg.name}
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

            <button 
              onClick={toggleLang}
              className="flex w-full items-center gap-3 text-foreground hover:text-secondary hover:bg-accent px-3 py-3 rounded-md text-base font-medium transition-colors mt-4 border-t border-border pt-4"
            >
              <Globe className="w-5 h-5" />
              <span>{locale === 'en' ? 'العربية' : 'English'}</span>
            </button>
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
