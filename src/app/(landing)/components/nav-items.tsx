import React from 'react'
import { AlignRight } from 'lucide-react'
import Link from 'next/link'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface ResponsiveNavItemsProps {
    links: {
        name: string
        href: string
        isButton?: boolean
    }[]
}

const ResponsiveNavItems = ({ links }: ResponsiveNavItemsProps) => {
  return (
    <div>
        <ul className="items-center justify-center gap-x-4 hidden sm:flex">
            {links.map((link) => (
                <li key={link.name}>
                    <Link 
                        href={link.href} 
                        className={cn(
                            "transition-colors",
                            link.isButton 
                                ? "px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 ml-6"
                                : "text-gray-600 hover:text-black hover:underline"
                        )}
                    >
                        {link.name}
                    </Link>
                </li>
            ))}
        </ul>
        <DropdownMenu>
            <DropdownMenuTrigger className="sm:hidden">
                <AlignRight className="w-8 h-8" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {links.map((link) => (
                    <DropdownMenuItem key={link.name}>
                        <Link 
                            href={link.href} 
                            className={cn(
                                "w-full transition-colors text-center",
                                link.isButton 
                                    ? "px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700"
                                    : "text-gray-600 hover:text-black"
                            )}
                        >
                            {link.name}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default ResponsiveNavItems