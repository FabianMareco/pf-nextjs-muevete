import { adminDB } from '@/lib/firebase-admin';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const doc = await adminDB.collection('products').doc(id).get();
  if (!doc.exists) notFound();

  const product = { id: doc.id, ...doc.data() } as any;

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <ProductCard {...product} />
    </div>
  );
}
