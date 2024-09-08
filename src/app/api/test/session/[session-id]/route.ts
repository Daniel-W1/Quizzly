import { NextRequest, NextResponse } from "next/server";
import { prisma as db } from "../../../../../prisma";

export async function GET(req: NextRequest, { params }: { params: { 'session-id': string } }) {
  const { 'session-id': sessionId } = params;

  if (!sessionId) {
    return NextResponse.json(
      {
        error: "Session ID is required",
      },
      { status: 400 }
    );
  }
  try {
    const testSession = await db.testSession.findUnique({
      where: {
        id: sessionId,
      },
    });

    return NextResponse.json(testSession, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: `Failed to fetch test session: ${error}`,
      },
      { status: 500 }
    );
  }
}