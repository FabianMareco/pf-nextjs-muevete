import { getProducts } from '@/lib/firestore-server';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';

interface Props {
  params: Promise<{ categoryId: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { categoryId } = await params;
  const products = await getProducts(categoryId);
  if (!products.length) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-secondary-light mb-6 capitalize">{categoryId}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p: any) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
}
