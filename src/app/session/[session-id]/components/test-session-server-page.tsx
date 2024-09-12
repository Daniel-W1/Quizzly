import axios from 'axios';
import React from 'react'
import QuestionsPage from './questions-page';
import Image from 'next/image';
import { redirect } from 'next/navigation';

interface TestSessionPageProps {
    sessionId: string;
}

const TestSessionPage = async ({ sessionId }: TestSessionPageProps) => {
    const sessionDetails = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/test/session/${sessionId}`).then((res) => res.data);
    const testDetails = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/test/${sessionDetails.testId}`).then((res) => res.data);

    if (!testDetails || 'error' in testDetails || !sessionDetails || 'error' in sessionDetails) {
        return (
            <div className="flex flex-col space-y-4 items-center justify-center h-screen">
                <Image src="/error.svg" alt="Error" width={100} height={100} />
                <p className="text-lg font-medium text-center">{testDetails.error || sessionDetails.error}</p>
            </div>
        )
    }

    if (sessionDetails.finished) {
        return (
            redirect(`/session/${sessionId}/result`)
        )
    }

    return (
        <QuestionsPage testDetails={testDetails} sessionDetails={sessionDetails} />
    )
}

export default TestSessionPage