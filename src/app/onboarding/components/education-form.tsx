import { profileSchema } from '@/lib/form-schemas'
import React, { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { FormWrapper } from './form-wrapper'
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command'
import { departments, universities, years } from '@/lib/constants'
import UseDebounce from '@/hooks/use-debounce'
import { cn } from '@/lib/utils'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface formProps {
    form: UseFormReturn<z.infer<typeof profileSchema>>
}

const EducationForm = ({ form }: formProps) => {
    const [universityOpen, setUniversityOpen] = useState(false)
    const [departmentOpen, setDepartmentOpen] = useState(false)

    const [universitySearch, setUniversitySearch] = useState(form.watch('university'))
    const [departmentSearch, setDepartmentSearch] = useState(form.watch('department'))

    const debouncedUniversitySearch = UseDebounce(universitySearch, 300)
    const debouncedDepartmentSearch = UseDebounce(departmentSearch, 300)

    const filteredUniversities = universities.filter(university =>
        university.toLowerCase().includes(debouncedUniversitySearch.toLowerCase())
    )

    const filteredDepartments = departments.filter(department =>
        department.toLowerCase().includes(debouncedDepartmentSearch.toLowerCase())
    )

    return (
        <FormWrapper title='Education' description='Add your education details'>
            <div className='flex flex-col gap-4 w-full'>
                <FormField
                    control={form.control}
                    name="university"
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormLabel>University</FormLabel>
                            <FormControl>
                                <Command className="w-full">
                                    <CommandInput
                                        placeholder="Search your university..."
                                        onFocus={() => setUniversityOpen(true)}
                                        onBlur={() => setTimeout(() => setUniversityOpen(false), 200)}
                                        value={universitySearch}
                                        onValueChange={setUniversitySearch}
                                    />
                                    <CommandList className={cn(universityOpen ? 'h-fit' : 'max-h-[0px]')}>
                                        <CommandEmpty>No results found. Please select other.</CommandEmpty>
                                        <CommandGroup heading="Universities">
                                            {filteredUniversities.map((university) => (
                                                <CommandItem
                                                    key={university}
                                                    onSelect={() => {
                                                        field.onChange(university)
                                                        setUniversitySearch(university)
                                                        setUniversityOpen(false)
                                                    }}
                                                >
                                                    {university}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormLabel className='text-left w-full'>Department</FormLabel>
                            <FormControl>
                                <Command className="w-full">
                                    <CommandInput
                                        placeholder="Search your department..."
                                        onFocus={() => setDepartmentOpen(true)}
                                        onBlur={() => setTimeout(() => setDepartmentOpen(false), 200)}
                                        value={departmentSearch}
                                        onValueChange={setDepartmentSearch}
                                    />
                                    <CommandList className={cn(departmentOpen ? 'h-fit' : 'max-h-[0px]')}>
                                        <CommandEmpty>No results found. Please select other.</CommandEmpty>
                                        <CommandGroup heading="Departments">
                                            {filteredDepartments.map((department) => (
                                                <CommandItem
                                                    key={department}
                                                    onSelect={() => {
                                                        field.onChange(department)
                                                        setDepartmentSearch(department)
                                                        setDepartmentOpen(false)
                                                    }}
                                                >
                                                    {department}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormLabel>Year</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your year" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        years.map((year) => (
                                            <SelectItem key={year} value={year}>
                                                {year}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </FormWrapper>
    )
}

export default EducationForm