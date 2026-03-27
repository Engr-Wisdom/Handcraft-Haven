import React from 'react'
import Image from "next/image"

const Contact = () => {
  return (
    <div className='bg-white/90 text-gray-900 p-4 sm:px-10 flex flex-col gap-10 items-center'>
      <div className='text-center'>
        <h1 className='text-2xl'>Contact Page</h1>
        <p className='max-w-md text-sm sm:text-lg'>Read to grow your brand? Let's connect and build something exceptional together.</p>
      </div>

      <form action="" method='post' className='border-gray-500 border-2 rounded w-2xl flex flex-col p-4 px-10 max-md:w-full max-sm:px-5'>
        <label htmlFor="firstName" className='max-sm:text-sm'>First Name*</label>
        <div className='border-2 rounded p-2 border-gray-400 mt-2 max-sm:text-sm flex items-center gap-2'>
          <Image src="/images/person_icon.svg" alt="" width={20} height={20} />
          <input type="text" name='firstName' className='outline-none w-full' />
        </div>

        <label htmlFor="Last Name" className='mt-5 max-sm:text-sm'>Last Name*</label>
        <div className='border-2 rounded p-2 border-gray-400 mt-2 max-sm:text-sm flex items-center gap-2'>
          <Image src="/images/person_icon.svg" alt="" width={20} height={20} />
          <input type="text" name='Last Name' className='outline-none w-full' />
        </div>

        <label htmlFor="email" className='mt-5 max-sm:text-sm'>Email*</label>
        <div className='border-2 rounded p-2 border-gray-400 mt-2 max-sm:text-sm flex items-center gap-2'>
          <Image src="/images/email_icon.svg" alt="" width={20} height={20} />
          <input type="email" name='email' className='outline-none w-full' />
        </div>

        <label htmlFor="message" className='mt-5 max-sm:text-sm'>Message*</label>
        <textarea name='message' className='border-2 rounded p-2 outline-none border-gray-400 mt-2 h-40 max-sm:text-sm resize-none' />

        <button className='bg-amber-700 text-white p-2 rounded mt-5 cursor-pointer flex gap-2 items-center justify-center'>
          <span>Submit</span>
          <Image src="/images/arrow_icon.svg" alt="" width={20} height={20} />
        </button>
      </form>
    </div>
  )
}

export default Contact
