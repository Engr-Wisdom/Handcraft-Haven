"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type User = {
    role: 'seller' | 'user'
}

const Account = () => {
    const [account, setAccount] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter()

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }

        const handleClick = () => setAccount(false)
        document.body.addEventListener("click", handleClick)

        return () => {
            document.body.removeEventListener("click", handleClick)
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('user')
        setUser(null)
        router.push('/')
    }

    const goToDashboard = () => {
        if (user?.role === 'seller')
            router.push('/seller/dashboard')
        else {
            router.push('/user/dashboard')
        }
    }

    return (
        <div className='relative'>     
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24" 
                strokeWidth="1.5" stroke="currentColor" 
                aria-hidden="true" data-slot="icon" 
                className="h-6 w-6 cursor-pointer text-text sm:hidden"
                onClick={() => setAccount(a => !a)}>
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z">
                    </path>
            </svg>

            <div className={`flex items-center gap-5 justify-end max-sm:bg-white max-sm:flex-col max-sm:fixed right-0 top-12 
            max-sm:rounded max-sm:gap-0 max-sm:p-1 ${account ? "opacity-100 scale-100" : "max-sm:opacity-0 max-sm:scale-95"} transition-all duration-300`}>

        {/*Use Ternary to toggle auth buttons*/}
            {user ? (
            <>
                <button className='text-white text-sm hover:underline max-sm:text-black max-sm:p-2 cursor-pointer
                max-sm:active:bg-gray-300 max-sm:rounded-sm max-sm:w-full max-sm:px-6' onClick={() => {
                    goToDashboard()
                    setAccount(false);
                }}>Dashboard</button>

                <button className='text-white text-sm hover:underline max-sm:text-black max-sm:p-2 cursor-pointer
                max-sm:active:bg-gray-300 max-sm:rounded-sm max-sm:w-full max-sm:px-6' onClick={() => {
                    handleLogout()
                    setAccount(false);
                }}>Logout</button>
            </>
               
            ) : (
            <>
            
                <button className='text-white text-sm hover:underline max-sm:text-black max-sm:p-2 cursor-pointer
                max-sm:active:bg-gray-300 max-sm:rounded-sm max-sm:w-full max-sm:px-6' onClick={() => {
                    router.push("/sign-up")
                    setAccount(false);
                }}>Sign up</button>

                <button className='bg-white text-black px-4 py-1 rounded-full text-sm font-semibold cursor-pointer
                max-sm:active:bg-gray-300 transition max-sm:p-2 max-sm:rounded-sm max-sm:w-full max-sm:px-6' onClick={() => {
                    router.push("/login")
                    setAccount(false);
                }}>Login</button>
            </>
            )}
            </div>
        </div>
    )
}

export default Account