'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'motion/react';
import Reveal from './Reveal';

const disciplinas = ['Danza jazz', 'Yoga', 'Tango', 'Pilates mat', 'Flamenco', 'Contemporáneo', 'Urbano', 'Clásico', 'Folclore', 'Nutrición'];

const texto =
  'Creemos que el movimiento es para todos. No importa tu edad, tu experiencia ni dónde estés. Solo necesitás ganas, conexión a internet y un rato para vos. Del resto nos encargamos nosotros.';

const facts = [
  { big: '15', label: 'disciplinas para elegir' },
  { big: 'En vivo', label: 'y también grabadas, a tu horario' },
  { big: 'Todos', label: 'los niveles, desde el primer día' },
];

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.25em]">
      {children}
    </motion.span>
  );
}

export function Marquee() {
  return (
    <div className="bg-accent text-paper overflow-hidden py-4 md:py-5 select-none" aria-hidden="true">
      <div className="marquee-track flex w-max">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {disciplinas.map((d) => (
              <span key={d + k} className="flex items-center font-display font-extrabold text-2xl md:text-3xl tracking-[-0.03em] whitespace-nowrap px-6">
                {d}
                <i className="fas fa-asterisk text-base ml-12 text-ink/80" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = texto.split(' ');

  return (
    <section id="nosotros" className="mx-auto max-w-7xl px-4 sm:px-6 py-24 md:py-36">
      <p
        ref={ref}
        className="font-display font-bold text-ink text-[clamp(1.85rem,4.4vw,3.6rem)] leading-[1.08] tracking-[-0.03em] max-w-5xl"
      >
        {reduce
          ? texto
          : words.map((w, i) => (
              <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                {w}
              </Word>
            ))}
      </p>

      <div className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 border-t border-ink/10 pt-10">
        {facts.map((f, i) => (
          <Reveal key={f.big} delay={i * 0.08}>
            <p className="font-display font-extrabold text-5xl md:text-6xl tracking-[-0.04em] text-ink">{f.big}</p>
            <p className="mt-2 text-muted text-base">{f.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
