import React, { Suspense } from 'react'
import { Loader2 } from 'lucide-react';
import TestSessionPage from './components/test-session-server-page';

const RootTestSessionPage = async ({ params }: { params: { 'session-id': string } }) => {
  const { 'session-id': sessionId } = params;

  return (
    <Suspense fallback={<div className='flex items-center justify-center min-h-screen'><Loader2 className='animate-spin' /></div>}>
      <TestSessionPage sessionId={sessionId} />
    </Suspense>
  )
}

export default RootTestSessionPage