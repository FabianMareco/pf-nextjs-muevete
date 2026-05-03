'use client';

export default function ContactanosPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const nombre = (form.elements.namedItem('nombre') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const mensaje = (form.elements.namedItem('mensaje') as HTMLTextAreaElement).value;
    if (!nombre || !email || !mensaje) return alert('Completa todos los campos');
    if (!email.includes('@')) return alert('Email inválido');
    alert('Mensaje enviado. Te contactaremos pronto.');
    form.reset();
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h3>Contactanos</h3>
      <div className="flex flex-col md:flex-row gap-8 mt-8 justify-center">
        <div className="md:w-1/2 bg-white/80 p-6 rounded-lg shadow">
          <h4 className="text-xl font-bold mb-4">Estamos para ayudarte</h4>
          <p>Si tenés dudas sobre nuestras clases, packs o cualquier consulta, escribinos.</p>
          <p className="mt-4"><i className="fas fa-map-marker-alt"></i> Buenos Aires, Argentina</p>
          <p><i className="fas fa-envelope"></i> info@muevete.com</p>
          <p><i className="fas fa-phone"></i> +54 11 1234 5678</p>
        </div>
        <div className="md:w-1/2 bg-white/80 p-6 rounded-lg shadow">
          <form onSubmit={handleSubmit}>
            <div className="mb-4"><label className="block font-bold">Nombre</label><input type="text" name="nombre" className="w-full p-2 border rounded" required /></div>
            <div className="mb-4"><label className="block font-bold">Email</label><input type="email" name="email" className="w-full p-2 border rounded" required /></div>
            <div className="mb-4"><label className="block font-bold">Mensaje</label><textarea name="mensaje" rows={5} className="w-full p-2 border rounded" required></textarea></div>
            <button type="submit" className="bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
}