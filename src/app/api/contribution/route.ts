import { NextRequest, NextResponse } from "next/server";
import { prisma as db } from "../../../prisma";
import { ContributionStatus } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const { testId, points, userId } = await req.json();

    if (!testId || !points || !userId) {
      return NextResponse.json(
        { error: "Missing required fields testId, points, userId" },
        { status: 400 }
      );
    }

    await db.contribution.create({
      data: {
        userId,
        testId,
        points,
        status: ContributionStatus.PENDING,
      },
    });

    await db.profile.update({
      where: {
        userId: userId,
      },
      data: {
        totalContribution: {
          increment: points,
        },
      },
    });

    return NextResponse.json({ message: "Contribution created successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create contribution" });
  }
}
