'use client';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function NosotrosPage() {
  useEffect(() => { AOS.init({ duration: 600, easing: 'ease-out-cubic', once: true }); }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <h3 data-aos="fade-up" className="text-left">Nuestra plataforma</h3>
      <p className="texto-contenido" data-aos="fade-up">
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
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mt-8" data-aos="fade-up">
        {[11,12,13,14,15,16].map(num => (
          <img key={num} src={`/multimedia/bailar${num}.png`} alt="" className="w-full aspect-square object-cover rounded-card" />
        ))}
      </div>
    </div>
  );
}