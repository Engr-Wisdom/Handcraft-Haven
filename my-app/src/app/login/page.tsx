"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation' // For Next.js App Router

const Login = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const togglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowPassword(showPassword => !showPassword)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('') // Clear previous errors

    const formData = new FormData(e.currentTarget)
    const email = (formData.get("email") as string).trim()
    const password = formData.get("password") as string

    // Client-side validation
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })

      const result = await res.json()

      if (res.ok) {
        // Store user info if needed
        if (result.user) {
          localStorage.setItem('user', JSON.stringify(result.user))
        }

        alert("Login Successful") // Replace with toast later

        // Redirect based on role or to home page
        if (result.user?.role === 'seller') {
          window.location.href = '/seller/dashboard' //The page needs to reload in order to see the new dasboard/logout
        } else {
          window.location.href = '/user/dashboard'
        }
      } else {
        setError(result.error || "Login failed. Please check your credentials.")
      }
    } catch (error) {
      console.error('Login error:', error)
      setError("Network error. Please check your connection.")
    } finally {
      setIsLoading(false)
    }
  }

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
            type="button" // Important: prevents form submission
            className='text-xs sm:text-sm cursor-pointer'
            onClick={togglePassword}
          >
            {showPassword ?
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className='w-6'>
                <path fill="currentColor"
                  d="M8.948 8.722c-2.426.99-4.408 3.135-5.382 5.946-.134.387-.528.58-.879.433-.35-.148-.526-.582-.392-.969C3.852 
                9.64 7.675 6.62 12 6.62s8.148 3.02 9.705 7.513c.134.387-.041.82-.392.969-.351.147-.745-.046-.879-.433-.974-2.81-2.956-4.956-5.382-5.946A4.001 
                4.001 0 0 1 12 15.306a4.001 4.001 0 0 1-3.052-6.584z">
                </path>
              </svg> :
              <svg className="w-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor"
                  d="M6.972 8.086c-2.095 1.312-3.77 3.43-4.677 6.046-.134.387.041.82.392.969.351.147.745-.046.879-.433.85-2.452 2.467-4.398 
                4.476-5.512l.374.374a4.001 4.001 0 0 0 5.36 5.36l5.126 5.127a.751.751 0 1 0 1.061-1.061L5.046 4.039a.751.751 0 1 0-1.06 
                1.06l2.986 2.987zM9.41 6.99a9.25 9.25 0 0 1 2.59-.37c4.325 0 8.148 3.02 9.705 7.513.134.387-.041.82-.392.969-.351.147-.745-.046-.879-.433-.974-2.81-2.956-4.956-5.382-5.946.591.697.948 1.6.948 
                2.584 0 .66-.16 1.282-.443 1.83L9.41 6.99z"></path>
              </svg>
            }
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
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </>
          ) : (
            'Login'
          )}
        </button>
      </form>
    </div>
  )
}

export default Login