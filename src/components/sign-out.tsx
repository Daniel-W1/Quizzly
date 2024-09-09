"use client"

import React from 'react'
import { Button } from './ui/button'
import { handleSignOut } from '@/actions/auth'
import { LogOut } from 'lucide-react'
import { clearLocalStorage } from '@/lib/utils'

const SignOutButton = () => {
    return (
        <Button onClick={() => {
            clearLocalStorage()
            handleSignOut()
        }} variant='outline' className='gap-2'>
            <span className='hidden md:block'>Sign Out</span>
            <LogOut className='w-4 h-4' />
        </Button>
    )
}

export default SignOutButton