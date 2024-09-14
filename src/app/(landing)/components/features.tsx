import React from 'react'
import FeatureCard from './feature'
import { LibraryBig, Sparkles, UsersRound } from 'lucide-react'

const features = [
    {
        title: "Resource Hub",
        description: "Access a curated repository of past exams, notes, and quizzes tailored to your academic needs.",
        icon: <LibraryBig className='w-8 h-8' />,
        comingSoon: false
    },
    {
        title: "AI Study Buddy",
        description: "Get personalized study discussions with an AI that understands your academic materials.",
        icon: <Sparkles className='w-8 h-8' />,
        comingSoon: true
    },
    {
        title: "Study Groups",
        description: "Connect with peers, collaborate on notes, and prepare for exams together in public or private groups.",
        icon: <UsersRound className='w-8 h-8' />,
        comingSoon: true
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