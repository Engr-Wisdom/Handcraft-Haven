
import { getLastReviewsByProduct, getProductByUrl } from "@/app/lib/data";
import { notFound } from "next/navigation";
import ProductView from "@/app/ui/products/product-view";
import { Product, Review } from "@/app/lib/definitions";

import { Metadata } from "next";
type Props = {
    params: Promise<{ url: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = (await params).url
    const product = await getProductByUrl(slug)

    return {
        title: product.name,
        description: `${product.description.slice(0, 100)} sold by ${product.store}`
    }
}

export default async function Page(props: { params: Promise<{ url: string }> }) {
    ///this is the route to call the products
    //there is a column seo_url where you can found each route for the products
    //// route example for product id 1: /products/blue-ceramic-mug
    const params = await props.params;
    const url = params.url;
    let product: Product | undefined;
    let reviews: Array<Review> | undefined;
    product = await getProductByUrl(url);



    if (!product) {
        notFound();
    }
    reviews = await getLastReviewsByProduct(product)
    return <>
        <ProductView product={product} reviews={reviews} />
    </>

}