'use client';
import toast from 'react-hot-toast';

export default function ContactanosPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const nombre = (form.elements.namedItem('nombre') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const mensaje = (form.elements.namedItem('mensaje') as HTMLTextAreaElement).value;
    if (!nombre || !email || !mensaje) return toast.error('Completá todos los campos');
    if (!email.includes('@')) return toast.error('Email inválido');
    toast.success('Mensaje enviado. Te contactaremos pronto.');
    form.reset();
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-left">Contactanos</h3>
      <div className="flex flex-col md:flex-row gap-8 mt-8 justify-center">
        <div className="md:w-1/2 card p-6">
          <h4 className="text-xl font-bold mb-4 text-left">Estamos para ayudarte</h4>
          <p className="text-muted">Si tenés dudas sobre nuestras clases, packs o cualquier consulta, escribinos.</p>
          <div className="mt-4 space-y-2 text-ink">
            <p className="flex items-center gap-2"><i className="fas fa-map-marker-alt text-accent w-4" aria-hidden="true" /> Buenos Aires, Argentina</p>
            <p className="flex items-center gap-2"><i className="fas fa-envelope text-accent w-4" aria-hidden="true" /> info@muevete.com</p>
            <p className="flex items-center gap-2"><i className="fas fa-phone text-accent w-4" aria-hidden="true" /> +54 11 1234 5678</p>
          </div>
        </div>
        <div className="md:w-1/2 card p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4"><label className="block font-bold text-ink mb-1">Nombre</label><input type="text" name="nombre" className="input" required /></div>
            <div className="mb-4"><label className="block font-bold text-ink mb-1">Email</label><input type="email" name="email" className="input" required /></div>
            <div className="mb-4"><label className="block font-bold text-ink mb-1">Mensaje</label><textarea name="mensaje" rows={5} className="input" required></textarea></div>
            <button type="submit" className="btn-accent">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
}