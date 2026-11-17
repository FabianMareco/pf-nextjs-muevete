'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import CartWidget from './CartWidget';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
  { name: 'Clases', id: 'clases' },
  { name: 'Packs', id: 'packs' },
  { name: 'Tienda', id: 'tienda' },
  { name: 'Contacto', id: 'contacto' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const isHome = pathname === '/';

  // Resalta la sección visible (sin listeners de scroll)
  useEffect(() => {
    if (!isHome) return;
    const els = ['inicio', 'nosotros', ...navLinks.map((l) => l.id)].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(navLinks.some((l) => l.id === e.target.id) ? e.target.id : null); });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const shown = isHome ? active : null;
  const href = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <nav className="sticky top-0 z-50 bg-ink/90 backdrop-blur-md border-b border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 md:h-[72px] flex items-center justify-between gap-4">
        <Link href="/" className="logo-container shrink-0" onClick={() => setIsOpen(false)}>
          <img src="/multimedia/K.png" alt="" className="logo-image" />
          <span className="logo-text">MUEVETE</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={href(link.id)}
                className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${shown === link.id ? 'text-paper' : 'text-paper/65 hover:text-paper'}`}
              >
                {shown === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={reduce ? { duration: 0 } : { type: 'spring', duration: 0.4, bounce: 0.1 }}
                  />
                )}
                <span className="relative">{link.name}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          <CartWidget />
          {!user && (
            <Link href="/login" className="btn-accent text-sm py-2 px-4">Ingresá</Link>
          )}
          {user && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-paper/70 flex items-center gap-1.5">
                <i className="fas fa-user-circle" aria-hidden="true" />
                {user.email?.split('@')[0]}
              </span>
              {user.email === 'admin@muevete.com' && (
                <Link href="/admin" className="text-sm font-semibold text-paper/70 hover:text-paper transition-colors flex items-center gap-1.5">
                  <i className="fas fa-gauge" aria-hidden="true" />
                  Admin
                </Link>
              )}
              <button onClick={handleLogout} className="text-sm font-semibold text-paper/70 hover:text-paper transition-colors">
                Salir
              </button>
            </div>
          )}
        </div>

        <div className="lg:hidden flex items-center gap-4">
          <CartWidget />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-paper p-2 -mr-2 active:scale-[0.92] transition-transform"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
          >
            <i className={`fas ${isOpen ? 'fa-xmark' : 'fa-bars'} text-xl w-5`} aria-hidden="true" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden overflow-hidden border-t border-white/10"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: [0.23, 1, 0.32, 1] }}
          >
            <ul className="px-4 sm:px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 + i * 0.04, duration: 0.25 }}
                >
                  <a
                    href={href(link.id)}
                    onClick={() => setIsOpen(false)}
                    className="block py-2 font-display font-extrabold text-3xl tracking-[-0.03em] text-paper"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
              <li className="flex items-center gap-4 pt-5 mt-3 border-t border-white/10">
                {!user && (
                  <Link href="/login" className="btn-accent text-sm py-2 px-4" onClick={() => setIsOpen(false)}>Ingresá</Link>
                )}
                {user && (
                  <>
                    <span className="text-sm text-paper/70">{user.email?.split('@')[0]}</span>
                    {user.email === 'admin@muevete.com' && (
                      <Link href="/admin" className="text-sm font-semibold text-paper/70" onClick={() => setIsOpen(false)}>Admin</Link>
                    )}
                    <button onClick={handleLogout} className="text-sm font-semibold text-paper/70 ml-auto">Salir</button>
                  </>
                )}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
