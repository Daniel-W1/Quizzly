import React from 'react'
import TextLogo from './text-logo'
import Link from 'next/link'

const SimpleFooter = () => {
  return (
    <footer className="w-screen rounded-lg shadow dark:bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <TextLogo text="Quizzly" color="#0065F2" fontSize="34px" fontWeight="bold" fontFamily="sans-serif" />
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link href="#" className="hover:underline me-4 md:me-6">About</Link>
            </li>
            <li>
              <Link href="#" className="hover:underline me-4 md:me-6">Privacy Policy</Link>
            </li>
            <li>
              <Link href="https://t.me/quizzlyapp" className="hover:underline">Telegram Channel</Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© {new Date().getFullYear()} <Link href="/" className="hover:underline">Quizzly</Link>. All Rights Reserved.</span>
      </div>
    </footer>
  )
}

export default SimpleFooter