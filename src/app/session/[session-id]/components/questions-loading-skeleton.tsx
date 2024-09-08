import React from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface QuestionsLoadingSkeletonProps {
    numberOfQuestions: number;
}

const QuestionsLoadingSkeleton = ({ numberOfQuestions }: QuestionsLoadingSkeletonProps) => {
    return (
        <div className="space-y-6 w-full max-w-screen-lg mx-auto">
            {[...Array(numberOfQuestions)].map((_, index) => (
                <Card key={index} className="w-full">
                    <CardHeader className="bg-gray-100 rounded-t-lg">
                        <div className="flex justify-between items-center">
                            <Skeleton className="h-6 w-1/4" />
                            <Skeleton className="h-6 w-16" />
                            <Skeleton className="h-16 w-full mb-4" />
                        </div>
                    </CardHeader>
                    <CardContent className="mt-6">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                            {[...Array(4)].map((_, choiceIndex) => (
                                <Skeleton key={choiceIndex} className="h-10 w-full" />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default QuestionsLoadingSkeleton