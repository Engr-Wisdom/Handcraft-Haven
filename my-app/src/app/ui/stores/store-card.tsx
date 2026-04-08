import { Store } from "@/app/lib/definitions";
import Image from "next/image";

export default function StoreCard({ store }: { store: Store }) {
    return (
        
            <section>
                <h3>{store.name}</h3>
                <Image
                    src={store.image}
                    alt={`photo of ${store.name}`}
                    width={300}
                    height={300}
                />
                <p>{store.bio}</p>

            </section>
       
    )
}