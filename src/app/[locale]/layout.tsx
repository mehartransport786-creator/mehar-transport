import type { Metadata } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import "../globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import {LayoutShell} from '@/components/layout/LayoutShell';
import {Navbar} from '@/components/layout/Navbar';
import {Footer} from '@/components/layout/Footer';
import Analytics from '@/components/layout/Analytics';
import {FloatingWhatsApp} from '@/components/layout/FloatingWhatsApp';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mehartransport.com';

export const metadata: Metadata = {
  title: {
    default: 'Mehar Transport | Luxury Transportation & Umrah Transfers in Saudi Arabia',
    template: '%s | Mehar Transport',
  },
  description: 'Premium Umrah, Airport, and Intercity transfer services in Saudi Arabia. Experience trust, luxury, and reliability with Mehar Transport.',
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: 'website',
    siteName: 'Mehar Transport',
    title: 'Mehar Transport | Luxury Transportation & Umrah Transfers',
    description: 'Premium Umrah, Airport, and Intercity transfer services in Saudi Arabia.',
    locale: 'en_US',
    alternateLocale: 'ar_SA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mehar Transport',
    description: 'Premium transportation services across Saudi Arabia.',
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      'en': `${BASE_URL}/en`,
      'ar': `${BASE_URL}/ar`,
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const resolvedParams = await params;
  const isAr = resolvedParams.locale === "ar";
  const {locale} = resolvedParams;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  return (
    <html
      lang={locale}
      className={`${jakarta.variable} ${plexArabic.variable} h-full antialiased`}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <body className="min-h-full flex flex-col font-sans">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <LayoutShell navbar={<Navbar />} footer={<Footer />}>
            {children}
            <FloatingWhatsApp />
          </LayoutShell>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}

