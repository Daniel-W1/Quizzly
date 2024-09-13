import { Heart } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

const ContributeCard = () => {
  return (
    <div className='hidden sm:flex flex-col sm:flex-row items-center justify-center space-x-4 p-4 rounded-lg bg-white shadow-md w-full max-w-screen-sm absolute -bottom-4'>
      <span className='font-medium'>Contribute to our platform and earn rewards! <br /> <span className='text-sm text-gray-500'>(You can contribute by adding your tests, quizzes, and more!)</span></span>
      <Link href='/contribute' className='w-fit flex items-center gap-2 bg-primary text-white text-sm rounded-md px-4 py-2'>
        Contribute <Heart className='w-4 h-4 fill-white' />
      </Link>
    </div>
  )
}

export default ContributeCard 