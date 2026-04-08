
import { getProduct, getProductByUrl } from "@/app/lib/data";
import NotFound from "./not-found";
import ProductView from "@/app/ui/products/product-view";
import { Product } from "@/app/lib/definitions";
export default async function Page(props: { params: Promise<{ url: string }> }) {
    ///this is the route to call the products
    //there is a column seo_url where you can found each route for the products
    //// route example for product id 1: /products/blue-ceramic-mug
    const params = await props.params;
    const url = params.url;
    let product: Product | undefined;
    product = await getProductByUrl(url);

    if (!product) {
        return <NotFound />;
    }
    return <>
        <ProductView product={product} />
    </>

}