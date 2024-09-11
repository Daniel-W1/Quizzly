'use client'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import Link from 'next/link'
import { handleSignOut } from '@/actions/auth'
import { clearLocalStorage } from '@/lib/utils'
import { Skeleton } from './ui/skeleton'
import UseProfileFetch from '@/hooks/use-profile-fetch'

const Profile = () => {
    const { loading, profile } = UseProfileFetch()
    if (loading) return <Skeleton className='w-12 h-12 rounded-full' />

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className='w-12 h-12 border-2 border-gray-400'>
                    <AvatarImage src={profile?.image || ''} alt="Profile picture" />
                    <AvatarFallback>{profile?.name[0]}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Link href={`/profile/${profile?.id}`} className='mx-auto'>Go to Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                    clearLocalStorage()
                    handleSignOut()
                }} className='cursor-pointer'>
                    <span className='mx-auto text-red-500 hover:text-red-600'>Sign Out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Profile