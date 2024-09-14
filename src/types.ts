export type Profile = {
  id: string;
  userId: string;
  name: string;
  username: string;
  university: string;
  department: string;
  year: string;
  bio: string | null;
  image: string | null;
  totalContribution: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TestDetails = {
  id: string;
  title: string;
  description: string | null;
  courseName: string;
  teacherName: string;
  chapterNames: string;
  difficultyLevel: string;
  totalMarks: number; 
  allowedTime: number;
  examType: string;
  year: number;
  university: string;
  department: string;
  keyConcepts: string[];
  questionCount: number;
};

export type TestSession = {
  id: string;
  userId: string;
  testId: string;
  profileId: string;
  selectedAnswers: Record<string, string>;
  mood: string;
  score: number;
  totalMarks: number;
  finished: boolean;
  questionsPerPage: number;
  remainingTime: number;
  completedQuestions: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Question = {
  id: string;
  testId: string;
  selectedAnswer: string | null;
  type: string;
  statement: string;
  choices: string[];
  correctAnswer: string;
  explanation: string | null;
  keyConcepts: string[];
  points: number;
  mediaUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UserActivity = {
  date: string;
  count: number;
}

