"use client"

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'

interface NavLinkProps {
  sideBar: boolean,
  setSideBar: (value: boolean) => void
}

const NavLink = ({ sideBar, setSideBar }: NavLinkProps) => {
  const navRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const handleClick = (event: MouseEvent) => {
        if (navRef.current && !navRef.current.contains(event.target as Node)) {
          setSideBar(false)
        }
      }

      document.body.addEventListener("click", handleClick)

      return () => {
        document.body.removeEventListener("click", handleClick)
      }
  }, [])

  const links = [
    { name: "Home", href: "/", },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },  
    { name: "Contact", href: "/contact" }
  ]

  return (
    <div className={`flex items-center gap-5 text-xs sm:text-sm max-lg:fixed top-0 left-0 max-lg:flex-col
    max-lg:h-full max-lg:bg-white max-lg:text-black max-lg:items-start transition-all duration-300 max-lg:gap-2
    ${!sideBar ? "w-0 max-lg:overflow-hidden" : "w-60 max-lg:pl-6 max-lg:pt-5"}`} ref={navRef}>
      <button className='font-bold text-red-700 text-xl lg:hidden' onClick={() => setSideBar(false)}>X</button>
      {links.map((link, index) => (
        <Link key={index} href={link.href} className='active:max-lg:bg-gray-300 max-lg:w-full max-lg:p-2 
        max-lg:rounded' onClick={() => setSideBar(false)}>
          {link.name}
        </Link>
      ))}
    </div>
  )
}

export default NavLink