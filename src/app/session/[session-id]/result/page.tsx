import React, { Suspense } from 'react'
import { Loader2 } from 'lucide-react';
import SessionResult from './components/session-result-server-page';

const RootSessionResult = async ({ params }: { params: { 'session-id': string } }) => {
  const { 'session-id': sessionId } = params;

  return (
    <Suspense fallback={<div className='flex items-center justify-center min-h-screen'><Loader2 className='animate-spin' /></div>}>
      <SessionResult sessionId={sessionId} />
    </Suspense>
  )
}

export default RootSessionResult