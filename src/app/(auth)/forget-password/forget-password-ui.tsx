"use client";

import TextLogo from '@/app/(landing)/components/text-logo'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { handleForgetPassword } from '@/actions/auth';
import { Loader2 } from "lucide-react";

const forgetPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
})

const ForgetPasswordUI = () => {
  const form = useForm<z.infer<typeof forgetPasswordSchema>>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  })
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof forgetPasswordSchema>) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await handleForgetPassword(values.email);
      if (response.error) {
        setError(response.error);
      } else {
        setSuccess("Password reset email sent successfully.");
      }
    } catch (error) {
      console.error("Error forgetting password:", error);
      setError("Failed to send reset email. Please try again later.");
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
            <h1 className="text-xl sm:text-2xl text-center w-full font-bold">Forgot your password?</h1>
            <p className="text-xs sm:text-base text-gray-500">Enter your email address and we will send you a link to reset your password.</p>
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
              {loading ? "Sending reset email..." : "Send reset email"}
            </Button>
          </form>
        </Form>
    </div>
  )
}

export default ForgetPasswordUI