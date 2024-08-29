import { NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import { authConfig } from '@/../auth.config';
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes
} from '@/../routes';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  console.log("Middleware is running");
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return NextResponse.next(); // Permite que as rotas da API de autenticação prossigam
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      console.log("Redirecting to dashboard");
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    console.log("Redirecting to login");
    return NextResponse.redirect(new URL('/login', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};



/*import NextAuth from 'next-auth';
import { authConfig } from '@/../auth.config';
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes
} from '@/../routes'

const  { auth } = NextAuth(authConfig)
//const auth = NextAuth(authConfig).auth;

export default auth((req => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return null
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/login', nextUrl))
  }

  return null
}))

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
*/