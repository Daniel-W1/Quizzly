"use client"

import { Question, TestDetails, TestSession } from '@/types';
import React, { useEffect, useState } from 'react';
import QuestionsHeader from '../../components/questions-header';
import QuestionCard from '../../components/question-card';
import axios from 'axios';
import QuestionsLoadingSkeleton from '../../components/questions-loading-skeleton';
import { useSearchParams } from 'next/navigation';

interface QuestionsWithAnswersProps {
    testDetails: TestDetails;
    sessionDetails: TestSession;
}

const QuestionsWithAnswers = ({ testDetails, sessionDetails }: QuestionsWithAnswersProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
    const searchParams = useSearchParams();
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);

    const totalQuestions = testDetails.questionCount;
    const pageSize = sessionDetails.questionsPerPage;
    const mood = sessionDetails.mood;

    useEffect(() => {
        const fetchQuestions = async () => {
            setIsLoading(true);
            const response = await axios.get(`/api/test/${testDetails.id}/questions?page=1&pageSize=${totalQuestions}`);
            setCurrentQuestions(response.data.questions);
            setIsLoading(false);
        };

        fetchQuestions();
        setCurrentPage(Number(searchParams.get('page') || currentPage))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    return (
        <div className="h-screen flex flex-col items-center px-4 flex-1 overflow-y-auto questions-answers-container">
            <QuestionsHeader testDetails={testDetails} mood={mood} remainingTime={sessionDetails.remainingTime} purpose='result' />

            {!isLoading &&
                <div className='w-full max-w-screen-lg flex flex-col space-y-4 justify-between flex-1 py-4'>
                    {
                        currentQuestions.map((question, index) => (
                            <QuestionCard
                                key={question.id}
                                currentQuestionIndex={pageSize * (currentPage - 1) + index}
                                question={question}
                                selectedAnswer={sessionDetails.selectedAnswers[question.id]}
                                purpose='result'
                            />
                        ))
                    }
                </div>
            }
            {isLoading && <QuestionsLoadingSkeleton numberOfQuestions={pageSize} />}
        </div>
    );
};

export default QuestionsWithAnswers;