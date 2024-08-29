"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "../../auth";
import { auth } from "../../auth";
import bcrypt from "bcryptjs";
import { prisma as db } from "../../prisma";
import { isRedirectError } from "next/dist/client/components/redirect";
import axios from "axios";

export const handleGoogle = async () => {
  try {
    await signIn("google", { redirectTo: "/onboarding" });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    throw new Error("Failed to sign in with Google. Please try again later.");
  }
};

export const handleEmailSignIn = async (email: string, password: string) => {
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return result;
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error:
          error.cause?.err?.message ||
          "An unexpected authentication error occurred. Please try again.",
      };
    }
    if (isRedirectError(error)) {
      throw error;
    }
    throw new Error(
      "An unexpected error occurred during sign in. Please try again later."
    );
  }
};

export const handleEmailSignUp = async (email: string, password: string) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return {
        error:
          "An account with this email already exists. Please use a different email or try logging in.",
      };
    }

    await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const signInResult = await handleEmailSignIn(email, password);
    return signInResult;
  } catch (error) {
    if (error instanceof Error) {
      return { error: `Failed to create account: ${error.message}` };
    }
    return {
      error:
        "An unexpected error occurred during sign up. Please try again later.",
    };
  }
};

export const checkIsAuthenticated = async () => {
  try {
    const session = await auth();
    return !!session;
  } catch (error) {
    console.error("Error checking authentication status:", error);
    return false;
  }
};

export const handleSignOut = async () => {
  try {
    await signOut({ redirectTo: "/login" });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    throw new Error("Failed to sign out. Please try again later.");
  }
};

export const handleForgetPassword = async (email: string) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/forget-password`,  {
      email
    });
    return response.data;
  } catch (error) {
    console.error("Error forgetting password:", error);
    return { error: "Failed to send reset email. Please try again later." };
  }
};

export const handleResetPassword = async (
  token: string,
  newPassword: string
) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reset-password`, {
      token,
      newPassword
    });
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    return { error: "Failed to reset password. Please try again later." };
  }
};
