import { Product } from "../../lib/definitions"
import Image from "next/image.js"
import BuyButton from "./add-cart-button"
import Rating from "./rating"
import StoreName from "./store-name"
import { ProductReviews } from "../reviews"
import { Review } from "../../lib/definitions"
import FormReview from "./form-review"
import { Suspense } from "react"
export default function ProductView({ product, reviews, name, url, isReviewed }: { product: Product, reviews: Array<Review>, name: string, url: string, isReviewed: boolean }) {

    return <>
        <div id="product" className="grid min-[440px]:grid-cols-2 grid-cols-1 w-full p-2">

            <div className="">
                <div className="text-sm mb-1 ml-2 text-blue-800 font-bold">
                    <a href={"/"}>Home › </a>
                    <a className="mx-1" href={"/products/"}>Products › </a>
                    <a href={"/products/category/" + product.category}>{product.category[0].toUpperCase() + product.category.slice(1)}</a>

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
                <span className="text-sm mr-1 text-gray-700 font-bold">USD</span><span className="text-2xl font-bold">${product.price}</span>
                <p className="my-2">{product.description}</p>
                {/* <p className="font-bold text-sm inline min-[440px]:block lg:inline mr-3"><span>Sold by </span><span className="text-blue-600">{product.store}</span></p> */}
                <StoreName product={product} />
                <Rating product={product} />
                <BuyButton id={product.id} />
                <ProductReviews reviews={reviews} />
                {!isReviewed && <FormReview name={name} product={product} url={url} />}
            </div>
        </div>
    </>

}