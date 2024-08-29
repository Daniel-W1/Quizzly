'use client'

import { Button } from '@/components/ui/button'
import { handleSignOut } from '@/app/actions/auth'
import React from 'react'

const Onboarding = () => {
  return (
    <div>
        Onboarding
        <Button onClick={() => handleSignOut()}>
            Sign Out
        </Button>
    </div>
  )
}

export default Onboarding