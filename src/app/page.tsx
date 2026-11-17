import Hero from '@/components/home/Hero';
import Manifesto, { Marquee } from '@/components/home/Manifesto';
import Disciplinas from '@/components/home/Disciplinas';
import ComoFunciona from '@/components/home/ComoFunciona';
import Packs from '@/components/home/Packs';
import Tienda from '@/components/home/Tienda';
import Contacto from '@/components/home/Contacto';
import type ProductCard from '@/components/ProductCard';

export const revalidate = 60;

async function loadProducts() {
  try {
    const { getProducts } = await import('@/lib/firestore-server');
    const products = await getProducts('merchandising');
    // Serializamos para pasar datos planos al componente cliente
    return JSON.parse(JSON.stringify(products)) as React.ComponentProps<typeof ProductCard>[];
  } catch (err) {
    console.error('No se pudieron cargar los productos:', err);
    return [];
  }
}

export default async function HomePage() {
  const products = await loadProducts();

  return (
    <>
      <Hero />
      <Marquee />
      <Manifesto />
      <Disciplinas />
      <ComoFunciona />
      <Packs />
      <Tienda products={products} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6"><div className="border-t border-ink/10" /></div>
      <Contacto />
    </>
  );
}
