"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

type CartItem = {
  id: number
  product_id: number
  name: string
  price: number
  image: string
  quantity: number
}

export default function Carts() {
  const [items, setItems] = useState<CartItem[]>([])
  const [isFetchingCart, setIsFetchingCart] = useState(true)
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("/api/cart")

        if (!res.ok) {
          console.error("API failed:", res.status)
          return
        }

        const data = await res.json()

        if (data.success) {
          setItems(data.items)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsFetchingCart(false)
      }
    }

    fetchCart()
  }, [])

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  if (isFetchingCart) return <p className="p-5">Loading cart...</p>

  return (
    <div className="p-6 bg-gray-200">
      <h1 className="text-2xl font-bold mb-5">Your Carts ({items.length ? items.length : 0})</h1>

      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-[1fr_400px] gap-10">
          <div className="space-y-4 bg-white p-4 rounded">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 border-b-2 border-amber-700 p-3 w-full">
                <Image src={item.image} alt={item.name} width={80} height={80} className="rounded"/>

                <div className="flex-1">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p>${item.price}</p>
                  <p>Qty: {item.quantity}</p>
                </div>

                <p className="font-bold">
                  ${item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white h-fit p-4 rounded font-semibold">
            <h2>CART SUMMARY</h2>
            <div className="border-b-2 border-t-2 flex justify-between py-3 my-5">
              <p>Subtotal</p>
              <p>${total}</p>
            </div>
            <button disabled={isCheckingOut} className="bg-amber-700 text-white p-2 w-full rounded cursor-pointer 
            hover:bg-amber-700/70" onClick={() => setIsCheckingOut(true)}>
              {isCheckingOut ? (
                <div className="flex items-center gap-2 justify-center">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Checkingout ....
                </div>
              ) : (
                `Checkout ($${total})`
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Cart Page