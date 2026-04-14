import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import {
  getUserById,
  getStoreByOwnerId,
  getProductsByStore,
} from "@/app/lib/data";
import StoreCard from "@/app/ui/stores/store-card";
import ProductCard from "@/app/ui/products/product-card";
import { formatFloat } from "@/app/lib/utils";

//Exporting and reusing get Stores and products
export default async function SellerDashboardPage() {
  //Get the current logged-in session
const session = await auth();

console.log("SESSION IN DASHBOARD:", session);

//If there is no session or no user id, redirect to login
if (!session?.user?.id) {
  redirect("/login");
}

//Get the full user information from the database
const user = await getUserById(Number(session.user.id));

//Protect this page so only sellers can access it
if (!user || user.role !== "seller") {
  redirect("/");
}

//Get the seller's store using owner_id
const featuredStore = await getStoreByOwnerId(user.id);

//Get only the products that belong to this seller's store
const products = featuredStore
  ? await getProductsByStore(1, featuredStore) // aligned with your data.ts
  : [];

const recentProducts = products.slice(0, 4);

  //quick buttons to add products, to manage stores, and to edit seller profile
  return (
    <div className="bg-gray-200 text-black p-4 sm:p-10 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-10">
        <section className="mb-8 border-b-2 border-amber-400 pb-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                Welcome, {user.first_name}
              </h1>
              <p className="mt-2 text-gray-600 max-w-2xl">
                Manage your store profile and product listings from one place.
                Here you can view your public store information, preview your
                handcrafted products, and quickly jump to the next actions.
              </p>
            </div>

            {/*3 buttons: Add a new product, if you dont have a store you can create one, and Edit profile*/}
            <div className="flex flex-wrap gap-3">
              {featuredStore && (
                <Link
                  //Redirect to products just for now
                  href="/products"
                  className="rounded-md bg-amber-700 px-4 py-2 font-semibold text-white transition hover:bg-amber-800"
                >
                  Add Product
                </Link>
              )}

              {!featuredStore && (
                <Link
                  href="/seller/store/new"
                  className="rounded-md border border-green-600 px-4 py-2 font-semibold text-green-700 transition hover:bg-green-50"
                >
                  + Create Store
                </Link>
              )}

              <Link
                //This route is a placeholder for now, waiting on seller profile
                href="/profile"
                className="rounded-md border border-gray-400 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </section>

        {/*3 cards to show general information about the market, total stores in the plattform, 
        total products in your store and the rating of the store*/}
        <section className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-amber-50 p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Stores</p>
            <h2 className="mt-2 text-3xl font-bold">{featuredStore ? 1 : 0}</h2>
            <p className="mt-2 text-sm text-gray-600">
              Sellers are limited to one store.
            </p>
          </div>

          <div className="rounded-lg border bg-amber-50 p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Products</p>
            <h2 className="mt-2 text-3xl font-bold">{products.length}</h2>
            <p className="mt-2 text-sm text-gray-600">
              Total product listings in your store.
            </p>
          </div>

          <div className="rounded-lg border bg-amber-50 p-5 shadow-sm">
            <p className="text-sm text-gray-500">Store Rating</p>
            <h2 className="mt-2 text-3xl font-bold">
              {featuredStore?.avg_rating
                ? formatFloat(featuredStore.avg_rating)
                : "N/A"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Average rating for your seller store.
            </p>
          </div>
        </section>

        {/*link to edit your store, the imagen: The name, the image, and the bio */}
        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Your Store</h2>
            {featuredStore && (
              <Link
                href={`/stores/${featuredStore.seo_url}`}
                className="font-semibold text-amber-700 hover:underline"
              >
                View Store
              </Link>
            )}
          </div>
          {/*Ternary operator to display something else when you dont have a store yet 
        or if you have actually a store*/}
          {featuredStore ? (
            <div className="max-w-md">
              <StoreCard store={featuredStore} />
            </div>
          ) : (
            <div className="rounded-lg border bg-gray-50 p-5">
              <p className="text-gray-600">
                No store has been created yet. Once a seller store is available,
                it will appear here.
              </p>
            </div>
          )}
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Your Products</h2>
            <Link
              href="/products"
              className="font-semibold text-amber-700 hover:underline"
            >
              View All Products
            </Link>
          </div>

          {/*Ternary operator to display something else when you dont have products yet 
          or if actually you have products*/}
          {recentProducts.length > 0 ? (
            <ul className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {recentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ul>
          ) : (
            <div className="rounded-lg border bg-gray-50 p-5">
              <p className="text-gray-600">No products available yet.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}