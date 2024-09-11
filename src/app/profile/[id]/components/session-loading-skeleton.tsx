import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const SessionLoading = () => {
  return (
    <Tabs defaultValue="In-progress" className="h-screen w-full flex flex-col items-center px-4 sm:px-10 md:px-4 flex-1 overflow-y-auto py-8 md:max-w-xl mx-auto profile-history">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="In-progress">In-Progress</TabsTrigger>
        <TabsTrigger value="Completed">Completed</TabsTrigger>
      </TabsList>
      <TabsContent value="In-progress" className='w-full'>
        {[...Array(2)].map((_, index) => (
          <SessionCardSkeleton key={index} />
        ))}
      </TabsContent>
      <TabsContent value="Completed" className='w-full'>
        {[...Array(2)].map((_, index) => (
          <SessionCardSkeleton key={index} />
        ))}
      </TabsContent>
    </Tabs>
  )
}

const SessionCardSkeleton = () => {
  return (
    <div className="w-full p-4 rounded-lg mx-auto relative mb-2 bg-gray-100">
      <div className="absolute top-0 right-0 px-2 py-1 rounded-bl-lg">
        <Skeleton className="h-5 w-20 bg-gray-200" />
      </div>
      <div className="space-y-2 mt-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex items-center">
            <Skeleton className="h-5 w-2/3 bg-gray-200" />
          </div>
        ))}
      </div>
      <Skeleton className="w-full h-6 mt-4 bg-gray-200" />
    </div>
  )
}

export default SessionLoading