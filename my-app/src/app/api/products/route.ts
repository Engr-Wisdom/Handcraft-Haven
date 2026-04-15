import { pool } from "@/lib/db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT * FROM products ORDER BY id ASC;
    `);

    return NextResponse.json({
      success: true,
      products: result.rows,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      description,
      price,
      image,
      category_id,
      is_popular,
    } = body;

    if (!name || !price || !category_id) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
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

    const userId = Number(user_id);

    const storeResult = await pool.query(
      `SELECT id FROM stores WHERE owner_id = $1`,
      [userId]
    );

    if (storeResult.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "You must create a store first" },
        { status: 400 }
      );
    }

    const store_id = storeResult.rows[0].id;

    const seo_url = generateSlug(name);

    const result = await pool.query(
      `INSERT INTO products
      (name, description, price, image, category_id, store_id, is_popular, seo_url)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *`,
      [
        name,
        description,
        price,
        image,
        category_id,
        store_id,
        is_popular,
        seo_url,
      ]
    );

    return NextResponse.json(
      {
        success: true,
        product: result.rows[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("DB ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Failed to create product" },
      { status: 500 }
    );
  }
}