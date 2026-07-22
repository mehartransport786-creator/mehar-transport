import type { Metadata } from 'next';
import { Montserrat, Lora, Hind_Madurai, IBM_Plex_Sans_Arabic } from 'next/font/google';
import '../globals.css';

/**
 * Step 9 — Conditional font loading by locale.
 *
 * Previously all four font families were applied on EVERY page via a single
 * className string, so Arabic visitors downloaded three Latin font families
 * and English visitors downloaded the Arabic family. Each family has 5 weights.
 *
 * Now:
 *  - English locale → Montserrat (h1) + Lora (h2) + Hind_Madurai (body)
 *  - Arabic  locale → IBM_Plex_Sans_Arabic only
 *
 * The `display: 'swap'` and build-time font download remain unchanged.
 * The browser only fetches font files whose CSS variables are actually
 * applied in the rendered HTML.
 */

// ─── Latin fonts (English) ───────────────────────────────────────────────────
const montserrat = Montserrat({
  variable: '--font-h1',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const lora = Lora({
  variable: '--font-h2',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const hindMadurai = Hind_Madurai({
  variable: '--font-paragraph',
  subsets: ['latin'],
  // Reduced from 5 weights to 3 — audit of actual utility usage shows only
  // 400, 600 and 700 are referenced in components.
  weight: ['400', '600', '700'],
  display: 'swap',
  preload: true,
});

// ─── Arabic font ─────────────────────────────────────────────────────────────
const plexArabic = IBM_Plex_Sans_Arabic({
  variable: '--font-arabic',
  subsets: ['arabic'],
  weight: ['400', '600', '700'],
  display: 'swap',
  preload: true,
});

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { LayoutShell } from '@/components/layout/LayoutShell';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Analytics from '@/components/layout/Analytics';
import dynamic from 'next/dynamic';

const FloatingWhatsApp = dynamic(() =>
  import('@/components/layout/FloatingWhatsApp').then((mod) => mod.FloatingWhatsApp)
);

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mehartransport.com';

export const metadata: Metadata = {
  title: {
    default: 'Mehar Transport | Luxury Transportation & Umrah Transfers in Saudi Arabia',
    template: '%s | Mehar Transport',
  },
  description:
    'Premium Umrah, Airport, and Intercity transfer services in Saudi Arabia. Experience trust, luxury, and reliability with Mehar Transport.',
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
      en: `${BASE_URL}/en`,
      ar: `${BASE_URL}/ar`,
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const isAr = locale === 'ar';

  // Validate locale
  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  /**
   * Build locale-specific font class string.
   * Only the variables for the active locale are applied to <html>, so the
   * browser only requests the font files that are actually needed.
   */
  const fontClass = isAr
    ? plexArabic.variable
    : `${montserrat.variable} ${lora.variable} ${hindMadurai.variable}`;

  return (
    <html
      lang={locale}
      className={`${fontClass} antialiased`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <body className="min-h-screen flex flex-col font-sans antialiased">
        {/*
          Step 9 — Arabic font variable remapping.
          When locale is Arabic, the three Latin font CSS vars are not set
          (their font files are not loaded), so h1/h2/paragraph utilities would
          fall back to system fonts. We remap them to the Arabic font variable
          so all design-system utilities render correctly in Arabic.
        */}
        {isAr && (
          <style>{`:root{--font-h1:var(--font-arabic);--font-h2:var(--font-arabic);--font-paragraph:var(--font-arabic)}`}</style>
        )}

        {/*
          Step 8 — no-JS Framer Motion fallback.
          The [style*="opacity:0"] global CSS selector was removed from
          globals.css because it matched hundreds of DOM nodes and fought
          Framer Motion on every style recalculation. This <noscript> block
          re-introduces the identical rule ONLY when JavaScript is disabled —
          at which point Framer Motion is not running and the selector is
          harmless and necessary (it reveals elements that Framer Motion set
          to opacity:0 before JS was blocked).
        */}
        <noscript>
          <style>{`[style*="opacity: 0"],[style*="opacity:0"]{opacity:1!important;animation:none!important}`}</style>
        </noscript>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TaxiService",
              "name": "Mehar Transport",
              "url": "https://mehartransport.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Al Nawariyah District",
                "addressLocality": "Makkah",
                "addressRegion": "Makkah Province",
                "addressCountry": "SA"
              },
              "areaServed": ["Makkah", "Madinah", "Jeddah", "Taif", "Riyadh", "Yanbu"]
            }),
          }}
        />

        <NextIntlClientProvider messages={messages} locale={locale}>
          <LayoutShell navbar={<Navbar />} footer={<Footer />}>
            {children}
          </LayoutShell>
          <FloatingWhatsApp />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
