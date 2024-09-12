import React from 'react'
import { Button } from './ui/button'
import Profile from './profile-dropdown'
import TextLogo from '@/app/(landing)/components/text-logo'

interface CommonHeaderProps {
    bgVisible?: boolean;
}

const CommonHeader = ({ bgVisible = true }: CommonHeaderProps) => {
    return (
        <div className={`flex justify-between items-center space-x-4 w-full max-w-screen-xl px-2 md:px-8 py-4 absolute top-0 z-20 ${bgVisible ? 'bg-background' : ''}`}>
            <TextLogo text="Quizzly"
                color="#0065F2"
                fontSize="clamp(26px, 5vw, 32px)"
                fontWeight="bold"
                fontFamily="sans-serif"
                marginTop={true}
            />
            <div className='flex h-full items-center space-x-4'>
                <Button>Contribute</Button>
                <Profile />
            </div>
        </div>
    )
}

export default CommonHeader