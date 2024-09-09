'use client'

import React, { useEffect, useState } from 'react'
import TestCard from './test-card'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import LoadingSkeleton from './loading-skeleton'
import { PaginationComponent } from '@/components/pagination'
import TestDetailsDrawer from './details-drawer'
import { TestDetails } from '@/types'


const SearchResults = () => {
    const [tests, setTests] = useState<TestDetails[]>([])
    const [loading, setLoading] = useState(true)
    const [noQuery, setNoQuery] = useState(false)
    const searchParams = useSearchParams()
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page') || 1))
    const [error, setError] = useState<string | null>(null)
    const [selectedTest, setSelectedTest] = useState<TestDetails | null>(null)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const handleTestClick = (test: TestDetails) => {
        setSelectedTest(test)
        setIsDrawerOpen(true)
    }

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false)
        setSelectedTest(null)
    }

    useEffect(() => {
        const fetchTests = async () => {
            setLoading(true)
            setError(null)

            try {
                const response = await axios.get(`/api/search/tests?${searchParams.toString()}`)
                setTests(response.data.tests)
                setNoQuery(response.data.noQuery)
                setTotalPages(response.data.totalPages)
            } catch (err) {
                setError('Failed to fetch tests. Please try again.')
                console.error('Error fetching tests:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchTests()
        setCurrentPage(Number(searchParams.get('page') || 1))
    }, [searchParams])

    if (loading) {
        return (
            <LoadingSkeleton />
        )
    }

    if (error) {
        return (
            <div className='flex justify-center items-center w-full h-64'>
                <p className='text-red-500'>{error}</p>
            </div>
        )
    }

    if (tests.length === 0) {
        return (
            <div className='flex justify-center items-center w-full h-64'>
                <p>No tests found. Try adjusting your search criteria.</p>
            </div>
        )
    }

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams) 
        params.set('page', page.toString())
        return `/search?${params.toString()}`
    }

    return (
        <div className='flex flex-col items-center justify-center w-full'>
            {noQuery && (
                <p className='text-2xl w-full text-left font-bold mt-3 mb-5'>New Tests</p>
            )}
            <div className='grid grid-cols-1 lg:grid-cols-2  gap-4 w-full mb-3'>
                {tests.map((test) => (
                    <div key={test.id} className='flex justify-center'>
                        <TestCard test={test} onTestClick={handleTestClick} />
                    </div>
                ))}
            </div>
            {totalPages > 1 && !noQuery && (
                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
            <TestDetailsDrawer open={isDrawerOpen} onClose={handleCloseDrawer} test={selectedTest} />
        </div>
    )
}

export default SearchResults