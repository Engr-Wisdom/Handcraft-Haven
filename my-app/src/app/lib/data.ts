import { promises as fs } from 'fs';
import { products } from '@/data/cards';
import postgres from 'postgres';
import { Product } from './definitions.ts';
const sql = postgres(process.env.DATABASE_URL_DATABASE_URL!, { ssl: 'require' });



export async function getIdProduct(url: string) {
    try {
        const data = await sql`SELECT * FROM seo_urls WHERE url = ${url}`;
        return data[0].product_id;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error(`Failed to fetch URL ${url} PRODUCT`);
    }
}

export async function getProduct(id: number) {
    try {
        const data = await sql<Product[]>`SELECT p.*, c.name as category, s.name as store FROM products AS p
        JOIN categories as c
        ON p.category_id = c.id
        JOIN stores as s
        ON p.store_id = s.id
         WHERE p.id = ${id}
        `;

        const product = data[0];
        if (product !== undefined) {
            const rating = await sql`SELECT AVG(rating) AS rating, COUNT(rating) as n_ratings FROM ratings WHERE product_id = ${id}`;
            product.rating = rating[0].rating;
            product.n_ratings = rating[0].n_ratings;

        }


        return product;
    } catch (err) {
        console.error('Database Error:', err); 
        throw new Error(`Failed to fetch c. ${id} object`);
    }
}

export async function getDummyProduct(id: string) {
    let data = await getProducts();
    let choosen = await data.filter(p => p.id == id)[0];
    return choosen;

}


async function getProducts() {
    return products;
}