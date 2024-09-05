'use client'

import { Input } from '@/components/ui/input'
import React, { useCallback, useEffect, useState } from 'react'
import { Loader2, Search } from 'lucide-react'
import UseDebounce from '@/hooks/use-debounce'
import axios from 'axios'
import { cn } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import ClickOutside from '@/hooks/click-outside'

const AutocompleteSearchbar = () => {
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get('query') || '');
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [researchSearchs, setResearchSearchs] = useState<string[]>([]);
  const debouncedInput = UseDebounce(inputValue, 300);
  const { replace } = useRouter();

  const loadRecentSearches = useCallback(() => {
    const searches = localStorage.getItem('recentSearches');
    if (searches) {
      setResearchSearchs(JSON.parse(searches));
    }
  }, []);

  useEffect(() => {
    loadRecentSearches();
  }, [loadRecentSearches]);

  const getAutocompleteResults = useCallback(async (input: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/search/autocomplete?query=${input}`);
      setResults(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debouncedInput) {
      getAutocompleteResults(debouncedInput);
    } else {
      setResults([]);
    }
  }, [debouncedInput, getAutocompleteResults]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleDropdownClick = (result: Object) => {
    setInputValue(result.toString());
    setShowDropdown(false);

    // Update the recent searches, persist with local storage
    const updatedSearches = [result, ...researchSearchs.filter(s => s !== result)].slice(0, 5);
    setResearchSearchs(updatedSearches as string[]);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));

    // clear all search params and replace with new search
    const params = new URLSearchParams();
    params.set('query', result.toString());
    replace(`/search?${params.toString()}`, {
      scroll: false
    });
  };

  return (
    <ClickOutside onClick={() => setShowDropdown(false)} className='w-full max-w-xl'>
      <div className='flex flex-col items-center justify-center w-full'>
        <div className='relative w-full'>
          <Input
            placeholder='Search'
            className='rounded-lg pl-12 text-lg w-full h-12 border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200'
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setShowDropdown(true)}
          />
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-6 w-6' />

          <div className={cn(
            showDropdown ? "max-h-60" : "max-h-0",
            "top-14 z-20 bg-white absolute w-full rounded-lg shadow-lg overflow-hidden overflow-y-auto transition-all duration-200"
          )}>
            <div className='flex flex-col'>
              {results.map((result, index) => (
                <div
                  key={result.toString() + index}
                  onClick={() => handleDropdownClick(result)}
                  className='px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors duration-150 text-gray-700 hover:text-blue-600'
                >
                  {result.toString()}
                </div>
              ))}
            </div>
            {isLoading && (
              <div className='flex items-center justify-center p-4'>
                <Loader2 className='h-6 w-6 animate-spin text-blue-400' />
              </div>
            )}
            {results.length === 0 && !isLoading && debouncedInput && (
              <div className='flex items-center justify-center p-4 text-gray-500'>
                No results found :( Contribute by adding your tests!
              </div>
            )}
            {results.length === 0 && researchSearchs.length > 0 && !isLoading && showDropdown && (
              <div className='flex flex-col pb-2'>
                <div className='text-gray-500 text-sm font-semibold px-4 py-2'>Recent Searches</div>
                {researchSearchs.map((search) => (
                  <div
                    key={search.toString()}
                    onClick={() => handleDropdownClick(search)}
                    className='px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors duration-150 text-gray-700 hover:text-blue-600'
                  >
                    {search.toString()}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ClickOutside>
  )
}

export default AutocompleteSearchbar