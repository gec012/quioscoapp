import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default withAuth(
  async function middleware(req: NextRequest) {
    const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    console.log('role', session.role);
    console.log(session);
    const requestedPage = req.nextUrl.pathname;
    const validRoles = ['SUPERADMIN', 'ADMIN'];

    if (!session) {
      const url = req.nextUrl.clone();

      url.pathname = `/auth/login`;
      url.search = `p=${requestedPage}`;

      if (requestedPage.includes('/api')) {
        return new Response(JSON.stringify({ message: 'No autorizado' }), {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      return NextResponse.redirect(url);
    }

    if (requestedPage.includes('/api/admin') && !validRoles.includes(session.role)) {
      return new Response(JSON.stringify({ message: 'No autorizado' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    if (requestedPage.includes('/admin') && !validRoles.includes(session.role)) {
      // Redirect ADMIN to /admin
      return NextResponse.redirect(new URL('/admin', req.url));
    }

    if (requestedPage.includes('/admin') && session.role === 'SUPERADMIN') {
      // Redirect SUPERADMIN to /superadmin
      return NextResponse.redirect(new URL('/superadmin', req.url));
    }

    return NextResponse.next();
  },

);

export const config = {
  matcher: ['/admin', '/superadmin'],
};
