import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
      {[...Array(8)].map((_, index) => (
        <Card key={index} className="w-full">
          <CardHeader>
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-3/4" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-5 rounded-full" />
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-5 w-16" />
            </div>
          </CardHeader>
          <CardContent className='flex flex-col space-y-3'>
            <div className="flex flex-col space-y-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-3/4" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-16" />
            </div>
            <div className="flex justify-between gap-2">
              <Skeleton className="h-8 w-24" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default LoadingSkeleton