import { Store } from "@/app/lib/definitions"
import StoreCard from "./store-card"
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