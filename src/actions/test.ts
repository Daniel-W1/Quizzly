"use server";
import { prisma as db } from "../prisma";

export async function createTestSession(
  testId: string,
  userId: string,
  profileId: string,
  mood: string,
  questionsPerPage: number,
  remainingTime: number,
) {
  try {
    const testSession = await db.testSession.create({
      data: {
        testId,
        userId,
        profileId,
        selectedAnswers: [],
        mood,
        questionsPerPage,
        remainingTime,
        completedQuestions: 0,
        score: 0,
      },
    });

    return testSession;
  } catch (error) {
    console.error(error);
    return {
      error: `Failed to create test session: ${error}`,
    };
  }
}


export async function deleteTestSession(testSessionId: string) {
  try {
    const deletedTestSession = await db.testSession.delete({
      where: {
        id: testSessionId,
      },
    });

    return deletedTestSession;
  } catch (error) {
    console.error(error);
    return {
      error: `Failed to delete test session: ${error}`,
    };
  }
}

export async function updateTestSession(testSessionId: string, data: {
  completedQuestions: number;
  selectedAnswers: Record<string, string>;
  remainingTime: number;
}) {
  try {
    const updatedTestSession = await db.testSession.update({
      where: { id: testSessionId },
      data,
    });

    return updatedTestSession;
  } catch (error) {
    console.error(error);
    return {
      error: `Failed to update test session: ${error}`,
    };
  }
}

