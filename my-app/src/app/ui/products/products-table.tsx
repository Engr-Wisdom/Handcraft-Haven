import { Product } from "@/app/lib/definitions"
import ProductCard from "./product-card"
import Image from "next/image"
import CategoryFilter from "./filter-by-category"
import { getCategories } from "@/app/lib/data"
import GoCard from "../go-card"
export default async function ProductTable({ products, title, filter = true }: { products: Array<Product>, title: string, filter?: boolean }) {
    let categories = await getCategories();
    return (
        <div className='mx-3 mt-4 min-h-100 pb-6'>
            <div className="w-full flex items-center justify-between px-2" ><h2 className='bg-amber-700 w-fit px-4 p-2 rounded-full text-xs sm:text-sm text-white font-semibold mb-5'>{title}</h2>
                {filter && <div className="font-bold "><CategoryFilter categories={categories} /></div>}
            </div>
            {products.length > 0 ? <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 rounded-10 overflow-hidden py-2'>
                {products.map((product: Product, index: number) => (
                    <ProductCard product={product} key={index} />
                ))}
            </ul> : <div><p className="text-4xl text-center font-bold">No products listed yet</p> <p className="text-center text-2xl mt-2">Check back soon!</p> </div>}
        </div>)
}
export async function ProductHomeTable({ products, title, filter = true }: { products: Array<Product>, title: string, filter?: boolean }) {
    return (
        <div className='mx-3 mt-4 min-h-100 pb-6'>
            <div className="w-full flex items-center justify-between px-2" ><h2 className='bg-amber-700 w-fit px-4 p-2 rounded-full text-xs sm:text-sm text-white font-semibold mb-5'>{title}</h2>
            </div>
            {products.length > 0 ? <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 rounded-10 overflow-hidden py-2'>
                {products.map((product: Product, index: number) => (
                    <ProductCard product={product} key={product.id} />
                ))}
                <GoCard url="/products/" text={["Go Shopping", "Explore our curated collection of artisan crafts."]} />



            </ul> : <div><p className="text-4xl text-center font-bold">No products listed yet</p> <p className="text-center text-2xl mt-2">Check back soon!</p> </div>}
        </div>)
}
