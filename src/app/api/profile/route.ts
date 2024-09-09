import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { prisma as db } from "../../../prisma";

export async function GET() {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const profile = await db.profile.findUnique({
            where: {
                userId: session.user?.id
            }
        })

        return NextResponse.json(profile);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}