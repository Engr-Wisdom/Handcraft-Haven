import { pool } from "@/lib/db";

export const GET = async () => {
  try {
    const result = await pool.query(`
      SELECT * FROM categories
    `);

    return Response.json({
      success: true,
      categories: result.rows
    });

  } catch (error) {
    return Response.json(
      { success: false, error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
};