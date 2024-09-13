import React from 'react'
import { Button } from './ui/button'
import Profile from './profile-dropdown'
import TextLogo from '@/app/(landing)/components/text-logo'
import Link from 'next/link'

interface CommonHeaderProps {
    bgVisible?: boolean;
}

const CommonHeader = ({ bgVisible = true }: CommonHeaderProps) => {
    return (
        <div className={`flex justify-between items-start space-x-4 w-full max-w-screen-xl px-2 md:px-8 py-2 absolute top-0 z-20 ${bgVisible ? 'bg-white border-b-[1px] border-gray-200 backdrop-filter backdrop-blur-lg bg-opacity-60' : ''}`}>
            <TextLogo 
                text="Quizzly"
                color="#0065F2"
                fontSize="clamp(26px, 5vw, 32px)"
                fontWeight="bold"
                fontFamily="sans-serif"
                marginTop={!bgVisible}
            />
            <div className='flex h-full items-center space-x-4 w-fit'>
                <Link href='/contribute' className='w-fit px-4 py-2 bg-primary text-white text-sm rounded-md h-full'>
                    Contribute
                </Link>
                <Profile />
            </div>
        </div>
    )
}

export default CommonHeader