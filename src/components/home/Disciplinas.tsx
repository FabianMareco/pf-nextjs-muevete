'use client';
import Image from 'next/image';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Reveal, { EASE_OUT } from './Reveal';

export const disciplinas = [
  { title: 'Danza jazz', img: 'clases1', desc: 'Modern, lyrical, theatre y contemporary jazz. Técnica, giros y musicalidad, desde tu primera clase.' },
  { title: 'Danza clásica', img: 'clases2', desc: 'La base del ballet para todos los niveles: técnica, flexibilidad y expresión, guiada paso a paso.' },
  { title: 'Danza contemporánea', img: 'clases3', desc: 'Técnica, improvisación y expresión creativa para descubrir nuevas formas de moverte.' },
  { title: 'Yoga', img: 'clases4', desc: 'Flexibilidad, fuerza y calma mental. Conectate desde cualquier lugar y respirá.' },
  { title: 'Tango', img: 'clases5', desc: 'Viví la pasión del tango con instructores que te enseñan desde casa, a tu ritmo.' },
  { title: 'Estilos urbanos', img: 'clases6', desc: 'Hip hop, street dance y más. La energía de la calle, con profesionales que te guían.' },
  { title: 'Flexibilidad y elongación', img: 'clases7', desc: 'Ganá rango de movimiento, soltá tensiones y mejorá tu postura día a día.' },
  { title: 'Expresión corporal', img: 'clases8', desc: 'Coordinación, creatividad y conciencia corporal con ejercicios dinámicos y divertidos.' },
  { title: 'Folclore del mundo', img: 'clases9', desc: 'Viajá a Argentina, Paraguay o Ucrania a través de sus pasos y coreografías típicas.' },
  { title: 'Pilates mat', img: 'clases10', desc: 'Fuerza de centro, control y movilidad en el mat, para todos los niveles.' },
  { title: 'Flamenco', img: 'clases11', desc: 'Baile, compás y cante desde tu casa. Descubrí a tu bailaor o bailaora interior.' },
  { title: 'Movilidad articular', img: 'clases12', desc: 'Acondicionamiento diario para cuidar tus articulaciones, sea cual sea tu profesión.' },
  { title: 'Danza para niños', img: 'clases13', desc: 'Clases pensadas para jugar y aprender, guiadas por profes con experiencia en infancias.' },
  { title: 'Improvisación', img: 'clases14', desc: 'Una disciplina que se entrena: explorá tu propio movimiento y llená tu danza de vida.' },
  { title: 'Nutrición para el movimiento', img: 'clases15', desc: 'Aprendé a alimentarte para rendir y sentirte bien, con herramientas simples para cada día.' },
];

export default function Disciplinas() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const d = disciplinas[active];

  return (
    <section id="clases" className="bg-sand py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <h2 className="section-title max-w-3xl">Elegí cómo querés moverte</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-5 max-w-xl text-lg text-muted leading-relaxed">
            Quince disciplinas dictadas por profesionales. Probá una, combiná varias, cambiá cuando quieras.
          </p>
        </Reveal>

        {/* Desktop: índice interactivo */}
        <div className="hidden lg:grid grid-cols-12 gap-12 mt-16">
          <ul className="col-span-5 flex flex-col">
            {disciplinas.map((item, i) => {
              const on = i === active;
              return (
                <li key={item.title}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className={`group w-full text-left flex items-center py-2 font-display font-bold text-[1.7rem] xl:text-[2rem] leading-tight tracking-[-0.03em] transition-colors duration-200 ${on ? 'text-ink' : 'text-ink/30 hover:text-ink/60'}`}
                  >
                    <span
                      className={`h-[3px] shrink-0 bg-accent rounded-full transition-[width,margin] duration-300 ${on ? 'w-8 mr-4' : 'w-0 mr-0'}`}
                      style={{ transitionTimingFunction: 'cubic-bezier(0.23,1,0.32,1)' }}
                    />
                    {item.title}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="col-span-7">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] max-h-[72vh] w-full overflow-hidden rounded-card bg-ink">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={d.img}
                    className="absolute inset-0"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.06, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE_OUT }}
                  >
                    <Image src={`/multimedia/${d.img}.png`} alt={d.title} fill sizes="55vw" className="object-cover" />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/90 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 p-8 flex items-end justify-between gap-6">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.p
                      key={d.title}
                      className="text-paper/90 text-lg leading-relaxed max-w-md"
                      initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: reduce ? 0 : -6 }}
                      transition={{ duration: 0.25, ease: EASE_OUT }}
                    >
                      {d.desc}
                    </motion.p>
                  </AnimatePresence>
                  <a href="#packs" className="btn-accent shrink-0">Quiero empezar</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile / tablet: carrusel con scroll-snap */}
        <div className="lg:hidden mt-12 -mx-4 sm:-mx-6 px-4 sm:px-6 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar">
          {disciplinas.map((item) => (
            <article key={item.title} className="snap-start shrink-0 w-[78%] sm:w-[46%] rounded-card overflow-hidden bg-ink text-paper">
              <div className="relative aspect-[4/5]">
                <Image src={`/multimedia/${item.img}.png`} alt={item.title} fill sizes="(min-width:640px) 46vw, 78vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display font-extrabold text-2xl tracking-[-0.03em] text-paper mb-2">{item.title}</h3>
                  <p className="text-sm text-paper/80 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
