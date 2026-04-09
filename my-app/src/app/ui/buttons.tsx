'use client'
import { useRouter } from 'next/navigation'

export function ShopNow() {


    const router = useRouter()
    return (
        <button className='bg-amber-700 text-white p-2 px-6 rounded-full text-sm cursor-pointer hover:bg-amber-700/80 transition-all'
            onClick={() => router.push("/products")}>Shop Now</button>
    )
}