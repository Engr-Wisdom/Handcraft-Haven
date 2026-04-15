"use client"

import React, { useState } from 'react'
import Logo from '@/app/ui/logo'
import Search from "@/app/ui/search"
import NavLink from '@/app/ui/nav-link'
import Carts from '@/app/ui/carts'
import Account from '@/app/ui/account'

const Navbar = () => {
  const [sideBar, setSideBar] = useState(false)

  return (
    <div className='bg-amber-800 p-4 sm:px-10 flex items-center justify-between z-1 sticky top-0 left-0'>
      <div className='flex gap-5'>
        <Logo setSideBar={setSideBar} />
        <Search />
        <NavLink sideBar={sideBar} setSideBar={setSideBar} />
      </div>

      <div className='flex gap-5 items-center'>
        <Carts />
        <Account />
      </div>
    </div>
  )
}

export default Navbar