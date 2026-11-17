'use client';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import toast from 'react-hot-toast';
import { useCart } from '@/hooks/useCart';
import packsData from '@/data/packs.json';
import Reveal, { EASE_OUT } from './Reveal';

type Pack = (typeof packsData)[number];

const tabs = [
  { id: 'clases', label: 'Clases', regular: [1, 2, 3], premium: [4, 11] },
  { id: 'nutricion', label: 'Nutrición', regular: [5, 6, 7, 9], premium: [8, 10] },
] as const;

export const formatPrice = (n: number) => `$${n.toLocaleString('es-AR')}`;

function PackCard({ pack, premium, span }: { pack: Pack; premium: boolean; span: string }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const buy = () => {
    addItem(
      { id: String(pack.id), name: pack.nombre, price: pack.precio, type: 'pack', category: pack.categoria, quantity: 1 },
      1,
    );
    toast.success(`${pack.nombre} agregado al carrito`);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <motion.article
      layout
      className={`${span} relative flex flex-col rounded-card p-7 md:p-8 ${premium ? 'bg-ink text-paper' : 'bg-white border border-ink/10'}`}
    >
      {premium && (
        <span className="self-start mb-5 rounded-full bg-accent px-3 py-1 text-xs font-bold text-paper">Premium</span>
      )}
      <h3 className={`font-display font-extrabold text-2xl tracking-[-0.03em] ${premium ? 'text-paper' : 'text-ink'}`}>{pack.nombre}</h3>
      <p className={`mt-2 ${premium ? 'text-paper/70' : 'text-muted'}`}>{pack.descripcion}</p>
      <div className="mt-auto pt-8">
      <p className={`font-display font-extrabold text-4xl tracking-[-0.04em] ${premium ? 'text-paper' : 'text-ink'}`}>
        {formatPrice(pack.precio)}
      </p>
      <button
        type="button"
        onClick={buy}
        className={`mt-6 w-full ${premium ? 'btn-accent' : 'btn-primary'} relative overflow-hidden`}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={added ? 'ok' : 'buy'}
            className="inline-flex items-center gap-2"
            initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
          >
            {added ? (<><i className="fas fa-check" aria-hidden="true" /> Agregado</>) : 'Comprar'}
          </motion.span>
        </AnimatePresence>
      </button>
      </div>
    </motion.article>
  );
}

export default function Packs() {
  const [tab, setTab] = useState<(typeof tabs)[number]['id']>('clases');
  const reduce = useReducedMotion();
  const current = tabs.find((t) => t.id === tab)!;
  const byId = (id: number) => packsData.find((p) => p.id === id)!;
  const regularSpan = current.regular.length === 3 ? 'lg:col-span-4' : 'sm:col-span-1 lg:col-span-3';

  return (
    <section id="packs" className="bg-sand py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <Reveal>
            <h2 className="section-title max-w-xl">Elegí tu pack y empezá hoy</h2>
          </Reveal>

          <Reveal delay={0.06}>
            <div role="tablist" aria-label="Tipo de pack" className="inline-flex rounded-full bg-white p-1 border border-ink/10">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={tab === t.id}
                  onClick={() => setTab(t.id)}
                  className={`relative rounded-full px-6 py-2.5 text-sm font-bold transition-colors duration-200 ${tab === t.id ? 'text-paper' : 'text-ink/60 hover:text-ink'}`}
                >
                  {tab === t.id && (
                    <motion.span
                      layoutId="pack-tab"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={reduce ? { duration: 0 } : { type: 'spring', duration: 0.45, bounce: 0.15 }}
                    />
                  )}
                  <span className="relative">{t.label}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4"
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -8 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
          >
            {current.regular.map((id) => (
              <PackCard key={id} pack={byId(id)} premium={false} span={regularSpan} />
            ))}
            {current.premium.map((id) => (
              <PackCard key={id} pack={byId(id)} premium span="sm:col-span-1 lg:col-span-6" />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
