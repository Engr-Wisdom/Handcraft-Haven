"use client";

import { Product } from "@/app/lib/definitions";
import Image from "next/image";
import Rating from "./rating";
import { StoreNameCard } from "./store-name";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react"

export default function ProductCard({ product }: { product: Product }) {
//   return <li className='relative w-[100%]  rounded-lg shadow-2xl overflow-hidden '>
//       <div className="h-[60%] min-[430px]:h-[70%] w-full overflow-hidden">
//           <a href={`/products/${product.url}`}>
//               <Image src={product.image} alt={`photo of ${product.name}`} width={1000} height={1000} className='hover:scale-103  transition-all duration-500 h-full w-full object-cover active:opacity-50' />
//           </a>

//       </div>
//       <div className="p-1">
//           <a className='hover:scale-103  transition-all duration-500 font-semibold text-sm sm:text-sm block' href={`/products/${product.url}`}>{product.name}</a>
//           <StoreNameCard product={product} />
//           <p className="font-bold bg-white  rounded opacity-90"><span className="text-sm mr-1 text-gray-400">USD</span>${product.price}</p>
//           <Rating product={product} />
//       </div>
//   </li>

  const router = useRouter();
  // const { data: session } = useSession()
  const [isAdding, setIsAdding] = useState(false)
  
  // const addToCart = async (e: React.MouseEvent, productId: string) => {
  //   e.stopPropagation()
  //   console.log("1. Session object:", session)
  // console.log("2. Session user:", session?.user)
  // console.log("3. Is logged in?", !!session)
  //   if (!session) {
  //     alert("Please login to add items to cart")
  //     router.push("/login")
  //     return
  //   }
  //   setIsAdding(true)

  //   try {
  //     const response = await fetch("/api/cart", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({ product_id: productId })
  //     })

  //     const data = await response.json()      

  //     if (data.success) {
  //       alert("Added to cart")
  //     } else {
  //       alert("Failed to add to cart")
  //     }
  //   } catch(error) {
  //     console.error("Cart error:", error)
  //     alert("Error adding to cart")
  //   } finally {
  //     setIsAdding(false)
  //   }
  // } 

  return (
    <li className="bg-white rounded-lg shadow-2xl overflow-auto hover:scale-103 transition-all duration-500 cursor-pointer"
    onClick={() => router.push(`/products/${product.url}`)}>
      <Image src={product.image} alt={`photo of ${product.name}`} width={100} height={100} 
      className="w-full h-50 max-sm:h-30 max-lg:h-35" />
      <div className="p-2">
        {/* <p className='text-sm my-2'>{product.category}</p> */}
        <h3 className="font-semibold text-xs sm:text-sm my-2">{product.name}</h3>
        <p>${product.price}</p>

       <div className="flex justify-between items-center">
        <Rating product={product} />

         <button className="bg-amber-700 text-white p-2 max-sm:p-1 rounded-full my-2 disabled:opacity-50 
         disabled:cursor-not-allowed" disabled={isAdding}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 max-sm:h-[15px] max-sm:w-[15px]"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h13M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"/>
            </svg>
          </button>
       </div>
      </div>
    </li>
  );
}
