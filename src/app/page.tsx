'use client';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Carousel from '@/components/Carousel';
import Link from 'next/link';

export default function HomePage() {
  useEffect(() => { AOS.init({ duration: 1000 }); }, []);
  return (
    <>
      <Carousel />
      <div className="container mx-auto px-4 py-8">
        <div data-aos="fade-up"><h3 className="text-center text-2xl font-carter text-secondary-light mb-6" style={{ fontFamily: "'PermanentMarker-Regular', cursive", textShadow: '4px 4px 0px rgba(238,155,0,0.4), 8px 8px 0px rgba(187,62,3,0.25)' }}>La importancia de moverse y sentirse vivo</h3></div>
        <div data-aos="fade-down"><p className="texto-contenido">
            El movimiento es vida, y queremos compartirlo contigo. En MUEVETE, nuestra plataforma de e-learning,
            te invitamos a redescubrir la alegría, la libertad y los beneficios de mover tu cuerpo. Ya sea a través
            de la danza, el yoga, el stretching o cualquier otra disciplina, aquí encontrarás un espacio pensado para ti,
            sin importar si estás empezando o si ya llevas tiempo en este camino. Sabemos que cada persona vive el movimiento
            de forma única. Por eso, hemos creado una experiencia que combina el aprendizaje en línea con la práctica activa,
            adaptada a tus necesidades y ritmo de vida. El movimiento no solo nos mantiene en forma, también transforma nuestra mente,
            nuestras emociones y nuestra salud. En nuestras clases de danza –desde el ballet clásico hasta el jazz o la improvisación contemporánea–
            descubrirás cómo conectar con tu creatividad y expresión personal mientras mejoras tu coordinación y flexibilidad.
            Nuestras sesiones de yoga y stretching son mucho más que ejercicios: son un regalo para tu cuerpo y tu mente.
            Te ayudarán a liberar tensiones, fortalecer tu postura y encontrar ese equilibrio que tantas veces necesitamos en el día a día.
            Aquí, cada movimiento cuenta. ¿Listo para empezar tu viaje con nosotros?
          </p></div>
        <div data-aos="fade-up"><h3 className="text-center text-2xl font-carter text-secondary-light mb-6" style={{ fontFamily: "'PermanentMarker-Regular', cursive", textShadow: '4px 4px 0px rgba(238,155,0,0.4), 8px 8px 0px rgba(187,62,3,0.25)' }}>Nuestras clases</h3></div>
        <div data-aos="fade-down"> <p className="texto-contenido">
            En nuestra plataforma, todos son bienvenidos. No importa tu edad, condición física o experiencia previa:
            este espacio está diseñado para ti. Solo necesitas suscribirte y dar el primer paso hacia un estilo de vida más saludable,
            dinámico y lleno de energía. Te ofrecemos una amplia variedad de clases, tanto en vivo como grabadas,
            para que puedas elegir lo que mejor se adapte a tu ritmo y horario. Cada sesión está guiada por profesionales apasionados
            que estarán contigo en cada momento, ayudándote a moverte, aprender y sentirte mejor.
            ¿Estás listo para descubrir todo lo que el movimiento puede hacer por ti? ¡Únete hoy y transforma tu vida, un paso a la vez!
          </p></div>
      </div>
      <div className="text-center my-8"><h4 className="text-xl font-bold bg-primary-dark/80 inline-block px-6 py-3 rounded-full text-secondary-light">Aprender nunca fue tan fácil como ahora en ¡MUEVETE!</h4><h4 className="mt-4 text-secondary-light">Hay una clase preparada para que puedas empezar a aprender <Link href="/login" className="text-accent hover:underline">¡YA!</Link></h4></div>
    </>
  );
}