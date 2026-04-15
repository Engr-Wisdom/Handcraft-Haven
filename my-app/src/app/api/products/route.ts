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
    const { name, description, price, image, category_id } = body;

    // 1. Basic validation
    if (!name || !price || !category_id) {
      return NextResponse.json(
        { success: false, message: "Name, price, and category are required" },
        { status: 400 },
      );
    }

    if (name.trim().length < 3) {
      return NextResponse.json(
        { success: false, message: "Product name must be at least 3 characters" },
        { status: 400 },
      );
    }

    if (!description || description.trim().length < 10) {
      return NextResponse.json(
        { success: false, message: "Product description must be at least 10 characters" },
        { status: 400 },
      );
    }

    const numericPrice = Number(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      return NextResponse.json(
        { success: false, message: "Price must be a positive number" },
        { status: 400 },
      );
    }

    const numericCategoryId = Number(category_id);
    if (isNaN(numericCategoryId) || numericCategoryId <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid category ID" },
        { status: 400 },
      );
    }

    // 2. Check if user is logged in
    const cookieStore = await cookies();
    const user_id = cookieStore.get("user_id")?.value;

    if (!user_id) {
      return NextResponse.json(
        { success: false, message: "Please login first" },
        { status: 401 },
      );
    }

    // 3. Check if user has a store
    const storeResult = await pool.query(
      `SELECT id FROM stores WHERE owner_id = $1`,
      [Number(user_id)],
    );

    if (storeResult.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "You must create a store first" },
        { status: 400 },
      );
    }

    const store_id = storeResult.rows[0].id;

    // 4. Verify category exists
    const categoryCheck = await pool.query(
      `SELECT id FROM categories WHERE id = $1`,
      [numericCategoryId],
    );

    if (categoryCheck.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Selected category does not exist" },
        { status: 400 },
      );
    }

    // 5. Generate unique SEO URL
    let seo_url = generateSlug(name);
    let counter = 1;
    let seoExists = await pool.query(
      `SELECT id FROM products WHERE seo_url = $1`,
      [seo_url],
    );

    while (seoExists.rows.length > 0) {
      seo_url = `${generateSlug(name)}-${counter}`;
      seoExists = await pool.query(
        `SELECT id FROM products WHERE seo_url = $1`,
        [seo_url],
      );
      counter++;
    }

    // 6. Insert product
    const result = await pool.query(
      `INSERT INTO products (name, description, price, image, category_id, store_id, seo_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        name.trim(),
        description.trim(),
        numericPrice,
        image || null,
        numericCategoryId,
        store_id,
        seo_url,
      ],
    );

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully",
        product: result.rows[0],
      },
      { status: 201 },
    );

  } catch (error: any) {
    console.error("DB ERROR:", error);

    if (error.code === "23503") {
      return NextResponse.json(
        { success: false, message: "Invalid category reference" },
        { status: 400 },
      );
    }

    if (error.code === "23505") {
      return NextResponse.json(
        { success: false, message: "Product with this name already exists" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to create product" },
      { status: 500 },
    );
  }
}