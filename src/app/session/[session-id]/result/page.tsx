import React, { Suspense } from 'react'
import Score from './components/score'
import axios from 'axios';
import QuestionsWithAnswers from './components/questions-with-answers';
import { Loader2 } from 'lucide-react';

const SessionResult = async ({ params }: { params: { 'session-id': string } }) => {
  const { 'session-id': sessionId } = params;
  const sessionDetails = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/test/session/${sessionId}`).then((res) => res.data);
  const testDetails = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/test/${sessionDetails.testId}`).then((res) => res.data);

  return (
    <Suspense fallback={<div className='flex items-center justify-center min-h-screen'><Loader2 className='animate-spin' /></div>}>
      <div className='flex flex-col lg:flex-row items-center min-h-screen w-screen max-w-screen-xl mx-auto'>
        <Score score={sessionDetails.score} totalMarks={testDetails.totalMarks} />
        <QuestionsWithAnswers testDetails={testDetails} sessionDetails={sessionDetails} />
      </div>
    </Suspense>
  )
}

export default SessionResult