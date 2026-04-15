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

  //Get the seller's store using owner_id (DECLARED ONCE)
  const featuredStore = await getStoreByOwnerId(Number(user.id));

  //Get only the products that belong to this seller's store (DECLARED ONCE)
  const products = featuredStore
    ? await getProductsByStore(1, featuredStore)
    : [];

  const recentProducts = products.slice(0, 4);

  //quick buttons to add products, to manage stores, and to edit seller profile
  return (
    <div className="bg-gray-200 text-black p-4 sm:p-10">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-10">
        <section className="mb-10 text-justify">
          <h1 className="text-3xl border-b-2 border-amber-400 pb-2">
            Welcome{" "}
            <span className="font-bold text-blue-400 min-[400px]:inline block">
              {user.first_name + " " + user.last_name}
            </span>
          </h1>
        </section>
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredStore ? (
            <a
              href="/seller/add-product"
              className="border rounded-lg p-5 shadow-sm hover:shadow-md transition bg-white"
            >
              <h2 className="text-xl font-semibold mb-2">Create Product</h2>
              <p className="text-sm text-gray-600">
                Create and publish a new product.
              </p>
            </a>
          ) : (
            <div className="border rounded-lg p-5 shadow-sm hover:shadow-md transition bg-white">
              <p className="text-sm text-gray-600">
                Create a store to add your products
              </p>
            </div>
          )}

          {featuredStore ? (
            <a
              href="/seller/edit-store"
              className="border rounded-lg p-5 shadow-sm hover:shadow-md transition bg-white"
            >
              <h2 className="text-xl font-semibold mb-2">Edit Store</h2>
              <p className="text-sm text-gray-600">
                Change{" "}
                <span className="font-bold text-blue-700">
                  {featuredStore.name}
                </span>{" "}
                information.
              </p>
            </a>
          ) : (
            <a
              href="/seller/add-store"
              className="border rounded-lg p-5 shadow-sm hover:shadow-md transition bg-white"
            >
              <h2 className="text-xl font-semibold mb-2">Create Store</h2>
              <p className="text-sm text-gray-600">
                Set up your store information.
              </p>
            </a>
          )}
          <a
            href="/profile/edit"
            className="border rounded-lg p-5 shadow-sm hover:shadow-md transition bg-white"
          >
            <h2 className="text-xl font-semibold mb-2">Edit Profile</h2>
            <p className="text-sm text-gray-600">
              Update your personal information.
            </p>
          </a>
        </section>
      </div>
    </div>
  );
}