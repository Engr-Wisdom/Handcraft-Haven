"use client"

import React from 'react'
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { products } from "@/data/cards"
import Card from "@/app/ui/card"

const Home = () => {
  const router = useRouter()
  return (
    <div className='bg-gray-200 text-black p-4 sm:p-10'>
      <div className='flex items-center justify-between gap-20 max-md:flex-col max-lg:gap-10'>
        <div className='max-lg:w-xs max-md:w-full'>
          <h1 className='text-2xl w-sm font-bold max-sm:text-xl max-sm:w-xs'>Discover Unique Handcrafted Treasures</h1>
          <p className='py-10 max-md:py-5'>
            Explore the world of creativity where talented artisians showcase handmade products crafted with passion and care.
          </p>
          <button className='bg-amber-700 text-white p-2 px-6 rounded-full text-sm cursor-pointer hover:bg-amber-700/80 transition-all'
            onClick={() => router.push("/products")}>Shop Now</button>
        </div>

        <div className='w-full'>
          <Image src='/images/hero.jpg' alt='Hero image' width={500} height={500} draggable='false' className='w-full h-130 max-lg:h-100
          max-sm:h-full rounded-2xl' />
        </div>
      </div>

      <Card products={products} />
    </div>
  )
}

export default Home
