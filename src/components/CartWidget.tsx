'use client';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';

export default function CartWidget() {
  const { totalItems } = useCart();
  
  if (totalItems === 0) return null;
  
  return (
    <Link href="/cart" className="relative inline-flex" aria-label="Ver carrito">
      <i className="fas fa-cart-shopping text-xl text-paper/85" aria-hidden="true" />
      <span className="absolute -top-2 -right-2 bg-accent text-paper rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
        {totalItems}
      </span>
    </Link>
  );
}