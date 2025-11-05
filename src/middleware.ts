import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define routes that require authentication
const PROTECTED_ROUTES = ['/dashboard', '/profile', '/inventory'];

function isProtectedRoute(pathname: string) {
  return PROTECTED_ROUTES.some(route => pathname.startsWith(route));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Read access token from cookies
  const accessToken = request.cookies.get('accessToken')?.value;

  // If trying to access a protected route without an access token, redirect to /auth/signup
  if (isProtectedRoute(pathname) && !accessToken) {
    const redirectUrl = new URL('/auth/signup', request.url);
    redirectUrl.searchParams.set('redirect', pathname); // Optional: redirect after login
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next(); // Allow request
}

// Apply middleware only on these routes
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/inventory/:path*'],
};
