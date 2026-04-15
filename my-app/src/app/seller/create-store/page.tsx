"use client";

import { redirect } from "next/navigation";
import React, { useState } from "react";

// Validation helper functions
const validateForm = (data: any) => {
  const errors: any = {};

  // Store name validation
  if (!data.name.trim()) {
    errors.name = "Store name is required";
  } else if (data.name.length < 3) {
    errors.name = "Store name must be at least 3 characters";
  } else if (data.name.length > 50) {
    errors.name = "Store name must be less than 50 characters";
  }

  // Store bio validation (optional but with limits)
  if (data.bio && data.bio.length > 500) {
    errors.bio = "Bio must be less than 500 characters";
  }

  // Store image URL validation (optional)
  if (data.image && !isValidUrl(data.image)) {
    errors.image = "Please enter a valid image URL";
  }

  return errors;
};

// Helper to validate URLs
const isValidUrl = (url: string) => {
  if (!url) return true; // Optional field
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Add validation state
  const [errors, setErrors] = useState<any>({});
  const [touched, setTouched] = useState<any>({});

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    image: "",
  });

  // Real-time validation
  const handleValidation = (data: any) => {
    const validationErrors = validateForm(data);
    setErrors(validationErrors);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(newData);
    
    // Mark field as touched
    setTouched((prev: any) => ({
      ...prev,
      [e.target.name]: true,
    }));
    
    // Validate in real-time
    handleValidation(newData);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev: any) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc: any, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validate all fields
    const validationErrors = validateForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      const firstError = Object.values(validationErrors)[0];
      alert(firstError as string);
      return;
    }

    setIsLoading(true);

    if (!formData.name) {
      alert("Store name is required");
      setIsLoading(false);
      return;
    }

    const store = {
      name: formData.name,
      bio: formData.bio,
      image: formData.image
    };

    const res = await fetch("/api/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(store),
    });

    const data = await res.json();

    if (!res.ok) {
      setIsLoading(false);

      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }

      alert(data?.error || "Something went wrong");
      return;
    }

    alert("Store created successfully!");

    setFormData({
      name: "",
      bio: "",
      image: ""
    });
    
    // Reset validation
    setErrors({});
    setTouched({});

    setIsLoading(false);
  };

  return (
    <div className='bg-gray-200 py-10 p-4'>
      <form onSubmit={handleSubmit} className='bg-white rounded-lg w-2xl flex flex-col p-4 px-10 max-md:w-full max-sm:px-5 text-black m-auto'>
        <h1 className="mt-5 text-lg text-amber-700 font-bold text-center">Add New Store</h1>

        <div>
          <label>Store Name <span className="text-red-500">*</span></label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange}
            onBlur={handleBlur}
            className='border-2 rounded p-2 border-gray-400 mt-2 max-sm:text-sm flex items-center gap-2 w-full outline-none' 
            required 
          />
          {touched.name && errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div className="mt-5">
          <label>Store Image</label>
          <input 
            type="text" 
            name="image" 
            value={formData.image} 
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="https://example.com/store-image.jpg"
            className='border-2 rounded p-2 border-gray-400 mt-2 max-sm:text-sm flex items-center gap-2 w-full outline-none'
          />
          {touched.image && errors.image && (
            <p className="text-red-500 text-xs mt-1">{errors.image}</p>
          )}
          {formData.image && !errors.image && touched.image && (
            <p className="text-green-500 text-xs mt-1">✓ Valid image URL</p>
          )}
        </div>

        <div className="mt-5">
          <label>Store Bio</label>
          <textarea 
            name="bio" 
            value={formData.bio} 
            onChange={handleChange}
            onBlur={handleBlur}
            className='border-2 rounded p-2 border-gray-400 mt-2 max-sm:text-sm flex items-center gap-2 w-full outline-none h-30' 
            placeholder="Tell customers about your store..."
          />
          {touched.bio && errors.bio && (
            <p className="text-red-500 text-xs mt-1">{errors.bio}</p>
          )}
          {formData.bio && !errors.bio && touched.bio && (
            <p className="text-green-500 text-xs mt-1">✓ Bio looks good</p>
          )}
          <p className="text-gray-400 text-xs mt-1">
            {formData.bio.length}/500 characters
          </p>
        </div>

        <button 
          type='submit' 
          disabled={isLoading || Object.keys(errors).length > 0} 
          className='bg-amber-700 text-white p-2 rounded mt-5 cursor-pointer 
          flex gap-2 items-center justify-center w-fit text-sm px-5 disabled:opacity-50 disabled:cursor-not-allowed'
        >
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