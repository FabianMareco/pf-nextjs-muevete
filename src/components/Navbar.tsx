'use client';
import Link from 'next/link';
import { useState } from 'react';
import CartWidget from './CartWidget';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const navLinks = [
  { name: 'INICIO', href: '/' },
  { name: 'NOSOTROS', href: '/nosotros' },
  { name: 'CLASES', href: '/clases' },
  { name: 'MERCHANDISING', href: '/merchandising' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <nav className="bg-primary shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="logo-container">
            <span className="logo-text">MUEVETE</span>
            <img src="/multimedia/K.png" alt="logo" className="logo-image" />
          </div>
        </div>

        {/* Menú */}
        <div className="flex justify-center">
          <button onClick={() => setIsOpen(!isOpen)} className="block sm:hidden text-secondary-light focus:outline-none mb-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className={`${isOpen ? 'block' : 'hidden'} sm:flex w-full sm:w-auto`}>
            <ul className="flex flex-col sm:flex-row gap-6 items-center justify-center">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-secondary-light font-bold hover:text-white transition text-lg">
                    {link.name}
                  </Link>
                </li>
              ))}

              {/* Carrito siempre visible */}
              <li><CartWidget /></li>

              {/* Si NO está logueado: botón de ingreso */}
              {!user && (
                <li>
                  <Link href="/login" className="bg-accent hover:bg-accent-dark text-primary-dark font-bold py-2 px-5 rounded-lg">
                    INGRESO
                  </Link>
                </li>
              )}

              {/* Si está logueado: nombre, admin y salir */}
              {user && (
                <li className="flex items-center gap-3">
                  <span className="text-sm text-secondary-light">👤 {user.email?.split('@')[0]}</span>
                  {user.email === 'admin@muevete.com' && (
                    <Link href="/admin" className="bg-primary-light hover:bg-primary text-white px-3 py-1 rounded-lg text-sm font-bold transition">
                      ⚙️ Admin
                    </Link>
                  )}
                  <button onClick={handleLogout} className="bg-danger hover:bg-danger-dark text-white px-3 py-1 rounded-lg text-sm">
                    Salir
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}