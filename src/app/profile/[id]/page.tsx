import React, { Suspense } from 'react'
import { Loader2 } from 'lucide-react';
import ProfilePage from './components/profile-server-page';

const RootProfilePage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <Suspense fallback={<div className='flex items-center justify-center min-h-screen'><Loader2 className='animate-spin' /></div>}>
      <ProfilePage id={id} />
    </Suspense>
  )
}

export default RootProfilePage