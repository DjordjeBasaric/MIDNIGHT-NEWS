import { NextRequest } from 'next/server';
import { requireRouteRole } from '@/middleware/permissions.middleware';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith('/admin-dashboard') ||
    pathname.startsWith('/users') ||
    pathname.startsWith('/moderation-history') ||
    pathname.startsWith('/admin')
  ) {
    return await requireRouteRole(request, ['EDITOR', 'ADMIN']);
  }

  if (pathname.startsWith('/admin-news') || pathname.startsWith('/admin-blogs')) {
    return await requireRouteRole(request, ['EDITOR', 'ADMIN']);
  }

  if (pathname.startsWith('/editor')) {
    return await requireRouteRole(request, ['EDITOR', 'ADMIN']);
  }

  if (pathname.startsWith('/member')) {
    return await requireRouteRole(request, ['MEMBER', 'EDITOR', 'ADMIN']);
  }

  return undefined;
}

export const config = {
  matcher: [
    '/admin-dashboard',
    '/admin-dashboard/:path*',
    '/admin/:path*',
    '/admin-news',
    '/admin-news/:path*',
    '/admin-blogs',
    '/admin-blogs/:path*',
    '/users',
    '/users/:path*',
    '/moderation-history',
    '/editor/:path*',
    '/member/:path*',
  ],
};
