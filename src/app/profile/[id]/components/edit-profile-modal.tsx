import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Profile } from '@/types'
import { years } from '@/lib/constants'
import { profileEditSchema } from "@/lib/form-schemas"
import { useToast } from '@/hooks/use-toast'
import { updateProfile } from '@/actions/profile'
import { Alert } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'
import { useProfileStore } from '@/stores/profile-store'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { UploadButton } from '@/components/uploadthing'

interface EditProfileModalProps {
    isOpen: boolean
    onClose: () => void
    profile: Profile
}

const EditProfileModal = ({ isOpen, onClose, profile }: EditProfileModalProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [previewImage, setPreviewImage] = useState<string | null>(profile.image || null)
    const [uploadLoading, setUploadLoading] = useState(false)
    const setProfile = useProfileStore(state => state.setProfile);
    const { toast } = useToast()
    const form = useForm<z.infer<typeof profileEditSchema>>({
        resolver: zodResolver(profileEditSchema),
        defaultValues: {
            name: profile.name,
            year: profile.year,
            bio: profile.bio || "",
        },
    })

    const onSave = async (values: z.infer<typeof profileEditSchema>) => {
        setIsLoading(true)
        setError(null)
        const { name, year, bio } = values
        const res = await updateProfile(profile.userId, previewImage || '', name, year, bio as string);
        if ('error' in res) {
            setError(res.error)
        } else {
            setProfile({
                ...profile,
                name,
                year,
                image: previewImage || profile.image,
                bio: bio as string,
            })
            toast({
                title: "Success",
                description: "Profile updated successfully",
                variant: "success",
            })
            onClose();
        }
        setIsLoading(false)
    }

    const onSubmit = (values: z.infer<typeof profileEditSchema>) => {
        onSave(values)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-screen">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                {error && <p className="text-sm text-red-500 text-center bg-red-200 p-2 rounded-md">
                    {error}
                </p>}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                                <AvatarFallback>{profile.name[0]}</AvatarFallback>
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
                                                    console.error(error)
                                                }}
                                                onUploadBegin={() => setUploadLoading(true)}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="year"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Year</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select your year" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {years.map((year) => (
                                                <SelectItem key={year} value={year}>
                                                    {year}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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
                                            placeholder="Tell us about yourself"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit" disabled={isLoading || uploadLoading}>
                                {isLoading ? <span className="flex items-center gap-2">Saving...<Loader2 className="w-4 h-4 animate-spin" /></span> : "Save changes"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default EditProfileModal