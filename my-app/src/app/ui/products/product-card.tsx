import { Product } from "@/app/lib/definitions";
import Image from "next/image";
import Rating from "./rating";
import { StoreNameCard } from "./store-name";


export default function ProductCard({ product }: { product: Product }) {
    return <li className='relative w-[100%]  rounded-lg shadow-2xl overflow-hidden bg-white '>
        <div className="h-[60%] min-[430px]:h-[70%] w-full overflow-hidden">
            <a href={`/products/${product.url}`}>
                <Image src={product.image} alt={`photo of ${product.name}`} width={1000} height={1000} className='hover:scale-103  transition-all duration-500 h-full w-full object-cover active:opacity-50' />
            </a>

        </div>
        <div className="p-1">
            <a className='hover:scale-103  transition-all duration-500 font-semibold text-sm sm:text-sm block' href={`/products/${product.url}`}>{product.name}</a>
            <StoreNameCard product={product} />
            <p className="font-bold bg-white  rounded opacity-90"><span className="text-sm mr-1 text-gray-400">USD</span>${product.price}</p>
            <Rating product={product} />
        </div>
    </li>
}