import { NextRequest, NextResponse } from "next/server";
import { prisma as db } from "../../../prisma";

export async function GET(req: NextRequest, res: NextResponse) {
    const searchParams = req.nextUrl.searchParams;
    const emailtoken = searchParams.get('emailtoken')

    const user = await db.user.findUnique({
        where: {
            emailVerificationToken: emailtoken as string
        }
    })
    
    if (!user) {
        return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    if (user.emailVerified) {
        return NextResponse.json({ error: "Email already verified" }, { status: 400 });
    }
    
    // check if token is expired
    if (user.emailVerificationTokenExpiry! < new Date()) {
        return NextResponse.json({ error: "Your verification link has expired. Please request a new one." }, { status: 400 });
    }
    
    // update user email verification status
    await db.user.update({
        where: {
            id: user.id
        },
        data: {
            emailVerified: new Date(),
            emailVerificationToken: null,
            emailVerificationTokenExpiry: null
        }
    })
    
    return NextResponse.json({ success: "Email verified successfully" }, { status: 200 });
}
