"use client";

import React, { useEffect, useState } from "react";
import { TestDetails, TestSession } from "@/types";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
    Clock,
    GraduationCap,
    School,
    User,
    Calendar,
    BookOpen,
    BarChart,
    HelpCircle,
    Loader2,
    Sparkles,
    Option,
} from "lucide-react";
import { DifficultyLevel } from "@/app/search/components/test-card";
import { Slider } from "@/components/ui/slider";
import { useProfileStore } from "@/stores/profile-store";
import { createTestSession, deleteTestSession } from "@/actions/test";
import { useRouter } from "next/navigation";
import ConfigLoadingSkeleton from "./config-loading-skeleton";
import axios from "axios";

interface StartTestProps {
    testDetails: TestDetails;
}

const MOOD = [
    { value: "chill", label: "Chill (Not Timed)" },
    { value: "focused", label: "Focused (Timed)" },
];

const StartTest: React.FC<StartTestProps> = ({ testDetails }) => {
    const [mood, setMood] = useState<"chill" | "focused">("chill");
    const [questionsPerPage, setQuestionsPerPage] = useState(Math.min(testDetails.questionCount, 5));
    const profile = useProfileStore((state) => state.profile);
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [existingSession, setExistingSession] = useState<TestSession | null>(
        null
    );
    const [sessionLoading, setSessionLoading] = useState(true);
    const router = useRouter();

    const fetchExistingSession = async () => {
        if (profile?.userId) {
            setSessionLoading(true);
            const result = await axios.get(`/api/test/session?userId=${profile.userId}&testId=${testDetails.id}`).then((res) => res.data);
            if (result && !("error" in result)) {
                setExistingSession(result);
            }else{
                setExistingSession(null);
            }
            setSessionLoading(false);
        }
    };

    useEffect(() => {
        fetchExistingSession();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile?.userId, testDetails.id]);

    const continueExistingSession = () => {
        router.push(`/session/${existingSession?.id}`);
    };

    const onStart = async (mood: "chill" | "focused") => {
        setLoading(true);
        const result = await createTestSession(
            testDetails.id,
            profile?.userId as string,
            profile?.id as string,
            mood,
            questionsPerPage,
            testDetails.allowedTime
        );
        setLoading(false);
        if ("error" in result) {
            setError(result.error);
        } else {
            router.push(`/session/${result.id}`);
        }
    };

    const onStartOver = async () => {
        setDeleteLoading(true);
        const result = await deleteTestSession(existingSession?.id as string);
        if ("error" in result) {
            setError(result.error);
        }else{
            await fetchExistingSession();
        }
        setDeleteLoading(false);
    };

    return (
        <div className="flex flex-col lg:flex-row max-w-screen-xl h-screen py-4 lg:py-8 mx-auto bg-white rounded-lg">
            {/* Left side: Test details */}
            <div className="w-full max-w-lg mx-auto lg:w-1/2 p-6">
                <h2 className="text-2xl font-bold mb-4">{testDetails.title}</h2>
                <p className="mb-4 text-gray-600">{testDetails.description}</p>

                <Separator className="my-4" />

                <div className="space-y-4">
                    <DetailItem
                        icon={<School className="w-5 h-5" />}
                        label="University"
                        value={testDetails.university}
                    />
                    <DetailItem
                        icon={<BookOpen className="w-5 h-5" />}
                        label="Course"
                        value={testDetails.courseName}
                    />
                    <DetailItem
                        icon={<User className="w-5 h-5" />}
                        label="Teacher"
                        value={testDetails.teacherName}
                    />
                    <DetailItem
                        icon={<GraduationCap className="w-5 h-5" />}
                        label="Exam Type"
                        value={testDetails.examType}
                        badge
                    />
                    <DetailItem
                        icon={<Calendar className="w-5 h-5" />}
                        label="Year"
                        value={testDetails.year.toString()}
                    />
                    <DetailItem
                        icon={<BarChart className="w-5 h-5" />}
                        label="Difficulty"
                        value={testDetails.difficultyLevel}
                        badge
                    />
                    <DetailItem
                        icon={<Clock className="w-5 h-5" />}
                        label="Time Allowed"
                        value={`${testDetails.allowedTime} minutes`}
                    />
                    <DetailItem
                        icon={<HelpCircle className="w-5 h-5" />}
                        label="Questions"
                        value={testDetails.questionCount.toString()}
                    />
                </div>
            </div>

            {/* Right side: Test configuration */}
            {!existingSession && !sessionLoading && (
                <div className="w-full lg:w-1/2 p-6 lg:p-8">
                    <h3 className="text-xl font-semibold mb-6 text-center">
                        Configure Your Test
                    </h3>

                    <div className="mb-6 max-w-md mx-auto">
                        <label htmlFor="mood" className="block mb-2 font-medium">
                            Select Test Mood:
                        </label>
                        <Select
                            onValueChange={(value) => setMood(value as "chill" | "focused")}
                            value={mood}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Mood" />
                            </SelectTrigger>
                            <SelectContent>
                                {MOOD.map((mood) => (
                                    <SelectItem key={mood.value} value={mood.value}>
                                        {mood.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="mb-6 max-w-md mx-auto">
                        <label htmlFor="mood" className="block mb-2 font-medium">
                            Questions per page: {questionsPerPage}
                        </label>
                        <Slider
                            defaultValue={[questionsPerPage]}
                            max={testDetails.questionCount}
                            min={1}
                            onValueChange={(value) => setQuestionsPerPage(value[0])}
                            step={1}
                        />
                    </div>

                    <div className="flex justify-center">
                        <Button
                            onClick={() => onStart(mood)}
                            className="w-full max-w-md mx-auto justify-center"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    Configuring Test..
                                    <Loader2 className="w-4 h-4 animate-spin ml-2" />
                                </span>
                            ) : (
                                <span className="flex items-center justify-center">
                                    Start Test <Sparkles className="w-4 h-4 ml-2 fill-white" />
                                </span>
                            )}
                        </Button>
                    </div>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                </div>
            )}
            {existingSession && !sessionLoading && (
                <div className="w-full lg:w-1/2 p-6 lg:p-8 text-center">
                    <h3 className="text-xl font-semibold mb-6 text-center">
                        Existing Test Progress
                    </h3>
                    <div className="bg-gray-100 p-6 rounded-lg mb-6 w-full max-w-md mx-auto">
                        <div className="space-y-4">
                            <DetailItem
                                icon={<Clock className="w-5 h-5" />}
                                label="Started"
                                value={new Date(existingSession.createdAt).toLocaleString()}
                            />
                            <DetailItem
                                icon={<Option className="w-5 h-5" />}
                                label="Mood"
                                value={existingSession.mood === 'chill' ? 'Chill (Not Timed)' : 'Focused (Timed)'}
                            />
                            <DetailItem
                                icon={<HelpCircle className="w-5 h-5" />}
                                label="Questions Per Page"
                                value={existingSession.questionsPerPage.toString()}
                            />
                            <DetailItem
                                icon={<BarChart className="w-5 h-5" />}
                                label="Completed Questions"
                                value={`${existingSession.completedQuestions} / ${testDetails.questionCount}`}
                            />
                            {existingSession.mood === 'focused' && (
                                <DetailItem
                                    icon={<Clock className="w-5 h-5" />}
                                    label="Remaining Time"
                                    value={`${Math.floor(existingSession.remainingTime / 60)} minutes`}
                                />
                            )}
                        </div>
                    </div>
                    <Button
                        onClick={continueExistingSession}
                        className="w-full max-w-md mx-auto justify-center"
                    >
                        Continue Test
                    </Button>
                    <Button
                        onClick={onStartOver}
                        className="w-full max-w-md mx-auto my-3 justify-center border-red-500 hover:bg-red-500 hover:text-white"
                        variant="outline"
                        disabled={deleteLoading}
                    >
                        {deleteLoading ? (
                            <span className="flex items-center justify-center">
                                Deleting Progress..
                                <Loader2 className="w-4 h-4 animate-spin ml-2" />
                            </span>
                        ) : (
                            "Start Over"
                        )}
                    </Button>
                </div>
            )}
            {sessionLoading && (
                <ConfigLoadingSkeleton />
            )}
        </div>
    );
};

const DetailItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: string;
    badge?: boolean;
}> = ({ icon, label, value, badge }) => (
    <div className="flex items-center text-left">
        {icon}
        <span className="font-medium ml-2">{label}:</span>
        {badge ? (
            <Badge variant={value.toLowerCase() as DifficultyLevel} className="ml-2">
                {value}
            </Badge>
        ) : (
            <span className="ml-2 truncate">{value}</span>
        )}
    </div>
);

export default StartTest;