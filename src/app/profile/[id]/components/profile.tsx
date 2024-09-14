'use client'

import React, { useState } from 'react'
import { Profile } from '@/types'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { DetailItem } from '@/app/test/[id]/components/detail-component'
import { BookOpen, Calendar, Edit, Gem, School } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import EditProfileModal from './edit-profile-modal'

interface ProfileProps {
    profile: Profile
    isOwner: boolean
}

const ProfileComponent = ({ profile, isOwner }: ProfileProps) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

    const handleEditClick = () => {
        setIsEditModalOpen(true)
    }

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false)
    }

    return (
        <div className='h-fit lg:h-screen w-full md:max-w-md flex flex-col items-center pt-4 sm:p-8 overflow-y-auto profile-container relative'>
            {isOwner && <EditProfileModal isOpen={isEditModalOpen} onClose={handleCloseEditModal} profile={profile} />}
            {isOwner && <Edit className='absolute top-2 right-2 md:top-10 md:right-10 w-5 h-5 cursor-pointer' onClick={handleEditClick} />}
            <Avatar className='w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 border-2 border-gray-400'>
                <AvatarImage src={profile?.image || ''} alt="Profile picture" />
                <AvatarFallback>{profile.name[0]}</AvatarFallback>
            </Avatar>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">{profile.name}</h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 -mt-1 mb-4">@{profile.username}</p>
            <div className="p-4 pb-0 w-full">
                <DetailItem icon={<School className="w-4 h-4 sm:w-5 sm:h-5" />} label="University" value={profile.university} textWrap={false} labelVisible={false} className='hover:bg-gray-100 rounded-md p-2 text-sm sm:text-base' />
                <Separator />
                <DetailItem icon={<BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />} label="Department" value={profile.department} textWrap={false} labelVisible={false} className='hover:bg-gray-100 rounded-md p-2 text-sm sm:text-base' />
                <Separator />
                <DetailItem icon={<Calendar className="w-4 h-4 sm:w-5 sm:h-5" />} label="Year" value={profile.year} textWrap={false} labelVisible={false} className='hover:bg-gray-100 rounded-md p-2 text-sm sm:text-base' />
                <Separator />
                <DetailItem icon={<Gem className="w-4 h-4 sm:w-5 sm:h-5" />} label="Contribution" value={profile.totalContribution.toString() + " contributions"} textWrap={false} labelVisible={false} className='hover:bg-gray-100 rounded-md p-2 text-sm sm:text-base' />
            </div>
            {profile.bio && (
                <div className="p-4 w-full">
                    <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 px-2">Bio</h2>
                    <Separator />
                    <p className="text-sm sm:text-base md:text-lg text-gray-700 hover:bg-gray-100 rounded-md p-2">{profile.bio}</p>
                </div>
            )}
        </div>
    )
}

export default ProfileComponent