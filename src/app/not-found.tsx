// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h2 className="text-3xl font-bold text-red-600 mb-4">404 - Página no encontrada</h2>
      <p className="text-gray-600 mb-6">Lo sentimos, la página que buscas no existe.</p>
      <Link 
        href="/" 
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
      >
        Volver al inicio
      </Link>
    </div>
  );
}