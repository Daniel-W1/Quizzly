'use client'
import React, { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { profileSchema } from '@/lib/form-schemas'
import { z } from 'zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FormWrapper } from './form-wrapper'
import UseDebounce from '@/hooks/use-debounce'
import { validateUsername } from '@/actions/onboarding'
import { Loader2 } from 'lucide-react'

interface formProps {
    form: UseFormReturn<z.infer<typeof profileSchema>>
}

const NameForm = ({
    form
}: formProps) => {
    const { watch, setValue, setError, clearErrors, formState: { errors } } = form;
    const username = watch('username');
    const debouncedUsername = UseDebounce(username, 500);
    const [usernameStatus, setUsernameStatus] = useState<'idle' | 'loading' | 'valid' | 'invalid'>('idle');

    useEffect(() => {
        const checkUsername = async () => {
            if (!debouncedUsername) {
                setUsernameStatus('idle');
                return;
            }

            if (errors.username) {
                setUsernameStatus('idle');
                return;
            }

            setUsernameStatus('loading');
            const isValid = await validateUsername(debouncedUsername);
            
            if (isValid) {
                setUsernameStatus('valid');
                clearErrors('username');
            } else {
                setUsernameStatus('invalid');
                setError('username', { type: 'manual', message: 'Username is already taken' });
            }
        }

        checkUsername();
    }, [debouncedUsername, setValue, setError, clearErrors, errors.username])

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
                    />
                  </FormControl>
                  <FormMessage />
                  {usernameStatus === 'loading' && (
                    <p className="text-sm text-gray-500 flex items-center gap-2">Checking username...<Loader2 className='w-4 h-4 animate-spin'/></p>
                  )}
                  {usernameStatus === 'valid' && (
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