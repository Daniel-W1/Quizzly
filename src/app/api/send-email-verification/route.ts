import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { email, token } = await req.json();

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

    return NextResponse.json({ success: "Email verification sent. Please check your email." }, { status: 200 });
  } catch (error) {
    console.error("Error in sendEmailVerification:", error);
    return NextResponse.json({ error: "Failed to send email verification. Please try again later." }, { status: 500 });
  }
}