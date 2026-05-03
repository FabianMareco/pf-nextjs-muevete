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
    <div className="relative w-full overflow-hidden rounded-xl shadow-2xl">
      <div className="relative h-96 md:h-[550px]">
        {images.map((num, idx) => (
          <div key={num} className={`absolute inset-0 transition-opacity duration-1000 ${idx === current ? 'opacity-100' : 'opacity-0'}`}>
            <img src={`/multimedia/${num}.png`} alt="slide" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, idx) => (
          <button key={idx} onClick={() => setCurrent(idx)} className={`w-3 h-3 rounded-full transition-all ${idx === current ? 'bg-accent w-6' : 'bg-white/50'}`} />
        ))}
      </div>
      <button onClick={() => setCurrent((prev) => (prev - 1 + images.length) % images.length)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70">❮</button>
      <button onClick={() => setCurrent((prev) => (prev + 1) % images.length)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70">❯</button>
    </div>
  );
}