'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Question } from '@/types';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
    currentQuestionIndex: number;
    handleAnswerSelection?: (choiceId: string) => void;
    question: Question;
    selectedAnswer: string;
    purpose?: 'questions' | 'result';
    mood: string;
}

const QuestionCard = ({
    currentQuestionIndex,
    question,
    handleAnswerSelection,
    selectedAnswer,
    purpose = 'questions',
    mood
}: QuestionCardProps) => {
    const [userAnswered, setUserAnswered] = useState(selectedAnswer !== undefined);

    return (
        <Card className="w-full max-w-screen-lg mx-auto">
            <CardHeader className="bg-gray-100 rounded-t-lg">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold">Question #{currentQuestionIndex + 1}</h3>
                    <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {question.points} {question.points === 1 ? 'point' : 'points'}
                    </span>
                </div>
                <div className='flex flex-col'>
                    <p className="text-lg whitespace-pre-wrap">{question.statement}</p>
                    {question.mediaUrl && (
                        <div className="mt-4">
                            <Image
                                src={question.mediaUrl}
                                alt="Question media"
                                width={400}
                                height={300}
                                className="rounded-lg"
                            />
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                    {JSON.parse(JSON.stringify(question.choices) as any).map((choice: string) => {
                        const isSelected = selectedAnswer === choice;
                        const isCorrect = choice === question.correctAnswer;
                        const isIncorrect = isSelected && !isCorrect;
                        const showResult = purpose === 'result' || (mood === 'chill' && userAnswered);

                        return (<Button
                            key={choice}
                            variant="outline"
                            size="lg"
                            className={cn("text-left relative text-wrap h-fit", {
                                "border-2 border-green-500 bg-green-100": showResult && isCorrect,
                                "border-2 border-red-500 bg-red-100": showResult && isIncorrect,
                                "border-2 border-blue-500 bg-accent text-accent-foreground": purpose === 'questions' && isSelected && mood === 'focused',
                            })}
                            onClick={() => {
                                handleAnswerSelection && handleAnswerSelection(choice);
                                setUserAnswered(true);
                            }}
                            disabled={purpose === 'result' || (mood === 'chill' && userAnswered)}
                        >
                            {choice}
                            {showResult && isCorrect && (
                                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-600">
                                    ✓
                                </span>
                            )}
                            {showResult && isIncorrect && (
                                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-600">
                                    ✗
                                </span>
                            )}
                        </Button>)
                    })}
                </div>
            </CardContent>
            {/*we can add a footer for chat, and other purposes*/}
            {(purpose === 'result' ||  (mood === 'chill' && userAnswered)) && question.explanation && (
                <CardFooter>
                    <p className="text-sm text-gray-500">{question.explanation}</p>
                </CardFooter>
            )}
        </Card>
    )
}

export default QuestionCard