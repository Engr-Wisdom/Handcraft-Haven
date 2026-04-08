import { Product } from "../../lib/definitions"
import Image from "next/image.js"
import BuyButton from "./add-cart-button"
import Rating from "./rating"
import StoreName from "./store-name"
export default function ProductView({ product }: { product: Product }) {

    return <>
        <div id="product" className="grid min-[440px]:grid-cols-2 grid-cols-1 w-[100%] p-2">

            <div className="">
                <div className="text-sm mb-1 ml-2">
                    <a className="text-blue-600 " href={"/"}>Home › </a>
                    <a className="text-green-600 " href={"/products/"}>Products › </a>
                    <a className="text-blue-600 " href={"/products/category/" + product.category}>{product.category[0].toUpperCase() + product.category.slice(1)}</a>

                </div>
                <Image
                    src={product.image}
                    alt={"Photo of " + product.name}
                    width={300}
                    height={300}
                    className="w-[90%] h-auto m-auto rounded"
                />
            </div>
            <div className="mt-10">

                <h2 className="font-bold md:text-2xl">{product.name}</h2>
                <span className="text-sm mr-1 text-gray-400">USD</span><span className="text-2xl font-bold">${product.price}</span>
                <p className="my-2">{product.description}</p>
                {/* <p className="font-bold text-sm inline min-[440px]:block lg:inline mr-3"><span>Sold by </span><span className="text-blue-600">{product.store}</span></p> */}
                <StoreName product={product} />
                <Rating product={product} />
                <BuyButton id={product.id} />
            </div>

        </div>
    </>

}