
import { promises as fs } from 'fs';
import { products } from '@/data/cards';
import postgres from 'postgres';
import { Product, Store, Review, User, Category } from './definitions';
const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });
import { siteConfig } from '../constants/site';
import { off } from 'process';
import { formatFloat } from './utils';
import { cache } from 'react';


const BASE_PRODUCT_SQL = sql`SELECT p.*, c.name AS category, s.name AS store, p.seo_url AS url, s.seo_url AS store_url FROM products AS p
        JOIN categories as c
        ON p.category_id = c.id
        JOIN stores as s
        ON p.store_id = s.id`;
const STORE_BASE_QUERY = sql`SELECT s.*, AVG(r.rating) as avg_rating FROM ratings as r
JOIN products as p
ON r.product_id = p.id
RIGHT JOIN stores as s
ON s.id = p.store_id
`;
const REVIEW_BASE_QUERY = sql`SELECT CONCAT(u.first_name,' ', u.last_name) AS user_name, p.store_id, r.* FROM ratings AS r
JOIN products AS p
ON p.id = r.product_id
JOIN users AS u
on r.user_id = u.id
`;

const { page_pagination } = siteConfig;

export async function getIdProduct(url: string) {
    try {
        const data = await sql`SELECT * FROM seo_urls WHERE url = ${url}`;
        return data[0].product_id;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error(`Failed to fetch URL ${url} PRODUCT`);
    }
}
export async function getNumberPages(type: string = '', query: string = '') {
    try {
        switch (type) {
            case '':
                const data = await sql`
                SELECT COUNT(*) AS data 
                FROM products 
                ${query
                        ? sql`WHERE name ILIKE ${'%' + query + '%'}`
                        : sql``
                    }
                `;
                return Math.ceil(Number(data[0].data) / page_pagination);

            case 'category':
                const cData = await sql`
                SELECT COUNT(*) AS data 
                FROM products as p
                JOIN categories as c ON c.id = p.category_id
                WHERE c.name = ${query}
                `;
                return Math.ceil(Number(cData[0].data) / page_pagination);

            case 'store':
                const sData = await sql`
                SELECT COUNT(*) AS data 
                FROM products 
                WHERE store_id = ${query}
                `;
                return Math.ceil(Number(sData[0].data) / page_pagination);
        }
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Failed to fetch pagination`);
    }

    return 0;
}



export async function getProductsByCategory(category: string, currentPage: number) {
    const offset = (currentPage - 1) * page_pagination;
    try {
        const data = await sql<Product[]>`${BASE_PRODUCT_SQL}
         WHERE c.name = ${category}
         LIMIT ${page_pagination} OFFSET ${offset}
        `;

        let productsPromises = data.map(async (product) => {
            const rating = await sql`SELECT AVG(rating) AS rating, COUNT(rating) as n_ratings FROM ratings WHERE product_id = ${product.id}`;
            return {
                ...product, rating: formatFloat(rating[0].rating),
                n_ratings: rating[0].n_ratings
            }
        });

        let products = await Promise.all(productsPromises);

        return products;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error(`Failed to fetch c. ${category} products`);
    }
}


export async function getProduct(id: number) {
    try {
        const data = await sql<Product[]>`${BASE_PRODUCT_SQL}
         WHERE p.id = ${id}
        `;

        const product = data[0];
        if (product !== undefined) {
            const rating = await sql`SELECT AVG(rating) AS rating, COUNT(rating) as n_ratings FROM ratings WHERE product_id = ${id}`;
            product.rating = Math.round(rating[0].rating * 100) / 100;
            product.n_ratings = rating[0].n_ratings;

        }


        return product;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error(`Failed to fetch c. ${id} object`);
    }
}
export const getProductByUrl = cache(async (url: string) => {
    try {
        const data = await sql<Product[]>`${BASE_PRODUCT_SQL}
         WHERE p.seo_url = ${url}
        `;
        const product = data[0];
        if (product !== undefined) {
            const rating = await sql`SELECT AVG(rating) AS rating, COUNT(rating) as n_ratings FROM ratings WHERE product_id = ${product.id}`;
            product.rating = Math.round(rating[0].rating * 100) / 100;
            product.n_ratings = rating[0].n_ratings;

        }


        return product;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error(`Failed to fetch c. ${url} object`);
    }
});




export async function getProducts(currentPage: number, query: string = "") {
    const offset = (currentPage - 1) * page_pagination;

    try {
        const data = await sql<Product[]>`
        ${BASE_PRODUCT_SQL}
        ${query
                ? sql`WHERE p.name ILIKE ${'%' + query + '%'}`
                : sql``
            }
        ORDER BY p.id DESC
        LIMIT ${page_pagination} OFFSET ${offset}
        `;

        const productsPromises = data.map(async (product) => {
            const rating = await sql`
              SELECT AVG(rating) AS rating, COUNT(rating) as n_ratings 
              FROM ratings 
              WHERE product_id = ${product.id}
            `;

            return {
                ...product,
                rating: Math.round((rating[0].rating || 0) * 100) / 100,
                n_ratings: rating[0].n_ratings
            };
        });

        return await Promise.all(productsPromises);
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error(`Failed to fetch products`);
    }
}

export async function getProductsByStore(currentPage: number, store: Store) {

    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const offset = (currentPage - 1) * page_pagination
    try {
        const data = await sql<Product[]>`${BASE_PRODUCT_SQL}
        WHERE store_id = ${store.id}
        ORDER BY p.id DESC
        LIMIT ${page_pagination} OFFSET ${offset}
        `;

        let productsPromises = data.map(async (product) => {
            const rating = await sql`SELECT AVG(rating) AS rating, COUNT(rating) as n_ratings FROM ratings WHERE product_id = ${product.id}`;
            return {
                ...product, rating: Math.round(rating[0].rating * 100) / 100,
                n_ratings: rating[0].n_ratings
            }
        });

        let products = await Promise.all(productsPromises);

        return products;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error(`Failed to fetch all products`);
    }
}
export async function getStores(currentPage: number) {

    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const offset = (currentPage - 1) * page_pagination
    try {
        const stores = await sql<Store[]>`${STORE_BASE_QUERY}
        GROUP BY s.id
        LIMIT ${page_pagination} OFFSET ${offset}
        `;
        return stores;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error(`Failed to fetch all stores`);
    }
}
export const getStoreByUrl = cache(async (url: string) => {
    try {
        const stores = await sql<Store[]>`${STORE_BASE_QUERY}
        WHERE s.seo_url = ${url}
        GROUP BY s.id
        `;
        return stores[0];
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error(`Failed to fetch store BY URL`);
    }
});

export async function getLastWrittenReviewByStore(store: Store, limit: number = 3) {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    try {
        const reviews = await sql<Review[]>`${REVIEW_BASE_QUERY}
        WHERE message IS NOT NULL AND store_id = ${store.id}
        ORDER BY r.id DESC 
        LIMIT ${limit}
        `;
        return reviews;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error(`Failed to fetch Reviews BY Store`);
    }

}

export async function getLastReviewsByProduct(product: Product, limit: number = 3) {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    try {
        const reviews = await sql<Review[]>`${REVIEW_BASE_QUERY}
        WHERE r.product_id = ${product.id}
        ORDER BY r.id DESC 
        LIMIT ${limit}
        `;
        return reviews;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error(`Failed to fetch Reviews BY Store`);
    }

}

export async function getUserByID(id: number) {
    // await new Promise((resolve) => setTimeout(resolve, 10000));
    try {
        const data = await sql<User[]>`SELECT id,first_name,last_name,email, role  FROM users
         WHERE id = ${id}
        `;
        const user = data[0];
        return user;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error(`Failed to fetch c. ${id} USER`);
    }
}

export async function isProductReviewedByUser(user_id: number, product_id: number) {
    try {
        const categories = await sql`
        SELECT COUNT(*) AS n FROM ratings
        WHERE user_id = ${user_id} AND product_id = ${product_id}
        `;
        return categories[0].n != 0;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error(`Failed to Insert REVIEW`);
    }
}

export async function getCategories() {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    try {
        const categories = await sql<Category[]>`SELECT * FROM categories
        `;
        return categories;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error(`Failed to fetch Categories`);
    }

}
export async function insertReview(
    rating: number,
    product_id: number,
    user_id: number,
    message: string,
) {
    try {
        const review = await sql`
        INSERT INTO ratings (rating, product_id, user_id, message)
        VALUES (${rating}, ${product_id}, ${user_id}, ${message})
        `;
        return review;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error(`Failed to Insert REVIEW`);
    }
}