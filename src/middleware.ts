import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === '/favicon.ico') {
    return NextResponse.redirect(new URL('/favicon/favicon.ico', request.url), 308);
  }

  if (pathname === '/apple-touch-icon.png') {
    return NextResponse.redirect(new URL('/favicon/apple-touch-icon.png', request.url), 308);
  }

  if (pathname === '/site.webmanifest') {
    return NextResponse.redirect(new URL('/favicon/site.webmanifest', request.url), 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/favicon.ico', '/apple-touch-icon.png', '/site.webmanifest'],
};
