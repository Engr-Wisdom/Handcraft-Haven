import React from 'react'
import Image from "next/image"

interface Products {
    products: Array<Product>
}

interface Product {
    image: string,
    name: string,
    price: number,
    category: string
}

const Card = ({ products }: Products) => {
  return (
    <div className='pt-10 sm:pt-20'>
    <p className='bg-amber-700 w-fit px-4 p-2 rounded-full text-xs sm:text-sm text-white font-semibold mb-5'>Most Popular</p>
    <ul className='grid grid-cols-5 gap-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2'>
        {products.map((product: Product, index: number) => (
        <li key={index} className='bg-white rounded-lg shadow-2xl overflow-auto hover:scale-103 transition-all duration-500 cursor-pointer'>
            <Image src={product.image} alt='' width={100} height={100} className='w-full h-50 max-sm:h-30 max-lg:h-35'/>
            <div className='p-2'>
                {/* <p className='text-sm my-2'>{product.category}</p> */}
                <h3 className='font-semibold text-xs sm:text-sm my-2'>{product.name}</h3>
                <p>${product.price}</p>
                <button className='bg-amber-700 text-white p-2 max-sm:p-1 rounded-full my-2'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 cursor-pointer text-text max-sm:h-[15px] max-sm:w-[15px]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h13M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"/>
                    </svg>
                </button>
            </div>
        </li>
        ))}
    </ul>
    </div>
  )
}

export default Card
