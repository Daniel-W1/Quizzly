import React from 'react'
import TextLogo from './text-logo'
import ResponsiveNavItems from './nav-items'

const TransparentHeader = () => {
    const links = [
        { name: 'Home', href: '/' },
        { name: 'Features', href: '#features' },
        // { name: 'Pricing', href: '/pricing' },
        // { name: 'FAQ', href: '/faq' },
        // { name: 'Testimonials', href: '/testimonials' },
        { name: 'Login', href: '/login', isButton: true },
    ]

  return (
    <div className="w-screen sticky top-0 bg-transparent px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 bg-white z-10 h-20 justify-between py-2 flex items-center backdrop-filter backdrop-blur-lg bg-opacity-80 border-b border-gray-200">
        <TextLogo text="Quizzly" color="#0065F2" fontSize="34px" fontWeight="bold" fontFamily="sans-serif" />
        <ResponsiveNavItems links={links} />
    </div>
  )
}

export default TransparentHeader