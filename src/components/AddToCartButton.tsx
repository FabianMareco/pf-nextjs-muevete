'use client';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';

export default function AddToCartButton({ product, sizes = [] }: any) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(sizes[0] || '');

  const handleAdd = () => {
    const item = { ...product, type: 'merchandising', selectedSize: selectedSize || null };
    addItem(item, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div>
      {sizes.length > 0 && (
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="input-glass mb-4"
        >
          {sizes.map((s: string) => <option key={s}>{s}</option>)}
        </select>
      )}
      <button onClick={handleAdd} className="btn-accent w-full">
        {added ? '✅ Agregado' : '🛒 Agregar al carrito'}
      </button>
    </div>
  );
}