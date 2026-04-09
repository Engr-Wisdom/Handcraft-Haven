import { Review, Store } from "@/app/lib/definitions";
import Image from "next/image";
import { formatFloat } from "@/app/lib/utils";
import { ReviewTableSellerPage } from "../reviews";
export default function StoreCard({ store }: { store: Store }) {
    return (

        <section className=" relative flex flex-col  rounded-lg overflow-hidden border-1 border-red-200 shadow-lg shadow-gray-500 ">
            <div className=" w-full h-[70%] overflow-hidden rounded-4 active:opacity-75">
                <a href={`/stores/${store.seo_url}`} ><Image
                    className="rounded-lg h-full w-full object-cover hover-animation"
                    src={store.image}
                    alt={`photo of ${store.name}`}
                    width={500}
                    height={500}
                /></a>
            </div>
            <a href={`/stores/${store.seo_url}`} className="hover-animation text-amber-700 bottom-1 text-2xl font-bold w-full text-center active:opacity-75">{store.name}</a>
            <p className="text-center">{store.bio}</p>
            <span className="border-1 border-red-400/50 bg-white/90 absolute p-1 font-bold rounded-lg right-2 top-2">❤️{formatFloat(store.avg_rating)}</span>
            <span className="hover-animation self-end m-2 "><a href={`/stores/${store.seo_url}`} className="text-amber-700  font-bold w-full  active:opacity-75">See Products →</a></span>

        </section>

    )
}
export function StorePageCard({ store, reviews }: { store: Store, reviews: Array<Review> }) {
    return (

        <div className=" relative grid grid-cols-2 min-[440px]:grid-cols-[1fr_3fr] grid-cols-[1fr_2fr] md:px-10 rounded-lg overflow-hidden border-1 border-red-200 shadow-lg shadow-gray-500 ">
            <div className=" w-full h-auto overflow-hidden rounded-4 active:opacity-75">
                <a href={`/stores/${store.seo_url}`} ><Image
                    className="rounded-lg h-full w-full object-cover hover-animation"
                    src={store.image}
                    alt={`photo of ${store.name}`}
                    width={500}
                    height={500}
                /></a>
            </div>
            <div >
                <h2 className="hover-animation text-amber-700 text-3xl font-bold mt-2 text-center active:opacity-75">{store.name}</h2>
                <p className="text-center">{store.bio}</p>
                <span className="border-1 absolute font-bold border-red-400/50 bg-white/90 p-1 rounded-lg md:left-12 left-2 top-2">❤️  {formatFloat(store.avg_rating)}</span>
                <ReviewTableSellerPage reviews={reviews} />
            </div>
        </div>

    )
}