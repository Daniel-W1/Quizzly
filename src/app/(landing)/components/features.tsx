import React from 'react'
import FeatureCard from './feature'
import { Dice6, LibraryBig, UsersRound } from 'lucide-react'

const features = [
    {
        title: "Study Groups",
        description: "Connect with peers, collaborate on notes, and prepare for exams together in public or private groups.",
        icon: <UsersRound className='w-8 h-8' />
    },
    {
        title: "Resource Hub",
        description: "Access a curated repository of past exams, notes, and quizzes tailored to your academic needs.",
        icon: <LibraryBig className='w-8 h-8' />
    },
    {
        title: "Quizzes",
        description: "Test your knowledge with custom quizzes and compete on leaderboards for engaging revision.",
        icon: <Dice6 className='w-8 h-8' />
    }
]

const FeaturesSection = () => {
    return (
        <div className="flex items-center justify-center flex-wrap gap-4 px-4 sm:px-10 max-w-screen-lg" id='features'>
            {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
            ))}
        </div>
    )
}

export default FeaturesSection