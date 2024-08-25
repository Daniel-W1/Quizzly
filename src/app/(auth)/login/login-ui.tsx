import TextLogo from "@/app/(landing)/components/text-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LoginUI = () => {
  return (
    <div className="flex items-center min-h-screen w-full max-w-screen-xl mx-auto p-4">
      <div className="w-full max-w-md mx-auto lg:w-1/2">
        <TextLogo
          text="Quizzly"
          color="#0065F2"
          fontSize="clamp(32px, 5vw, 44px)"
          fontWeight="bold"
          fontFamily="sans-serif"
        />

        <form className="flex flex-col space-y-6 mt-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Login</h1>
            <p className="text-sm sm:text-base text-gray-500">
              Login to access your Quizzly account
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Your password"
                required
              />
            </div>
            <Link
              href="/forget-password"
              className="text-sm text-red-400 hover:underline block text-right"
            >
              Forget Password
            </Link>
          </div>

          <div className="flex flex-col space-y-2">
            <Button type="submit">Sign in</Button>
            <p className="text-sm text-gray-500 text-center">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="hover:underline text-red-400">
                Sign up
              </Link>
            </p>
            <Button type="button">Sign in with Google</Button>
          </div>
        </form>
      </div>

      <Image src="/reading.svg" width={600} height={500} alt="reading" className="hidden lg:block" />
    </div>
  );
};

export default LoginUI;
