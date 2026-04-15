
import { getStoreByUrl, getProductsByStore, getNumberPages, getLastWrittenReviewByStore } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Product, Review, Store } from "@/app/lib/definitions";
import { StorePageCard } from "@/app/ui/stores/store-card";
import ProductTable from "@/app/ui/products/products-table";
import Pagination from "@/app/ui/pagination";
import { Metadata } from "next";
type Props = {
    params: Promise<{ url: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = (await params).url
    const store = await getStoreByUrl(slug);
    if (!store) {
        return { title: "Store Not Found" }
    }

    return {
        title: store.name,
        description: `Explore unique products from ${store.name}.`,
    }
}




export default async function Page(props: {
    params: Promise<{ url: string }>, searchParams?: Promise<{
        page?: string;
    }>
}) {
    const params = await props.params;
    const searcParams = await props.searchParams;
    const url = params.url;
    let store: Store | undefined;
    let products: Array<Product> | undefined;
    let page = Number(searcParams?.page) || 1
    let totalPages = 0;
    let reviews: Array<Review> | undefined;
    try {
        store = await getStoreByUrl(url);
    } catch (error) {
        console.log(error);
    }
    if (!store) {
        notFound();
    } else {

        [products, totalPages, reviews] = await Promise.all([
            getProductsByStore(page, store),
            getNumberPages("store", store.id),
            getLastWrittenReviewByStore(store, 2)
        ]);
    }
    return <>
        <div>
            {page === 1 && <StorePageCard store={store} reviews={reviews} />}

            <ProductTable products={products} title={page === 1 ? "Latest Products" : `Latest Products | ${store.name}`} />
            <Pagination totalPages={totalPages} />




        </div>
    </>

}