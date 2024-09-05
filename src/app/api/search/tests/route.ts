import { NextResponse, NextRequest } from "next/server";
import { prisma as db } from "../../../../prisma";
import { DifficultyLevel, ExamType, Prisma } from "@prisma/client";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 8;

const testSelectFields = {
  id: true,
  title: true,
  courseName: true,
  teacherName: true,
  chapterNames: true,
  difficultyLevel: true,
  allowedTime: true,
  examType: true,
  year: true,
  university: true,
  department: true,
  keyConcepts: {
    select: {
      name: true,
    },
  },
  _count: {
    select: {
      questions: true,
    },
  },
};

const formatTest = (test: any) => ({
  ...test,
  keyConcepts: test.keyConcepts.map((concept: any) => concept.name),
  questionCount: test._count.questions,
  _count: undefined,
});

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const query = searchParams.get("query");
  const concepts = searchParams.get("concepts");
  const difficulty = searchParams.get("difficulty")?.toUpperCase();
  const examType = searchParams.get("examType")?.toUpperCase();
  const year = searchParams.get("year");
  const university = searchParams.get("university");
  const department = searchParams.get("department");

  const page = parseInt(searchParams.get("page") || String(DEFAULT_PAGE), 10);
  const pageSize = parseInt(searchParams.get("pageSize") || String(DEFAULT_PAGE_SIZE), 10);

  try {
    if (!query) {
      return await getRecentTests(pageSize);
    }

    const where = buildWhereClause(query, concepts, difficulty as DifficultyLevel, examType as ExamType, year, university, department);
    const [tests, totalTests] = await Promise.all([
      db.test.findMany({
        where,
        select: testSelectFields,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      db.test.count({ where }),
    ]);

    const formattedTests = tests.map(formatTest);
    const totalPages = Math.ceil(totalTests / pageSize);

    return NextResponse.json({
      tests: formattedTests,
      totalTests,
      totalPages,
      currentPage: page,
      noQuery: false,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "An error occurred during the search" },
      { status: 500 }
    );
  }
}

async function getRecentTests(pageSize: number) {
  const newTests = await db.test.findMany({
    orderBy: { createdAt: "desc" },
    select: testSelectFields,
    take: pageSize,
  });

  const formattedTests = newTests.map(formatTest);

  return NextResponse.json({
    tests: formattedTests,
    totalTests: formattedTests.length,
    totalPages: 1,
    currentPage: 1,
    noQuery: true,
  });
}

function buildWhereClause(
  query: string,
  concepts: string | null,
  difficulty: string | null,
  examType: string | null,
  year: string | null,
  university: string | null,
  department: string | null
): Prisma.TestWhereInput {
  return {
    OR: [
      { title: { contains: query, mode: Prisma.QueryMode.insensitive } },
      { courseName: { contains: query, mode: Prisma.QueryMode.insensitive } },
      { teacherName: { contains: query, mode: Prisma.QueryMode.insensitive } },
      { chapterNames: { contains: query, mode: Prisma.QueryMode.insensitive } },
    ],
    AND: [
      ...(concepts ? [{ keyConcepts: { some: { name: { in: concepts.split(",") } } } }] : []),
      ...(difficulty ? [{ difficultyLevel: difficulty as DifficultyLevel }] : []),
      ...(examType ? [{ examType: examType as ExamType }] : []),
      ...(year ? [{ year: parseInt(year) }] : []),
      ...(university ? [{ university: { contains: university, mode: Prisma.QueryMode.insensitive } }] : []),
      ...(department ? [{ department: { contains: department, mode: Prisma.QueryMode.insensitive } }] : []),
    ],
  };
}
