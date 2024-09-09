import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const ConfigLoadingSkeleton = () => {
    return (
        <div className="w-full max-w-md h-full flex flex-col justify-center items-center mx-auto">
            <Skeleton className="h-6 w-full max-w-md mx-auto mb-6" />
            <div className="mb-6 w-full max-w-md mx-auto">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-10 w-full" />
            </div>
            <div className="mb-6 w-full max-w-md mx-auto">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full" />
            </div>
            <div className="flex w-full justify-center">
                <Skeleton className="h-10 w-full max-w-md" />
            </div>
        </div>
    )
}

export default ConfigLoadingSkeleton