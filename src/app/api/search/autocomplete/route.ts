import { NextResponse, NextRequest } from "next/server";
import { prisma as db } from "../../../../prisma";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('query');

    if (!query) {
        return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    try {
        const concepts = await db.keyConcept.findMany({
            where: {
                name: {
                    contains: query,
                    mode: "insensitive",
                }
            },
            take: 7
        });

        const conceptNames = concepts.map((concept) => concept.name);
        return NextResponse.json(conceptNames);
    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json({ error: 'An error occurred during the search' }, { status: 500 });
    }
}