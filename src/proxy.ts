import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  const isAuthPage = request.nextUrl.pathname.includes('/admin/login');
  const isAdminRoute = request.nextUrl.pathname.includes('/admin');
  
  // Create response from next-intl first to handle localization and cookies
  const response = intlMiddleware(request);

  if (isAdminRoute) {
    const sessionToken = request.cookies.get('authjs.session-token') || 
                         request.cookies.get('__Secure-authjs.session-token');

    if (!sessionToken && !isAuthPage) {
      // Redirect to localized login page
      const locale = request.cookies.get('NEXT_LOCALE')?.value || 'en';
      const loginUrl = new URL(`/${locale}/admin/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }

    if (sessionToken && isAuthPage) {
      // If logged in and trying to access login, redirect to dashboard
      const locale = request.cookies.get('NEXT_LOCALE')?.value || 'en';
      const adminUrl = new URL(`/${locale}/admin`, request.url);
      return NextResponse.redirect(adminUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ['/', '/(ar|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
