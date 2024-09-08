import React from 'react'
import AllOnboardingSteps from './components/all-forms'
import SignOutButton from '@/components/sign-out'

const Onboarding = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div className='flex justify-end w-full px-2 md:px-8 py-4 absolute top-0'>
        <SignOutButton />
      </div>

      <AllOnboardingSteps/>
    </div>
  )
}

export default Onboarding