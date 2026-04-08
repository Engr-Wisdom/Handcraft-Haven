import { Product } from "@/app/lib/definitions";
export default function Rating({ product }: { product: Product }) {
    let starsN = Math.round(product.rating);
    let stars = "";
    for (let i = 0; i < starsN; i++) {
        stars += "❤️"
    }
    if (starsN < 5) {
        let lefting = 5 - starsN;
        for (let i = 0; i < lefting; i++) {
            stars += "🩶"
        }
    }
    return <>
        <span>{stars}</span>
        <span className="ml-1 text-sm text-blue-600">({product.n_ratings})</span>
    </>

}