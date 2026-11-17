'use client';
import { useState } from 'react';
import ProductModal from './ProductModal';

interface Color {
  name: string;
  pictureUrl: string;
}

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  pictureUrl: string;
  subcategory: string;
  description: string;
  stock: number;
  colors?: Color[];
}

const sizesLabel: Record<string, string> = {
  remeras: 'Talles S a XL',
  zapatillas: 'Talles 34 a 43',
};

export default function ProductCard({ id, name, price, pictureUrl, subcategory, description, stock, colors }: ProductCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState<Color | null>(colors && colors.length > 0 ? colors[0] : null);

  const displayImage = selectedColor ? selectedColor.pictureUrl : pictureUrl;

  return (
    <>
      <article className="product-card group">
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="block w-full text-left"
          aria-label={`Ver ${name}`}
        >
          <div className="relative aspect-square overflow-hidden rounded-card bg-[#F1EFEC]">
            <img
              src={displayImage}
              alt={name}
              loading="lazy"
              className="product-img absolute inset-0 h-full w-full object-contain p-6 mix-blend-multiply"
            />
            <span className="product-cta absolute inset-x-3 bottom-3 flex items-center justify-center gap-2 rounded-control bg-ink py-2.5 text-sm font-bold text-paper">
              <i className="fas fa-plus text-xs" aria-hidden="true" />
              Ver y comprar
            </span>
          </div>
          <div className="mt-4 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-sans font-bold text-base text-ink tracking-normal leading-snug capitalize">{name.toLowerCase()}</h3>
              {sizesLabel[subcategory] && <p className="text-sm text-muted mt-0.5">{sizesLabel[subcategory]}</p>}
            </div>
            <p className="shrink-0 font-bold text-ink">${price.toLocaleString('es-AR')}</p>
          </div>
        </button>

        {colors && colors.length > 0 && (
          <div className="flex gap-1.5 mt-3">
            {colors.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={() => setSelectedColor(color)}
                aria-pressed={selectedColor?.name === color.name}
                className={`px-2.5 py-1 text-xs rounded-full border transition-colors font-semibold active:scale-[0.96] ${
                  selectedColor?.name === color.name
                    ? 'border-ink bg-ink text-paper'
                    : 'border-ink/15 text-muted hover:border-ink/40'
                }`}
              >
                {color.name}
              </button>
            ))}
          </div>
        )}
      </article>

      {showModal && (
        <ProductModal
          product={{ id, name, price, pictureUrl: displayImage, subcategory, description, stock, colors }}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
