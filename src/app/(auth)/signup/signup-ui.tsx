"use client";

import TextLogo from "@/app/(landing)/components/text-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { handleEmailSignUp, handleGoogle } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form";
import { signupSchema } from "@/lib/form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const SignupUI = () => {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    try {
      setLoading(true);
      setAuthError("");
      const result = await handleEmailSignUp(values.email, values.password);
      if (result?.error) {
        setAuthError(result.error);
      } else {
        router.push("/onboarding");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setAuthError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4 mt-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Sign Up</h1>
              <p className="text-sm sm:text-base text-gray-500">
                Create an account to access Quizzly
              </p>
            </div>

            {authError && (
              <p className="text-sm text-red-500 text-center bg-red-200 p-2 rounded-md">{authError}</p>
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
                      <Input type="password" placeholder="Your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Button type="submit" className="gap-2" disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : null}
                {loading ? "Signing up..." : "Sign up"}
              </Button>
              <p className="text-sm text-gray-500 text-center">
                Already have an account?{" "}
                <Link href="/login" className="hover:underline text-red-400">
                  Log in
                </Link>
              </p>
              <Button type="button" onClick={() => handleGoogle()} disabled={loading}>Sign up with Google</Button>
            </div>
          </form>
        </Form>
      </div>

      <Image src="/reading.svg" width={600} height={500} alt="reading" className="hidden lg:block" />
    </div>
  );
};

export default SignupUI;