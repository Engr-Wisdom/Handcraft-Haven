import { Store } from "../lib/definitions"
import StoresView from "../ui/stores/stores-view"
import { getStores } from "../lib/data"
export default async function Page() {
    const page = 1;
    const stores = await getStores(page)

    return (
        <StoresView stores={stores} />
    )

}