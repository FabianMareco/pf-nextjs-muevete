// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <p className="font-display font-extrabold text-accent text-6xl mb-2">404</p>
      <h2 className="text-2xl mb-3">Página no encontrada</h2>
      <p className="text-muted mb-6 max-w-sm">Lo sentimos, la página que buscás no existe o fue movida.</p>
      <Link href="/" className="btn-accent">
        Volver al inicio
      </Link>
    </div>
  );
}