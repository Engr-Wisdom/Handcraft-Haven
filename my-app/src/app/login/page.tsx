"use client";

import React, { useState } from "react";
import Image from "next/image";

// Validation helper functions
const validateForm = (data: any) => {
  const errors: any = {};

  // Email validation
  if (!data.email) {
    errors.email = "Email is required";
  } else if (!data.email.includes("@")) {
    errors.email = "Please enter a valid email address";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Password validation
  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Add validation state
  const [errors, setErrors] = useState<any>({});
  const [touched, setTouched] = useState<any>({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const togglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  // Real-time validation
  const handleValidation = (data: any) => {
    const validationErrors = validateForm(data);
    setErrors(validationErrors);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    handleValidation(newData);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev: any) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

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

    const email = formData.email.trim();
    const password = formData.password;

    setIsLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });

      const result = await res.json();

      if (res.ok) {
        if (result.user) {
          localStorage.setItem('user', JSON.stringify(result.user));
        }

        alert("Login Successful");

        // Redirect based on role or to home page
        if (result.user?.role === 'seller') {
          window.location.href = '/seller/dashboard';
        } else {
          window.location.href = '/user/dashboard';
        }
      } else {
        setError(result.error || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Network error. Please check your connection.");
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
    <div className="bg-gray-200 py-10 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg w-2xl flex flex-col p-4 px-10 max-md:w-full max-sm:px-5 text-black m-auto"
      >
        <h2 className="text-xl border-b-2 border-amber-700 py-2 text-center">
          Login
        </h2>

        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <label htmlFor="email" className="mt-5 text-sm">
          Email*
        </label>
        <div className={`border-2 rounded p-2 mt-2 max-sm:text-sm flex items-center gap-2 ${
          errors.email && touched.email ? 'border-red-500' : 'border-gray-400'
        }`}>
          <Image src="/images/email_icon.svg" alt="" width={20} height={20} />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="outline-none w-full"
            placeholder="Enter your email"
            required
          />
        </div>
        {showError('email')}

        <label htmlFor="password" className="mt-5 text-sm">
          Password*
        </label>
        <div className={`border-2 rounded p-2 mt-2 max-sm:text-sm flex items-center gap-2 ${
          errors.password && touched.password ? 'border-red-500' : 'border-gray-400'
        }`}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="outline-none w-full"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            className="text-xs sm:text-sm cursor-pointer"
            onClick={togglePassword}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {showError('password')}

        <p className="text-xs sm:text-sm text-center mt-5">
          If you don't have an account click here to{" "}
          <a href="./sign-up" className="text-amber-700 underline">
            Sign up
          </a>
        </p>

        <button
          type="submit"
          disabled={isLoading || Object.keys(errors).length > 0}
          className="bg-amber-700 text-white p-2 rounded mt-5 cursor-pointer flex gap-2 items-center justify-center w-fit text-sm px-5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;