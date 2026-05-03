import { getProducts } from '@/lib/firestore-server';
import ProductCard from '@/components/ProductCard';

export default async function MerchandisingPage() {
  const products = await getProducts('merchandising');
  const order = [
    'TAZA 1','TAZA 2','TAZA 3',
    'REMERA 1','REMERA 2','REMERA 3',
    'BOLSO 1','BOLSO 2','BOLSO 3',
    'BOTELLA 1','BOTELLA 2','BOTELLA 3',
    'BALLET MODELO 1','BALLROOM MODELO 2','JAZZ MODELO 3',
    'MAT YOGA','PESAS 2 KG','LADRILLO YOGA'
  ];
  const sorted = [...products].sort((a,b) => order.indexOf(a.name) - order.indexOf(b.name));
  const grouped: Record<string, any[]> = {};
  sorted.forEach(p => { if (!grouped[p.subcategory]) grouped[p.subcategory] = []; grouped[p.subcategory].push(p); });
  const icons: Record<string, string> = { tazas:'☕', remeras:'👕', bolsos:'👜', hidratarse:'💧', zapatillas:'👟', elemento:'🧘' };
  const names: Record<string, string> = { tazas:'Tazas', remeras:'Remeras Oversize', bolsos:'Bolsos', hidratarse:'Hidratación', zapatillas:'Zapatillas de Danza', elemento:'Elementos Yoga' };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-2">✨ Merchandising Store ✨</h1>
      <p className="text-center text-gray-600 mb-8">Todo lo que necesitas para acompañar tu movimiento</p>
      {Object.entries(grouped).map(([sub, items]) => (
        <div key={sub} className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-6 pb-2 border-b-4 border-red-500 inline-block w-full">
            {icons[sub]} {names[sub]}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((p) => <ProductCard key={p.id} {...p} />)}
          </div>
        </div>
      ))}
      {sorted.length === 0 && <p className="text-center">No hay productos disponibles</p>}
    </div>
  );
}