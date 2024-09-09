import { NextRequest, NextResponse } from "next/server";
import { testSelectFields } from "@/lib/constants";
import { prisma as db } from "../../../../prisma";

export async function GET(req: NextRequest, { params }: { params: { 'test-id': string } }) {
  const { 'test-id': testId } = params;

  if (!testId) {
    return NextResponse.json(
      {
        error: "Test ID is required",
      },
      { status: 400 }
    );
  }
  try {
    const test = await db.test.findUnique({
      where: {
        id: testId,
      },
      select: testSelectFields,
    });

    const formattedTest = {
      ...test,
      keyConcepts: test?.keyConcepts.map((concept) => concept.name),
      questionCount: test?._count.questions,
    };

    return NextResponse.json(formattedTest, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: `Failed to fetch test details: ${error}`,
      },
      { status: 500 }
    );
  }
}
