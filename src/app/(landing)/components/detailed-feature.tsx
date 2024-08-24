import Image from 'next/image'
import React from 'react'
import { cn } from "@/lib/utils"

interface DetailedFeatureProps {
  headline: string;
  subheadline: string;
  bulletPoints: string[];
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
}

const DetailedFeature: React.FC<DetailedFeatureProps> = ({
  headline,
  subheadline,
  bulletPoints,
  imageSrc,
  imageAlt,
  reverse = false
}) => {
  return (
    <div className={cn(
      "flex flex-col md:flex-row items-center justify-between gap-8 py-8 px-4 sm:px-10 max-w-screen-lg",
      reverse && "md:flex-row-reverse"
    )}>
        <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{headline}</h2>
            <h3 className="text-xl text-gray-500">{subheadline}</h3>

            <ul className="space-y-2">
                {bulletPoints.map((point, index) => (
                    <li key={index} className="flex items-center">
                        <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {point}
                    </li>
                ))}
            </ul>
        </div>

        <div className="flex-1">
            <Image 
                src={imageSrc} 
                width={400} 
                height={400} 
                alt={imageAlt}
                className="rounded-lg shadow-lg"
            />
        </div>
    </div>
  )
}

export default DetailedFeature