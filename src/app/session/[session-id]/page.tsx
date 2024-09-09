import axios from 'axios';
import React, { Suspense } from 'react'
import QuestionsPage from './components/questions-page';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { redirect } from 'next/navigation';

const TestSessionPage = async ({ params }: { params: { 'session-id': string } }) => {
  const { 'session-id': sessionId } = params;
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
    <Suspense fallback={<div className='flex items-center justify-center min-h-screen'><Loader2 className='animate-spin' /></div>}>
      <QuestionsPage testDetails={testDetails} sessionDetails={sessionDetails} />
    </Suspense>
  )
}

export default TestSessionPage