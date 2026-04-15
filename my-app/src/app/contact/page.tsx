"use client";

import React, { useState } from 'react'
import Image from "next/image"

// Validation helper function
const validateForm = (data: any) => {
  const errors: any = {};

  // Name validation
  if (!data.name) {
    errors.name = "Name is required";
  } else if (data.name.length < 2) {
    errors.name = "Name must be at least 2 characters";
  } else if (data.name.length > 50) {
    errors.name = "Name must be less than 50 characters";
  }

  // Email validation
  if (!data.email) {
    errors.email = "Email is required";
  } else if (!data.email.includes("@")) {
    errors.email = "Please enter a valid email address";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Message validation
  if (!data.message) {
    errors.message = "Message is required";
  } else if (data.message.length < 10) {
    errors.message = "Message must be at least 10 characters";
  } else if (data.message.length > 1000) {
    errors.message = "Message must be less than 1000 characters";
  }

  return errors;
};

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Validation state
  const [errors, setErrors] = useState<any>({});
  const [touched, setTouched] = useState<any>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    const newData = {
      ...formData,
      [name]: value,
    };
    setFormData(newData);
    
    // Mark field as touched
    setTouched((prev: any) => ({
      ...prev,
      [name]: true,
    }));
    
    // Validate in real-time
    const validationErrors = validateForm(newData);
    setErrors(validationErrors);
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
    setError("");
    setSuccess("");

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
      setError(firstError as string);
      return;
    }

    setIsLoading(true);

    try {
      // Replace this URL with your actual contact API endpoint
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Message sent successfully! We'll get back to you soon.");
        // Reset form
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        setErrors({});
        setTouched({});
      } else {
        setError(data.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to show error message
  const showError = (fieldName: string) => {
    return touched[fieldName] && errors[fieldName] ? (
      <p className="text-red-500 text-xs mt-1">{errors[fieldName]}</p>
    ) : null;
  };

  return (
    <div className='bg-gray-200 text-gray-900 p-4 sm:px-10 flex flex-col gap-10 items-center py-10'>
      <div className='text-center'>
        <h1 className='text-2xl sm:text-4xl pb-5'>Contact Page</h1>
        <p className='max-w-md text-sm sm:text-lg'>Read to grow your brand? Let's connect and build something exceptional together.</p>
      </div>

      <form onSubmit={handleSubmit} className='bg-white rounded-lg w-2xl flex flex-col p-4 px-10 max-md:w-full max-sm:px-5'>
        <h2 className='text-xl border-b-2 border-amber-700 py-2'>Contact Form</h2>
        
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
            {success}
          </div>
        )}

        <label htmlFor="name" className='mt-5 text-sm'>Name*</label>
        <div className={`border-2 rounded p-2 border-gray-400 mt-2 max-sm:text-sm flex items-center gap-2 ${
          errors.name && touched.name ? 'border-red-500' : 'border-gray-400'
        }`}>
          <Image src="/images/person_icon.svg" alt="" width={20} height={20} />
          <input 
            type="text" 
            name='name' 
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className='outline-none w-full' 
            placeholder='Enter your name' 
          />
        </div>
        {showError('name')}

        <label htmlFor="email" className='mt-5 text-sm'>Email*</label>
        <div className={`border-2 rounded p-2 border-gray-400 mt-2 max-sm:text-sm flex items-center gap-2 ${
          errors.email && touched.email ? 'border-red-500' : 'border-gray-400'
        }`}>
          <Image src="/images/email_icon.svg" alt="" width={20} height={20} />
          <input 
            type="email" 
            name='email' 
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className='outline-none w-full' 
            placeholder='Enter your email'
          />
        </div>
        {showError('email')}

        <label htmlFor="message" className='mt-5 text-sm'>Message*</label>
        <textarea 
          name='message' 
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`border-2 rounded p-2 outline-none border-gray-400 mt-2 h-40 max-sm:text-sm resize-none ${
            errors.message && touched.message ? 'border-red-500' : 'border-gray-400'
          }`}
          placeholder='Enter your message...'
        />
        {showError('message')}
        {formData.message && !errors.message && touched.message && (
          <p className="text-green-500 text-xs mt-1">✓ Message looks good</p>
        )}
        <p className="text-gray-400 text-xs mt-1">
          {formData.message.length}/1000 characters
        </p>

        <button 
          type='submit' 
          disabled={isLoading || Object.keys(errors).length > 0}
          className='bg-amber-700 text-white p-2 rounded mt-5 cursor-pointer flex gap-2 items-center justify-center w-fit text-sm px-5 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </div>
  )
}

export default Contact