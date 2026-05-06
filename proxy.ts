import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken, refreshAccessToken } from './app/lib/auth';

// Add paths that don't require authentication
const publicPaths = [
  '/dashboard/login',
  '/dashboard/forgot-password',
  '/dashboard/reset-password',
  '/api/auth/login',
  '/api/auth/refresh',
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Static and Public Route Bypass
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/public') ||
    pathname.includes('.') || // Static files
    publicPaths.some(path => pathname.startsWith(path))
  ) {
    return NextResponse.next();
  }

  // 2. Dashboard Route Protection
  if (pathname.startsWith('/dashboard')) {
    const accessToken = request.cookies.get('session')?.value;

    if (!accessToken) {
      return redirectToLogin(request);
    }

    try {
      // Verify current access token
      await verifyToken(accessToken);
      return NextResponse.next();
    } catch (error) {
      // Access token expired, attempt refresh
      // Since refreshAccessToken in auth.ts reads cookies directly, we can just call it
      // But middleware/proxy might have limited access to headers/cookies in some Next.js versions
      // However, we'll try the direct call first as per auth.ts logic
      
      const result = await refreshAccessToken();

      if (!result) {
        return redirectToLogin(request);
      }

      // Success - Proceed (refreshAccessToken already set the cookie)
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

function redirectToLogin(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = '/dashboard/login';
  url.searchParams.set('callbackUrl', request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
