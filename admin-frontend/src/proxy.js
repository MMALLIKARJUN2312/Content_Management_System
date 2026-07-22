import { NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/login'];

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;
  const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
