import { Product } from "@/app/lib/definitions";
import { numberToHearts } from "@/app/lib/utils";
export default function Rating({ product }: { product: Product }) {
    let starsN = Math.round(product.rating);
    const stars = numberToHearts(starsN);

    return <>
        <span>{stars}</span>
        <span className="ml-1 text-sm text-blue-600">({product.n_ratings})</span>
    </>

}