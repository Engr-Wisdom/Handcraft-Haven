"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Search = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // This would need access to products - you can import or fetch
  // For now, this is a basic version

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`)
      setShowSuggestions(false)
    }
  }

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className='flex items-center rounded-full p-1 w-[250px] md:w-[350px] xl:w-[500px] bg-white text-black max-md:hidden'>
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          placeholder='Search handcraft product...' 
          className='w-full outline-none text-sm max-md:text-xs pl-4' 
        />

        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="text-gray-400 hover:text-gray-600 px-1"
          >
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <button 
          type="submit"
          className='bg-black p-2 rounded-full text-white cursor-pointer hover:bg-gray-800 transition-colors'
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </button>
      </form>
    </div>
  )
}

export default Search