import { Store } from "@/app/lib/definitions"
import StoreCard from "./store-card"
export default function StoresView({ stores }: { stores: Array<Store> }) {

    return (
            <div id="stores" className="mx-5">
                {
                    stores.map((store: Store, index: number) => (
                        <StoreCard store={store} key={store.id} />
                    ))
                }
            </div>
    );

}