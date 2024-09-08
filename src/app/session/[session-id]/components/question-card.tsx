import React from 'react'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Question } from '@/types';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
    currentQuestionIndex: number;
    handleAnswerSelection: (choiceId: string) => void;
    question: Question;
    selectedAnswer: string;
}

const QuestionCard = ({
    currentQuestionIndex,
    question,
    handleAnswerSelection,
    selectedAnswer
}: QuestionCardProps) => {
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
                    <p className="text-lg">{question.statement}</p>
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
                    {JSON.parse(question.choices as any).map((choice: string) => (
                        <Button
                            key={choice}
                            variant="outline"
                            className={cn("text-left", {
                                "border-2 border-blue-500 bg-accent text-accent-foreground": selectedAnswer === choice,
                            })}
                            onClick={() => handleAnswerSelection(choice)}
                        >
                            {choice}
                        </Button>
                    ))}
                </div>
            </CardContent>
            {/*we can add a footer for chat, and other purposes*/}
        </Card>
    )
}

export default QuestionCard