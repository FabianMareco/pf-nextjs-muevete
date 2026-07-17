export default function Footer() {
  return (
    <footer className="bg-ink text-paper/70 py-8 mt-auto">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm">© 2025 MUEVETE - Todos los derechos reservados</p>
        <div className="flex gap-5 text-lg">
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.tiktok.com/es/" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors" aria-label="TikTok">
            <i className="fab fa-tiktok"></i>
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors" aria-label="YouTube">
            <i className="fab fa-youtube"></i>
          </a>
          <a href="https://es-la.facebook.com/" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors" aria-label="Facebook">
            <i className="fab fa-facebook"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}