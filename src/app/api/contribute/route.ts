import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: parseInt(process.env.EMAIL_SERVER_PORT!, 10),
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    await transporter.sendMail({
      to: email,
      subject: "Welcome to Quizzly Team!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h2 style="color: #0065F2;">Welcome to the Quizzly Team!</h2>
          <p>Thank you for your interest in contributing to Quizzly. We're excited to have you on board!</p>
          <p>To get started, please join our Telegram group where you'll find more information about contributing and can connect with other team members.</p>
          <p><a href="https://t.me/+d8Ifn2_4DcY5ZGM0" style="display: inline-block; padding: 10px 20px; background-color: #0065F2; color: #ffffff; text-decoration: none; border-radius: 5px;">Join Quizzly Telegram Group</a></p>
          <p>If you have any questions, feel free to reply to this email.</p>
          <p>Best regards,<br>Daniel</p>
        </div>
      `,
    });

    return NextResponse.json({ success: "Next steps sent. Please check your inbox." }, { status: 200 });
  } catch (error) {
    console.error("Error in sendJoinContributeEmail:", error);
    return NextResponse.json({ error: "Failed to send welcome email. Please try again later." }, { status: 500 });
  }
}
