'use client'

import { FilterCombobox } from '@/app/search/components/filter-combobox'
import React from 'react'
import { filterConcepts } from '@/lib/constants'
import FilterSelects from './filter-selects'
import EducationFilter from './education-filter'

const SearchFilters = () => {
  return (
    <div className='flex flex-col space-y-4 w-full sm:w-1/3 lg:w-1/4'>
        <FilterCombobox
                groups={filterConcepts}
                placeholder='Concepts'
                emptyMessage='No concepts found'
        />
        <FilterSelects/>
        <EducationFilter/>
    </div>
  )
}

export default SearchFilters