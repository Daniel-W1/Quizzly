import { NextRequest, NextResponse } from "next/server";
import { prisma as db } from "../../../../prisma";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const userId = params.get("userId");
  const testId = params.get("testId");

  if (!userId || !testId) {
    return NextResponse.json(
      {
        error: "User ID and Test ID are required",
      },
      { status: 400 }
    );
  }
  try {
    const testSession = await db.testSession.findUnique({
      where: {
        userId_testId: {
          userId,
          testId,
        },
      },
    });

    return NextResponse.json(testSession, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: `Failed to fetch user test session: ${error}`,
      },
      { status: 500 }
    );
  }
}
