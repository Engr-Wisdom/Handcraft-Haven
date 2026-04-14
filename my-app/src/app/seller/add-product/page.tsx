"use client";

import { useState } from "react";

const page = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category_id: "",
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
    is_popular: formData.is_popular,
    seo_url:
      formData.seo_url ||
      formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, ""),
  };

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

  setFormData({
    name: "",
    description: "",
    price: "",
    image: "",
    category_id: "",
    is_popular: false,
    seo_url: "",
  });
};

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">

      <input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />

      <textarea name="description"  placeholder="Description" value={formData.description} onChange={handleChange} />

      <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} required />

      <input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} />

      <input name="category_id" type="number" placeholder="Category ID" value={formData.category_id} onChange={handleChange}
        required />

      <input
        name="seo_url"
        placeholder="SEO URL (optional)"
        value={formData.seo_url}
        onChange={handleChange}
      />

      <label className="flex items-center gap-2">
        <input type="checkbox" name="is_popular" checked={formData.is_popular} onChange={handleChange} />
        Mark as Popular
      </label>

      <button className="bg-blue-500 text-white p-2 rounded">Add Product</button>
    </form>
  );
}

export default page