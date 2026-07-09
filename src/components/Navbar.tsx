'use client';
import Link from 'next/link';
import { useState } from 'react';
import CartWidget from './CartWidget';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Nosotros', href: '/nosotros' },
  { name: 'Clases', href: '/clases' },
  { name: 'Merchandising', href: '/merchandising' },
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
    <nav className="bg-ink sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 md:h-[72px] flex items-center justify-between gap-4">
        <Link href="/" className="logo-container shrink-0">
          <img src="/multimedia/K.png" alt="" className="logo-image" />
          <span className="logo-text">MUEVETE</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-sm font-semibold text-paper/75 hover:text-paper transition-colors">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          <CartWidget />
          {!user && (
            <Link href="/login" className="btn-accent text-sm py-2 px-4">
              Ingresá
            </Link>
          )}
          {user && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-paper/75 flex items-center gap-1.5">
                <i className="fas fa-user-circle" aria-hidden="true" />
                {user.email?.split('@')[0]}
              </span>
              {user.email === 'admin@muevete.com' && (
                <Link href="/admin" className="text-sm font-semibold text-paper/75 hover:text-paper transition-colors flex items-center gap-1.5">
                  <i className="fas fa-gauge" aria-hidden="true" />
                  Admin
                </Link>
              )}
              <button onClick={handleLogout} className="btn-danger text-sm py-2 px-4">
                Salir
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-paper focus:outline-none p-2 -mr-2"
          aria-label="Abrir menú"
        >
          <i className={`fas ${isOpen ? 'fa-xmark' : 'fa-bars'} text-xl`} aria-hidden="true" />
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden border-t border-white/10 bg-ink px-4 py-5">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setIsOpen(false)} className="text-paper/85 font-semibold text-base">
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="flex items-center justify-between pt-2 border-t border-white/10">
              <CartWidget />
              {!user && (
                <Link href="/login" className="btn-accent text-sm py-2 px-4" onClick={() => setIsOpen(false)}>
                  Ingresá
                </Link>
              )}
              {user && (
                <div className="flex items-center gap-3">
                  {user.email === 'admin@muevete.com' && (
                    <Link href="/admin" className="text-sm font-semibold text-paper/75" onClick={() => setIsOpen(false)}>
                      Admin
                    </Link>
                  )}
                  <button onClick={handleLogout} className="btn-danger text-sm py-2 px-4">
                    Salir
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}