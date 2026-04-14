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
  const [loading, setLoading] = useState(true)

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
        setLoading(false)
      }
    }

    fetchCart()
  }, [])

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  if (loading) return <p className="p-5">Loading cart...</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-5">Your Cart 🛒</h1>

      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border p-3 rounded-lg"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded"
                />

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

          <div className="mt-6 text-right text-xl font-bold">
            Total: ${total}
          </div>
        </>
      )}
    </div>
  )
}