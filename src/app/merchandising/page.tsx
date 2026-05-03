import { getProducts } from '@/lib/firestore-server';
import MerchandisingClient from '@/components/MerchandisingClient';

export default async function MerchandisingPage() {
  const products = await getProducts('merchandising');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1
        className="text-4xl font-bold text-center mb-2"
        style={{
          fontFamily: "'PermanentMarker-Regular', cursive",
          textShadow: '4px 4px 0px rgba(238,155,0,0.4), 8px 8px 0px rgba(187,62,3,0.25)',
        }}
      >
        ✨ Merchandising Store ✨
      </h1>
      <p className="text-center text-gray-600 mb-8">Todo lo que necesitas para acompañar tu movimiento</p>

      <MerchandisingClient products={products} />
    </div>
  );
}
