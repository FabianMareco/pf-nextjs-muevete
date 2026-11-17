'use client';
import Image from 'next/image';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { EASE_OUT } from './Reveal';

const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;

type Piece = { word: string } | { img: string; pos: string };

const lines: { pieces: Piece[]; accent?: boolean }[] = [
  { pieces: [{ word: 'Movete' }, { img: 'C.jpg', pos: 'object-[50%_25%]' }, { word: 'hoy.' }] },
  { pieces: [{ word: 'A' }, { word: 'tu' }, { img: 'clases8.png', pos: 'object-[50%_22%]' }, { word: 'ritmo.' }], accent: true },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-25%']);
  const visualY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-35%']);
  const circleY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-80%']);
  const pillImgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.25]);

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

  let order = 0;

  return (
    <section ref={ref} id="inicio" className="relative bg-ink text-paper overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-14 md:pt-16 lg:pt-20 lg:pb-20 flex flex-col justify-center lg:min-h-[calc(100dvh-72px)]">
        <motion.h1
          style={{ y: titleY }}
          className="font-display font-extrabold text-paper text-[clamp(2.3rem,10.4vw,8.4rem)] leading-[0.95] tracking-[-0.05em]"
        >
          {lines.map((line, li) => (
            <span key={li} className={`block whitespace-nowrap ${line.accent ? 'text-accent' : ''}`}>
              {line.pieces.map((p, pi) => {
                const i = order++;
                const delay = 0.12 + i * 0.08;
                if ('word' in p) {
                  return (
                    <span key={pi} className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom mr-[0.2em]">
                      <motion.span
                        className="inline-block"
                        initial={reduce ? { opacity: 0 } : { y: '105%' }}
                        animate={reduce ? { opacity: 1 } : { y: '0%' }}
                        transition={{ duration: 0.9, delay, ease: EASE_OUT }}
                      >
                        {p.word}
                      </motion.span>
                    </span>
                  );
                }
                return (
                  <motion.span
                    key={pi}
                    aria-hidden="true"
                    className="relative inline-block align-middle w-[1.9em] h-[0.82em] rounded-full overflow-hidden mr-[0.2em] -mt-[0.14em] bg-surface"
                    initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 50% 0 50% round 999px)' }}
                    animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0% 0 0% round 999px)' }}
                    transition={{ duration: 1, delay: delay + 0.15, ease: EASE_IN_OUT }}
                  >
                    <motion.span className="absolute inset-0" style={{ scale: pillImgScale }}>
                      <Image src={`/multimedia/${p.img}`} alt="" fill priority sizes="(min-width:1024px) 16vw, 30vw" className={`object-cover ${p.pos}`} />
                    </motion.span>
                  </motion.span>
                );
              })}
            </span>
          ))}
        </motion.h1>

        <div className="mt-10 lg:mt-14 grid lg:grid-cols-12 gap-10 lg:gap-8 items-end">
          <div className="lg:col-span-6">
            <motion.p
              className="max-w-md text-lg text-paper/70 leading-relaxed"
              initial={{ opacity: 0, y: reduce ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75, ease: EASE_OUT }}
            >
              Danza, yoga y nutrición guiada, en vivo y grabadas. Para cualquier nivel, desde donde estés.
            </motion.p>
            <motion.div
              className="mt-9 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: reduce ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease: EASE_OUT }}
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
          </div>

          <motion.div style={{ y: visualY }} className="lg:col-span-6 relative h-44 sm:h-56" aria-hidden="true">
            <motion.div
              className="absolute right-0 bottom-0 w-[84%] sm:w-[62%] h-full rounded-full overflow-hidden bg-surface"
              initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 0 100% round 999px)' }}
              animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0 0% round 999px)' }}
              transition={{ duration: 1.1, delay: 0.7, ease: EASE_IN_OUT }}
            >
              <Image src="/multimedia/H.jpg" alt="" fill sizes="(min-width:1024px) 30vw, 84vw" className="object-cover object-[50%_35%]" />
            </motion.div>
            <motion.div style={{ y: circleY }} className="absolute left-0 sm:left-auto sm:right-[56%] bottom-6 w-24 h-24 sm:w-28 sm:h-28">
              <motion.div
                className="relative h-full w-full rounded-full overflow-hidden ring-8 ring-ink"
                initial={{ opacity: 0, scale: reduce ? 1 : 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.1, ease: EASE_OUT }}
              >
                <Image src="/multimedia/clases1.png" alt="" fill sizes="112px" className="object-cover" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
