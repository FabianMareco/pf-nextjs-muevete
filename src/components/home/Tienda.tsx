'use client';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import ProductCard from '@/components/ProductCard';
import Reveal, { EASE_OUT } from './Reveal';

const categorias = [
  { id: 'todo', label: 'Todo' },
  { id: 'remeras', label: 'Remeras' },
  { id: 'zapatillas', label: 'Zapatillas' },
  { id: 'equipamiento', label: 'Equipamiento' },
  { id: 'bolsos', label: 'Bolsos' },
  { id: 'botellas', label: 'Hidratación' },
  { id: 'tazas', label: 'Tazas' },
];

const order = categorias.map((c) => c.id);
const PAGE = 8;

type Product = React.ComponentProps<typeof ProductCard>;

export default function Tienda({ products }: { products: Product[] }) {
  const [cat, setCat] = useState('todo');
  const [limit, setLimit] = useState(PAGE);
  const reduce = useReducedMotion();

  const sorted = useMemo(
    () =>
      [...products].sort((a, b) => {
        const ca = order.indexOf(a.subcategory);
        const cb = order.indexOf(b.subcategory);
        if (ca !== cb) return (ca === -1 ? 99 : ca) - (cb === -1 ? 99 : cb);
        return String(a.name).localeCompare(String(b.name), 'es', { numeric: true });
      }),
    [products],
  );

  // Con "Todo" intercalamos categorías para que la primera vista sea variada
  const list = useMemo(() => {
    if (cat !== 'todo') return sorted.filter((p) => p.subcategory === cat);
    const buckets = order.slice(1).map((c) => sorted.filter((p) => p.subcategory === c));
    const rest = sorted.filter((p) => !order.includes(p.subcategory));
    const mixed: Product[] = [];
    for (let i = 0; buckets.some((b) => b[i]); i++) buckets.forEach((b) => b[i] && mixed.push(b[i]));
    return [...mixed, ...rest];
  }, [cat, sorted]);

  const visible = list.slice(0, limit);
  const available = categorias.filter((c) => c.id === 'todo' || sorted.some((p) => p.subcategory === c.id));

  return (
    <section id="tienda" className="mx-auto max-w-7xl px-4 sm:px-6 py-24 md:py-32">
      <Reveal>
        <h2 className="section-title max-w-2xl">Tienda MUEVETE</h2>
      </Reveal>
      <Reveal delay={0.06}>
        <p className="mt-5 max-w-xl text-lg text-muted leading-relaxed">
          Zapatillas de danza, equipamiento y la ropa oficial para acompañar tu práctica.
        </p>
      </Reveal>

      {products.length === 0 ? (
        <div className="mt-14 rounded-card border border-dashed border-ink/20 px-6 py-16 text-center">
          <i className="fas fa-bag-shopping text-3xl text-ink/30" aria-hidden="true" />
          <p className="mt-4 font-display font-bold text-xl text-ink">Estamos reponiendo la tienda</p>
          <p className="mt-1 text-muted">Volvé en un rato para ver los productos.</p>
        </div>
      ) : (
        <>
          <div className="mt-10 -mx-4 sm:mx-0 px-4 sm:px-0 flex gap-2 overflow-x-auto no-scrollbar">
            {available.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => { setCat(c.id); setLimit(PAGE); }}
                aria-pressed={cat === c.id}
                className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm font-bold border transition-colors duration-200 active:scale-[0.97] ${cat === c.id ? 'text-paper border-ink' : 'text-ink/70 border-ink/15 hover:border-ink/40 hover:text-ink'}`}
              >
                {cat === c.id && (
                  <motion.span
                    layoutId="shop-chip"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={reduce ? { duration: 0 } : { type: 'spring', duration: 0.4, bounce: 0.12 }}
                  />
                )}
                <span className="relative">{c.label}</span>
              </button>
            ))}
          </div>

          <motion.div layout={!reduce} className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout={!reduce}
                  initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
                  transition={{ duration: 0.35, delay: (i % PAGE) * 0.03, ease: EASE_OUT }}
                >
                  <ProductCard {...p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {list.length > limit && (
            <div className="mt-14 flex justify-center">
              <button type="button" onClick={() => setLimit((l) => l + PAGE)} className="btn-outline">
                Ver más productos
                <span className="text-ink/50 font-semibold">({list.length - limit})</span>
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
