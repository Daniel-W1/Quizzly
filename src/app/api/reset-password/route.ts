import { NextRequest, NextResponse } from "next/server";
import { prisma as db } from "../../../prisma";
import bcrypt from "bcryptjs";


export const POST = async (req: NextRequest) => {
  const { token, newPassword } : { token: string, newPassword: string } = await req.json();

  const user = await db.user.findUnique({
    where: {
      resetToken: token,
    },
  });

  if (!user || user.resetTokenExpiry! < new Date()) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(newPassword, salt);

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });

  return NextResponse.json({ message: "Password reset successful" }, { status: 200 });
};
