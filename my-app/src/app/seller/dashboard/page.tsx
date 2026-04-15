"use client";

import { useEffect, useState } from "react";

const Page = () => {
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsSeller(user.role === "seller");
    }
  }, []);

  return (
    <div className="bg-gray-200 text-black p-4 sm:p-10">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-10">
        <section className="mb-10 text-justify">
          <h1 className="text-3xl font-bold border-b-2 border-amber-400 pb-2">
            Welcome Seller
          </h1>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {isSeller && (
            <>
              <a
                href="/seller/add-product"
                className="border rounded-lg p-5 shadow-sm hover:shadow-md transition bg-white"
              >
                <h2 className="text-xl font-semibold mb-2">Add Product</h2>
                <p className="text-sm text-gray-600">
                  Create and publish a new product.
                </p>
              </a>

              <a
                href="/seller/add-store"
                className="border rounded-lg p-5 shadow-sm hover:shadow-md transition bg-white"
              >
                <h2 className="text-xl font-semibold mb-2">Add Store</h2>
                <p className="text-sm text-gray-600">
                  Set up your store information.
                </p>
              </a>
            </>
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
};

export default Page;
