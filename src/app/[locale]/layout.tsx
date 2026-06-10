import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
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
      className={`${inter.variable} ${cairo.variable} h-full antialiased`}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <body className="min-h-full flex flex-col font-sans">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <LayoutShell navbar={<Navbar />} footer={<Footer />}>
            {children}
          </LayoutShell>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}

