import { NextResponse } from "next/server";
import { auth } from "@/auth";

export const authRoutes = [
    "/login",
    "/signup",
    "/forget-password", 
    "/reset-password",
    "/"
];

export const apiAuthPrefix = "/api/";

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return NextResponse.next();
    }

    if (isLoggedIn && isAuthRoute) {
        return NextResponse.redirect(new URL("/onboarding", nextUrl));
    }

    if (!isLoggedIn && !isAuthRoute && !isApiAuthRoute) {
        return NextResponse.redirect(new URL("/login", nextUrl));
    }

    return NextResponse.next();
}) as any;

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
