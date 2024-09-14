"use client"

import { Question, TestDetails, TestSession } from '@/types';
import React, { useEffect, useRef, useState } from 'react';
import { PaginationComponent } from '@/components/pagination';
import QuestionsHeader from './questions-header';
import QuestionCard from './question-card';
import axios from 'axios';
import QuestionsLoadingSkeleton from './questions-loading-skeleton';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { updateTestSession } from '@/actions/test';
import { Loader2, Pause, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Countdown from 'react-countdown';
import FinishDialog from './finish-dialog';
import UseSessionStorage from '@/hooks/use-session-storage';
import { updateUserActivity } from '@/actions/profile';

interface QuestionsPageProps {
    testDetails: TestDetails;
    sessionDetails: TestSession;
}

const QuestionsPage = ({ testDetails, sessionDetails }: QuestionsPageProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
    const [isFinishDialogOpen, setIsFinishDialogOpen] = useState(false);
    const [isFinishLoading, setIsFinishLoading] = useState(false);
    const searchParams = useSearchParams();
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
    const [selectedAnswers, setSelectedAnswers] = UseSessionStorage({ key: 'selectedAnswers', initialState: sessionDetails.selectedAnswers });
    const [isExitLoading, setIsExitLoading] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const countDownRef = useRef<Countdown | null>(null);
    const { toast } = useToast();
    const router = useRouter();

    const totalQuestions = testDetails.questionCount;
    const totalPages = Math.ceil(totalQuestions / sessionDetails.questionsPerPage);
    const pageSize = sessionDetails.questionsPerPage;
    const mood = sessionDetails.mood;

    const handleAnswerSelection = (choiceId: string, questionId: string) => {
        setSelectedAnswers({ ...selectedAnswers, [questionId]: choiceId });
    };

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', page.toString())
        return `/session/${sessionDetails.id}?${params.toString()}`
    }

    const fetchAllQuestions = async (): Promise<Question[]> => {
        const response = await axios.get(`/api/test/${testDetails.id}/questions?page=1&pageSize=${totalQuestions}`);
        return response.data.questions;
    };

    const calculateScore = async () => {
        const allQuestions = await fetchAllQuestions();
        let score = 0;
        allQuestions.forEach(question => {
            if (selectedAnswers[question.id] === question.correctAnswer) {
                score += question.points;
            }
        });
        return score;
    };

    const handlePause = () => {
        setIsPaused(true);
        if (countDownRef.current) {
            countDownRef.current.getApi().pause();
        }
    };

    const handleResume = () => {
        setIsPaused(false);
        if (countDownRef.current) {
            countDownRef.current.getApi().start();
        }
    };

    const getRemainingTime = () => {
        if (mood === 'focused') {
            const time = sessionStorage.getItem(testDetails.id + '-countdown');
            if (time) {
                const { remainingTime } = JSON.parse(time);
                return Math.ceil(remainingTime / (60 * 1000)); // convert to minutes
            }
        }
        return testDetails.allowedTime;
    }

    const clearSessionStorage = (key: string) => {
        sessionStorage.removeItem(key);
    }

    const handleFinishTest = async () => {
        setIsFinishDialogOpen(false);
        setIsFinishLoading(true);

        const score = await calculateScore();
        const response = await updateTestSession(sessionDetails.id, {
            selectedAnswers,
            completedQuestions: Object.keys(selectedAnswers).length,
            remainingTime: getRemainingTime(),
            finished: true,
            score
        });

        await updateUserActivity(sessionDetails.userId, 'finished_test');

        if ("error" in response) {
            console.log(response.error);
            toast({
                title: "Error",
                description: response.error,
                variant: "destructive"
            })
        }
        else {
            clearSessionStorage(testDetails.id + '-countdown');
            clearSessionStorage('selectedAnswers');

            if (mood === 'focused') {
                router.push(`/session/${sessionDetails.id}/result`)
            }
            else {
                router.push(`/search`)
            }
        }
        setIsFinishLoading(false);
    }

    const handleExit = async () => {
        if (mood === 'focused') {
            handlePause();
        }
        setIsExitLoading(true);
        const response = await updateTestSession(sessionDetails.id, {
            selectedAnswers,
            completedQuestions: Object.keys(selectedAnswers).length,
            remainingTime: getRemainingTime(),
            finished: false,
            score: 0
        });
        if ("error" in response) {
            console.log(response.error);
            toast({
                title: "Error",
                description: response.error,
                variant: "destructive"
            })
        }
        else {
            toast({
                title: "Success",
                description: "Your progress has been saved. You can continue later.",
                variant: "success"
            })
            clearSessionStorage(testDetails.id + '-countdown');
            clearSessionStorage('selectedAnswers');
            router.push('/search')
        }
        setIsExitLoading(false);
    }

    useEffect(() => {
        const fetchQuestions = async () => {
            setIsLoading(true);
            const response = await axios.get(`/api/test/${testDetails.id}/questions?page=${searchParams.get('page') || 1}&pageSize=${pageSize}`);
            setCurrentQuestions(response.data.questions);
            setIsLoading(false);
        };

        fetchQuestions();
        setCurrentPage(Number(searchParams.get('page') || currentPage))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    return (
        <div className="min-h-screen flex flex-col items-center px-4">
            <FinishDialog isOpen={isFinishDialogOpen} onClose={() => setIsFinishDialogOpen(false)} onFinish={handleFinishTest} questionsLeft={totalQuestions - Object.keys(selectedAnswers).length} />
            <QuestionsHeader testDetails={testDetails} countDownRef={countDownRef} remainingTime={sessionDetails.remainingTime} mood={mood} isPaused={isPaused} onPause={handlePause} onPlay={handleResume} purpose='questions' />

            {!isLoading &&
                <div className='w-full max-w-screen-lg flex flex-col space-y-4 justify-between flex-1 py-4'>
                    {
                        currentQuestions.map((question, index) => (
                            <QuestionCard
                                key={question.id}
                                currentQuestionIndex={pageSize * (currentPage - 1) + index}
                                question={question}
                                handleAnswerSelection={(choiceId) => handleAnswerSelection(choiceId, question.id)}
                                selectedAnswer={selectedAnswers[question.id]}
                                mood={mood}
                            />
                        ))
                    }

                    <div className="w-full max-w-screen-lg flex justify-between flex-wrap space-y-2 items-center">
                        <div className='flex gap-2'>
                            {mood === 'focused' && <Button variant="outline" className="border-[1px] border-blue-100" onClick={isPaused ? handleResume : handlePause}>
                                {isPaused ? <span className='flex items-center gap-2'>Continue<Play className="w-4 h-4" /></span> : <span className='flex items-center gap-2'>Pause Timer<Pause className="w-4 h-4" /></span>}
                            </Button>}
                            <Button variant="outline" className="border-[1px] border-red-300 px-4" onClick={handleExit}>
                                {isExitLoading ? <span className='flex items-center gap-2'>Saving Progress<Loader2 className='w-4 h-4 animate-spin' /></span> : 'Save and Exit'}
                            </Button>
                            <Button onClick={() => {
                                if (totalQuestions - Object.keys(selectedAnswers).length > 0) {
                                    setIsFinishDialogOpen(true);
                                }
                                else {
                                    handleFinishTest();
                                }
                            }}>
                                {isFinishLoading ? <span className='flex items-center gap-2'>Finishing Test<Loader2 className='w-4 h-4 animate-spin' /></span> : 'Finish Test'}
                            </Button>
                        </div>
                        <PaginationComponent
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            }
            {isLoading && <QuestionsLoadingSkeleton numberOfQuestions={pageSize} />}
        </div>
    );
};

export default QuestionsPage;