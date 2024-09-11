"use client"

import React, { useEffect, useState } from 'react'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { TestSession } from '@/types'
import axios from 'axios'
import InProgressCard from './in-progress'
import CompletedCard from './completed'
import SessionLoading from './session-loading-skeleton'

interface HistoryProps {
    userId: string
}

const History = ({ userId }: HistoryProps) => {
    const [completedSessions, setCompletedSessions] = useState<TestSession[]>([])
    const [inProgressSessions, setInProgressSessions] = useState<TestSession[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const fetchSessions = async () => {
            const sessions = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/test/session/user/${userId}`).then((res) => res.data);
            setCompletedSessions(sessions.filter((session: TestSession) => session.finished))
            setInProgressSessions(sessions.filter((session: TestSession) => !session.finished))
            setLoading(false)
        }
        fetchSessions()
    }, [userId])

    if (loading) return <SessionLoading />

    return (
        <Tabs defaultValue="In-progress" className="h-screen w-full flex flex-col items-center px-4 sm:px-10 md:px-4 flex-1 overflow-y-auto py-8 md:max-w-xl mx-auto profile-history">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="In-progress">In-Progress</TabsTrigger>
                <TabsTrigger value="Completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="In-progress" className='w-full'>
                {inProgressSessions.map((session) => (
                    <InProgressCard key={session.id} existingSession={session} />
                ))}
            </TabsContent>
            <TabsContent value="Completed" className='w-full'>
                {completedSessions.map((session) => (
                    <CompletedCard key={session.id} session={session} />
                ))}
            </TabsContent>
        </Tabs>
    )
}

export default History