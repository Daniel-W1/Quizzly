import { validateUsername } from "@/actions/onboarding";
import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  });

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: passwordSchema,
});

export const signupSchema = loginSchema
  .extend({
    confirm_password: z
      .string()
      .min(8, {
        message: "Confirm password must be at least 8 characters long",
      }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export const profileSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  username: z
    .string()
    .min(6, { message: "Username with at least 6 characters is required" })
    .min(6, { message: "Username must be at least 6 characters long" })
    .max(15, { message: "Username must not exceed 15 characters" })
    .regex(/^(?![_\.])(?!.*[_\.]{2})[a-zA-Z0-9._]+(?<![_\.])$/, {
      message:
        "Username can only contain letters, numbers, underscores, and periods, \
        cannot start or end with a special character, and cannot have consecutive special characters",
    }),
  university: z.string().min(1, { message: "University is required" }),
  department: z.string().min(1, { message: "Department is required" }),
  year: z.string().min(1, { message: "Year is required" }),
  bio: z.string().max(100, { message: "Bio must not exceed 100 characters" }).optional(),
  image: z.string().optional(),
});
