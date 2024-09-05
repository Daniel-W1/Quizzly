'use client'

import React from 'react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import Link from 'next/link'
import { handleSignOut } from '@/actions/auth'

const Profile = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className='w-12 h-12 border-2 border-gray-400'>
                    <AvatarImage src={''} alt="Profile picture" />
                    <AvatarFallback>PP</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Link href='/profile' className='mx-auto'>Go to Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>{handleSignOut()}} className='cursor-pointer'>
                    <span className='mx-auto text-red-500 hover:text-red-600'>Sign Out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Profile