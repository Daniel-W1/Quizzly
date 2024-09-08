import { Badge } from '@/components/ui/badge'
import { School, Clock, BookOpen } from 'lucide-react'
import { TestDetails } from '@/types'
import React, { forwardRef } from 'react'
import TimeCountDown from './time-countdown'
import Countdown from 'react-countdown'

interface QuestionsHeaderProps {
    testDetails: TestDetails;
    countDownRef: React.MutableRefObject<Countdown | null>;
    remainingTime: number;
}

const QuestionsHeader = forwardRef<HTMLDivElement, QuestionsHeaderProps>(({ testDetails, countDownRef, remainingTime }, ref) => {
    return (
        <div ref={ref} className="w-full pt-4 max-w-screen-lg bg-white border-none">
            <div className='w-full flex flex-col md:flex-row justify-between items-start py-2 space-y-4 '>
                <div className='flex flex-col'>
                    <h1 className="text-2xl font-bold">{testDetails.title}</h1>
                    <div className="flex items-center">
                        <School className="w-4 h-4 mr-2" />
                        <span className="text-sm">{testDetails.university} - {testDetails.department}</span>
                    </div>
                    <Badge className='w-fit mt-2'>
                        {testDetails.examType}
                    </Badge>
                </div>

                <div className="flex flex-col">
                    <div className="flex items-center">
                        <Clock className="w-6 h-6 mr-2" />
                        <TimeCountDown time_in_minutes={remainingTime} id={testDetails.id + '-countdown'} ref={countDownRef}/>
                    </div>
                    <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-2" />
                        <span className="text-base underline">{testDetails.courseName}</span>
                    </div>
                </div>
            </div>
        </div>
    )
})

QuestionsHeader.displayName = 'QuestionsHeader'

export default QuestionsHeader