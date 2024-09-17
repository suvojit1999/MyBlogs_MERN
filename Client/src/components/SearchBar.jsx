import React, { useContext, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { SearchContext } from '../_context/SearchContext';


const SearchBar = () => {
  const { Search, setSearch } = useContext(SearchContext)
  return (
    <div className='flex justify-end items-center w-[96%]'>
      <div className='flex items-center relative lg:w-[300px] md:w-[300px] w-[96%]'>
        <input type="text" name="search" id="search" value={Search} placeholder='Search Blog Titles Here' onChange={(e) => setSearch(e.target.value)} className='bg-slate-200 rounded-md px-3 py-1 w-[100%] text-right outline-none pr-10' />
        <IoSearch className='absolute right-[5%]' fill='gray' />

      </div>

    </div>
  )
}

export default SearchBar
