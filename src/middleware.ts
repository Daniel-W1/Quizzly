import { NextResponse } from "next/server";
import { auth } from "@/auth";

export const authRoutes = [
    "/login",
    "/signup",
    "/forget-password", 
    "/reset-password",
    "/verify-email",
    "/resend-verification-email",
    "/"
];

export const apiAuthPrefix = "/api/";

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isOnboardingRoute = nextUrl.pathname.startsWith('/onboarding');
    const isOnboarded = req.auth?.user?.onboarded;

    if (isApiAuthRoute) {
        return NextResponse.next();
    }

    if (isLoggedIn && isAuthRoute) {
        return NextResponse.redirect(new URL("/onboarding", nextUrl));
    }

    if (!isLoggedIn && !isAuthRoute && !isApiAuthRoute) {
        return NextResponse.redirect(new URL("/login", nextUrl));
    }

    if (isLoggedIn && !isOnboardingRoute && !isOnboarded) {
        return NextResponse.redirect(new URL("/onboarding", nextUrl));
    }

    if (isLoggedIn && isOnboardingRoute && isOnboarded) {
        return NextResponse.redirect(new URL("/search", nextUrl));
    }

    return NextResponse.next();
}) as any;

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
