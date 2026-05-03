'use client';
import { useState } from 'react';

export default function ItemCount({ stock, initial = 1, onAdd }: { stock: number; initial?: number; onAdd: (quantity: number) => void }) {
  const [count, setCount] = useState(initial);
  const increment = () => count < stock && setCount(count + 1);
  const decrement = () => count > 1 && setCount(count - 1);
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-3 items-center">
        <button onClick={decrement} className="btn-outline">-</button>
        <span className="text-xl font-bold text-secondary-light">{count}</span>
        <button onClick={increment} className="btn-outline">+</button>
      </div>
      <button onClick={() => onAdd(count)} disabled={stock === 0} className="btn-accent w-full">
        Agregar al carrito
      </button>
    </div>
  );
}