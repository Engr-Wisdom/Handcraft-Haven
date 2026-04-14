import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, bio, image, seo_url } = body;

    const cookieStore = cookies();
    const owner_id = (await cookieStore).get("user_id")?.value;

    if (!owner_id) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { error: "Store name is required" },
        { status: 400 }
      );
    }

    const query = `
      INSERT INTO stores (name, bio, image, seo_url, owner_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [
      name,
      bio || "",
      image || "",
      seo_url ||
        name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
      owner_id,
    ];

    const result = await pool.query(query, values);

    return NextResponse.json(result.rows[0], { status: 201 });

  } catch (error: any) {
    console.error("STORE API ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create store" },
      { status: 500 }
    );
  }
}