import React from 'react'
import Score from './score';
import axios from 'axios';
import QuestionsWithAnswers from './questions-with-answers';

interface SessionResultProps {
    sessionId: string;
}

const SessionResult = async ({ sessionId }: SessionResultProps) => {
    const sessionDetails = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/test/session/${sessionId}`).then((res) => res.data);
    const testDetails = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/test/${sessionDetails.testId}`).then((res) => res.data);

    return (
        <div className='flex flex-col lg:flex-row items-center min-h-screen w-screen max-w-screen-xl mx-auto'>
            <Score score={sessionDetails.score} totalMarks={testDetails.totalMarks} />
            <QuestionsWithAnswers testDetails={testDetails} sessionDetails={sessionDetails} />
        </div>
    )
}

export default SessionResult