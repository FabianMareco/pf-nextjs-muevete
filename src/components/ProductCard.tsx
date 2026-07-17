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
 
export default function ProductCard({ id, name, price, pictureUrl, subcategory, description, stock, colors }: ProductCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState<Color | null>(colors && colors.length > 0 ? colors[0] : null);
 
  const displayImage = selectedColor ? selectedColor.pictureUrl : pictureUrl;
 
  return (
    <>
      <div className="card overflow-hidden hover:shadow-md transition-shadow">
        <div className="h-48 flex items-center justify-center p-4 bg-neutral">
          <img src={displayImage} alt={name} className="h-full object-contain" />
        </div>
 
        <div className="p-4">
          <h3 className="product-title text-lg">{name}</h3>
 
          {subcategory === 'remeras' && (
            <p className="text-center text-sm text-muted">Talles: S, M, L, XL</p>
          )}
          {subcategory === 'zapatillas' && (
            <p className="text-center text-sm text-muted">Talles: 34-43</p>
          )}
 
          {/* Selector de color */}
          {colors && colors.length > 0 && (
            <div className="flex justify-center gap-2 mt-2">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-1 text-xs rounded-full border-2 transition font-semibold active:scale-[0.96] ${
                    selectedColor?.name === color.name
                      ? 'border-accent bg-accent/10 text-accent-deep'
                      : 'border-neutral text-muted hover:border-ink/30'
                  }`}
                >
                  {color.name}
                </button>
              ))}
            </div>
          )}
 
          <p className="text-center font-bold text-ink mt-2">${price.toLocaleString()}</p>
 
          <button
            onClick={() => setShowModal(true)}
            className="w-full btn-accent py-2 mt-3 flex items-center justify-center gap-2"
          >
            <i className="fas fa-cart-shopping" aria-hidden="true" />
            Ver detalle y comprar
          </button>
        </div>
      </div>
 
      {showModal && (
        <ProductModal
          product={{ id, name, price, pictureUrl: displayImage, subcategory, description, stock, colors }}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}