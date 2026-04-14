// import { NextResponse } from "next/server"
// import { pool } from "@/lib/db"
// import { getServerSession } from "next-auth"

// export async function POST(req: Request) {
//   try {
//     const session = await getServerSession();

//     // 🚨 BACKEND CHECK (IMPORTANT)
//     if (!session?.user) {
//       return NextResponse.json(
//         { success: false, message: "Please login first" },
//         { status: 401 }
//       );
//     }
//     const { product_id } = await req.json()

//     if (!product_id) {
//       return NextResponse.json(
//         { success: false, message: "Missing product_id" },
//         { status: 400 }
//       )
//     }
    
//     const user_id = 1

//     // 1. Find cart
//     let cart = await pool.query(
//       `SELECT * FROM carts WHERE user_id = $1`,
//       [user_id]
//     )

//     // 2. Create cart if not exists
//     if (cart.rows.length === 0) {
//       cart = await pool.query(
//         `INSERT INTO carts (user_id) VALUES ($1) RETURNING *`,
//         [user_id]
//       )
//     }

//     const cartId = cart.rows[0].id

//     // 3. Add product
//     await pool.query(
//       `INSERT INTO cart_items (cart_id, product_id, quantity)
//        VALUES ($1, $2, 1)
//        ON CONFLICT (cart_id, product_id)
//        DO UPDATE SET quantity = cart_items.quantity + 1`,
//       [cartId, product_id]
//     )

//     return NextResponse.json({
//       success: true,
//       message: "Added to cart 🛒"
//     })

//   } catch (error) {
//     console.error(error)

//     return NextResponse.json(
//       { success: false, message: "Server error" },
//       { status: 500 }
//     )
//   }
// }

// export async function GET() {
//   try {
//     const user_id = 1

//     const cart = await pool.query(
//       `SELECT * FROM carts WHERE user_id = $1`,
//       [user_id]
//     )

//     if (cart.rows.length === 0) {
//       return NextResponse.json({ success: true, items: [] })
//     }

//     const cartId = cart.rows[0].id

//     const items = await pool.query(
//       `SELECT ci.id, ci.quantity, p.name, p.price, p.image
//        FROM cart_items ci
//        JOIN products p ON p.id = ci.product_id
//        WHERE ci.cart_id = $1`,
//       [cartId]
//     )

//     return NextResponse.json({
//       success: true,
//       items: items.rows
//     })

//   } catch (error) {
//     return NextResponse.json(
//       { success: false, items: [] },
//       { status: 500 }
//     )
//   }
// }




import { NextResponse } from "next/server"
import { pool } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth" // 👈 Import authOptions

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions) // 👈 Pass authOptions

    // 🚨 BACKEND CHECK (IMPORTANT)
    if (!session?.user?.id) { // 👈 Check for user.id
      return NextResponse.json(
        { success: false, message: "Please login first" },
        { status: 401 }
      )
    }
    
    const { product_id } = await req.json()

    if (!product_id) {
      return NextResponse.json(
        { success: false, message: "Missing product_id" },
        { status: 400 }
      )
    }
    
    const user_id = session.user.id // 👈 Get REAL user ID from session, not hardcoded

    // 1. Find cart
    let cart = await pool.query(
      `SELECT * FROM carts WHERE user_id = $1`,
      [user_id]
    )

    // 2. Create cart if not exists
    let cartId;
    if (cart.rows.length === 0) {
      const newCart = await pool.query(
        `INSERT INTO carts (user_id) VALUES ($1) RETURNING id`,
        [user_id]
      )
      cartId = newCart.rows[0].id
    } else {
      cartId = cart.rows[0].id
    }

    // 3. Add product
    await pool.query(
      `INSERT INTO cart_items (cart_id, product_id, quantity)
       VALUES ($1, $2, 1)
       ON CONFLICT (cart_id, product_id)
       DO UPDATE SET quantity = cart_items.quantity + 1`,
      [cartId, product_id]
    )

    return NextResponse.json({
      success: true,
      message: "Added to cart 🛒"
    })

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions) // 👈 Add this
    
    if (!session?.user?.id) {
      return NextResponse.json({ success: true, items: [] })
    }
    
    const user_id = session.user.id // 👈 Get from session

    const cart = await pool.query(
      `SELECT * FROM carts WHERE user_id = $1`,
      [user_id]
    )

    if (cart.rows.length === 0) {
      return NextResponse.json({ success: true, items: [] })
    }

    const cartId = cart.rows[0].id

    const items = await pool.query(
      `SELECT ci.id, ci.quantity, p.id, p.name, p.price, p.image
       FROM cart_items ci
       JOIN products p ON p.id = ci.product_id
       WHERE ci.cart_id = $1`,
      [cartId]
    )

    return NextResponse.json({
      success: true,
      items: items.rows
    })

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, items: [] },
      { status: 500 }
    )
  }
}