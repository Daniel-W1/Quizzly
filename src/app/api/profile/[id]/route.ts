import { NextRequest, NextResponse } from "next/server";
import { prisma as db } from "../../../../prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const profileId = params.id;

        const profile = await db.profile.findUnique({
            where: {
                id: profileId
            }
        })

        if (!profile) {
            return NextResponse.json({ error: "Profile not found" }, { status: 404 });
        }

        return NextResponse.json(profile);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}