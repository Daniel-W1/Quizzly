"use client"

import React, { useEffect, useState } from 'react'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { TestSession, UserActivity } from '@/types'
import axios from 'axios'
import InProgressCard from './in-progress'
import CompletedCard from './completed'
import SessionLoading from './history-loading-skeleton'
import EmptySession from './empty-session'
import DailyActivity from './daily-activity'

interface HistoryProps {
    userId: string
}

const History = ({ userId }: HistoryProps) => {
    const [completedSessions, setCompletedSessions] = useState<TestSession[]>([])
    const [inProgressSessions, setInProgressSessions] = useState<TestSession[]>([])
    const [activities, setActivities] = useState<UserActivity[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const fetchSessions = async () => {
            const sessions = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/test/session/user/${userId}`).then((res) => res.data);
            setCompletedSessions(sessions.filter((session: TestSession) => session.finished))
            setInProgressSessions(sessions.filter((session: TestSession) => !session.finished))
        }

        const fetchActivities = async () => {
            const activities = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/activities/${userId}?activityType=finished_test`).then((res) => res.data.activities);
            setActivities(activities)
        }

        Promise.all([fetchSessions(), fetchActivities()])
            .then(() => setLoading(false))
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, [userId])

    if (loading) return <SessionLoading />

    return (
        <Tabs defaultValue="In-progress" className="h-screen w-full flex flex-col items-center px-4 sm:px-10 md:px-4 flex-1 overflow-y-auto py-8 md:max-w-xl mx-auto profile-history">
            <DailyActivity activities={activities} />
            <TabsList className="grid w-full grid-cols-2 sticky -top-8 z-50 border-b border-gray-200 shadow-sm">
                <TabsTrigger value="In-progress">In-Progress</TabsTrigger>
                <TabsTrigger value="Completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="In-progress" className='w-full'>
                {inProgressSessions.map((session) => (
                    <InProgressCard key={session.id} existingSession={session} />
                ))}
                {inProgressSessions.length === 0 && <EmptySession mainHeader='No in-progress session found' subHeader='Start a new session to get started' />}
            </TabsContent>
            <TabsContent value="Completed" className='w-full'>
                {completedSessions.map((session) => (
                    <CompletedCard key={session.id} session={session} />
                ))}
                {completedSessions.length === 0 && <EmptySession mainHeader='No completed session found' subHeader='Start a new session to get started' />}
            </TabsContent>
        </Tabs>
    )
}

export default History