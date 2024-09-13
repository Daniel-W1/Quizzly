'use client'
import { sendJoinContributeEmail } from '@/actions/contribute'
import CommonHeader from '@/components/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'

const ContributeUI = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const response = await sendJoinContributeEmail(email)
        setLoading(false)
        if (response.error) {
            toast({
                title: 'Error',
                description: response.error,
                variant: 'destructive'
            })
        } else {
            toast({
                title: 'Success',
                description: response.success,
                variant: 'success'
            })
        }
    }
    return (
        <div className='flex flex-col items-center min-h-screen w-full relative'>
            <section className='min-h-[50vh] md:min-h-[40vh] flex flex-col items-center justify-center w-full bg-black bg-[url("/library-contribute.jpg")] bg-cover bg-center'>
                <CommonHeader bgVisible={false} />

                <div className='flex flex-col items-center justify-center space-y-5 w-full max-w-screen-lg px-4'>
                    <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white max-w-lg text-center'>Contributing makes <span className='text-blue-400 font-bold'>Quizzly</span> better!</h1>
                    <p className='text-sm sm:text-base text-gray-300 max-w-lg text-center'>You can earn money while contributing to a <span className='text-white bg-primary'>good cause.</span></p>
                </div>
            </section>
            <section className='w-full max-w-screen-lg p-4 sm:p-6 md:p-8'>
                <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
                    <div className='w-full lg:w-1/2 space-y-6'>
                        <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary'>How It Works</h2>
                        <ol className='space-y-3'>
                            {[
                                'Submit your ideal email',
                                'Receive instructions and guidelines',
                                'Collaborate with the team',
                                'Create and submit high-quality tests',
                                'Get your contributions reviewed',
                                'Earn rewards for approved content'
                            ].map((step, index) => (
                                <li key={index} className='flex items-center space-x-4'>
                                    <span className='flex-shrink-0 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-bold'>{index + 1}</span>
                                    <span className='text-gray-700'>{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>

                    <form onSubmit={handleSubmit} className='space-y-2 w-full lg:w-1/2 lg:p-4'>
                        <h3 className='text-lg sm:text-xl md:text-2xl font-bold text-primary'>Get Started</h3>
                        <p className='text-sm sm:text-base text-gray-600'>Enter your email to receive next steps:</p>
                        <Input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Your email address'
                            required
                        />
                        <Button
                            type='submit'
                            className='w-full'
                        >
                            {loading ? <span className='flex items-center justify-center'>Sending...<Loader2 className='w-4 h-4 ml-2 animate-spin' /></span> : 'Send Me Instructions'}
                        </Button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default ContributeUI