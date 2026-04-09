import { Store } from "../lib/definitions"
import StoresView from "../ui/stores/stores-view"
import { getStores } from "../lib/data"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Sellers',
    description: '"Discover all the artisan shops at Handcraft Haven. Browse our directory of talented creators and explore their unique handmade collections in one place.'
}

export default async function Page() {
    const page = 1;
    const stores = await getStores(page)
    return (
        <div className="grid">
            <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-5 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-serif text-walnut-900 mb-4">
                        Meet Our Artisans
                    </h1>
                    <p className="text-lg text-walnut-600 max-w-2xl mx-auto">
                        Each seller brings their unique craft and passion to Haven,
                        creating beautiful handmade goods for your home.
                    </p>
                </div>
            </section>
            <StoresView stores={stores} />
        </div>
    )

}