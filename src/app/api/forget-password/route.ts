import { NextRequest, NextResponse } from "next/server";
import { prisma as db } from "../../../prisma";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  // check if user exists
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  // if user does not exist, return an error
  if (!user) {
    return NextResponse.json({ error: "User does not exist" }, { status: 404 });
  }

  // if user exists, send a password reset email
  const resetToken = await bcrypt.hash(user.id, 10);

  // send email
  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      resetToken,
      resetTokenExpiry: new Date(Date.now() + 3600000),
    },
  });

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT!, 10),
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });
  
  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?reset-token=${resetToken}`;

  await transporter.sendMail({
    to: email,
    subject: "Password Reset Request",
    html: `<p>You requested a password reset. Click the link below to reset your password:</p>
           <a href="${resetUrl}">Reset Password</a>`
  });

  return NextResponse.json({ message: "Email sent" }, { status: 200 });
}
