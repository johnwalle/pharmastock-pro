import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of routes that require authentication
const PROTECTED_ROUTES = ['/dashboard', '/profile', '/inventory'];

function isProtectedRoute(pathname: string) {
  return PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
}

export function middleware(request: NextRequest) {
  // Check for accessToken cookie instead of authToken
  const accessToken = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;

  if (isProtectedRoute(pathname)) {
    if (!accessToken) {
      const loginUrl = new URL('/auth/signup', request.url);
      loginUrl.searchParams.set('redirect', pathname); // optional: return after login
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/inventory/:path*'],
};
