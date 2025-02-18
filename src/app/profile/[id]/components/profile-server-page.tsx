import React, { Suspense } from 'react'
import axios from 'axios';
import Image from 'next/image';
import History from './history';
import ProfileComponent from './profile';
import { auth } from '@/auth';
import CommonHeader from '@/components/header';

interface ProfilePageProps {
    id: string;
}

const ProfilePage = async ({ id }: ProfilePageProps) => {
    const profile = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${id}`).then((res) => res.data);
    const session = await auth();
    const isOwner = session && session?.user?.id === profile.userId;

    if (!profile || 'error' in profile) {
        return (
            <div className="flex flex-col space-y-4 items-center justify-center h-screen">
                <Image src="/error.svg" alt="Error" width={100} height={100} />
                <p className="text-lg font-medium text-center">{profile.error}</p>
            </div>
        );
    }

    return (
        <div className='flex flex-col md:flex-row w-screen max-w-screen-lg mx-auto items-center justify-center md:h-screen pt-28'>
            <CommonHeader />
            <ProfileComponent profile={profile} isOwner={isOwner as boolean} />
            <History userId={profile.userId} />
        </div>
    )
}

export default ProfilePage