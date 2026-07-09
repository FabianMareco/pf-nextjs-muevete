'use client';
import { useState, useEffect } from 'react';

const images = [1, 2, 3, 4, 6, 7, 8, 9];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setCurrent((prev) => (prev + 1) % images.length), 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative w-full overflow-hidden rounded-card">
      <div className="relative h-96 md:h-[550px]">
        {images.map((num, idx) => (
          <div key={num} className={`absolute inset-0 transition-opacity duration-700 ease-out ${idx === current ? 'opacity-100' : 'opacity-0'}`}>
            <img src={`/multimedia/${num}.png`} alt="slide" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Ir a la imagen ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-200 ${idx === current ? 'bg-accent w-6' : 'bg-white/50 w-2'}`}
          />
        ))}
      </div>
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + images.length) % images.length)}
        aria-label="Anterior"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-ink/60 text-paper w-9 h-9 rounded-full hover:bg-ink/80 active:scale-[0.94] transition flex items-center justify-center"
      >
        <i className="fas fa-chevron-left text-sm" aria-hidden="true" />
      </button>
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
        aria-label="Siguiente"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-ink/60 text-paper w-9 h-9 rounded-full hover:bg-ink/80 active:scale-[0.94] transition flex items-center justify-center"
      >
        <i className="fas fa-chevron-right text-sm" aria-hidden="true" />
      </button>
    </div>
  );
}