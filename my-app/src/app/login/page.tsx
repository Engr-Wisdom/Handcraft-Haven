import React from 'react'
import Image from 'next/image'

const Login = () => {
  return (
    <div className='bg-gray-200 py-10'>
      <form action="" method='post' className='bg-white rounded-lg w-2xl flex flex-col p-4 px-10 max-md:w-full max-sm:px-5
      text-black m-auto'>
        <h2 className='text-xl border-b-2 border-amber-700 py-2 text-center'>Login</h2>
        <label htmlFor="email" className='mt-5 text-sm'>Email*</label>
        <div className='border-2 rounded p-2 border-gray-400 mt-2 max-sm:text-sm flex items-center gap-2'>
          <Image src="/images/email_icon.svg" alt="" width={20} height={20} />
          <input type="email" name='email' className='outline-none w-full' placeholder='Enter your email' />
        </div>

        <label htmlFor="name" className='mt-5 text-sm'>Password*</label>
        <div className='border-2 rounded p-2 border-gray-400 mt-2 max-sm:text-sm flex items-center gap-2'>
          <input type="password" name='name' id='password' className='outline-none w-full' />
          <button className='text-sm cursor-pointer' >Show</button>
        </div>

        <p className='text-sm text-center mt-5'>
          If you don't have an account click here to <a href="./sign-up" className='text-amber-700 underline'>Sign up</a>
        </p>

        <button className='bg-amber-700/40 text-white p-2 rounded mt-5 cursor-pointer flex gap-2 items-center justify-center w-fit text-sm px-5'>
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
