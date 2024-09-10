'use client'
import React, { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { profileSchema } from '@/lib/form-schemas'
import { z } from 'zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FormWrapper } from './form-wrapper'
import { validateUsername } from '@/actions/onboarding'
import { Loader2 } from 'lucide-react'
import UseDebounce from '@/hooks/use-debounce'

interface formProps {
  form: UseFormReturn<z.infer<typeof profileSchema>>,
  setUsernameStatus: (status: 'idle' | 'loading' | 'valid' | 'invalid') => void
  usernameStatus: 'idle' | 'loading' | 'valid' | 'invalid'
}

const NameForm = ({
  form,
  setUsernameStatus,
  usernameStatus
}: formProps) => {
  const { watch, setValue, setError, clearErrors, formState: { errors } } = form;
  const [usernameValue, setUsernameValue] = useState(watch('username'));

  useEffect(() => {
    const checkUsername = async () => {
      if (!usernameValue) {
        setUsernameStatus('idle');
        return;
      }

      if (errors.username) {
        setUsernameStatus('idle');
        return;
      }

      setUsernameStatus('loading');
      
      const isValid = await validateUsername(usernameValue);
      
      if (isValid) {
        setUsernameStatus('valid');
        const otherErrorsTypes = ['too_big', 'too_small', 'invalid_string'];
        if (form.formState.errors.username && !otherErrorsTypes.includes(form.formState.errors.username.type)) {
          clearErrors('username');
        }
      } else {
        setUsernameStatus('invalid');
        setError('username', { type: 'manual', message: 'Username is already taken' });
      }
    }
    
    checkUsername();
  }, [setValue, setError, clearErrors, errors.username, usernameValue, setUsernameStatus, form.formState.errors])

  return (
    <FormWrapper description='Enter profile name and username' title='Lets get you a name'>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel>Profile Name</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Enter your preferred name"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Enter your username"
                {...field}
                onChange={(e) => {
                  setUsernameValue(e.target.value);
                  field.onChange(e);
                }}
              />
            </FormControl>
            <FormMessage />
            {usernameStatus === 'loading' && (
              <p className="text-sm text-gray-500 flex items-center gap-2">Checking username...<Loader2 className='w-4 h-4 animate-spin' /></p>
            )}
            {usernameStatus === 'valid' && !form.formState.errors.username && (
              <p className="text-sm text-green-500">Username is available!</p>
            )}
            {usernameStatus === 'invalid' && (
              <p className="text-sm text-red-500">Username is already taken</p>
            )}
          </FormItem>
        )}
      />
    </FormWrapper>
  )
}

export default NameForm