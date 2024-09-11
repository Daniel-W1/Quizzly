import React from 'react'
import { DetailItem } from '@/app/test/[id]/components/detail-component'
import { Clock, HelpCircle, Option, BarChart, Circle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TestSession } from '@/types'
import Link from 'next/link'

interface InProgressCardProps {
    existingSession: TestSession
}

const InProgressCard = ({ existingSession }: InProgressCardProps) => {
    return (
        <div className="w-full p-4 text-center bg-gray-100 rounded-lg mx-auto relative mb-2">
            <div className="absolute top-0 right-0 bg-orange-300 text-xs sm:text-sm md:text-base text-black px-2 py-1 rounded-bl-lg flex items-center">
                <Circle className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                In Progress
            </div>
            <div className="space-y-2 mt-4">
                <DetailItem
                    icon={<Clock className="w-4 h-4 sm:w-5 sm:h-5" />}
                    label="Started"
                    value={new Date(existingSession.createdAt).toLocaleString()}
                    className="text-sm sm:text-base"
                />
                <DetailItem
                    icon={<Option className="w-4 h-4 sm:w-5 sm:h-5" />}
                    label="Mood"
                    value={existingSession.mood === 'chill' ? 'Chill (Not Timed)' : 'Focused (Timed)'}
                    className="text-sm sm:text-base"
                />
                <DetailItem
                    icon={<HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />}
                    label="Questions Per Page"
                    value={existingSession.questionsPerPage.toString()}
                    className="text-sm sm:text-base"
                />
                <DetailItem
                    icon={<BarChart className="w-4 h-4 sm:w-5 sm:h-5" />}
                    label="Completed Questions"
                    value={`${existingSession.completedQuestions}`}
                    className="text-sm sm:text-base"
                />
                {existingSession.mood === 'focused' && (
                    <DetailItem
                        icon={<Clock className="w-4 h-4 sm:w-5 sm:h-5" />}
                        label="Remaining Time"
                        value={`${existingSession.remainingTime} minutes`}
                        className="text-sm sm:text-base"
                    />
                )}
            </div>
            <Button className="w-full mx-auto justify-center mt-4 text-sm sm:text-base">
                <Link href={`/test/${existingSession.testId}`}>Go to Test</Link>
            </Button>
        </div>
    )
}

export default InProgressCard