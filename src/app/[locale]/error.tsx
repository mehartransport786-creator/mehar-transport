'use client';

/**
 * Locale-level error boundary.
 *
 * This catches any uncaught error within the [locale] segment — including
 * /booking, /about, /contact, etc. — and renders the branded error UI
 * WITH the Navbar and Footer still present (unlike global-error.tsx which
 * replaces the entire document).
 *
 * Without this file, any error in a page segment escalates directly to
 * global-error.tsx, which wipes out the root layout entirely.
 */

import { useEffect } from 'react';
import Link from 'next/link';

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error digest for Vercel function log tracing
    console.error('[locale/error] digest:', error.digest, '| message:', error.message);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-background px-4 py-16">
      <div className="text-center max-w-md">
        <h1 className="text-5xl font-bold text-primary mb-4">Oops!</h1>
        <div className="w-24 h-1.5 bg-secondary rounded-full mx-auto mb-6" />
        <h2 className="text-xl font-semibold text-foreground mb-3">
          Something went wrong
        </h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          We apologize for the inconvenience. Please try again or{' '}
          <Link href="/contact" className="text-secondary underline underline-offset-2">
            contact our support team
          </Link>.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-semibold text-sm hover:bg-secondary/90 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
