import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getSessionFromToken } from './app/lib/session';

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const publicDashboardPaths = [
    '/dashboard/login',
    '/dashboard/forgot-password',
    '/dashboard/reset-password'
  ];

  if (pathname.startsWith('/dashboard') && !publicDashboardPaths.includes(pathname)) {
    const sessionToken = request.cookies.get('session')?.value;
    const session = sessionToken ? await getSessionFromToken(sessionToken) : null;

    if (!session) {
      const loginUrl = new URL('/dashboard/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (publicDashboardPaths.includes(pathname)) {
    const sessionToken = request.cookies.get('session')?.value;
    const session = sessionToken ? await getSessionFromToken(sessionToken) : null;
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
