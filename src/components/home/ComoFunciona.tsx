import Image from 'next/image';
import Reveal from './Reveal';

export default function ComoFunciona() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-24 md:py-32">
      <Reveal>
        <h2 className="section-title max-w-3xl">Una plataforma pensada para que no aflojes</h2>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-6 gap-4 md:auto-rows-[260px]">
        <Reveal className="md:col-span-4 md:row-span-2 bento-cell group min-h-[380px]">
          <Image src="/multimedia/13.png" alt="Bailarina en una clase en vivo" fill sizes="(min-width:768px) 66vw, 100vw" className="bento-img object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
          <div className="relative mt-auto p-7 md:p-9 text-paper">
            <h3 className="font-display font-extrabold text-3xl md:text-4xl tracking-[-0.03em] text-paper">Clases en vivo</h3>
            <p className="mt-2 max-w-md text-paper/80">Entrená con tu profe en tiempo real, hacé preguntas y recibí correcciones al momento.</p>
          </div>
        </Reveal>

        <Reveal delay={0.06} className="md:col-span-2 bento-cell bg-accent text-paper p-7">
          <i className="fas fa-play text-2xl" aria-hidden="true" />
          <div className="mt-auto">
            <h3 className="font-display font-extrabold text-2xl tracking-[-0.03em] text-paper">Grabadas, a tu tiempo</h3>
            <p className="mt-2 text-paper/85">Pausá, repetí y volvé a la clase todas las veces que necesites.</p>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="md:col-span-2 bento-cell group min-h-[260px]">
          <Image src="/multimedia/clases15.png" alt="Plato de comida saludable" fill sizes="(min-width:768px) 33vw, 100vw" className="bento-img object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent" />
          <div className="relative mt-auto p-7 text-paper">
            <h3 className="font-display font-extrabold text-2xl tracking-[-0.03em] text-paper">Nutrición incluida</h3>
            <p className="mt-1 text-paper/80">Cursos y asesorías para acompañar tu práctica.</p>
          </div>
        </Reveal>

        <Reveal delay={0.06} className="md:col-span-3 bento-cell bg-ink text-paper p-7 md:p-9">
          <h3 className="font-display font-extrabold text-2xl md:text-3xl tracking-[-0.03em] text-paper max-w-sm">Profes que te acompañan en cada paso</h3>
          <p className="mt-auto pt-6 text-paper/70 max-w-md">Profesionales apasionados que respetan tu ritmo y tus objetivos, estés empezando o tengas años de práctica.</p>
        </Reveal>

        <Reveal delay={0.12} className="md:col-span-3 bento-cell group min-h-[260px]">
          <Image src="/multimedia/clases12.png" alt="Alumno en clase de movilidad" fill sizes="(min-width:768px) 50vw, 100vw" className="bento-img object-cover object-[50%_25%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent" />
          <div className="relative mt-auto p-7 md:p-9 text-paper">
            <h3 className="font-display font-extrabold text-2xl md:text-3xl tracking-[-0.03em] text-paper">Sin edad, sin excusas</h3>
            <p className="mt-1 text-paper/80">Si tenés ganas de moverte, hay una clase para vos.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
