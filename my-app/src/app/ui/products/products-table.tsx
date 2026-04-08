import { Product } from "@/app/lib/definitions"
import ProductCard from "./product-card"
import Image from "next/image"
export default function ProductTable({ products, title }: { products: Array<Product>, title: string }) {
    return (
        <div className='mx-3 mt-4 min-h-100 pb-6'>
            <h2 className='text-2xl bg-blue-100 font-bold max-sm:text-xl mb-2 border-3 border-blue-700 rounded-lg p-1 inline-block'>{title}</h2>
            <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 rounded-10 overflow-hidden py-2'>
                {products.map((product: Product, index: number) => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </ul>
        </div>)
}