import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  });

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: passwordSchema,
});

export const signupSchema = loginSchema.extend({
  confirm_password: z
    .string()
    .min(8, { message: "Confirm password must be at least 8 characters long" }),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords do not match",
  path: ["confirm_password"],
});