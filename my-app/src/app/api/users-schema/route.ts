import { sql } from "@/lib/db";

export async function GET() {
  try {
    const result = await sql`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'users';
    `;

    return Response.json(result.rows);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}