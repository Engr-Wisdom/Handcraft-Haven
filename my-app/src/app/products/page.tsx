import React from 'react'
import { getProducts, getNumberPages } from '../lib/data'
import ProductTable from '../ui/products/products-table';
import Pagination from '../ui/pagination';
import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Products',
  description: 'Browse our full catalog of unique, handmade treasures crafted by talented artisans.'
}

export default async function Page(props: {
  searchParams?: Promise<{
    page?: string;
    q?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.q || "";

  const products = await getProducts(currentPage, query);
  const totalPages = await getNumberPages("", query);

  return (
    <div className='bg-gray-200 p-4 sm:p-10'>
      <ProductTable 
        products={products} 
        title={query ? `Results for "${query}"` : "Latest products"} 
      />

      <Pagination totalPages={totalPages} />
    </div>
  );
}