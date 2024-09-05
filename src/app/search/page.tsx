import React, { Suspense } from 'react'
import SearchUI from './components/search-ui'
import { Loader2 } from 'lucide-react'

const SearchPage = () => {
    return (
        <Suspense fallback={<div className='flex items-center justify-center min-h-screen'><Loader2 className='animate-spin' /></div>}>
            <SearchUI />
        </Suspense>
    )
}

export default SearchPage