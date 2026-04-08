import { getProductsByCategory, getNumberPages } from "@/app/lib/data";
import ProductTable from "@/app/ui/products/products-table";
import Pagination from "@/app/ui/products/pagination";
import { capitalize } from "@/app/lib/utils";
export default async function Page(props: {
    params: Promise<{ category: string }>, searchParams?: Promise<{
        page?: string;
    }>
}) {
    const params = await props.params;
    const category = params.category;
    const searchParams = await props.searchParams;
    const totalPages = await getNumberPages("category", category);
    const page = Number(searchParams?.page) || 1;;
    const products = await getProductsByCategory(category, page);


    return (
        <>
            <ProductTable products={products} title={capitalize(category)} />
            <Pagination totalPages={totalPages} />
        </>
    )
}