import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Fonction pour créer un matcher de route
function createRouteMatcher(routes: string[]) {
  return (request: NextRequest) => {
    return routes.some(route => {
      if (route.endsWith('(.*)')) {
        const baseRoute = route.slice(0, -4);
        return request.nextUrl.pathname.startsWith(baseRoute);
      }
      return request.nextUrl.pathname === route;
    });
  };
}

// Fonction pour rediriger
function nextjsMiddlewareRedirect(request: NextRequest, destination: string) {
  return NextResponse.redirect(new URL(destination, request.url));
}

// Fonction pour vérifier l'authentification
function isAuthenticated(request: NextRequest) {
  // Exemple : vérifier la présence d'un token dans les cookies
  const token = request.cookies.get('jwt');
  return !!token;
}

const isPublicRoute = createRouteMatcher(["/auth"]);

export default function middleware(request: NextRequest) {
  if (!isPublicRoute(request) && !isAuthenticated(request)) {
    return nextjsMiddlewareRedirect(request, "/auth");
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
