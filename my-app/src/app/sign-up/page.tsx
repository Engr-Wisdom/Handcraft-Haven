"use client"

import React, { useState, useRef } from 'react'
import Image from "next/image"

// Validation helper function
const validateForm = (data: any) => {
  const errors: any = {};

  // First name validation
  if (!data.firstName) {
    errors.firstName = "First name is required";
  } else if (data.firstName.length < 2) {
    errors.firstName = "First name must be at least 2 characters";
  }

  // Last name validation
  if (!data.lastName) {
    errors.lastName = "Last name is required";
  } else if (data.lastName.length < 2) {
    errors.lastName = "Last name must be at least 2 characters";
  }

  // Email validation
  if (!data.email) {
    errors.email = "Email is required";
  } else if (!data.email.includes("@")) {
    errors.email = "Please enter a valid email address";
  }

  // Role validation
  if (!data.role) {
    errors.role = "Please select a role";
  }

  // Password validation
  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  // Confirm password validation
  if (!data.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  
  // Validation state
  const [errors, setErrors] = useState<any>({})
  const [touched, setTouched] = useState<any>({})
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "customer",
    password: "",
    confirmPassword: "",
  })

  const togglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowPassword(showPassword => !showPassword)
  }

  const toggleConfirmPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowConfirmPassword(showConfirmPassword => !showConfirmPassword)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    const newData = {
      ...formData,
      [name]: value,
    }
    setFormData(newData)
    
    setTouched((prev: any) => ({
      ...prev,
      [name]: true,
    }))
    
    const validationErrors = validateForm(newData)
    setErrors(validationErrors)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target
    setTouched((prev: any) => ({
      ...prev,
      [name]: true,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

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
      setIsLoading(false);
      return;
    }

    const data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email.trim(),
      role: formData.role,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    }

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if(res.ok) {
      alert('User signed up successfully!');
      formRef.current?.reset();
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        role: "customer",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
      setTouched({});
    } else {
      alert(result.error);
    }
    setIsLoading(false);
  }

  const showError = (fieldName: string) => {
    return touched[fieldName] && errors[fieldName] ? (
      <p className="text-red-500 text-xs mt-1">{errors[fieldName]}</p>
    ) : null;
  };

  return (
    <div className='bg-gray-200 p-4 py-10'>
      <form ref={formRef} onSubmit={handleSubmit} className='bg-white rounded-lg w-2xl flex flex-col p-4 px-10 max-md:w-full max-sm:px-5
      text-black m-auto'>
        <h2 className='text-xl border-b-2 border-amber-700 py-2 text-center'>Sign up</h2>
        
        <label htmlFor="firstName" className='mt-5 text-sm'>FirstName*</label>
        <div className={`border-2 rounded p-2 border-gray-400 mt-2 max-sm:text-sm flex items-center gap-2 ${
          errors.firstName && touched.firstName ? 'border-red-500' : 'border-gray-400'
        }`}>
          <Image src="/images/person_icon.svg" alt="" width={20} height={20} />
          <input 
            type="text" 
            name='firstName' 
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            className='outline-none w-full' 
            placeholder='Enter your firstname' 
          />
        </div>
        {showError('firstName')}

        <label htmlFor="lastName" className='mt-5 text-sm'>LastName*</label>
        <div className={`border-2 rounded p-2 border-gray-400 mt-2 max-sm:text-sm flex items-center gap-2 ${
          errors.lastName && touched.lastName ? 'border-red-500' : 'border-gray-400'
        }`}>
          <Image src="/images/person_icon.svg" alt="" width={20} height={20} />
          <input 
            type="text" 
            name='lastName' 
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            className='outline-none w-full' 
            placeholder='Enter your lastname' 
          />
        </div>
        {showError('lastName')}

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

        <select 
          name="role" 
          value={formData.role}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`mt-5 p-2 outline-none border-2 rounded ${
            errors.role && touched.role ? 'border-red-500' : 'border-gray-400'
          }`} 
          required
        >
          <option value="customer">Customer</option>
          <option value="seller">Seller</option>
        </select>
        {showError('role')}

        <label htmlFor="password" className='mt-5 text-sm'>Password*</label>
        <div className={`border-2 rounded p-2 border-gray-400 mt-2 max-sm:text-sm flex items-center gap-2 ${
          errors.password && touched.password ? 'border-red-500' : 'border-gray-400'
        }`}>
          <input 
            type={showPassword ? "text" : "password"} 
            name='password' 
            id='password' 
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className='outline-none w-full' 
          />
          <button className='text-xs sm:text-sm cursor-pointer' onClick={(e) => togglePassword(e)}>
            {showPassword ? 
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="presentation" className='w-6'>
                <path fill="currentColor" 
                d="M8.948 8.722c-2.426.99-4.408 3.135-5.382 5.946-.134.387-.528.58-.879.433-.35-.148-.526-.582-.392-.969C3.852 
                9.64 7.675 6.62 12 6.62s8.148 3.02 9.705 7.513c.134.387-.041.82-.392.969-.351.147-.745-.046-.879-.433-.974-2.81-2.956-4.956-5.382-5.946A4.001 
                4.001 0 0 1 12 15.306a4.001 4.001 0 0 1-3.052-6.584z">              
                </path>
              </svg> : 
              <svg className="w-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="presentation">
                <path fill="currentColor" 
                d="M6.972 8.086c-2.095 1.312-3.77 3.43-4.677 6.046-.134.387.041.82.392.969.351.147.745-.046.879-.433.85-2.452 2.467-4.398 
                4.476-5.512l.374.374a4.001 4.001 0 0 0 5.36 5.36l5.126 5.127a.751.751 0 1 0 1.061-1.061L5.046 4.039a.751.751 0 1 0-1.06 
                1.06l2.986 2.987zM9.41 6.99a9.25 9.25 0 0 1 2.59-.37c4.325 0 8.148 3.02 9.705 7.513.134.387-.041.82-.392.969-.351.147-.745-.046-.879-.433-.974-2.81-2.956-4.956-5.382-5.946.591.697.948 1.6.948 
                2.584 0 .66-.16 1.282-.443 1.83L9.41 6.99z"></path>
              </svg>
            }
          </button>
        </div>
        {showError('password')}

        <label htmlFor="confirmPassword" className='mt-5 text-sm'>Confirm Password*</label>
        <div className={`border-2 rounded p-2 border-gray-400 mt-2 max-sm:text-sm flex items-center gap-2 ${
          errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-gray-400'
        }`}>
          <input 
            type={showConfirmPassword ? "text" : "password"} 
            name='confirmPassword' 
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className='outline-none w-full' 
          />
          <button className='text-xs sm:text-sm cursor-pointer' onClick={(e) => toggleConfirmPassword(e)}>
            {showConfirmPassword ? 
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="presentation" className='w-6'>
                <path fill="currentColor" 
                d="M8.948 8.722c-2.426.99-4.408 3.135-5.382 5.946-.134.387-.528.58-.879.433-.35-.148-.526-.582-.392-.969C3.852 
                9.64 7.675 6.62 12 6.62s8.148 3.02 9.705 7.513c.134.387-.041.82-.392.969-.351.147-.745-.046-.879-.433-.974-2.81-2.956-4.956-5.382-5.946A4.001 
                4.001 0 0 1 12 15.306a4.001 4.001 0 0 1-3.052-6.584z">              
                </path>
              </svg> : 
              <svg className="w-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="presentation">
                <path fill="currentColor" 
                d="M6.972 8.086c-2.095 1.312-3.77 3.43-4.677 6.046-.134.387.041.82.392.969.351.147.745-.046.879-.433.85-2.452 2.467-4.398 
                4.476-5.512l.374.374a4.001 4.001 0 0 0 5.36 5.36l5.126 5.127a.751.751 0 1 0 1.061-1.061L5.046 4.039a.751.751 0 1 0-1.06 
                1.06l2.986 2.987zM9.41 6.99a9.25 9.25 0 0 1 2.59-.37c4.325 0 8.148 3.02 9.705 7.513.134.387-.041.82-.392.969-.351.147-.745-.046-.879-.433-.974-2.81-2.956-4.956-5.382-5.946.591.697.948 1.6.948 
                2.584 0 .66-.16 1.282-.443 1.83L9.41 6.99z"></path>
              </svg>
            }
          </button>
        </div>
        {showError('confirmPassword')}

        <p className='text-xs sm:text-sm text-center mt-5'>
          If you already have an account click here to <a href="./login" className='text-amber-700 underline'>login</a>
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
              Creating account...
            </>
          ) : (
            'Sign Up'
          )}
        </button>
      </form>
    </div>
  )
}

export default SignUp