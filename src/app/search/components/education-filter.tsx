import React, { useState, useEffect } from 'react'
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command'
import { departments, universities, years } from '@/lib/constants'
import UseDebounce from '@/hooks/use-debounce'
import { cn } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'

const EducationFilter = () => {
    const [universityOpen, setUniversityOpen] = useState(false)
    const [departmentOpen, setDepartmentOpen] = useState(false)

    const [universitySearch, setUniversitySearch] = useState('')
    const [departmentSearch, setDepartmentSearch] = useState('')

    const debouncedUniversitySearch = UseDebounce(universitySearch, 300)
    const debouncedDepartmentSearch = UseDebounce(departmentSearch, 300)

    const {replace} = useRouter()
    const searchParams = useSearchParams()

    const filteredUniversities = universities.filter(university =>
        university.toLowerCase().includes(debouncedUniversitySearch.toLowerCase())
    )

    const filteredDepartments = departments.filter(department =>
        department.toLowerCase().includes(debouncedDepartmentSearch.toLowerCase())
    )

    useEffect(() => {
        const params = new URLSearchParams(searchParams)
        setUniversitySearch(params.get('university') || '')
        setDepartmentSearch(params.get('department') || '')
    }, [searchParams])

    const updateUrl = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams)
        if (value) {
            params.set(key, value)
        } else {
            params.delete(key)
        }
        replace(`/search?${params.toString()}`, {
            scroll: false
        })
    }

    return (
        <div className='flex flex-col gap-4 w-full'>
            <Command className="w-full border-[.7px] border-gray-200 rounded-md">
                <CommandInput
                    placeholder="Select university"
                    onFocus={() => setUniversityOpen(true)}
                    onBlur={() => setTimeout(() => setUniversityOpen(false), 200)}
                    value={universitySearch}
                    onValueChange={setUniversitySearch}
                />
                <CommandList className={cn(universityOpen ? 'h-fit' : 'max-h-[0px]')}>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Universities">
                        {filteredUniversities.map((university) => (
                            <CommandItem
                                key={university}
                                onSelect={() => {
                                    setUniversitySearch(university)
                                    setUniversityOpen(false)
                                    updateUrl('university', university)
                                }}
                            >
                                {university}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>

            <Command className="w-full border-[.7px] border-gray-200 rounded-md">
                <CommandInput
                    placeholder="Select department"
                    onFocus={() => setDepartmentOpen(true)}
                    onBlur={() => setTimeout(() => setDepartmentOpen(false), 200)}
                    value={departmentSearch}
                    onValueChange={setDepartmentSearch}
                />
                <CommandList className={cn(departmentOpen ? 'h-fit' : 'max-h-[0px]')}>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Departments">
                        {filteredDepartments.map((department) => (
                            <CommandItem
                                key={department}
                                onSelect={() => {
                                    setDepartmentSearch(department)
                                    setDepartmentOpen(false)
                                    updateUrl('department', department)
                                }}
                            >
                                {department}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
        </div>
    )
}

export default EducationFilter