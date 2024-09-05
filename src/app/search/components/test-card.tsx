'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, User, Calendar, ChevronDown, ChevronUp } from 'lucide-react'
import { SelectSeparator } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Test } from './search-results'

interface TestCardProps {
    test: Test,
    onTestClick: (test: Test) => void
}

export type DifficultyLevel = "easy" | "medium" | "hard"

const TestCard: React.FC<TestCardProps> = ({ test, onTestClick }) => {
    const [showAllConcepts, setShowAllConcepts] = useState(false)
    return (
        <Card className="w-full hover:shadow-lg transition-shadow">
            <CardHeader>
                <CardTitle className="text-lg font-bold truncate">
                    {test.title}
                </CardTitle>

                <div className="flex justify-between items-center mt-2">
                    <div className="flex gap-2">
                        <Badge variant="secondary">{test.examType}</Badge>
                        <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            <span className="text-sm truncate">{test.allowedTime} minutes</span>
                        </div>
                    </div>
                    <Badge variant={test.difficultyLevel.toLowerCase() as DifficultyLevel} className='capitalize'>{test.difficultyLevel}</Badge>
                </div>
            </CardHeader>
            <SelectSeparator className='mx-4 -mt-3' />
            <CardContent className='flex flex-col space-y-3'>
                <div className="flex flex-col space-y-1">
                    <div className="flex items-center">
                        <span className="text-base font-medium">From {test.university} - {test.department}</span>
                    </div>

                    <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        <span className="text-xs">By teacher {test.teacherName}</span>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="flex gap-2 flex-wrap">
                        {(showAllConcepts ? test.keyConcepts : test.keyConcepts.slice(0, 3)).map((concept) => (
                            <Badge key={concept} variant="outline" className="capitalize">{concept}</Badge>
                        ))}
                        {test.keyConcepts.length > 3 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="mt-1 p-2 h-6"
                                onClick={() => setShowAllConcepts(!showAllConcepts)}
                            >
                                {showAllConcepts ? (
                                    <>Hide <ChevronUp className="ml-1 h-4 w-4" /></>
                                ) : (
                                    <>View All <ChevronDown className="ml-1 h-4 w-4" /></>
                                )}
                            </Button>
                        )}
                    </div>
                </div>
                
                <div className="flex justify-between gap-2 flex-wrap mt-2">
                    <Button size="sm" className='truncate' onClick={() => onTestClick(test)}>View Details</Button>

                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">{test.year}</span>
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}

export default TestCard