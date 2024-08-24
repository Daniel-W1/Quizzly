import React from 'react'

interface FeatureCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <div className="flex flex-col space-y-4 p-6 bg-primary-100 w-full lg:w-1/3 xl:w-[300px]">
        <div className="flex space-x-4 items-center">
            {icon}
            <h1 className="text-xl font-bold">{title}</h1>
        </div>
        <p className="text-sm text-secondary-500">{description}</p>
    </div>
  )
}

export default FeatureCard