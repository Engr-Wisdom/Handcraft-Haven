import { getStoreByUser, getUserByID } from "@/app/lib/data";
import getSessionLocal, { validateLogin } from "@/app/lib/local-auth";
import { redirect } from "next/navigation";

export default async function Page() {


  const user = await validateLogin();
  const isSeller = user.role == "seller";
  if (!isSeller) {
    redirect("/");
  }
  const store = await getStoreByUser(user);



  return (
    <div className="bg-gray-200 text-black p-4 sm:p-10">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-10">
        <section className="mb-10 text-justify">
          <h1 className="text-3xl border-b-2 border-amber-400 pb-2">
            Welcome <span className="font-bold text-blue-400 min-[400px]:inline block">{user.first_name + " " + user.last_name}</span>
          </h1>
        </section>
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {store ? <a
            href="/seller/add-product"
            className="border rounded-lg p-5 shadow-sm hover:shadow-md transition bg-white"
          >
            <h2 className="text-xl font-semibold mb-2">Create Product</h2>
            <p className="text-sm text-gray-600">
              Create and publish a new product.
            </p>
          </a> : <div

            className="border rounded-lg p-5 shadow-sm hover:shadow-md transition bg-white"
          >
            <p className="text-sm text-gray-600">
              Create a store to add your products
            </p>
          </div>}

          {store ? <a href="/seller/edit-store"
            className="border rounded-lg p-5 shadow-sm hover:shadow-md transition bg-white"
          >
            <h2 className="text-xl font-semibold mb-2">Edit Store</h2>
            <p className="text-sm text-gray-600">
              Change <span className="font-bold text-blue-700">{store.name}</span> information.
            </p>
          </a> : <a
            href="/seller/add-store"
            className="border rounded-lg p-5 shadow-sm hover:shadow-md transition bg-white"
          >
            <h2 className="text-xl font-semibold mb-2">Create Store</h2>
            <p className="text-sm text-gray-600">
              Set up your store information.
            </p>
          </a>}
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
  )
}
