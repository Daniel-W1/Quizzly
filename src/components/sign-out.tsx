"use client"

import React from 'react'
import { Button } from './ui/button'
import { handleSignOut } from '@/actions/auth'
import { LogOut } from 'lucide-react'

const SignOutButton = () => {
    return (
        <Button onClick={() => handleSignOut()} variant='outline' className='gap-2'>
            <span className='hidden md:block'>Sign Out</span>
            <LogOut className='w-4 h-4' />
        </Button>
    )
}

export default SignOutButton