import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const examTypes = ['Test','Midterm', 'Final', 'Quiz']
const years = ['2023', '2022', '2021', '2020', '2019']
const difficultyLevels = ['Easy', 'Medium', 'Hard']

const FilterSelects = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    const [examType, setExamType] = useState(searchParams.get('examType') || '')
    const [year, setYear] = useState(searchParams.get('year') || '')
    const [difficulty, setDifficulty] = useState(searchParams.get('difficulty') || '')
    
    const updateUrl = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams)
        if (value) {
            params.set(key, value)
        } else {
            params.delete(key)
        }
        router.replace(`${pathname}?${params.toString()}`, {
            scroll: false
        })
    }

    useEffect(() => {
        if (!searchParams.get('examType')) {
            setExamType(searchParams.get('examType') || '')
        }
        if (searchParams.get('year')) {
            setYear(searchParams.get('year') || '')
        }
        if (searchParams.get('difficulty')) {
            setDifficulty(searchParams.get('difficulty') || '')
        }
    }, [searchParams])

    return (
        <div className="flex flex-col space-y-4">
            <Select onValueChange={(value) => {
                updateUrl('examType', value)
                setExamType(value)
            }} value={examType}>
                <SelectTrigger>
                    <SelectValue placeholder="Exam Type" />
                </SelectTrigger>
                <SelectContent>
                    {examTypes.map((type) => (
                        <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select onValueChange={(value) => {
                updateUrl('year', value)
                setYear(value)
            }} value={year}>
                <SelectTrigger>
                    <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                    {years.map((year) => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select onValueChange={(value) => {
                updateUrl('difficulty', value)
                setDifficulty(value)
            }} value={difficulty}>
                <SelectTrigger>
                    <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                    {difficultyLevels.map((level) => (
                        <SelectItem key={level} value={level.toLowerCase()}>{level}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default FilterSelects