"use client"

import React from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { Button } from '@/components/ui/button'
import { Test } from './search-results';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge'
import { Clock, GraduationCap, School, User, Calendar, BookOpen, BarChart, HelpCircle, Share2, Star } from 'lucide-react'
import { DifficultyLevel } from './test-card';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

interface TestDetailsDrawerProps {
    open: boolean;
    onClose: () => void;
    test: Test | null;
}

const TestDetailsDrawer = ({ open, onClose, test }: TestDetailsDrawerProps) => {
    const { toast } = useToast();

    const handleShare = () => {
        if (test) {
            const url = `${process.env.NEXT_PUBLIC_BASE_URL}/test/${test.id}`;
            navigator.clipboard.writeText(url);
            toast({
                title: "Copied to clipboard!",
                variant: "success",
                duration: 500,
            })
        }
    }

    if (!test) return null;

    return (
        <Drawer open={open}>
            <DrawerContent>
                <div className='w-full max-w-screen-md mx-auto max-h-screen overflow-y-auto overflow-x-hidden'>
                    <DrawerHeader className='flex flex-wrap justify-between'>
                        <div>
                            <DrawerTitle className='text-2xl font-bold text-left text-clip'>{test.title}</DrawerTitle>
                            <DrawerDescription className='flex items-center'>
                                <School className="w-4 h-4 mr-2" />
                                <span className='text-clip text-left'>{`${test.university} - ${test.department}`}</span>
                            </DrawerDescription>
                        </div>

                        <div className="flex items-center gap-2">
                            <Share2 className="w-6 h-6 cursor-pointer" onClick={handleShare} />
                            <Star className="w-6 h-6 cursor-pointer" />
                        </div>
                    </DrawerHeader>

                    <Separator className='mb-4 -mt-2' />
                    <div className="p-4 space-y-4">
                        <div className="flex items-center">
                            <BookOpen className="w-5 h-5 mr-3" />
                            <span className="font-medium">Course:</span>
                            <span className="ml-2 truncate">{test.courseName}</span>
                        </div>
                        <div className="flex items-center">
                            <User className="w-5 h-5 mr-3" />
                            <span className="font-medium">Teacher:</span>
                            <span className="ml-2">{test.teacherName}</span>
                        </div>
                        <div className="flex items-center">
                            <GraduationCap className="w-5 h-5 mr-3" />
                            <span className="font-medium">Exam Type:</span>
                            <Badge variant="secondary" className="ml-2">{test.examType}</Badge>
                        </div>
                        <div className="flex items-center">
                            <Calendar className="w-5 h-5 mr-3" />
                            <span className="font-medium">Year:</span>
                            <span className="ml-2">{test.year}</span>
                        </div>
                        <div className="flex items-center">
                            <BarChart className="w-5 h-5 mr-3" />
                            <span className="font-medium">Difficulty:</span>
                            <Badge variant={test.difficultyLevel.toLowerCase() as DifficultyLevel} className="ml-2 capitalize">{test.difficultyLevel}</Badge>
                        </div>
                        <div className="flex items-center">
                            <Clock className="w-5 h-5 mr-3" />
                            <span className="font-medium">Time Allowed:</span>
                            <span className="ml-2">{test.allowedTime} minutes</span>
                        </div>
                        <div className="flex items-center">
                            <HelpCircle className="w-5 h-5 mr-3" />
                            <span className="font-medium">Questions:</span>
                            <span className="ml-2">{test.questionCount}</span>
                        </div>
                        <div className="flex flex-wrap items-center">
                            <BookOpen className="w-5 h-5 mr-3" />
                            <span className="font-medium mr-2">Concepts:</span>
                            {test.keyConcepts.map((concept, index) => (
                                <Badge key={index} variant="outline" className="mr-2">{concept}</Badge>
                            ))}
                        </div>
                    </div>
                    <DrawerFooter>
                        <Button className='w-1/2 mx-auto'>
                            <Link href={`/test/${test.id}`}>Go to test</Link>
                        </Button>
                        
                        <DrawerClose asChild>
                            <Button variant="outline" className='w-1/2 mx-auto' onClick={onClose}>Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default TestDetailsDrawer