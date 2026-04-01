"use client";

import React from 'react'
import Image from "next/image"

interface LogoProps {
  setSideBar: (value: boolean) => void
}

const Logo = ({ setSideBar }: LogoProps) => {
  return (
    <div className='flex items-center gap-2'>
      <button onClick={() => setSideBar(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 cursor-pointer lg:hidden"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
          />
        </svg>
      </button>
      <Image src="/images/logo.png" alt='handcraft haven logo' width={40} height={40} />
      <h1 className='text-md font-bold'>Haven</h1>
    </div>
  )
}

export default Logo
