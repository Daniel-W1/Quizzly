import { Badge } from '@/components/ui/badge';
import React from 'react'

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  comingSoon: boolean;
}

const FeatureCard = ({ title, description, icon, comingSoon }: FeatureCardProps) => {
  return (
    <div className="flex flex-col space-y-4 p-6 bg-primary-100 w-full lg:w-1/3 xl:w-[300px] relative">
      {comingSoon && (
        <Badge className="absolute top-2 right-2">
          Coming Soon
        </Badge>
      )}
      {!comingSoon && (
        <Badge className="absolute top-2 right-2 bg-green-600 hover:bg-green-500">
          Available Now
        </Badge>
      )}
      <div className="flex space-x-4 items-center">
        {icon}
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      <p className="text-sm text-secondary-500">{description}</p>
    </div>
  )
}

export default FeatureCard