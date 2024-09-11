import React from 'react'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DetailItem } from '@/app/test/[id]/components/detail-component'
import { Clock, BarChart, Option } from 'lucide-react'
import { TestDetails, TestSession } from '@/types'
import Link from 'next/link'

interface CompletedCardProps {
    session: TestSession
}

const CompletedCard = ({ session }: CompletedCardProps) => {
    return (
        <div key={session.id} className="bg-gray-100 p-4 rounded-lg relative overflow-hidden w-full mb-2">
            <div className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 rounded-bl-lg flex items-center">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                <span className="text-xs sm:text-sm">Completed</span>
            </div>
            <div className="space-y-2 mt-6 w-full">
                <DetailItem
                    icon={<Clock className="w-4 h-4 sm:w-5 sm:h-5" />}
                    label="Completed"
                    value={new Date(session.updatedAt).toLocaleString()}
                    className="text-sm sm:text-base"
                />
                <DetailItem
                    icon={<Option className="w-4 h-4 sm:w-5 sm:h-5" />}
                    label="Mood"
                    value={session.mood === 'chill' ? 'Chill (Not Timed)' : 'Focused (Timed)'}
                    className="text-sm sm:text-base"
                />
                <DetailItem
                    icon={<BarChart className="w-4 h-4 sm:w-5 sm:h-5" />}
                    label="Score"
                    value={`${session.score} / ${session.totalMarks}`}
                    className="text-sm sm:text-base"
                />
                <Button
                    className="w-full mt-4 text-sm sm:text-base"
                    variant="outline"
                >
                    <Link href={`/session/${session.id}/result`} className='w-full flex items-center justify-center'>Review Session</Link>
                </Button>
            </div>
        </div>
    )
}

export default CompletedCard