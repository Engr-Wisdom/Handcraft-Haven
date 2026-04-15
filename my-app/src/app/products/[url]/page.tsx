
import { getLastReviewsByProduct, getProductByUrl, getUserByID, isProductReviewedByUser } from "@/app/lib/data";
import { notFound } from "next/navigation";
import ProductView from "@/app/ui/products/product-view";
import { Product, Review, User } from "@/app/lib/definitions";

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
    let user: User | undefined;
    let reviews: Array<Review> | undefined;
    let user_id = 3;
    let isReviewed: boolean;
    let name = "";
    if (user_id != 0) {
        [product, user] = await Promise.all([
            getProductByUrl(url),
            getUserByID(user_id),
        ]);
        name = `${user.first_name} ${user.last_name}`;
    } else {
        [product] = await Promise.all([
            getProductByUrl(url),


    ]);

    const name = `${user.first_name} ${user.last_name}`;



    if (!product) {
        notFound();
    }
    isReviewed = await isProductReviewedByUser(user_id, Number(product.id));
    console.log("Reviewed: " + isReviewed)
    const url_product = '/products/' + url;
    reviews = await getLastReviewsByProduct(product)
    return <>
        <ProductView product={product} reviews={reviews} name={name} url={url_product} isReviewed={isReviewed} />
    </>

}