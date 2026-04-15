import React from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { products } from "@/data/cards";
import Card from "@/app/ui/card";
import { ShopNow } from "./ui/buttons";

const Home = async () => {
    
  return (
    <div className='bg-gray-200 text-black p-4 sm:p-10'>
      <div className='flex items-center justify-between gap-20 max-md:flex-col max-lg:gap-10 mb-20'>
        <div className='max-lg:w-xs max-md:w-full'>
          <h1 className='text-2xl w-sm font-bold max-sm:text-xl max-sm:w-xs'>Discover Unique Handcrafted Treasures</h1>
          <p className='py-10 max-md:py-5'>
            Explore the world of creativity where talented artisians showcase handmade products crafted with passion and care.
          </p>
          < ShopNow />
        </div>

        <div className='w-full'>
          <Image src='/images/hero.jpg' alt='Hero image' width={500} height={500} draggable='false' className='w-full h-130 max-lg:h-100
          max-sm:h-full rounded-2xl ' />
        </div>
      </div>

      <ProductTable products={products} title='Most Popular' />
    </div>
  )
}

export default Home