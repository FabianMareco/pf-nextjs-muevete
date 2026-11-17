import Link from 'next/link';

const redes = [
  { href: 'https://www.instagram.com/', icon: 'fa-instagram', label: 'Instagram' },
  { href: 'https://www.tiktok.com/', icon: 'fa-tiktok', label: 'TikTok' },
  { href: 'https://www.youtube.com/', icon: 'fa-youtube', label: 'YouTube' },
  { href: 'https://www.facebook.com/', icon: 'fa-facebook', label: 'Facebook' },
];

const links = [
  { href: '/#clases', label: 'Clases' },
  { href: '/#packs', label: 'Packs' },
  { href: '/#tienda', label: 'Tienda' },
  { href: '/#contacto', label: 'Contacto' },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-paper mt-auto overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-20 pb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div>
            <p className="font-display font-extrabold text-3xl md:text-5xl tracking-[-0.04em] leading-[1] text-paper max-w-lg">
              Tu próxima clase empieza cuando vos digas.
            </p>
            <Link href="/#packs" className="btn-accent btn-lg mt-8">Ver packs</Link>
          </div>
          <nav aria-label="Pie de página" className="flex flex-wrap gap-x-8 gap-y-3 text-paper/70">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-paper transition-colors">{l.label}</Link>
            ))}
          </nav>
        </div>

        <p className="footer-wordmark font-display font-extrabold text-[#221E1A] select-none mt-16 md:mt-20" aria-hidden="true">
          MUEVETE
        </p>

        <div className="mt-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8">
          <p className="text-sm text-paper/50">© {new Date().getFullYear()} MUEVETE. Todos los derechos reservados.</p>
          <div className="flex gap-2">
            {redes.map((r) => (
              <a
                key={r.label}
                href={r.href}
                target="_blank"
                rel="noreferrer"
                aria-label={r.label}
                className="grid place-items-center w-10 h-10 rounded-full border border-white/15 text-paper/70 hover:text-paper hover:border-accent hover:bg-accent transition-colors duration-200"
              >
                <i className={`fab ${r.icon}`} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
