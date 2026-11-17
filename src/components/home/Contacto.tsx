'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Reveal from './Reveal';

export default function Contacto() {
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const nombre = String(data.get('nombre') || '').trim();
    const email = String(data.get('email') || '').trim();
    const mensaje = String(data.get('mensaje') || '').trim();
    if (!nombre || !email || !mensaje) return toast.error('Completá todos los campos');
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error('Revisá el email');
    setSending(true);
    window.setTimeout(() => {
      toast.success('Mensaje enviado. Te respondemos pronto.');
      form.reset();
      setSending(false);
    }, 600);
  };

  return (
    <section id="contacto" className="mx-auto max-w-7xl px-4 sm:px-6 py-24 md:py-32 grid lg:grid-cols-12 gap-12 lg:gap-16">
      <div className="lg:col-span-5">
        <Reveal>
          <h2 className="section-title">¿Tenés dudas? Escribinos</h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-5 text-lg text-muted leading-relaxed max-w-md">
            Consultas sobre clases, packs o la tienda. Te respondemos dentro de las 24 horas hábiles.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <ul className="mt-10 space-y-4 text-ink">
            <li className="flex items-center gap-3"><span className="contact-icon"><i className="fas fa-envelope" aria-hidden="true" /></span><a href="mailto:info@muevete.com" className="link-underline">info@muevete.com</a></li>
            <li className="flex items-center gap-3"><span className="contact-icon"><i className="fab fa-whatsapp" aria-hidden="true" /></span>+54 11 1234 5678</li>
            <li className="flex items-center gap-3"><span className="contact-icon"><i className="fas fa-location-dot" aria-hidden="true" /></span>Buenos Aires, Argentina</li>
          </ul>
        </Reveal>
      </div>

      <Reveal delay={0.08} className="lg:col-span-7">
        <form onSubmit={handleSubmit} noValidate className="rounded-card bg-white border border-ink/10 p-6 md:p-10 grid sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="c-nombre" className="text-sm font-bold text-ink">Nombre</label>
            <input id="c-nombre" name="nombre" type="text" autoComplete="name" className="input" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="c-email" className="text-sm font-bold text-ink">Email</label>
            <input id="c-email" name="email" type="email" autoComplete="email" className="input" />
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <label htmlFor="c-mensaje" className="text-sm font-bold text-ink">Mensaje</label>
            <textarea id="c-mensaje" name="mensaje" rows={5} className="input resize-none" />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" disabled={sending} className="btn-accent w-full sm:w-auto disabled:opacity-70">
              {sending ? 'Enviando...' : 'Enviar mensaje'}
            </button>
          </div>
        </form>
      </Reveal>
    </section>
  );
}
