import { NextResponse, NextRequest } from "next/server";
import { prisma as db } from "../../../../prisma";
import { DifficultyLevel, ExamType, Prisma } from "@prisma/client";
import { testSelectFields } from "@/lib/constants";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 8;

const formatTest = (test: any) => ({
  ...test,
  keyConcepts: test.keyConcepts.map((concept: any) => concept.name),
  questionCount: test._count.questions,
  _count: undefined,
});

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");
  const page = parseInt(searchParams.get("page") || String(DEFAULT_PAGE), 10);
  const pageSize = parseInt(searchParams.get("pageSize") || String(DEFAULT_PAGE_SIZE), 10);

  try {
    const filters = extractFilters(searchParams);
    const where = buildWhereClause(query, filters);

    const [tests, totalTests] = await Promise.all([
      db.test.findMany({
        where,
        select: testSelectFields,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: query ? undefined : { createdAt: "desc" },
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
      noQuery: !query,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "An error occurred during the search" },
      { status: 500 }
    );
  }
}

function extractFilters(searchParams: URLSearchParams) {
  return {
    concepts: searchParams.get("concepts"),
    difficulty: searchParams.get("difficulty")?.toUpperCase(),
    examType: searchParams.get("examType")?.toUpperCase(),
    year: searchParams.get("year"),
    university: searchParams.get("university"),
    department: searchParams.get("department"),
  };
}

function buildWhereClause(
  query: string | null,
  filters: ReturnType<typeof extractFilters>
): Prisma.TestWhereInput {
  const { concepts, difficulty, examType, year, university, department } = filters;

  const whereClause: Prisma.TestWhereInput = {
    AND: [
      ...(concepts ? [{ keyConcepts: { some: { name: { in: concepts.split(",") } } } }] : []),
      ...(difficulty ? [{ difficultyLevel: difficulty as DifficultyLevel }] : []),
      ...(examType ? [{ examType: examType as ExamType }] : []),
      ...(year ? [{ year: parseInt(year) }] : []),
      ...(university ? [{ university: { contains: university, mode: Prisma.QueryMode.insensitive } }] : []),
      ...(department ? [{ department: { contains: department, mode: Prisma.QueryMode.insensitive } }] : []),
    ],
  };

  if (query) {
    whereClause.OR = [
      { keyConcepts: { some: { name: { contains: query, mode: Prisma.QueryMode.insensitive } } } },
      { chapterNames: { contains: query, mode: Prisma.QueryMode.insensitive } },
      { courseName: { contains: query, mode: Prisma.QueryMode.insensitive } },
      { title: { contains: query, mode: Prisma.QueryMode.insensitive } }
    ];
  }

  return whereClause;
}