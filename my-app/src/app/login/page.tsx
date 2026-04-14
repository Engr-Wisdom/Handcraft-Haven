"use client";

import React, { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const togglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword((showPassword) => !showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") as string).trim();
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      return;
    }

    window.location.href = "/seller/dashboard";
  } catch (error) {
    console.error("Login error:", error);
    setError("Network error. Please check your connection.");
  } finally {
    setIsLoading(false);
  }};

  return (
    <div className='bg-gray-200 py-10 p-4'>
      <form onSubmit={handleSubmit} className='bg-white rounded-lg w-2xl flex flex-col p-4 px-10 max-md:w-full max-sm:px-5 text-black m-auto'>
        <h2 className='text-xl border-b-2 border-amber-700 py-2 text-center'>Login</h2>

        {error && (
          <div className='mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm'>
            {error}
          </div>
        )}

        <label htmlFor="email" className='mt-5 text-sm'>Email*</label>
        <div className='border-2 rounded p-2 border-gray-400 mt-2 max-sm:text-sm flex items-center gap-2'>
          <Image src="/images/email_icon.svg" alt="" width={20} height={20} />
          <input
            type="email"
            name='email'
            className='outline-none w-full'
            placeholder='Enter your email'
            required
          />
        </div>

        <label htmlFor="password" className='mt-5 text-sm'>Password*</label>
        <div className='border-2 rounded p-2 border-gray-400 mt-2 max-sm:text-sm flex items-center gap-2'>
          <input
            type={showPassword ? "text" : "password"}
            name='password'
            id='password'
            className='outline-none w-full'
            placeholder='Enter your password'
            required
          />
          <button
            type="button"
            className='text-xs sm:text-sm cursor-pointer'
            onClick={togglePassword}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <p className='text-xs sm:text-sm text-center mt-5'>
          If you don't have an account click here to <a href="./sign-up" className='text-amber-700 underline'>Sign up</a>
        </p>

        <button
          type='submit'
          disabled={isLoading}
          className='bg-amber-700 text-white p-2 rounded mt-5 cursor-pointer flex gap-2 items-center justify-center w-fit text-sm px-5 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;