import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import TestPage from './components/test-server-page';

export default function RootTestPage({ params }: { params: { id: string } }) {
    return (
        <Suspense fallback={<div className='flex items-center justify-center min-h-screen'><Loader2 className='animate-spin' /></div>}>
            <TestPage id={params.id} />
        </Suspense>
    )
}