import { NextRequest, NextResponse } from "next/server";
import { prisma as db } from "../../../../../prisma";
import { auth } from "@/auth";

export async function GET(req: NextRequest, { params }: { params: { 'test-id': string } }) {
  const { 'test-id': testId } = params;
  const session = await auth();

  const userId = session?.user?.id;

  if (!testId || !userId) {
    return NextResponse.json(
      {
        error: "User ID and Test ID are required",
      },
      { status: 400 }
    );
  }
  try {
    const testSessions = await db.testSession.findMany({
      where: {
        userId,
        testId,
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
