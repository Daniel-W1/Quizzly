"use server";
import { profileSchema } from "@/lib/form-schemas";
import { prisma as db } from "../prisma";
import { z } from "zod";
import { auth, unstable_update } from "@/auth";

export const validateUsername = async (username: string) => {
  try {
    const profile = await db.profile.findUnique({
      where: {
        username: username,
      },
    });
    return profile ? false : true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const createProfile = async (profile: z.infer<typeof profileSchema>) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!session || !userId) {
      return {
        error: "Unauthorized",
      };
    }

    const newProfile = await db.profile.create({
      data: {
        ...profile,
        userId,
      },
    });

    await db.user.update({
      where: {
        id: userId
      },
      data: {
        onboarded: true
      }
    })

    await unstable_update({
      user: {
        onboarded: true
      },
    }); 

    return newProfile;
  } catch (error) {
    console.log(error);
    return {
      error: `Something went wrong: ${error}`,
    };
  }
};
