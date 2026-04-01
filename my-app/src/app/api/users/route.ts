import { sql } from "@/lib/db";

export async function GET() {
  try {
    const result = await sql`
      SELECT 
        id,
        first_name,
        last_name,
        email,
        gender,
        phone,
        created_at
      FROM users
      ORDER BY id ASC;
    `;

    return Response.json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    return Response.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}