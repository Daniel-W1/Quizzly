import React from 'react'

interface EmptySessionProps {
    mainHeader: string
    subHeader: string
}

const EmptySession = ({ mainHeader, subHeader }: EmptySessionProps) => {
    return (
        <div className='flex flex-col items-center justify-center min-h-[30vh]'>
            <h1 className='text-2xl font-bold'>{mainHeader}</h1>
            <p className='text-sm text-gray-500'>{subHeader}</p>
        </div>
    )
}

export default EmptySession