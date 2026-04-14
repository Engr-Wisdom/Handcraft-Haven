"use client";

import { redirect } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    image: "",
    seo_url: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true)

    if (!formData.name) {
      alert("Store name is required");
      return;
    }

    const store = {
      name: formData.name,
      bio: formData.bio,
      image: formData.image,
      seo_url:
        formData.seo_url ||
        formData.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, ""),
    };

    setIsLoading(true);

    const res = await fetch("/api/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(store),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("STORE ERROR:", data);
      setIsLoading(false);
      return;
    }

    alert("Store created successfully!");

    setFormData({
      name: "",
      bio: "",
      image: "",
      seo_url: "",
    });

    setIsLoading(false);
  };

  return (
    <div className='bg-gray-200 py-10 p-4'>
      <form onSubmit={handleSubmit} className='bg-white rounded-lg w-2xl flex flex-col p-4 px-10 max-md:w-full max-sm:px-5 text-black m-auto'>
        <h1 className="mt-5 text-lg text-amber-700 font-bold text-center">Add New Store</h1>

        <div>
          <label>Store Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className='border-2 rounded p-2
         border-gray-400 mt-2 max-sm:text-sm flex items-center gap-2 w-full outline-none' required />
        </div>

        <div>
          <label>Store Image</label>
          <input type="text" name="image" value={formData.image} onChange={handleChange} 
          className='border-2 rounded p-2 border-gray-400 mt-2 max-sm:text-sm flex items-center gap-2 w-full outline-none'/>
        </div>

        <div>
          <label>SEO URL</label>
          <input type="text" name="seo_url" value={formData.seo_url} onChange={handleChange} className='border-2 rounded 
          p-2 border-gray-400 mt-2 max-sm:text-sm flex items-center gap-2 w-full outline-none'/>
        </div>

        <div>
          <label>Store Bio</label>
          <textarea name="bio" value={formData.bio} onChange={handleChange} className='border-2 rounded p-2 
          border-gray-400 mt-2 max-sm:text-sm flex items-center gap-2 w-full outline-none h-30' />
        </div>

        <button type='submit' disabled={isLoading} className='bg-amber-700 text-white p-2 rounded mt-5 cursor-pointer 
        flex gap-2 items-center justify-center w-fit text-sm px-5 disabled:opacity-50 disabled:cursor-not-allowed'>
            {isLoading ? (
            <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                creating ...
            </>
            ) : (
            'Create Store'
            )}
        </button>
      </form>
    </div>
  );
};

export default Page;