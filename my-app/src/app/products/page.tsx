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
  }>;
}) {

  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const products = await getProducts(currentPage);
  const totalPages = await getNumberPages();



  return (
    <>
      <ProductTable products={products} title='Latest products' />

      <Pagination totalPages={totalPages} />

    </>
  )
}