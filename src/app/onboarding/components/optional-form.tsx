import { profileSchema } from '@/lib/form-schemas'
import React, { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { FormWrapper } from './form-wrapper'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UploadButton } from '@/components/uploadthing'
import { useToast } from '@/hooks/use-toast'

interface formProps {
    form: UseFormReturn<z.infer<typeof profileSchema>>,
    setUploadLoading: (loading: boolean) => void
}

const OptionalForm = ({ form, setUploadLoading }: formProps) => {
    const [previewImage, setPreviewImage] = useState<string | null>(form.watch('image') || null)
    const { toast } = useToast()

    const handleToast = (error: Error) => {
        if (error.message === "Invalid config: FileSizeMismatch") {
            toast({
                title: 'Error',
                description: 'File size too large',
                variant: 'destructive'
            })
        } else {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive'
            })
        }
    }

    return (
        <FormWrapper title='Optional Details' description='Add profile picture and bio'>
            <div className='flex flex-col gap-6 w-full'>
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Profile Picture</FormLabel>
                            <FormControl>
                                <div className='flex items-center gap-4'>
                                    <Avatar className='w-20 h-20 border-2 border-gray-400'>
                                        <AvatarImage src={previewImage || ''} alt="Profile picture" />
                                        <AvatarFallback>{form.watch('name')[0]}</AvatarFallback>
                                    </Avatar>
                                    <UploadButton
                                        endpoint="imageUploader"
                                        onClientUploadComplete={(res: any) => {
                                            if (res && res.length > 0) {
                                                setPreviewImage(res[0].url)
                                                form.setValue('image', res[0].url)
                                                setUploadLoading(false)
                                            }
                                        }}
                                        onUploadError={(error: Error) => {
                                            handleToast(error)
                                        }}
                                        onUploadBegin={() => setUploadLoading(true)}
                                        onUploadAborted={() => setUploadLoading(false)}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell people about yourself..."
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </FormWrapper>
    )
}

export default OptionalForm