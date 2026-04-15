"use client";

import { useState } from "react";

const page = () => {
    const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category_id: "",
    store_id: "",
    is_popular: false,
    seo_url: "",
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev, [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!formData.price || !formData.category_id) {
    alert("Price and Category ID are required");
    return;
  }

  const product = {
    name: formData.name,
    description: formData.description,
    price: Number(formData.price),
    image: formData.image,
    category_id: Number(formData.category_id),
    store_id: Number(formData.store_id),
    is_popular: formData.is_popular,
    seo_url:
      formData.seo_url ||
      formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, ""),
  };

  setIsLoading(true)

  const res = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("FULL API ERROR:", {
      status: res.status,
      data,
    });
    return;
  }

  alert("Product added successfully!");

  setIsLoading(false)

  setFormData({
    name: "",
    description: "",
    price: "",
    image: "",
    category_id: "",
    store_id: "",
    is_popular: false,
    seo_url: "",
  });
};

  return (
    <div className='bg-gray-200 py-10 p-4'>
        <form onSubmit={handleSubmit} className='bg-white rounded-lg w-2xl flex flex-col p-4 px-10 max-md:w-full max-sm:px-5 text-black m-auto'>
            <h1 className="mt-5 text-lg text-amber-700 font-bold text-center">Add New Product</h1>

            <div className="mt-5">
                <label htmlFor="name">Product Name</label>
                <input name="name" value={formData.name} onChange={handleChange} 
                className='border-2 rounded p-2 border-gray-400 mt-2 max-sm:text-sm flex items-center gap-2 w-full outline-none' required />
            </div>

            <div className="mt-5">
                <label htmlFor="price">Product Price</label>
                <input name="price" type="number" value={formData.price} onChange={handleChange} required className='border-2 
                rounded p-2 border-gray-400 mt-2 max-sm:text-sm flex items-center gap-2 w-full outline-none' />
            </div>

            <div className="mt-5">
                <label htmlFor="image">Product Image</label>
                <input name="image" value={formData.image} onChange={handleChange} className='border-2 rounded p-2
                border-gray-400 mt-2 max-sm:text-sm flex items-center gap-2 w-full outline-none'/>
            </div>

            <div className="mt-5">
                <label htmlFor="category_id">Product Category</label>
                <input name="category_id" type="number" value={formData.category_id} onChange={handleChange} className='border-2 
                rounded p-2 border-gray-400 mt-2 max-sm:text-sm flex items-center gap-2 w-full outline-none' required />
            </div>

            <div className="mt-5">
                <label htmlFor="store_id">Store</label>
                <input name="store_id" type="number" value={formData.category_id} onChange={handleChange} className='border-2 
                rounded p-2 border-gray-400 mt-2 max-sm:text-sm flex items-center gap-2 w-full outline-none' required />
            </div>


            <div className="mt-5">
                <label htmlFor="seo_url">SEO URL (optional)</label>
                <input name="seo_url" value={formData.seo_url} onChange={handleChange} className='border-2 rounded 
                p-2 border-gray-400 mt-2 max-sm:text-sm flex items-center gap-2 w-full outline-none' />
            </div>

            <label className="flex items-center gap-2 mt-5">
                <input type="checkbox" name="is_popular" checked={formData.is_popular} onChange={handleChange} />
                Mark as Popular
            </label>

            <div className="mt-5">
                <label htmlFor="description">Product Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} className="border-gray-400
                border-2 rounded w-full h-30 outline-none resize-none p-2" />
            </div>

            <button type='submit' disabled={isLoading} className='bg-amber-700 text-white p-2 rounded mt-5 cursor-pointer 
            flex gap-2 items-center justify-center w-fit text-sm px-5 disabled:opacity-50 disabled:cursor-not-allowed'>
                {isLoading ? (
                <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding ...
                </>
                ) : (
                'Add Product'
                )}
            </button>
        </form>
    </div>
  );
}

export default page

