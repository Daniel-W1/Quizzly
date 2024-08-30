"use client";

import TextLogo from '@/app/(landing)/components/text-logo'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { z } from "zod" 
import { zodResolver } from "@hookform/resolvers/zod"
import { resendEmailVerification } from '@/app/actions/auth';
import { Loader2 } from "lucide-react";

const resendVerificationSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
})

const ResendVerificationUI = () => {
  const form = useForm<z.infer<typeof resendVerificationSchema>>({
    resolver: zodResolver(resendVerificationSchema),
    defaultValues: {
      email: "",
    },
  })
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof resendVerificationSchema>) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await resendEmailVerification(values.email);
      if (response.error) {
        setError(response.error);
      } else {
        setSuccess("Verification email sent successfully.");
      }
    } catch (error) {
      console.error("Error resending verification email:", error);
      setError("Failed to resend verification email. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-screen max-w-screen-md mx-auto space-y-4 p-8">
        <TextLogo
          text="Quizzly"
          color="#0065F2"
          fontSize="clamp(32px, 5vw, 44px)"
          fontWeight="bold"
          fontFamily="sans-serif"
        />
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-xl sm:text-2xl w-full font-bold text-center">Resend verification email</h1>
            <p className="text-xs sm:text-base text-gray-500">Enter your email address and we will send you a link to verify your email.</p>
        </div>

        {error && <p className="text-sm text-red-500 text-center bg-red-200 p-2 rounded-md">{error}</p>}
        {success && <p className="text-sm text-green-500 text-center bg-green-200 p-2 rounded-md">{success}</p>}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-sm">
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
            <Button type="submit" className="w-full gap-2" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : null}
              {loading ? "Sending verification email..." : "Send verification email"}
            </Button>
          </form>
        </Form>
    </div>
  )
}

export default ResendVerificationUI