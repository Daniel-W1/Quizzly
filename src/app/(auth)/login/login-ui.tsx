"use client";

import TextLogo from "@/app/(landing)/components/text-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { handleEmailSignIn, handleGoogle } from "@/app/actions/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

const LoginUI = () => {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      setLoading(true);
      setAuthError("");
      const result = await handleEmailSignIn(values.email, values.password);
      if (result?.error) {
        setAuthError(result.error);
      } else {
        router.push("/onboarding");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setAuthError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setAuthError("");
      setGoogleLoading(true);
      await handleGoogle();
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setAuthError("Failed to sign in with Google. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4 mt-8"
          >
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Login</h1>
              <p className="text-sm sm:text-base text-gray-500">
                Login to access your Quizzly account
              </p>
            </div>

            {authError && (
              <p className="text-sm text-red-500 text-center bg-red-200 p-2 rounded-md">
                {authError}
              </p>
            )}

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <Link
                  href="/resend-verification-email"
                  className="text-sm text-gray-500 underline hover:underline block text-right"
                >
                  Verify Email
                </Link>
                <Link
                  href="/forget-password"
                  className="text-sm text-red-400 hover:underline block text-right"
                >
                  Forget Password
                </Link>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <Button
                type="submit"
                className="gap-2"
                disabled={loading || googleLoading}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {loading ? "Signing in..." : "Sign in"}
              </Button>
              <p className="text-sm text-gray-500 text-center">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="hover:underline text-red-400">
                  Sign up
                </Link>
              </p>
              <Button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading || googleLoading}
              >
                Sign in with Google
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <Image
        src="/reading.svg"
        width={600}
        height={500}
        alt="reading"
        className="hidden lg:block"
      />
    </div>
  );
};

export default LoginUI;
