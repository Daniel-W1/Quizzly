"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "../auth";
import { auth } from "../auth";
import bcrypt from "bcryptjs";
import { prisma as db } from "../prisma";
import { isRedirectError } from "next/dist/client/components/redirect";
import axios from "axios";
import nodemailer from "nodemailer";

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
    return {
      error: "An unexpected error occurred during sign in. Please try again later.",
    };
  }
};

export const handleEmailSignUp = async (email: string, password: string) => {
  try {
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return {
        error:
          "An account with this email already exists. Please use a different email or try logging in.",
      };
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const emailVerificationToken = await bcrypt.hash(newUser.id, 10);
    const emailVerificationTokenExpiry = new Date(
      Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    );

    await db.user.update({
      where: {
        id: newUser.id,
      },
      data: {
        emailVerificationToken,
        emailVerificationTokenExpiry,
      },
    });

    return await sendEmailVerification(newUser.email!, emailVerificationToken);
  } catch (error) {
    console.error("Error in handleEmailSignUp:", error);
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
    console.error("Error in handleSignOut:", error);
    throw new Error("Failed to sign out. Please try again later.");
  }
};

export const handleForgetPassword = async (email: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/forget-password`,
      {
        email,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in handleForgetPassword:", error);
    return { error: "Failed to send reset email. Please try again later." };
  }
};

export const handleResetPassword = async (
  token: string,
  newPassword: string
) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/reset-password`,
      {
        token,
        newPassword,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in handleResetPassword:", error);
    return { error: "Failed to reset password. Please try again later." };
  }
};

export const sendEmailVerification = async (email: string, token: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: parseInt(process.env.EMAIL_SERVER_PORT!, 10),
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?emailtoken=${token}`;

    await transporter.sendMail({
      to: email,
      subject: "Email Verification",
      html: `<p>Please click the link below to verify your email:</p>
             <a href="${verificationUrl}">Verify Email</a>`,
    });

    return { success: "Email verification sent. Please check your email." };
  } catch (error) {
    console.error("Error in sendEmailVerification:", error);
    return {
      error: "Failed to send email verification. Please try again later.",
    };
  }
};

export const resendEmailVerification = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        error: "User not found",
      };
    }

    const account = await db.account.findFirst({
      where: {
        userId: user.id!,
        provider: "google",
      },
    })

    if (account) {
      throw new Error("Account already linked to a user, please use appropriate provider to sign in")
    }
    // check if there is an unexpired email verification token
    if (user.emailVerificationToken && user.emailVerificationTokenExpiry && user.emailVerificationTokenExpiry > new Date()) {
      throw new Error("Email verification already sent. Please check your email.")
    }

    // check if user is already verified
    if (user.emailVerified) {
      throw new Error("Email already verified. Please sign in.")
    }

    const emailVerificationToken = await bcrypt.hash(user.id, 10);
    const emailVerificationTokenExpiry = new Date(
      Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    );

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailVerificationToken,
        emailVerificationTokenExpiry,
      },
    });

    return await sendEmailVerification(user.email!, emailVerificationToken);
  } catch (error) {
    console.error("Error in resendEmailVerification:", error);
    return {
      error: `Failed to resend email verification. ${error}`,
    };
  }
};