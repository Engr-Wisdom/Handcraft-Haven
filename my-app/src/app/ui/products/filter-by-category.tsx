'use client'
import { Category } from "@/app/lib/definitions"
import { capitalize } from "@/app/lib/utils"
import { useRouter } from "next/navigation"


export default function CategoryFilter({ categories, }: { categories: Array<Category> }) {
    const router = useRouter();

    function changeCategory(category: string) {
        router.push("/products/category/" + category);
    }
    return <>
        <select defaultValue="1" onChange={(e) => {
            changeCategory(e.target.value);
        }}>
            <option value="1" disabled>Filter by category</option>
            {categories.map(category => <option value={category.name} key={category.id}>{capitalize(category.name)}</option>)}
        </select>
    </>
}