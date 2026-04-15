import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { product_id } = body;

    const cookieStore = await cookies();
    const user_id = cookieStore.get("user_id")?.value;

    if (!user_id) {
      return NextResponse.json(
        { success: false, message: "Please login first" },
        { status: 401 }
      );
    }

    const userCheck = await pool.query(
      `SELECT id FROM users WHERE id = $1`,
      [user_id]
    );

    if (userCheck.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid session. Please login again." },
        { status: 401 }
      );
    }

    if (!product_id) {
      return NextResponse.json(
        { success: false, message: "Missing product_id" },
        { status: 400 }
      );
    }

    let cart = await pool.query(
      `SELECT * FROM carts WHERE user_id = $1`,
      [user_id]
    );

    if (cart.rows.length === 0) {
      cart = await pool.query(
        `INSERT INTO carts (user_id) VALUES ($1) RETURNING *`,
        [user_id]
      );
    }

    const cartId = cart.rows[0].id;

    await pool.query(
      `INSERT INTO cart_items (cart_id, product_id, quantity)
       VALUES ($1, $2, 1)
       ON CONFLICT (cart_id, product_id)
       DO UPDATE SET quantity = cart_items.quantity + 1`,
      [cartId, product_id]
    );

    return NextResponse.json(
      { success: true, message: "Added to cart 🛒" },
      { status: 201 }
    );

  } catch (error) {
    console.error("CART POST ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Failed to add to cart" },
      { status: 500 }
    );
  }
} 

export async function GET() {
  try {
    const cookieStore = await cookies();
    const user_id = cookieStore.get("user_id")?.value;

    if (!user_id) {
      return NextResponse.json(
        { success: false, message: "Not authenticated", items: [] },
        { status: 401 }
      );
    }

    const cart = await pool.query(
      `SELECT * FROM carts WHERE user_id = $1`,
      [user_id]
    );

    if (cart.rows.length === 0) {
      return NextResponse.json({ success: true, items: [] });
    }

    const cartId = cart.rows[0].id;

    const items = await pool.query(
      `SELECT 
        ci.id,
        ci.quantity,
        ci.product_id,
        p.name,
        p.price,
        p.image
       FROM cart_items ci
       JOIN products p ON p.id = ci.product_id
       WHERE ci.cart_id = $1`,
      [cartId]
    );

    return NextResponse.json({
      success: true,
      items: items.rows
    });

  } catch (error) {
    console.error("CART GET ERROR:", error);

    return NextResponse.json(
      { success: false, items: [] },
      { status: 500 }
    );
  }
}

// ✅ DELETE - Remove item from cart
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const itemId = searchParams.get("itemId");

    if (!itemId) {
      return NextResponse.json(
        { success: false, message: "Item ID is required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const user_id = cookieStore.get("user_id")?.value;

    if (!user_id) {
      return NextResponse.json(
        { success: false, message: "Please login first" },
        { status: 401 }
      );
    }

    // First verify the cart item belongs to this user
    const verifyQuery = await pool.query(
      `SELECT ci.id 
       FROM cart_items ci
       JOIN carts c ON c.id = ci.cart_id
       WHERE ci.id = $1 AND c.user_id = $2`,
      [itemId, user_id]
    );

    if (verifyQuery.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Item not found or unauthorized" },
        { status: 404 }
      );
    }

    // Delete the cart item
    await pool.query(
      `DELETE FROM cart_items WHERE id = $1`,
      [itemId]
    );

    return NextResponse.json({
      success: true,
      message: "Item removed from cart"
    });

  } catch (error) {
    console.error("CART DELETE ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to remove item" },
      { status: 500 }
    );
  }
}

// ✅ PUT - Update item quantity
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { itemId, quantity } = body;

    if (!itemId) {
      return NextResponse.json(
        { success: false, message: "Item ID is required" },
        { status: 400 }
      );
    }

    if (!quantity || quantity < 1) {
      return NextResponse.json(
        { success: false, message: "Quantity must be at least 1" },
        { status: 400 }
      );
    }

    if (quantity > 99) {
      return NextResponse.json(
        { success: false, message: "Quantity cannot exceed 99" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const user_id = cookieStore.get("user_id")?.value;

    if (!user_id) {
      return NextResponse.json(
        { success: false, message: "Please login first" },
        { status: 401 }
      );
    }

    // Verify the cart item belongs to this user
    const verifyQuery = await pool.query(
      `SELECT ci.id 
       FROM cart_items ci
       JOIN carts c ON c.id = ci.cart_id
       WHERE ci.id = $1 AND c.user_id = $2`,
      [itemId, user_id]
    );

    if (verifyQuery.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Item not found or unauthorized" },
        { status: 404 }
      );
    }

    // Update quantity
    await pool.query(
      `UPDATE cart_items SET quantity = $1 WHERE id = $2`,
      [quantity, itemId]
    );

    return NextResponse.json({
      success: true,
      message: "Quantity updated"
    });

  } catch (error) {
    console.error("CART PUT ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update quantity" },
      { status: 500 }
    );
  }
}