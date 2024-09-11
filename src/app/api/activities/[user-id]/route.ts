import { NextRequest, NextResponse } from "next/server";
import { prisma as db } from "../../../../prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { "user-id": string } }
) {
  try {
    const { "user-id": userId } = params;
    const searchParams = req.nextUrl.searchParams;
    const activityType = searchParams.get('activityType');

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setMonth(endDate.getMonth() - 8);
    startDate.setDate(1);

    const activities = await db.userActivity.findMany({
      where: {
        userId,
        activityType: activityType as string,
        createdAt: {
          gte: startDate,
          lte: endDate
        },
      }
    });

    const formattedActivities = activities.map(activity => ({
      date: activity.date,
      count: activity.count
    }));

    if (formattedActivities.length === 0) {
      formattedActivities.push({
        date: startDate.toISOString().split('T')[0],
        count: 0
      })
    }

    return NextResponse.json({ activities: formattedActivities }, { status: 200 });
  } catch (error) {
    console.error("Error fetching activities:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}