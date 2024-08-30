"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { handleResetPassword } from "@/app/actions/auth";
import { z } from "zod";
import { passwordSchema } from "@/lib/form-schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextLogo from "@/app/(landing)/components/text-logo";
import { Loader2 } from "lucide-react";

const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ResetPasswordUI = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("reset-token");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      const response = await handleResetPassword(
        token as string,
        values.password
      );
      if (response.error) {
        setError(response.error);
      } else {
        setSuccess("Password has been reset successfully.");
        setTimeout(() => router.push("/login"), 3000);
      }
    } catch (error) {
      setError("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <TextLogo
        text="Quizzly"
        color="#0065F2"
        fontSize="clamp(32px, 5vw, 44px)"
        fontWeight="bold"
        fontFamily="sans-serif"
      />

      <div className="w-full max-w-md p-8 space-y-4">
        <h1 className="text-2xl font-bold text-center">Reset Password</h1>
        {error && <p className="text-sm text-red-500 text-center bg-red-200 p-2 rounded-md">{error}</p>}
        {success && <p className="text-sm text-green-500 text-center bg-green-200 p-2 rounded-md">{success}</p>}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full gap-2" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : null}
              {loading ? "Resetting password..." : "Reset Password"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordUI;
