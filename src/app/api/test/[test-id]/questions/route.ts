import { NextRequest, NextResponse } from "next/server";
import { prisma as db } from "../../../../../prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { 'test-id': string } }
) {
  const { 'test-id': testId } = params;
  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "5", 10);

  try {
    const questions = await db.question.findMany({
      where: { testId },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        type: true,
        statement: true,
        choices: true,
        points: true,
        mediaUrl: true,
      },
    });

    const totalQuestions = await db.question.count({ where: { testId } });

    return NextResponse.json({
      questions,
      totalQuestions,
      currentPage: page,
      totalPages: Math.ceil(totalQuestions / pageSize),
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}
