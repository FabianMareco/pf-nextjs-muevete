import { getProducts } from '@/lib/firestore-server';
import MerchandisingClient from '@/components/MerchandisingClient';

export default async function MerchandisingPage() {
  const products = await getProducts('merchandising');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl md:text-5xl mb-2">Merchandising</h1>
      <p className="text-muted mb-8">Todo lo que necesitas para acompañar tu movimiento</p>

      <MerchandisingClient products={products} />
    </div>
  );
}
