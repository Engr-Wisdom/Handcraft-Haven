import { Product } from "@/app/lib/definitions"
import ProductCard from "./product-card"
import Image from "next/image"
export default function ProductTable({ products, title }: { products: Array<Product>, title: string }) {
    return (
        <div>
            <h2 className='bg-amber-700 w-fit px-4 p-2 rounded-full text-xs sm:text-sm text-white font-semibold mb-5'>{title}</h2>
            <ul className='grid grid-cols-5 gap-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2'>
                {products.map((product: Product, index: number) => (
                    <ProductCard product={product} key={index} />
                ))}
            </ul>
        </div>)
}