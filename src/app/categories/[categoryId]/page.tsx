import { getProducts } from '@/lib/firestore';
import ProductList from '@/components/ProductList';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const categories = ['tazas', 'remeras', 'bolsos', 'hidratarse', 'zapatillas', 'elemento'];
  return categories.map(categoryId => ({ categoryId }));
}

export default async function CategoryPage({ params }) {
  const { categoryId } = params;
  const products = await getProducts(categoryId);
  if (!products.length) notFound();
  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold capitalize mb-4">{categoryId}</h2>
      <ProductList products={products} />
    </main>
  );
}