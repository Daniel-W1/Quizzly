import SignOutButton from '@/components/sign-out'
import React from 'react'

const SearchPage = () => {
    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='flex justify-end w-full px-2 md:px-8 py-4 absolute top-0'>
                <SignOutButton />
            </div>
            <h1 className='text-2xl font-bold'>Powerful Resource Hub Search, Coming soon...</h1>
        </div>
    )
}

export default SearchPage