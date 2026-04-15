import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { cookies } from "next/headers";

// Helper function to validate URL
function isValidUrl(url: string) {
  if (!url) return true; // Optional field
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Helper function to generate unique slug
async function generateUniqueSlug(baseSlug: string, ownerId: number): Promise<string> {
  let slug = baseSlug;
  let counter = 1;
  
  let existingStore = await pool.query(
    `SELECT id FROM stores WHERE seo_url = $1 AND owner_id = $2`,
    [slug, ownerId]
  );
  
  while (existingStore.rows.length > 0) {
    slug = `${baseSlug}-${counter}`;
    existingStore = await pool.query(
      `SELECT id FROM stores WHERE seo_url = $1 AND owner_id = $2`,
      [slug, ownerId]
    );
    counter++;
  }
  
  return slug;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, bio, image } = body;

    // 1. Authentication check
    const cookieStore = await cookies();
    const owner_id = cookieStore.get("user_id")?.value;

    if (!owner_id) {
      return NextResponse.json(
        { success: false, message: "Not authenticated. Please login." },
        { status: 401 }
      );
    }

    // 2. Validate user exists
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

    // 3. Check if user already has a store (NEW)
    const existingStoreCheck = await pool.query(
      `SELECT id, name FROM stores WHERE owner_id = $1`,
      [Number(owner_id)]
    );

    if (existingStoreCheck.rows.length > 0) {
      return NextResponse.json(
        { success: false, message: "You already have a store. Only one store per user is allowed." },
        { status: 400 }
      );
    }

    // 4. Validate store name (enhanced)
    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: "Store name is required" },
        { status: 400 }
      );
    }

    if (name.trim().length < 3) {
      return NextResponse.json(
        { success: false, message: "Store name must be at least 3 characters" },
        { status: 400 }
      );
    }

    if (name.trim().length > 50) {
      return NextResponse.json(
        { success: false, message: "Store name must be less than 50 characters" },
        { status: 400 }
      );
    }

    // 5. Validate bio (optional with length limit)
    if (bio && bio.length > 500) {
      return NextResponse.json(
        { success: false, message: "Store bio must be less than 500 characters" },
        { status: 400 }
      );
    }

    // 6. Validate image URL (if provided)
    if (image && !isValidUrl(image)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid image URL" },
        { status: 400 }
      );
    }

    // 7. Check if store name already exists (case-insensitive check)
    const nameExists = await pool.query(
      `SELECT id FROM stores WHERE LOWER(name) = LOWER($1)`,
      [name.trim()]
    );

    if (nameExists.rows.length > 0) {
      return NextResponse.json(
        { success: false, message: "A store with this name already exists. Please choose another name." },
        { status: 409 }
      );
    }

    // 8. Generate SEO URL
    let baseSlug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Ensure slug isn't empty
    if (!baseSlug) {
      baseSlug = `store-${Date.now()}`;
    }

    // 9. Generate unique slug
    const seo_url = await generateUniqueSlug(baseSlug, Number(owner_id));

    // 10. Insert the store
    const query = `
      INSERT INTO stores (name, bio, image, seo_url, owner_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [
      name.trim(),
      bio ? bio.trim() : "",
      image || "",
      seo_url,
      Number(owner_id),
    ];

    const result = await pool.query(query, values);

    return NextResponse.json(
      { 
        success: true, 
        message: "Store created successfully!",
        store: result.rows[0] 
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("STORE API ERROR:", error);
    
    // Handle PostgreSQL specific errors
    if (error.code === '23505') { // Unique violation
      return NextResponse.json(
        { success: false, message: "A store with this name or URL already exists" },
        { status: 409 }
      );
    }
    
    if (error.code === '23503') { // Foreign key violation
      return NextResponse.json(
        { success: false, message: "Invalid user reference" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to create store" },
      { status: 500 }
    );
  }
}