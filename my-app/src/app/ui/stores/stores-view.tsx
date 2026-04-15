import { Store } from "@/app/lib/definitions"
import StoreCard from "./store-card"
import { getStores } from "@/app/lib/data";
export default function StoresView({ stores }: { stores: Array<Store> }) {

    return (
        <div id="stores" className="mx-3 lg:mx-5 gap-3 grid grid-cols-1 my-4 min-[440px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

            {
                stores.map((store: Store, index: number) => (
                    <StoreCard store={store} key={store.id} />
                ))
            }
        </div>
    );

}
export async function StoresViewHome() {

    const stores = await getStores(1);
    return (
        
        <>
         <h2 className="bg-amber-700 w-fit px-4 p-2 rounded-full text-xs sm:text-sm text-white font-semibold mb-5">Know Our Artisans</h2>
        <div id="stores" className="mx-3 lg:mx-5 gap-3 grid grid-cols-1 my-4 min-[440px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

            {
                stores.map((store: Store, index: number) => (
                    <StoreCard store={store} key={store.id} />
                ))
            }
        </div>
        </>
    );

}