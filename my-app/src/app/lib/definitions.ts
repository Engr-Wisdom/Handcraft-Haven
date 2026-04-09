export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    store: string;
    rating: number;
    n_ratings: number;
    url: string;
    store_url: string;
};
export type Store = {
    id: string;
    name: string;
    bio: string;
    image: string;
    seo_url: string;
    avg_rating: number;
};
export type Review = {
    id: string;
    user_name: string;
    rating: number;
    product_id: number;
    date: string;
    message: string;
};