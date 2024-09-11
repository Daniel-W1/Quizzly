import { NextRequest, NextResponse } from "next/server";
import { prisma as db } from "../../../../../../prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id : userId } = params;

  if (!userId) {
    return NextResponse.json(
      {
        error: "User ID is required",
      },
      { status: 400 }
    );
  }
  try {
    const testSessions = await db.testSession.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json(testSessions, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: `Failed to fetch user test sessions: ${error}`,
      },
      { status: 500 }
    );
  }
}
