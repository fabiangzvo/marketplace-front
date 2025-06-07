import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isPublicRoute = req.nextUrl.pathname.match(/\/(checkout)/);

  if (!session && !isPublicRoute)
    return NextResponse.redirect(new URL("/", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout", "/dashboard/:path*", "/products/:path*"],
};
