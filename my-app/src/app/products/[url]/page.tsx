
import { getProduct, getIdProduct } from "@/app/lib/data";
import NotFound from "./not-found";
import ProductView from "@/app/ui/products/product-view";
import { Product } from "@/app/lib/definitions.ts";
export default async function page(props: { params: Promise<{ url: string }> }) {
    ///this is the route to call the products
    //there is a table seo_urls where you can found each route for the products related to product id from the products table
    //// route example for product id 1: /products/blue-ceramic-mug
    const params = await props.params;
    const url = params.url;
    console.log("URL: " + url);
    let id = 0;
    try {
        id = await getIdProduct(url);
    } catch (err) {
        console.log("Not found url " + url);
    }
    let product: Product | undefined;
    if (id !== 0) {
        product = await getProduct(id);
    }

    if (!product) {
        return <NotFound />;
    }

    return <>
        <ProductView product={product} />
    </>

}