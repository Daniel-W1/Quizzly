import React from 'react'
import ResetPasswordUI from './reset-password-ui'
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'

const ResetPassword = () => {
  return (
    <Suspense fallback={<div className='flex items-center justify-center min-h-screen'><Loader2 className='animate-spin' /></div>}>
      <ResetPasswordUI />
    </Suspense>
  )
}

export default ResetPassword