import React from 'react'
import { Button } from '../../../components/ui/button'
import Link from 'next/link'

interface HeroLeftProps {
    headline: string
    subheadline: string
    cta_button: string
    cta_button_link: string
    small_description?: string
}

const HeroLeft = ({headline, subheadline, cta_button, cta_button_link, small_description}: HeroLeftProps) => {
  return (
    <div className="flex flex-col space-y-4 p-6 bg-primary-100">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 text-wrap">{headline}</h1>
        <h2 className="text-xl md:text-2xl lg:text-3xl text-secondary-700 text-wrap">{subheadline}</h2>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 items-start sm:items-center">
            <Button>
                <Link href={cta_button_link}>
                    {cta_button}
                </Link>
            </Button>
            {small_description && <p className="text-xs md:text-sm lg:text-base text-secondary-500 text-wrap">{small_description}</p>}
        </div>
    </div>
  )
}

export default HeroLeft