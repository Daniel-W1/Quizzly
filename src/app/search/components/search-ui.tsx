import React from 'react'
import AutocompleteSearchbar from './autocomplete-searchbar'
import SvgWave from '@/components/wave-svg'
import SearchFilters from './filters'
import ContributeCard from './contribute-cta'
import { Button } from '@/components/ui/button'
import Profile from '@/components/profile-dropdown'
import SearchResults from './search-results'

const SearchUI = () => {
  return (
    <div className='flex flex-col items-center min-h-screen w-screen relative'>
      <section className='min-h-[80vh] relative md:min-h-[60vh] flex flex-col items-center justify-center w-full bg-black bg-[url("/search-library.jpg")] bg-cover bg-center'>
        <div className='flex justify-end items-center space-x-4 w-full px-2 md:px-8 py-4 absolute top-0 z-20'>
          <Button>Contribute</Button>
          <Profile />
        </div>
        <div className='flex flex-col items-center justify-center space-y-5 w-full max-w-screen-lg px-4'>
          <h1 className='text-3xl md:text-5xl font-medium text-white max-w-lg text-center'>find any <span className='text-blue-400 [text-shadow:_0_2px_4px_rgba(0,0,0,0.6)] font-bold'>TEST</span> you want, <span className='text-blue-400 [text-shadow:_0_2px_4px_rgba(0,0,0,0.6)] font-bold'>Study Smart!</span></h1>
          <AutocompleteSearchbar />
        </div>
        <SvgWave />
        <ContributeCard />
      </section>
      <section className='w-full flex flex-col sm:flex-row justify-between max-w-screen-xl gap-4 px-4 pb-10 z-10 mt-8'>
        <SearchFilters />
        <SearchResults />
      </section>
    </div>
  )
}

export default SearchUI