import { Badge } from '@/components/ui/badge'
import { School, Clock, BookOpen } from 'lucide-react'
import { TestDetails } from '@/types'
import React, { forwardRef } from 'react'
import TimeCountDown from './time-countdown'
import Countdown from 'react-countdown'
import { Pause, Play } from 'lucide-react'

interface QuestionsHeaderProps {
    testDetails: TestDetails;
    remainingTime: number;
    purpose?: 'questions' | 'result';
    countDownRef?: React.MutableRefObject<Countdown | null>;
    mood: string;
    isPaused?: boolean;
    onPause?: () => void;
    onPlay?: () => void;
}

const QuestionsHeader = forwardRef<HTMLDivElement, QuestionsHeaderProps>(({ testDetails, countDownRef, remainingTime, mood, isPaused, onPause, onPlay, purpose = 'questions' }, ref) => {
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
                    {mood === 'focused' && purpose === 'questions' && <div className="flex items-center">
                        <Clock className="w-6 h-6 mr-2" />
                        <TimeCountDown time_in_minutes={remainingTime as number} id={testDetails.id + '-countdown'} ref={countDownRef} />
                        {isPaused ? <Play className="w-5 h-5 ml-2 cursor-pointer" onClick={onPlay} /> : <Pause className="w-5 h-5 ml-2 cursor-pointer" onClick={onPause} />}
                    </div>}
                    {mood === 'chill' && purpose === 'questions' && <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-base">Not Timed!</span>
                    </div>}
                    {purpose === 'result' && <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-base">{remainingTime} minutes</span>
                    </div>}
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