// src/app/api/products/route.ts
import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT *
      FROM products
      ORDER BY id ASC;
    `);

    return Response.json(result.rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    return Response.json(
      { error: "Failed to fetch products" },
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
      seo_url,
    } = body;

    const query = `
      INSERT INTO products
      (name, description, price, image, category_id, is_popular, seo_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const values = [
      name,
      description,
      price,
      image,
      category_id,
      is_popular,
      seo_url,
    ];

    const result = await pool.query(query, values);

    return NextResponse.json(result.rows[0], { status: 201 });

  } catch (error) {
    console.error("DB ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}