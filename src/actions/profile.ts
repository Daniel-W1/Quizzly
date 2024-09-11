"use server";

import { auth } from "@/auth";
import { prisma as db } from "../prisma";
import { revalidatePath } from "next/cache";

export async function updateProfile(
  userId: string,
  image: string,
  name: string,
  year: string,
  bio: string
) {
  try {
    const session = await auth();
    if (!session) {
      return { error: "Unauthorized" };
    }

    if (session.user?.id !== userId) {
      return { error: "Unauthorized" };
    }

    const profile = await db.profile.update({
      where: { userId },
      data: { name, year, bio, image },
    });
    revalidatePath("/profile/[id]");
    return profile;
  } catch (error) {
    console.error(error);
    return { error: "Failed to update profile" };
  }
}

export async function updateUserActivity(userId: string, activityType: string) {
    try {
        const session = await auth();
        if (!session) {
            return { error: "Unauthorized" };
        }

        if (session.user?.id !== userId) {
            return { error: "Unauthorized" };
        }
        
        await db.userActivity.upsert({
            where: {
              userId_activityType_date: {
                userId: userId,
                activityType: activityType,
                date: new Date().toISOString().split('T')[0]
              }
            },
            update: {
              count: { increment: 1 }
            },
            create: {
              userId: userId,
              date: new Date().toISOString().split('T')[0],
              activityType: activityType,
              count: 1
            }
        })

    }
    catch (error) {
        console.error(error, 'updateUserActivity');
        return { error: "Failed to update user activity" };
    }
}