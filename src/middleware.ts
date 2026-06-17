
import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';

const { auth } = NextAuth(authConfig);
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

const intlMiddleware = createMiddleware(routing);

const publicPages = ['/admin/login', '/'];

export default auth((req) => {
  // Protect API Admin Routes
  if (req.nextUrl.pathname.startsWith('/api')) {
    if (req.nextUrl.pathname.startsWith('/api/admin') && !req.auth) {
      return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    return; // Pass through non-admin APIs
  }

  const publicPathnameRegex = RegExp(
    `^(/(${routing.locales.join('|')}))?(${publicPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  );
  
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
  const isAdminRoute = req.nextUrl.pathname.includes('/admin');

  // If the user is trying to access a protected admin page without an active session
  if (isAdminRoute && !isPublicPage && !req.auth) {
    const localeMatch = req.nextUrl.pathname.match(new RegExp(`^/(${routing.locales.join('|')})`));
    const locale = localeMatch ? localeMatch[1] : routing.defaultLocale;
    
    const loginUrl = new URL(`/${locale}/admin/login`, req.url);
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
    
    return Response.redirect(loginUrl);
  }

  // Handle i18n routing
  return intlMiddleware(req);
});

export const config = {
  // Match everything except _next and static files
  matcher: ['/((?!_next|.*\\..*).*)']
};
