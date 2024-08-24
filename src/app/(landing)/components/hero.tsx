import React from 'react'
import HeroLeft from './hero-left'
import Image from 'next/image'

const ResponsiveHero = () => {
  return (
    // margin top to accomodate the header height
    <div className="flex flex-col md:flex-row items-center justify-around min-h-screen -mt-20 px-4 sm:px-10 max-w-screen-lg">
        <HeroLeft 
            headline="Study Smart, Study Together!"
            subheadline="Unlock your academic potential with science-based collaborative learning."
            cta_button="Join Now"
            cta_button_link="/login"     
            small_description="Join a community of learners and achieve your goals together."
        />
        <Image
            src="/studying.svg"
            alt="studying"
            width={400}
            height={400}
        />
    </div>
  )
}

export default ResponsiveHero