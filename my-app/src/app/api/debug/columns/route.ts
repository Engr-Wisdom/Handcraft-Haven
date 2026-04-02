import { sql } from "@/lib/db";

export async function GET() {
  try {
    const columns = await sql`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'products';
    `;

    return Response.json(columns.rows);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch columns" }, { status: 500 });
  }
}