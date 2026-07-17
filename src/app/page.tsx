'use client';
import { useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Carousel from '@/components/Carousel';
import Link from 'next/link';

const disciplinas = ['DANZA JAZZ', 'YOGA', 'TANGO', 'PILATES MAT', 'FLAMENCO', 'DANZA CONTEMPORÁNEA', 'ESTILOS URBANOS', 'DANZA CLÁSICA'];

export default function HomePage() {
  const magnetRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => { AOS.init({ duration: 600, easing: 'ease-out-cubic', once: true }); }, []);

  const handleMagnetMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = magnetRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.25;
    const y = (e.clientY - r.top - r.height / 2) * 0.35;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMagnetLeave = () => {
    if (magnetRef.current) magnetRef.current.style.transform = '';
  };

  return (
    <>
      <section className="bg-ink">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-8">
            <div className="lg:w-[45%]">
              <h1 className="hero-in font-display font-extrabold text-paper text-4xl md:text-6xl tracking-tight leading-[1.02] max-w-xl [animation-delay:60ms]">
                Movete hoy. A tu ritmo.
              </h1>
              <p className="hero-in text-paper/70 text-base md:text-lg mt-5 max-w-md [animation-delay:160ms]">
                Danza, yoga y nutrición guiada, en vivo y grabadas, para cualquier nivel.
              </p>
              <div className="hero-in flex flex-wrap gap-3 mt-8 [animation-delay:260ms]">
                <Link
                  href="/clases"
                  ref={magnetRef}
                  onMouseMove={handleMagnetMove}
                  onMouseLeave={handleMagnetLeave}
                  className="btn-accent"
                >
                  Ver clases
                </Link>
                <Link href="#nosotros" className="border-2 border-paper/30 text-paper hover:border-paper font-bold py-2.5 px-5 rounded-control transition active:scale-[0.97]">
                  Conocenos
                </Link>
              </div>
            </div>

            <div className="w-full lg:w-[55%]">
              <Carousel />
            </div>
          </div>
        </div>

        <div className="marquee-wrap py-5 overflow-hidden border-t border-white/10">
          <div className="marquee-track flex gap-12 w-max">
            {[...disciplinas, ...disciplinas].map((d, i) => (
              <span key={i} className="text-paper font-display font-extrabold text-lg md:text-xl tracking-tight whitespace-nowrap flex items-center gap-3">
                {d}<span className="text-accent">•</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pt-14 md:pt-20 pb-8">
        <div data-aos="fade-up"><h2 className="text-left">La importancia de moverse y sentirse vivo</h2></div>
        <div data-aos="fade-up"><p className="texto-contenido">
            El movimiento es vida, y queremos compartirlo contigo. En MUEVETE, nuestra plataforma de e-learning,
            te invitamos a redescubrir la alegría, la libertad y los beneficios de mover tu cuerpo. Ya sea a través
            de la danza, el yoga, el stretching o cualquier otra disciplina, aquí encontrarás un espacio pensado para ti,
            sin importar si estás empezando o si ya llevas tiempo en este camino. Sabemos que cada persona vive el movimiento
            de forma única. Por eso, hemos creado una experiencia que combina el aprendizaje en línea con la práctica activa,
            adaptada a tus necesidades y ritmo de vida. El movimiento no solo nos mantiene en forma, también transforma nuestra mente,
            nuestras emociones y nuestra salud. En nuestras clases de danza, desde el ballet clásico hasta el jazz o la improvisación contemporánea,
            descubrirás cómo conectar con tu creatividad y expresión personal mientras mejoras tu coordinación y flexibilidad.
            Nuestras sesiones de yoga y stretching son mucho más que ejercicios: son un regalo para tu cuerpo y tu mente.
            Te ayudarán a liberar tensiones, fortalecer tu postura y encontrar ese equilibrio que tantas veces necesitamos en el día a día.
            Aquí, cada movimiento cuenta. ¿Listo para empezar tu viaje con nosotros?
          </p></div>
        <div data-aos="fade-up" className="mt-10"><h2 className="text-left">Nuestras clases</h2></div>
        <div data-aos="fade-up"><p className="texto-contenido">
            En nuestra plataforma, todos son bienvenidos. No importa tu edad, condición física o experiencia previa:
            este espacio está diseñado para ti. Solo necesitas suscribirte y dar el primer paso hacia un estilo de vida más saludable,
            dinámico y lleno de energía. Te ofrecemos una amplia variedad de clases, tanto en vivo como grabadas,
            para que puedas elegir lo que mejor se adapte a tu ritmo y horario. Cada sesión está guiada por profesionales apasionados
            que estarán contigo en cada momento, ayudándote a moverte, aprender y sentirte mejor.
            ¿Estás listo para descubrir todo lo que el movimiento puede hacer por ti? ¡Únete hoy y transforma tu vida, un paso a la vez!
          </p></div>

        <div id="nosotros" data-aos="fade-up" className="mt-10 scroll-mt-20"><h2 className="text-left">Nuestra plataforma</h2></div>
        <div data-aos="fade-up"><p className="texto-contenido">
            En MUEVETE, estamos convencidos de que el movimiento es para todos. No importa quién seas, dónde estés o cuál sea tu experiencia:
            queremos que descubras lo increíble que es conectar con tu cuerpo y disfrutar de una vida más activa.
            Nuestra misión es simple: crear un espacio virtual accesible y motivador donde cualquiera con conexión a internet pueda participar
            en clases de danza, yoga, stretching y muchas otras formas de movimiento. Queremos que las barreras desaparezcan,
            que te sientas libre de expresarte y que disfrutes todos los beneficios que trae mover el cuerpo.
            En nuestra plataforma, encontrarás un ambiente inclusivo y lleno de energía. Cada clase está liderada por profesionales apasionados
            que no solo conocen su disciplina a fondo, sino que también se dedican a acompañarte en tu camino, respetando tu ritmo y tus objetivos personales.
            ¿Quieres ser más flexible, fortalecer tu cuerpo, descubrir una nueva forma de expresarte o simplemente mantenerte activo?
            Estamos aquí para ayudarte en cada paso del camino. Sabemos que la constancia y la motivación pueden ser un desafío,
            por eso hemos construido una comunidad que estará ahí para impulsarte, inspirarte y recordarte que cada pequeño esfuerzo cuenta.
            Ya sea que estés dando tus primeros pasos en el movimiento o que tengas años de experiencia, este es un espacio hecho para ti.
            Aquí encontrarás la guía y el apoyo que necesitas para que tu práctica sea placentera y significativa.
            No necesitas más que tus ganas, una conexión a internet y un momento para dedicarte a ti. Nosotros nos encargamos del resto.
            ¡El primer paso hacia una vida más activa y plena está a un clic de distancia!
          </p></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mt-8">
          {[11, 12, 13, 14, 15, 16].map((num, idx) => (
            <img
              key={num}
              src={`/multimedia/bailar${num}.png`}
              alt=""
              data-aos="zoom-in"
              data-aos-delay={idx * 60}
              className="w-full aspect-square object-cover rounded-card transition-transform duration-300 hover:scale-105"
            />
          ))}
        </div>
      </div>

      <section className="bg-neutral">
        <div className="container mx-auto px-4 py-14 text-center">
          <h3 className="mb-3">Aprender nunca fue tan fácil como ahora en MUEVETE</h3>
          <p className="text-muted mb-6">Hay una clase preparada para que empieces a aprender hoy mismo.</p>
          <Link href="/login" className="btn-primary">Empezar ahora</Link>
        </div>
      </section>
    </>
  );
}