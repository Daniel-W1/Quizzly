import { auth } from "./auth";
import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "10 s"),
});

export const authRoutes = [
  "/login",
  "/signup",
  "/forget-password",
  "/reset-password",
  "/verify-email",
  "/resend-verification-email",
  "/",
];

const rateLimitRoutes = [
  "/api/forget-password",
  "/api/contribute",
  "/api/send-email-verification",
];

export const apiAuthPrefix = "/api/";

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isRateLimitRoute = rateLimitRoutes.includes(nextUrl.pathname);
  const isOnboardingRoute = nextUrl.pathname.startsWith("/onboarding");
  const isOnboarded = req.auth?.user?.onboarded;


  if (isLoggedIn && isAuthRoute && !isApiAuthRoute) {
    return NextResponse.redirect(new URL("/onboarding", nextUrl));
  }

  if (!isLoggedIn && !isAuthRoute && !isApiAuthRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  if (isLoggedIn && !isOnboardingRoute && !isOnboarded && !isApiAuthRoute) {
    return NextResponse.redirect(new URL("/onboarding", nextUrl));
  }

  if (isLoggedIn && isOnboardingRoute && isOnboarded) {
    return NextResponse.redirect(new URL("/search", nextUrl));
  }

  if (isRateLimitRoute) {
    const identifier = req.ip ?? "127.0.0.1";
    const { success } = await ratelimit.limit(identifier);

    if (!success) {
      return NextResponse.redirect(new URL("/api/blocked", nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
