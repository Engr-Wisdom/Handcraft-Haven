import { sql } from "@/lib/db";

export async function GET() {
  try {
    // Products
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        price NUMERIC,
        is_popular BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        image VARCHAR(255),
        name VARCHAR(150),
        description TEXT,
        category VARCHAR(100)
      );
    `;

    await sql`
      CREATE UNIQUE INDEX IF NOT EXISTS products_name_unique_idx
      ON products (name);
    `;
//Users
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL,
        password TEXT NOT NULL,
        gender VARCHAR(20),
        phone VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE UNIQUE INDEX IF NOT EXISTS users_email_unique_idx
      ON users (email);
    `;

    return Response.json({ message: "Database ready (products + users)" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Init failed" }, { status: 500 });
  }
}