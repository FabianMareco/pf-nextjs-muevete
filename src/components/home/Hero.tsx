'use client';
import Image from 'next/image';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { EASE_OUT } from './Reveal';

const lineA = ['Movete', 'hoy.'];
const lineB = ['A', 'tu', 'ritmo.'];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const yBack = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-18%']);
  const yFront = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-42%']);
  const ySmall = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-70%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '30%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);

  // Botón magnético con spring (fuera del ciclo de render de React)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMagnet = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) * 0.3);
    my.set((e.clientY - r.top - r.height / 2) * 0.4);
  };
  const offMagnet = () => { mx.set(0); my.set(0); };

  const word = (w: string, i: number, accent = false) => (
    <span key={w + i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-top mr-[0.22em] last:mr-0">
      <motion.span
        className={`inline-block ${accent ? 'text-accent' : ''}`}
        initial={reduce ? { opacity: 0 } : { y: '105%' }}
        animate={reduce ? { opacity: 1 } : { y: '0%' }}
        transition={{ duration: 0.9, delay: 0.15 + i * 0.08, ease: EASE_OUT }}
      >
        {w}
      </motion.span>
    </span>
  );

  return (
    <section ref={ref} id="inicio" className="relative bg-ink text-paper overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 pb-16 md:pt-16 lg:pt-20 lg:pb-24 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center lg:min-h-[calc(100dvh-72px)]">
        <motion.div style={{ y: textY, opacity: textOpacity }} className="lg:col-span-6 relative z-10">
          <h1 className="font-display font-extrabold text-paper text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.04em]">
            <span className="block">{lineA.map((w, i) => word(w, i))}</span>
            <span className="block">{lineB.map((w, i) => word(w, i + lineA.length, true))}</span>
          </h1>

          <motion.p
            className="mt-7 max-w-md text-lg text-paper/70 leading-relaxed"
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: EASE_OUT }}
          >
            Danza, yoga y nutrición guiada, en vivo y grabadas. Para cualquier nivel, desde donde estés.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease: EASE_OUT }}
          >
            <motion.a
              href="#clases"
              style={{ x: sx, y: sy }}
              onPointerMove={onMagnet}
              onPointerLeave={offMagnet}
              className="btn-accent btn-lg group"
            >
              Ver clases
              <i className="fas fa-arrow-down text-sm transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden="true" />
            </motion.a>
            <a href="#packs" className="btn-ghost-dark btn-lg">Ver packs</a>
          </motion.div>
        </motion.div>

        {/* Collage con parallax */}
        <div className="lg:col-span-6 relative h-[440px] sm:h-[540px] lg:h-[620px]" aria-hidden="true">
          <motion.div
            style={{ y: yBack }}
            className="absolute right-0 top-0 w-[68%] h-[82%]"
          >
            <motion.div
              className="relative h-full w-full overflow-hidden rounded-card"
              initial={reduce ? { opacity: 0 } : { clipPath: 'inset(100% 0 0 0)' }}
              animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0 0 0)' }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.77, 0, 0.175, 1] }}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ scale: reduce ? 1 : 1.25 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.6, delay: 0.2, ease: EASE_OUT }}
              >
                <Image src="/multimedia/C.jpg" alt="" fill priority sizes="(min-width:1024px) 34vw, 68vw" className="object-cover object-[50%_30%]" />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: yFront }}
            className="absolute left-0 bottom-0 w-[50%] h-[58%]"
          >
            <motion.div
              className="relative h-full w-full overflow-hidden rounded-card ring-8 ring-ink"
              initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
              animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
              transition={{ duration: 1.1, delay: 0.45, ease: [0.77, 0, 0.175, 1] }}
            >
              <Image src="/multimedia/H.jpg" alt="" fill priority sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: ySmall }}
            className="absolute left-[38%] top-[6%] w-[26%] aspect-square hidden sm:block"
          >
            <motion.div
              className="relative h-full w-full overflow-hidden rounded-full ring-8 ring-ink"
              initial={{ opacity: 0, scale: reduce ? 1 : 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.9, ease: EASE_OUT }}
            >
              <Image src="/multimedia/clases1.png" alt="" fill sizes="15vw" className="object-cover" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
