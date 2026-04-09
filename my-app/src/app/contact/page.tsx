import React from 'react'
import Image from "next/image"
import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Contact US',
  description: 'Have a question about our handmade products? Contact the Handcraft Haven team today. We would love to hear from you and help you find the perfect gift.'
}

const Contact = () => {

  return (
    <div className='bg-gray-200 text-gray-900 p-4 sm:px-10 flex flex-col gap-10 items-center py-10'>
      <div className='text-center'>
        <h1 className='text-2xl sm:text-4xl pb-5'>Contact Page</h1>
        <p className='max-w-md text-sm sm:text-lg'>Read to grow your brand? Let's connect and build something exceptional together.</p>
      </div>

      <form action="" method='post' className='bg-white rounded-lg w-2xl flex flex-col p-4 px-10 max-md:w-full max-sm:px-5'>
        <h2 className='text-xl border-b-2 border-amber-700 py-2'>Contact Form</h2>
        <label htmlFor="name" className='mt-5 text-sm'>Name*</label>
        <div className='border-2 rounded p-2 border-gray-400 mt-2 max-sm:text-sm flex items-center gap-2'>
          <Image src="/images/person_icon.svg" alt="" width={20} height={20} />
          <input type="text" name='name' className='outline-none w-full' placeholder='Enter your name' />
        </div>

        <label htmlFor="email" className='mt-5 text-sm'>Email*</label>
        <div className='border-2 rounded p-2 border-gray-400 mt-2 max-sm:text-sm flex items-center gap-2'>
          <Image src="/images/email_icon.svg" alt="" width={20} height={20} />
          <input type="email" name='email' className='outline-none w-full' />
        </div>

        <label htmlFor="message" className='mt-5 text-sm'>Message*</label>
        <textarea name='message' className='border-2 rounded p-2 outline-none border-gray-400 mt-2 h-40 max-sm:text-sm resize-none' />

        <button className='bg-amber-700/40 text-white p-2 rounded mt-5 cursor-pointer flex gap-2 items-center justify-center w-fit text-sm px-5'>
          Send Message
        </button>
      </form>
    </div>
  )
}

export default Contact
