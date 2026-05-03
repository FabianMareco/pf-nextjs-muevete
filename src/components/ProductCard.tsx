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
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
        <div className="h-48 flex items-center justify-center p-4">
          <img src={displayImage} alt={name} className="h-full object-contain" />
        </div>
 
        <div className="p-4">
          <h3 className="product-title text-lg">{name}</h3>
 
          {subcategory === 'remeras' && (
            <p className="text-center text-sm text-gray-500">📏 Talles: S, M, L, XL</p>
          )}
          {subcategory === 'zapatillas' && (
            <p className="text-center text-sm text-gray-500">👟 Talles: 34–43</p>
          )}
 
          {/* Selector de color */}
          {colors && colors.length > 0 && (
            <div className="flex justify-center gap-2 mt-2">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-1 text-xs rounded-full border-2 transition font-semibold ${
                    selectedColor?.name === color.name
                      ? 'border-red-500 bg-red-50 text-red-600'
                      : 'border-gray-300 text-gray-600 hover:border-gray-500'
                  }`}
                >
                  {color.name}
                </button>
              ))}
            </div>
          )}
 
          <p className="text-center font-bold text-primary mt-2">💰 ${price.toLocaleString()}</p>
 
          <button
            onClick={() => setShowModal(true)}
            className="w-full bg-accent hover:bg-accent-dark text-primary-dark py-2 rounded mt-3 font-bold"
          >
            🛒 Ver detalle y comprar
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