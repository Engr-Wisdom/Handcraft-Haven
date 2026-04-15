import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, bio, image } = body;

    const cookieStore = await cookies();
    const owner_id = cookieStore.get("user_id")?.value;

    if (!owner_id) {
      return NextResponse.json(
        { success: false, message: "Not authenticated. Please login." },
        { status: 401 }
      );
    }

    const userCheck = await pool.query(
      `SELECT id FROM users WHERE id = $1`,
      [owner_id]
    );

    if (userCheck.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid session. Please login again." },
        { status: 401 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Store name is required" },
        { status: 400 }
      );
    }

    const seo_url = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const query = `
      INSERT INTO stores (name, bio, image, seo_url, owner_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [
      name,
      bio || "",
      image || "",
      seo_url,
      Number(owner_id),
    ];

    const result = await pool.query(query, values);

    return NextResponse.json(
      { success: true, store: result.rows[0] },
      { status: 201 }
    );

  } catch (error) {
    console.error("STORE API ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Failed to create store" },
      { status: 500 }
    );
  }
}