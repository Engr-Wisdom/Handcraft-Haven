import { Product } from "@/app/lib/definitions";
export default function StoreName({ product }: { product: Product }) {
    return (
        <p className="font-bold text-sm inline min-[440px]:block lg:inline mr-3"><span>Sold by </span><span className="text-blue-600"><a href={`/stores/${product.store_url}`}>{product.store}</a></span></p>
    );
}
export function StoreNameCard({ product }: { product: Product }) {
    return (
        <p className="font-bold text-sm inline min-[440px]:block lg:inline mr-3"><span className="text-blue-600 "><a href={`/stores/${product.store_url}`}>{product.store}</a></span></p>
    );
}