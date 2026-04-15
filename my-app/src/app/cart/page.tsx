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
  const [isDeleting, setIsDeleting] = useState<number | null>(null)

  useEffect(() => {
    fetchCart()
  }, [])

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

  const handleDeleteItem = async (itemId: number, productName: string) => {
    setIsDeleting(itemId)
    
    try {
      const res = await fetch(`/api/cart?itemId=${itemId}`, {
        method: "DELETE",
      })

      const data = await res.json()

      if (data.success) {
        // Remove item from state
        setItems(items.filter(item => item.id !== itemId))
        // Show success message (optional)
        alert(`${productName} removed from cart`)
      } else {
        alert(data.message || "Failed to remove item")
      }
    } catch (error) {
      console.error("Delete error:", error)
      alert("Error removing item from cart")
    } finally {
      setIsDeleting(null)
    }
  }

  const handleUpdateQuantity = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return
    
    try {
      const res = await fetch(`/api/cart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId,
          quantity: newQuantity
        }),
      })

      const data = await res.json()

      if (data.success) {
        // Update item quantity in state
        setItems(items.map(item => 
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        ))
      }
    } catch (error) {
      console.error("Update error:", error)
    }
  }

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  if (isFetchingCart) return <p className="p-5">Loading cart...</p>

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <h1 className="text-2xl font-bold mb-5">Your Carts ({items.length})</h1>

      {items.length === 0 ? (
        <div className="bg-white p-8 rounded-lg text-center">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <a href="/products" className="bg-amber-700 text-white px-4 py-2 rounded inline-block">
            Continue Shopping
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
          <div className="space-y-4 bg-white p-4 rounded">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 border-b-2 border-amber-700 p-3 w-full">
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  width={80} 
                  height={80} 
                  className="rounded object-cover"
                />

                <div className="flex-1">
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p className="text-amber-700 font-bold">${item.price}</p>
                  
                  {/* Quantity selector */}
                  <div className="flex items-center gap-2 mt-2">
                    <label className="text-sm text-gray-600">Qty:</label>
                    <select 
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(item.id, Number(e.target.value))}
                      className="border rounded p-1 text-sm"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                  
                  {/* Delete button */}
                  <button
                    onClick={() => handleDeleteItem(item.id, item.name)}
                    disabled={isDeleting === item.id}
                    className="text-red-500 hover:text-red-700 mt-2 text-sm flex items-center gap-1 disabled:opacity-50"
                  >
                    {isDeleting === item.id ? (
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    )}
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white h-fit p-4 rounded font-semibold sticky top-4">
            <h2 className="text-xl border-b-2 border-amber-700 pb-2">CART SUMMARY</h2>
            <div className="flex justify-between py-3 my-3">
              <p>Subtotal</p>
              <p>${total.toFixed(2)}</p>
            </div>
            <div className="flex justify-between py-3 mb-3 text-sm text-gray-600">
              <p>Shipping</p>
              <p>Calculated at checkout</p>
            </div>
            <div className="border-t-2 border-b-2 flex justify-between py-3 my-3 font-bold">
              <p>Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
            <button 
              disabled={isCheckingOut} 
              className="bg-amber-700 text-white p-3 w-full rounded cursor-pointer 
              hover:bg-amber-800 transition disabled:opacity-50 disabled:cursor-not-allowed mt-4" 
              onClick={() => setIsCheckingOut(true)}
            >
              {isCheckingOut ? (
                <div className="flex items-center gap-2 justify-center">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                `Proceed to Checkout ($${total.toFixed(2)})`
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}